# 见舟AI个人站

## 当前新版 · 2026-10-28

当前个人站：https://jianzhou-personal-site.pages.dev

新版源码与部署说明位于本分支的 [personal-site/](personal-site/README.md)。新版采用全浅色阅读界面、文章与实战学习路线、四款产品的专属素材和微信咨询入口，不使用旧版表单后端。

本分支 `release/personal-site-20261028` 留档新工程；原 `main`、根目录旧版源码与历史均保留。以下旧版说明仅作历史参考，不代表新版功能。

一个面向个人创作者、内容团队与企业的开源个人站：展示真实项目与工作流能力，并提供可交互的免费工作流体检。

## 在线预览

- 站点：[https://jianzhou-ai-site.pages.dev](https://jianzhou-ai-site.pages.dev)
- GitHub：[tangchengjiao/jianzhou-ai-site](https://github.com/tangchengjiao/jianzhou-ai-site)

## 已实现

- 深蓝“工作流实验室”响应式首页
- 选题 → 脚本 → 剪辑 → 封面 → 发布 → 复盘的真实交付物展示
- 个人创作者与内容团队两条服务路径
- 匿名案例拆解与内容资产展示
- 三步工作流体检、即时建议与合作表单
- Cloudflare Pages Function 已实现飞书转发能力；生产环境待配置 Secret 后启用
- 基础 SEO、无障碍焦点样式、移动端导航与减少动态效果适配

## 本地开发

要求 Node.js 20+。

```bash
npm install
npm run dev
```

构建检查：

```bash
npm test
npm run build
```

## 飞书咨询表单

1. 在飞书群中添加自定义机器人并复制 Webhook 地址。
2. 本地测试时，将 `.dev.vars.example` 复制为 `.dev.vars`，填入真实地址。
3. 在 Cloudflare Pages 项目的 `Settings → Variables and Secrets` 中添加 Secret：`FEISHU_WEBHOOK_URL`。
4. 不要把真实 Webhook 提交进 Git。

`functions/api/contact.js` 会校验字段长度、过滤控制字符，并且只在服务端读取 Webhook Secret。

接口会在浏览器请求带有 Origin/Referer 时校验同源关系，并包含实际请求体大小限制、蜜罐、最短填写时长和单实例频率限制，同时校验飞书返回的业务状态码。缺少这些 Header 的非浏览器请求仍需依靠其他校验与限流；频率限制属于无外部数据库的轻量防护，公开流量增大后建议再配置 Cloudflare Turnstile 或平台级 Rate Limiting。

站内《个人信息处理说明》明确了收集字段、用途、飞书转发、默认保存期限与查询/更正/删除方式。正式运营时，应根据实际主体、联系方式与业务地区继续更新。

## GitHub + Cloudflare Pages 部署

当前项目使用 GitHub CI 验证、Wrangler CLI 直传 Cloudflare Pages；Cloudflare 项目未连接 Git Provider，因此推送 GitHub 不会自动部署。

1. 推送 main 并等待 GitHub Actions 的测试、构建与依赖审计全绿。
2. 执行 npm run build。
3. 使用 Wrangler 部署 dist 到 jianzhou-ai-site，并明确记录目标 commit。
4. 配置 FEISHU_WEBHOOK_URL 后创建一次新部署，再做生产真实提交并确认飞书群收到消息。
5. 首次部署会得到一个 *.pages.dev 地址；后续可选绑定海外域名。

也可以为新项目选择 Cloudflare 的 Git 集成自动部署，但必须在交接文档中明确采用哪种模式，不能混用两套状态判断。

这种海外托管方式通常不走中国大陆服务器的 ICP 备案流程，但不等于承诺中国大陆访问速度或稳定性。若未来使用中国大陆节点、支付、特定经营功能或收集更多个人信息，应重新做合规评估。

## 开源边界

- 程序代码：MIT License
- 品牌、人物、案例与内容素材：保留权利，见 [CONTENT_LICENSE.md](./CONTENT_LICENSE.md)
- 素材来源与展示边界：见 [ASSET_SOURCES.md](./ASSET_SOURCES.md)
- 主要第三方依赖许可：见 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)

## 项目结构

```text
src/                    React 页面与样式
public/assets/          品牌、人物与真实案例资产
functions/api/          Cloudflare Pages Functions
design/                 选定视觉参考与 QA 依据
docs/                   零到一手册、发布门禁、故障库与交接状态
```

## 维护者文档

后续 Codex 或维护者开始任何规划、修改、测试、部署前，先读取 [docs/README.md](./docs/README.md)。其中包含完整零到一流程、发布检查表、真实踩坑与防错规则、当前生产状态和 E 盘工具路径。

<!-- JIANZHOU-CONTACT-QR:START -->
## 联系二维码

| 微信 | 抖音 | 视频号 | 公众号 |
| :---: | :---: | :---: | :---: |
| <img src="https://hualian-ai.pages.dev/assets/contact/wechat-qr.png" alt="见舟微信二维码" width="160"> | <img src="https://hualian-ai.pages.dev/assets/contact/douyin-qr.png" alt="见舟抖音二维码" width="160"> | <img src="https://hualian-ai.pages.dev/assets/contact/channels-qr.png" alt="见舟AI赋能视频号二维码" width="160"> | <img src="https://hualian-ai.pages.dev/assets/contact/official-account-qr.jpg" alt="公众号二维码" width="160"> |
| `DST10209` | `74683161410` | 见舟AI赋能 | 扫码关注 |
<!-- JIANZHOU-CONTACT-QR:END -->

<!-- JIANZHOU-PUBLIC-INFO:START -->
## 企业服务与联系

**华链 AI** · 企业 AI 业务落地与内生能力建设

培训与 FDE 培养 · 场景验证 · 智能体定制 · 企业实施 · 产品应用支持

[华链 AI 官网](https://hualian-ai.pages.dev) · [企业服务](https://hualian-ai.pages.dev/services/) · [服务参考价](https://hualian-ai.pages.dev/pricing/) · [企业宣传册](https://hualian-ai.pages.dev/downloads/company-brochure.pdf) · [合作咨询](https://hualian-ai.pages.dev/contact/)

咨询联系人：**见舟** · 微信：**`DST10209`**

<img src="https://hualian-ai.pages.dev/assets/contact/wechat-qr.png" alt="见舟微信二维码" width="200">
<!-- JIANZHOU-PUBLIC-INFO:END -->
