# Design QA

- Source visual truth: [`design/selected-workflow-lab-reference.png`](./design/selected-workflow-lab-reference.png)
- Production URL: [https://jianzhou-ai-site.pages.dev](https://jianzhou-ai-site.pages.dev)
- Local verification URL: `http://127.0.0.1:4173/`
- Desktop, mobile, interaction, and combined-comparison captures are retained in the maintainer's external QA artifact directory rather than committed with the production site.
- Comparison viewport: desktop semantic viewport 1440 × 1000 (the supplied 807 px reference is a downsampled desktop composition); mobile 390 × 844
- State: homepage default, desktop anchor navigation, mobile menu, keyboard focus, three-step workflow diagnosis, privacy notice, consented lead submission preview

## Visual comparison

The combined comparison confirms that the implementation preserves the selected source's main visual system: dark navy workflow-lab shell, high-contrast white headline, cyan progress curve with amber review endpoint, six real workflow artifacts, a bordered knowledge-proof panel, a light two-path section, a dark case-study section, and the closing three-step conversion area.

The implementation intentionally uses the project's verified screenshots and founder portrait instead of recreating the reference mock's illustrative placeholders. Its full page is about 11% taller at equal display width because the real case descriptions and proof labels remain readable at the validated desktop viewport. This is accepted as content-driven responsive variance, not a hierarchy mismatch.

## Findings fixed

- P1: the raised workflow curve's opaque background crossed above the workflow region and dimmed the desktop proof row and hero CTAs. Fixed with explicit hero/founder stacking order; post-fix Chrome capture shows all conversion controls at full contrast.
- P1: mobile hero heading left a two-character orphan line. Reduced the small-screen heading size while preserving the source's heavy two-line rhythm.
- P1: the first case headline produced a one-character orphan at desktop. Adjusted the case column and heading measure.
- P2: the generated curve crossed workflow-card descriptions. Repositioned it above the card copy and disabled it at narrow mobile widths.
- P2: bright knowledge/case screenshots broke the dark-section contrast. Added restrained brightness/contrast treatment without obscuring the underlying real evidence.
- P2: desktop closing CTA was visually left-biased. Centered it within the conversion section.
- P2: Chrome requested a missing favicon on first load. Reused the real founder asset as the site icon, eliminating the initial 404.

No actionable P0, P1, or P2 visual findings remain after the final comparison pass.

## Interaction and responsive checks

- Production build: passed (`vite build`, 4,571 modules transformed).
- Desktop layout: 1440 px viewport, 1440 px document width, no horizontal overflow.
- Mobile layout: 390 px viewport, 390 px document width, no horizontal overflow.
- Six workflow images and four case-stage images: loaded with non-zero natural dimensions.
- Desktop case anchor navigation: passed.
- Mobile navigation menu: opened and rendered inside the viewport.
- Keyboard focus: first target is `见舟AI首页`; the 3 px cyan focus ring is visible.
- Diagnostic flow: dialog opened, problem selected, deterministic recommendation generated, result copied/advanced, contact fields completed, consent checked, and preview submission state displayed.
- Privacy notice: opened from inside the diagnostic flow without closing the diagnosis; desktop and 390 px mobile dialogs remained readable and free of horizontal overflow.
- Clean initial load: zero console errors, page errors, failed requests, or HTTP responses at/above 400 on both local and production URLs.
- Local Vite lead submission produces the expected `/api/contact` 404 and is deliberately converted by the UI into a preview message. The same endpoint was separately tested through Wrangler Pages with missing-secret, mocked-webhook, and success responses.
- Production submission currently reaches the deployed Pages Function and returns the expected handled `503` until the maintainer adds the `FEISHU_WEBHOOK_URL` secret.
- Hardened contact endpoint: 10 automated tests passed for media type, same-origin checks, null/invalid/oversized payloads, submission timing, honeypot, required fields, missing configuration, Feishu business failure, and Feishu success.

## Remaining P3 differences

- The implementation uses the closest Phosphor library mark beside the brand name because no standalone production logo file was supplied.
- The real founder portrait and proof screenshots differ from the stylized mock assets by design.

final result: passed
# 新版验收入口 · 2026-10-28

正式站已上线：https://jianzhou-personal-site.pages.dev 。生产 Chrome 验收 31 页、93 个页面/视口状态、40 项检查通过；31 页关闭 JavaScript 仍有正文，非预期脚本与资源错误为零。已查看正式首页桌面/手机与产品目录截图，保持全浅色、人像融合与各产品独立素材。证据：E:/CodexQA/jianzhou-production-20261028/。真实设备与微信内置浏览器未逐台实测。

新版源码在 `personal-site/`，使用已认可的全浅色阅读风格。完整本地验收覆盖 31 页、5 种视口、16 项素材来源对应、8 篇教程和微信咨询。生产验收与交接记录见 `personal-site/docs/HANDOFF.md`。旧版证据保留，不作为新版视觉真值。
