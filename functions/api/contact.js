const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
};

const MAX_BODY_BYTES = 12_288;
const MIN_FILL_TIME_MS = 1_500;
const MAX_FILL_TIME_MS = 86_400_000;
const RATE_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT = 5;
const recentRequests = new Map();

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), { status, headers: { ...jsonHeaders, ...extraHeaders } });
}

function clean(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function isSameOrigin(request) {
  const expectedOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  if (!origin && !referer) return true;

  try {
    if (origin && new URL(origin).origin !== expectedOrigin) return false;
    if (referer && new URL(referer).origin !== expectedOrigin) return false;
    return true;
  } catch {
    return false;
  }
}

function getClientIp(request) {
  return clean(request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0], 80);
}

function isRateLimited(ip, now) {
  if (!ip) return false;
  const active = (recentRequests.get(ip) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  if (active.length >= RATE_LIMIT) {
    recentRequests.set(ip, active);
    return true;
  }
  active.push(now);
  recentRequests.set(ip, active);

  if (recentRequests.size > 500) {
    for (const [key, timestamps] of recentRequests) {
      if (!timestamps.some((timestamp) => now - timestamp < RATE_WINDOW_MS)) recentRequests.delete(key);
    }
  }
  return false;
}

function isSuccessfulFeishuResponse(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return false;
  const businessCode = payload.code ?? payload.StatusCode ?? payload.status_code;
  return businessCode !== undefined && Number(businessCode) === 0;
}

export async function onRequestPost(context) {
  if (!isSameOrigin(context.request)) return json({ ok: false, error: "origin_not_allowed" }, 403);

  const contentType = context.request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ ok: false, error: "unsupported_media_type" }, 415);
  }

  const contentLength = Number(context.request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return json({ ok: false, error: "payload_too_large" }, 413);

  let rawBody;
  let payload;
  try {
    rawBody = await context.request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json({ ok: false, error: "payload_too_large" }, 413);
    }
    payload = JSON.parse(rawBody);
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return json({ ok: false, error: "invalid_payload" }, 400);
  }

  // Hidden field for simple bot filtering. Real visitors never see or fill it.
  if (payload.website) return json({ ok: true });

  const now = Date.now();
  const startedAt = Number(payload.startedAt);
  const fillDuration = now - startedAt;
  if (!Number.isFinite(startedAt) || fillDuration < MIN_FILL_TIME_MS || fillDuration > MAX_FILL_TIME_MS) {
    return json({ ok: false, error: "invalid_submission_timing" }, 400);
  }

  if (isRateLimited(getClientIp(context.request), now)) {
    return json({ ok: false, error: "rate_limited" }, 429, { "retry-after": String(RATE_WINDOW_MS / 1_000) });
  }

  const submission = {
    name: clean(payload.name, 40),
    contact: clean(payload.contact, 100),
    role: clean(payload.role, 40),
    bottleneck: clean(payload.bottleneck, 60),
    frequency: clean(payload.frequency, 40),
    details: clean(payload.details, 500),
    diagnosis: clean(payload.diagnosis, 120),
    source: clean(payload.source, 60),
  };

  if (!submission.name || !submission.contact || !submission.bottleneck) {
    return json({ ok: false, error: "missing_required_fields" }, 400);
  }

  if (!context.env.FEISHU_WEBHOOK_URL) {
    return json({ ok: false, error: "contact_channel_not_configured" }, 503);
  }

  const message = [
    "【见舟AI个人站｜新合作需求】",
    `称呼：${submission.name}`,
    `联系方式：${submission.contact}`,
    `角色：${submission.role || "未填写"}`,
    `当前卡点：${submission.bottleneck}`,
    `产出频率：${submission.frequency || "未填写"}`,
    `体检建议：${submission.diagnosis || "未生成"}`,
    `补充说明：${submission.details || "无"}`,
    `来源：${submission.source || "website"}`,
  ].join("\n");

  try {
    const response = await fetch(context.env.FEISHU_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ msg_type: "text", content: { text: message } }),
    });

    if (!response.ok) return json({ ok: false, error: "delivery_failed" }, 502);

    let feishuResult;
    try {
      feishuResult = await response.json();
    } catch {
      return json({ ok: false, error: "delivery_failed" }, 502);
    }
    if (!isSuccessfulFeishuResponse(feishuResult)) {
      return json({ ok: false, error: "delivery_failed" }, 502);
    }
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "delivery_failed" }, 502);
  }
}

export function onRequest() {
  return json({ ok: false, error: "method_not_allowed" }, 405);
}
