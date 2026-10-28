# 见舟个人站

基于已认可的浅色阅读原型，介绍见舟的 AI 应用实践、文章、实战学习和相关产品。日期：2026-10-28。

- 正式入口：https://jianzhou-personal-site.pages.dev
- 新版源码：https://github.com/tangchengjiao/jianzhou-ai-site/tree/release/personal-site-20261028/personal-site
- 本目录为新版，原仓库根目录旧版及历史保留。生产验证状态见 docs/HANDOFF.md。

## 当前预览

- 本地正式工程：<http://127.0.0.1:4200/>
- 四款产品：<http://127.0.0.1:4200/products/>
- 文章与思考：<http://127.0.0.1:4200/writing/>
- 单文件校对版：`E:/CodexData/JianzhouSite/formal-build-20261028/见舟个人站-本地校对版.html`。
- 原型 01.3 与 E 盘认可快照保持不变，仅作为比较基线。

日常预览可双击项目根目录的 `启动个人站预览.cmd`，或运行 `powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/start-preview.ps1`。启动器复用已运行的本站服务，否则以隐藏后台进程启动，不依赖临时聊天终端；日志与 PID 保存到 `E:/CodexData/JianzhouSite/preview-logs/`。电脑重启后需要重新启动，没有添加开机任务。

## 已实现

- 真实页面地址的静态 HTML：直接打开详情、刷新页面、关闭脚本都能读正文。
- 已认可的浅色阅读界面、人物融合、微信及四渠道二维码。
- 公开产品仅 **观标、领势、探流、智汇中枢**。按用户最新要求移除智眸，不删除其原项目。
- 四款产品分别对应素材。观标为授权演示、领势及智汇中枢为其产品资料截图、探流为明确标注的手册功能示意。
- 首批 12 条阅读内容：8 条已有教程导读及真实原文入口，4 篇经本人确认的实战笔记。
- 3 条公开学习路线、学习方案与联系分流。尚无确认中的在售课程，保留方案/咨询状态，不虚构价格或报名。
- 浏览器主题筛选、搜索、练习本地保存、路线进度、图片放大和复制联系提纲。
- 页面标题、描述、canonical、站点地图和 RSS。校对模式 noindex，正式构建允许索引；未定稿内容不进入正式产物。

## 开发命令

本机首次准备依赖：

```powershell
./scripts/setup-local-deps.ps1
```

本机依赖与浏览器检查工具位于 E 盘；`node_modules` 为指向 E 盘的目录联接。不要为了重装依赖递归删除该联接目标。其他机器可直接用标准 `pnpm install`，不要求复用本机目录联接。

```text
pnpm run check
pnpm run build
pnpm test
pnpm run preview
```

构建会生成 `dist/` 和 E 盘单文件校对版。预览默认只监听本机 `127.0.0.1:4200`，不是线上后台。正式构建使用实际分配域名，与本地预览分开。

正式发布准备：`pnpm run build:release --site-url https://实际分配的站点根域名`。它输出独立的 `dist-release/`，按正式域名生成 canonical、RSS、站点地图与允许索引的 robots；要求文章已经本人定稿，不会把待定稿文章直接变成正式文章，也不会上传网站。日常预览继续使用 `dist/` 与 noindex。

用户已选择在当前 Cloudflare 账户新建个人站，并保留旧 GitHub 仓库历史。旧记录中的 Pages 项目在当前账户查不到，不能当作部署目标直接复用。新项目已创建为 jianzhou-personal-site。正式构建使用 https://jianzhou-personal-site.pages.dev，Direct Upload 仅上传 dist-release/，生产验收另记于交接文档。

## 内容在哪里

| 内容 | 路径 |
| --- | --- |
| 文章/教程导读 | `content/articles/*.md` |
| 产品 | `content/products.json` |
| 产品素材及来源说明 | `content/evidence.json` |
| 学习路线 | `content/learning-paths.json` |
| 实战学习名称、价值描述与咨询按钮 | `content/learning-offer.json` |
| 个人工具 | `content/tools.json` |
| 品牌、联系、基础媒体 | `content/brand.json`、`content/media.json` |
| 页面模板与交互 | `src/app.js` |
| 浅色设计与响应式 | `src/site.css` |
| 构建与内容检查 | `scripts/` |

新增文章不需要改首页布局，详见 `docs/CONTENT_WORKFLOW.md`。构建前自动检查 ID、路线和素材关联；文章与路线引用的是同一份内容，不重复维护正文。

`scripts/bootstrap-from-approved.mjs` 是一次性迁移记录，**不要再次运行**。迁移后已加入新内容、素材和交互修正，重复导入会覆盖这些工作，脚本也会主动停止。

## 当前发布前待定事项

1. 后续教程是否迁入全文；当前保留准确导读与原文入口。
2. 本人正式职务、各产品贡献与对外称谓。
3. 当前真正开放的学习产品与交付、时间、费用、报名方式；未确定时保持学习咨询。
4. 各软件产品正式对外体验/申请入口；不使用内部账号公开试用。
5. 本次为独立新站，旧站不迁移或覆盖。未做全局跳转，不将旧案例随意转到另一款新产品。

## 检查与交接

- 自动化测试：`tests/site.test.mjs`。
- 浏览器结果：`E:/CodexQA/jianzhou-formal-site-20261028/`。
- 构建结果：`E:/CodexData/JianzhouSite/formal-build-20261028/build-report.json`。
- 当前状态：`docs/HANDOFF.md`。

发布前检查：内容检查、构建和 11 项测试通过；31 页、155 个页面/视口状态、37 项全站交互和 25 项学习咨询检查通过。16 项素材与源文件一致，8 篇飞书原文可匿名阅读。正式地址结果见 docs/HANDOFF.md。

仅构建时使用 LinkeDOM 与 Marked，访客页面不需要服务端运行它们。技术参考：[LinkeDOM](https://github.com/WebReflection/linkedom)、[Marked](https://marked.js.org/)、[pnpm 设置](https://pnpm.io/settings)。

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
