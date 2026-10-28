# 见舟AI个人站当前交接状态

## 新版发布说明 · 2026-10-28

当前新版在独立分支 `release/personal-site-20261028` 的 `personal-site/`，正式入口 https://jianzhou-personal-site.pages.dev 。实际部署与生产验收看 `../personal-site/docs/HANDOFF.md`（从本文件实际相对路径为 `../personal-site`）。原 main 与根工程不改写，下文为旧版历史记录。新版没有远程咨询表单，不再以旧 FEISHU_WEBHOOK_URL 配置作为上线前提。

最后只读核验：2026-07-15 17:03（Asia/Shanghai）

注意：本文件只记录状态和路径，绝不保存 token、Webhook 或设备码。

## 1. 当前结论

| 项目 | 状态 |
| --- | --- |
| 内容上线 | 已完成 |
| 转化上线 | 未完成 |
| 阻塞项 | 生产 FEISHU_WEBHOOK_URL 尚未配置 |
| 受控现象 | 生产提交到达 Pages Function 后返回 503 contact_channel_not_configured |
| 下一步 | 用户把飞书机器人 Webhook 复制到剪贴板后，以交互方式写入 Cloudflare Secret，再做生产实投 |

不要把“受控 503”描述成完整转化链路已经上线。只有目标飞书群真实收到测试消息，才更新为“转化上线”。

## 2. 仓库与生产

| 项目 | 值 |
| --- | --- |
| 本地仓库 | D:\见舟AI项目产品\jianzhou-ai-site |
| GitHub | https://github.com/tangchengjiao/jianzhou-ai-site |
| 默认分支 | main |
| Cloudflare Pages 项目 | jianzhou-ai-site |
| 稳定生产 URL | https://jianzhou-ai-site.pages.dev |
| 部署模式 | Wrangler CLI 直接部署；未连接 Git Provider |
| 最近已验证的生产 QA commit | 55cdd72 Record production QA evidence |
| 当前 GitHub HEAD | 每次接手时执行 git rev-parse origin/main；不在本文件硬编码，以免文档提交形成自引用 |
| 生产资产 commit（核验时） | 5194fa1 Use E-drive user cache for local tooling |
| 当前生产 deployment ID | d0fa4eaf-838d-4c62-8dd1-e4d32320c191 |
| 上一稳定 deployment ID | ffd8dbcd-b040-460e-bcf5-5db093ebb9e4 |

最近已验证的生产 QA commit 比生产资产 commit 更新，是因为后续提交只更新文档/QA 证据，没有改变 dist。以后只要代码、public、functions、构建依赖或安全头变化，就必须重新完成发布检查并部署目标 commit。

## 3. 已验证技术栈

- React 19.2.0。
- Vite 6.4.3。
- Cloudflare Wrangler 4.110.0。
- GitHub CLI 2.96.0。
- Cloudflare Pages Functions：functions/api/contact.js。
- Node.js 要求：20+。
- CI：npm ci → npm test → npm run build → npm audit --audit-level=high。

## 4. 工具与数据路径

| 用途 | 固定位置 |
| --- | --- |
| GitHub CLI 程序 | E:\CodexTools\GitHubCLI |
| GitHub CLI 配置 | E:\CodexData\GitHubCLI |
| Browser QA 工具 | E:\CodexTools\BrowserQA |
| Chrome QA profile/data | E:\CodexData\BrowserQA |
| QA 截图与结构化证据 | E:\CodexQA |
| Cloudflare/Wrangler 工具 | E:\CodexTools\Cloudflare |
| Cloudflare 配置/缓存 | E:\CodexData\Cloudflare |
| Wrangler 项目临时目录 | E:\CodexData\Cloudflare\project-cache\jianzhou-ai-site\.wrangler |
| npm 用户 cache | E:\CodexData\npm-cache |

代码保留在 D 盘工作区。认证机密保存在 Cloudflare Secret 或 Windows Credential Manager；系统凭据管理器是经用户允许的安全 OS 例外。

不要重新在仓库创建 .npmrc 把 cache 指向项目目录。项目根目录的 .wrangler 当前是指向上述 E 盘项目缓存的目录联接，并被 .gitignore 排除；不要删除联接后改回普通 D 盘缓存目录。dist、node_modules、日志、.wrangler 和临时 QA 文件均不得提交。

## 5. 鉴权状态

- GitHub：账号 tangchengjiao，HTTPS，Windows keyring；已验证 scope 包含 repo 与 workflow。
- Cloudflare：Wrangler 使用最小 Pages 权限和 keyring；通过 E 盘包装器执行。
- 不得在输出中打印 GitHub token、Cloudflare 凭据或 FEISHU_WEBHOOK_URL。

每次执行前都要重新只读检查 auth status/whoami；本文件不保证会话永不过期。

## 6. 已通过的验证

- npm test：10 项 contact endpoint 测试通过。
- npm run build：通过，Vite 变换 4,571 个模块。
- GitHub Actions：截至 55cdd72 的 5 次 main CI 均成功。
- Chrome 生产验收：
  - 1440 px 与 390 px 无横向溢出。
  - 导航、移动菜单、键盘焦点、三步诊断、隐私说明通过。
  - 首次干净加载 console/page/network/HTTP 错误为 0。
  - 工作流与案例图片完成懒加载后自然尺寸有效。
  - 无待处理 P0/P1/P2 视觉问题。
- 安全：CSP 已允许打包 data 字体；HSTS、nosniff 等生产响应头已验证。
- 详细证据见 ../design-qa.md。

## 7. 当前必做项：完成转化上线

前提：用户在飞书目标群创建自定义机器人，将 Webhook 复制到系统剪贴板，不在聊天中粘贴。

执行：

~~~powershell
& 'E:\CodexTools\Cloudflare\wrangler.cmd' pages secret put FEISHU_WEBHOOK_URL --project-name jianzhou-ai-site
~~~

然后：

1. 用 secret list 只确认变量名存在。
2. 强制重新构建并创建一次新的生产 deployment；Secret 必须在使用它的 deployment 之前设置。
3. 在稳定生产 URL 完成一次真实、已同意隐私说明的测试提交。
4. 确认 HTTP 成功、飞书业务码为 0、目标群收到完整消息。
5. 确保测试消息不含真实敏感信息，或测试后按实际制度处理。
6. 更新本文件为“转化上线：已完成”并记录验证时间，不记录 Webhook 值。
7. 更新 design-qa.md 与对应发布检查记录。

## 8. 日常修改与发布

### 开始

~~~powershell
Set-Location 'D:\见舟AI项目产品\jianzhou-ai-site'
git status --short
git branch -vv
$env:GH_CONFIG_DIR = 'E:\CodexData\GitHubCLI'
& 'E:\CodexTools\GitHubCLI\bin\gh.exe' auth status
& 'E:\CodexTools\Cloudflare\wrangler.cmd' whoami
~~~

### 本地门禁

~~~powershell
npm test
npm run build
npm audit --audit-level=high
git diff --check
~~~

### 推送并等 CI

~~~powershell
git add <明确文件>
git commit -m "<准确说明>"
git push origin main
& 'E:\CodexTools\GitHubCLI\bin\gh.exe' run list --repo tangchengjiao/jianzhou-ai-site --limit 5
~~~

### 部署已通过的目标 commit

~~~powershell
$commit = git rev-parse HEAD
& 'E:\CodexTools\Cloudflare\wrangler.cmd' pages deploy dist --project-name jianzhou-ai-site --branch main --commit-hash $commit --commit-message "Production release"
& 'E:\CodexTools\Cloudflare\wrangler.cmd' pages deployment list --project-name jianzhou-ai-site
~~~

实际发布前必须完整完成 PERSONAL_SITE_RELEASE_CHECKLIST.md，不能只运行以上命令。

## 9. 接手者第一轮检查

- [ ] 完整读取 AGENTS.md 与 docs/README.md。
- [ ] git status、branch、log、remote 与本文件一致。
- [ ] GitHub auth、origin/main、最新 CI 真实可查。
- [ ] Cloudflare project/deployment list 与本文件一致。
- [ ] 项目 .wrangler 仍是指向 E 盘项目缓存的 Junction，触发构建时 tmp 没有实际写入 D 盘。
- [ ] 稳定生产 URL 可打开且初始加载无未知错误。
- [ ] 检查 FEISHU_WEBHOOK_URL 只确认名称/状态，不读取或输出值。
- [ ] 确认当前属于内容上线还是转化上线。
- [ ] 若发现状态变化，先更新本文件再执行新的生产变更。

## 10. 视觉不变量

- 唯一视觉事实源：../design/selected-workflow-lab-reference.png。
- 保持深海军蓝、信号青、暖琥珀、编辑式工作流轨道、明暗交替区块和单一主转化路径。
- 避免通用企业落地页、超大人物照、紫色 AI 渐变、玻璃拟态、假客户 Logo、未核验数据和装饰性 SaaS 仪表盘。
- 视觉变更同时读取 ../design-qa.md，并更新其证据。
