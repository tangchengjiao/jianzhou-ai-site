# 见舟AI个人站

一个面向个人创作者、内容团队与企业的开源个人站：展示真实项目与工作流能力，并提供可交互的免费工作流体检。

## 已实现

- 深蓝“工作流实验室”响应式首页
- 选题 → 脚本 → 剪辑 → 封面 → 发布 → 复盘的真实交付物展示
- 个人创作者与内容团队两条服务路径
- 匿名案例拆解与内容资产展示
- 三步工作流体检、即时建议与合作表单
- Cloudflare Pages Function 转发咨询到飞书群机器人
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

接口还包含同源检查、实际请求体大小限制、蜜罐、最短填写时长和单实例频率限制，并校验飞书返回的业务状态码。频率限制属于无外部数据库的轻量防护；公开流量增大后，建议再配置 Cloudflare Turnstile 或平台级 Rate Limiting。

站内《个人信息处理说明》明确了收集字段、用途、飞书转发、默认保存期限与查询/更正/删除方式。正式运营时，应根据实际主体、联系方式与业务地区继续更新。

## GitHub + Cloudflare Pages 部署

1. 把本目录作为独立公开仓库推送到 GitHub。
2. 在 Cloudflare `Workers & Pages → Create application → Pages → Connect to Git` 中选择仓库。
3. 构建命令填写 `npm run build`，输出目录填写 `dist`，生产分支选择 `main`。
4. 配置 `FEISHU_WEBHOOK_URL` 后重新部署。
5. 首次部署会得到一个 `*.pages.dev` 地址；后续可选绑定海外域名。

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
```
