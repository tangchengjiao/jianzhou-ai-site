import assert from "node:assert/strict";
import test from "node:test";
import { onRequestPost } from "../functions/api/contact.js";

const validPayload = () => ({
  name: "测试用户",
  contact: "qa@example.test",
  role: "个人创作者",
  bottleneck: "剪辑太慢",
  frequency: "每周1-2条",
  details: "希望先跑通一个场景",
  diagnosis: "先拆掉剪辑里的重复动作",
  source: "website-workflow-checkup",
  website: "",
  startedAt: Date.now() - 2_000,
});

function contextFor(body, { headers = {}, env = {} } = {}) {
  return {
    request: new Request("https://example.pages.dev/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
    env,
  };
}

async function responseBody(response) {
  return { status: response.status, body: await response.json() };
}

test("contact endpoint validation and delivery", { concurrency: false }, async (t) => {
  await t.test("rejects unsupported media types", async () => {
    const response = await onRequestPost(contextFor(validPayload(), { headers: { "content-type": "text/plain" } }));
    assert.equal(response.status, 415);
  });

  await t.test("rejects cross-origin browser submissions", async () => {
    const response = await onRequestPost(contextFor(validPayload(), { headers: { origin: "https://evil.example" } }));
    assert.equal(response.status, 403);
  });

  await t.test("rejects null and invalid JSON payloads", async () => {
    assert.deepEqual(await responseBody(await onRequestPost(contextFor("null"))), {
      status: 400,
      body: { ok: false, error: "invalid_payload" },
    });
    assert.equal((await onRequestPost(contextFor("{"))).status, 400);
  });

  await t.test("checks actual body bytes even without a trusted content-length", async () => {
    const oversized = { ...validPayload(), details: "长".repeat(5_000) };
    const response = await onRequestPost(contextFor(oversized));
    assert.equal(response.status, 413);
  });

  await t.test("rejects submissions completed implausibly quickly", async () => {
    const response = await onRequestPost(contextFor({ ...validPayload(), startedAt: Date.now() }));
    assert.equal(response.status, 400);
  });

  await t.test("quietly accepts the honeypot path", async () => {
    const response = await onRequestPost(contextFor({ website: "bot.example" }));
    assert.deepEqual(await responseBody(response), { status: 200, body: { ok: true } });
  });

  await t.test("requires essential fields and a configured contact channel", async () => {
    assert.equal((await onRequestPost(contextFor({ ...validPayload(), name: "" }))).status, 400);
    assert.equal((await onRequestPost(contextFor(validPayload()))).status, 503);
  });

  await t.test("rejects a non-zero Feishu business response", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response(JSON.stringify({ code: 19021, msg: "signature mismatch" }), { status: 200 });
    try {
      const response = await onRequestPost(contextFor(validPayload(), { env: { FEISHU_WEBHOOK_URL: "https://open.feishu.cn/mock" } }));
      assert.equal(response.status, 502);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  await t.test("delivers a sanitized text payload on Feishu business success", async () => {
    const originalFetch = globalThis.fetch;
    let sentPayload;
    globalThis.fetch = async (_url, options) => {
      sentPayload = JSON.parse(options.body);
      return new Response(JSON.stringify({ code: 0, msg: "success" }), { status: 200 });
    };
    try {
      const response = await onRequestPost(contextFor(validPayload(), { env: { FEISHU_WEBHOOK_URL: "https://open.feishu.cn/mock" } }));
      assert.deepEqual(await responseBody(response), { status: 200, body: { ok: true } });
      assert.equal(sentPayload.msg_type, "text");
      assert.match(sentPayload.content.text, /测试用户/);
      assert.match(sentPayload.content.text, /剪辑太慢/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
