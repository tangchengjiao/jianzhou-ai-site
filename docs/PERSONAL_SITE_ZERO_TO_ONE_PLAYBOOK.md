# 个人站从零到一运行手册

版本：1.0

最后复核：2026-07-15

适用对象：个人 IP、顾问、创作者、课程/服务提供者的展示与线索转化站。

## 1. 完成的定义

一个站点“能打开”不等于交付完成。本手册区分两个上线状态：

- 内容上线：页面、导航、诊断体验、隐私说明、测试、构建、CI、Cloudflare 部署和生产 Chrome 验收均通过。
- 转化上线：在内容上线基础上，生产 Secret 已配置，真实表单提交成功，接收端确实收到消息。

只有同时满足以下条件，才可以宣布对应状态完成：

1. 用户能快速理解“我是谁、帮助谁、解决什么、为什么可信、下一步做什么”。
2. 主转化路径唯一而清楚；本项目是“免费工作流体检 → 合作需求”。
3. 公开案例、人物、数据与素材真实、获授权或已匿名。
4. 选定视觉参考是实现的唯一视觉事实源。
5. 桌面和移动端均可读、可操作、无横向溢出。
6. 表单 Secret 只存在于服务端平台 Secret 或系统凭据管理器。
7. 自动化测试、生产构建、高危依赖审计和 GitHub CI 全绿。
8. 生产 URL 的初始加载没有未知控制台、页面、网络或 HTTP 错误。
9. 生产安全响应头真实生效。
10. 所有适用发布检查项有证据；不是“看起来没问题”。
11. 已记录可回滚的 Git commit 和上一个稳定部署。
12. 动态状态已写入 CURRENT_SITE_HANDOFF.md。

## 2. 阶段门规则

每个阶段都按“输入 → 动作 → Go 条件 → No-Go 条件 → 输出物”执行。No-Go 未解除时，不进入后续发布阶段。

## 3. 阶段 0：需求与边界

### 输入

至少收集以下信息；未知项可以标为“待补”，但不能用虚构内容代替：

- IP/品牌名称、真实身份表达和一句话定位。
- 核心受众及他们最常见的三个问题。
- 产品、服务、课程、合作方式和价格是否公开。
- 可展示的经历、案例、作品、方法论和证明。
- 唯一主 CTA 与次要 CTA。
- 联系方式和线索接收渠道。
- 域名、备案、访问地区和预算约束。
- 是否需要博客、搜索、支付、会员、预约、表单或 AI 对话。
- 人物照、Logo、截图、客户资料的授权边界。
- 需要收集哪些个人信息、保存多久、由谁处理。

### 动作

先写一句定位：

> 我是【身份】，帮助【目标用户】通过【方法/产品】解决【核心问题】，下一步可以【主 CTA】。

再把需求分为：

- V1 必须有：建立信任并跑通一个主要转化动作。
- V2 可以有：博客、内容 CMS、AI 对话、预约、邮件自动化。
- 暂不做：支付、会员、复杂后台、多智能体等会显著增加成本和合规面的功能。

本项目把 AI 自由对话放在 V2，V1 使用确定性三步诊断。原因是它可以先验证用户是否愿意互动和留下合作需求，同时避免 API Key、调用费用、提示注入、滥用与隐私风险。

### Go 条件

- 能用一句话说明身份、受众、价值和下一步。
- V1 范围明确。
- 备案约束被写成风险边界，不是绝对承诺。

### No-Go 条件

- 同时做内容站、商城、社区、会员和 AI 助手，却没有唯一主路径。
- 用“海外托管保证不用备案/保证大陆稳定访问”等绝对表述。
- 需要公开但尚未获授权的客户身份、个人信息或项目数据。

### 输出物

- 一页项目简报。
- V1/V2 清单。
- 素材与隐私清单。
- 唯一主 CTA。

## 4. 阶段 1：信息架构与信任链

### 动作

个人站首页按用户决策顺序组织，而不是按“我有什么”堆模块：

1. 首屏：身份、目标结果、方法、主 CTA。
2. 方法/流程：让能力可理解。
3. 交付物：让能力可观察。
4. 服务路径：让不同人知道哪条适合自己。
5. 案例：展示问题、过程、交付和边界。
6. 低门槛体验：让用户先获得价值。
7. 关于与信任：解释经历、原则和适合合作的人。
8. 转化：明确下一步、预期响应和隐私说明。

内容规则：

- 案例写实际做法和交付物，不写未经验证的增长数据。
- 不放假客户 Logo、假评价或“服务 1000+ 客户”等占位数字。
- 截图先脱敏；客户不可公开时使用匿名案例。
- 一个区块只承担一个主要沟通任务。
- 主 CTA 文案描述用户得到什么，避免只写“了解更多”。

### Go 条件

- 页面从“认识 → 理解 → 相信 → 体验 → 行动”自然推进。
- 所有事实可追溯。
- 每个受众都能找到对应路径。

### 输出物

- 页面大纲和最终文案。
- 资产映射表：每段内容对应哪张真实图片/截图。
- CTA 路径图。

## 5. 阶段 2：视觉方向与事实源

### 输入

- 用户明确认可的一张参考图，或经过选择后确认的一套视觉方案。
- 真实品牌资产与内容密度。

### 动作

1. 将最终参考图保存到仓库 design/。
2. 在 AGENTS.md 记录颜色、字体、密度、组件结构、允许差异和禁止风格。
3. 把参考图当作布局、层级、间距、颜色、排版、可见内容和组件结构的事实源。
4. 实现时使用真实素材，不为了“像参考图”伪造数据或证据。
5. 首轮完成后制作同视口对照，而不是靠记忆判断。

### Go 条件

- 只有一个明确的视觉事实源。
- 参考图路径和持久设计决策已写入 AGENTS.md。
- 桌面和移动端的重点结构已确定。

### No-Go 条件

- 同时混用多个互相冲突的风格参考。
- 在没有视觉事实源时进行大规模 UI 重写。
- 只追求装饰效果而牺牲阅读、证据和 CTA。

### 输出物

- design/selected-*.png。
- AGENTS.md 中的持久设计决策。
- 初始 QA 验收标准。

## 6. 阶段 3：技术与部署架构

### 本项目验证过的 V1 方案

| 层 | 选择 | 原因 |
| --- | --- | --- |
| 前端 | React + Vite | 组件化、启动快、静态构建简单 |
| 样式 | 原生 CSS + 响应式断点 | 没有额外 UI 框架包袱，便于精确还原 |
| 图标/字体 | Phosphor Icons + Noto Sans SC | 中文可读性与一致图标 |
| 后端 | Cloudflare Pages Functions | 仅为表单提供小型服务端边界 |
| 托管 | Cloudflare Pages | 海外静态托管、HTTPS、Pages Function |
| 源码与 CI | GitHub + GitHub Actions | 公开开源、install/test/build/audit 门禁 |
| 线索通知 | 飞书自定义机器人 Webhook | 与现有协作流程连接 |

### 关键架构决定

- 浏览器只请求同源 /api/contact，不接触飞书 Webhook。
- GitHub CI 和 Cloudflare CLI 直传是两条独立链路。
- 当前 Cloudflare 项目没有连接 Git Provider；GitHub push 不会自动部署。
- 生产发布必须明确记录 Git commit，并把该 commit 传给 Pages 部署。
- 海外托管通常不走中国大陆服务器 ICP 备案流程，但访问稳定性、业务资质、支付和个人信息处理仍需按实际业务评估。

### Windows 与 E 盘环境初始化

本项目的用户要求是：代码在 D 盘工作区，新增工具、缓存、登录数据和 QA 证据放 E 盘。先建立目录策略，再安装工具，避免安装后迁移凭据。

~~~text
E:\CodexTools\GitHubCLI       GitHub CLI 程序
E:\CodexData\GitHubCLI       GitHub CLI 配置
E:\CodexTools\BrowserQA      浏览器验收脚本和 Playwright Core
E:\CodexData\BrowserQA       独立 Chrome profiles
E:\CodexQA                   QA 截图与结构化结果
E:\CodexTools\Cloudflare     Wrangler 包装器与 keyring 依赖
E:\CodexData\Cloudflare      Cloudflare 配置/缓存
E:\CodexData\Cloudflare\project-cache\<project>\.wrangler  Wrangler 项目临时目录
E:\CodexData\npm-cache       npm 用户缓存
~~~

前置软件：

- Node.js 20+。
- Git。
- Google Chrome。
- PowerShell。

GitHub CLI 安装与登录：

1. 从 GitHub CLI 官方 release 下载 Windows ZIP，解压到 E:\CodexTools\GitHubCLI；不要把版本号写死在未来脚本中。
2. 确认 E:\CodexTools\GitHubCLI\bin\gh.exe --version 成功。
3. 将 GH_CONFIG_DIR 设置为 E:\CodexData\GitHubCLI。
4. 使用可见的附着终端执行官方设备登录，直接请求 workflow scope。

~~~powershell
[Environment]::SetEnvironmentVariable('GH_CONFIG_DIR', 'E:\CodexData\GitHubCLI', 'User')
$env:GH_CONFIG_DIR = 'E:\CodexData\GitHubCLI'
$gh = 'E:\CodexTools\GitHubCLI\bin\gh.exe'
& $gh auth login --hostname github.com --git-protocol https --web --clipboard --scopes workflow
& $gh auth setup-git
& $gh auth status
~~~

auth status 必须显示 keyring/系统凭据存储。若回退为纯文本 token 存储，停止并修复凭据管理，不要继续发布。

npm 用户缓存：

~~~powershell
[Environment]::SetEnvironmentVariable('npm_config_cache', 'E:\CodexData\npm-cache', 'User')
$env:npm_config_cache = 'E:\CodexData\npm-cache'
npm config get cache
~~~

不要在仓库 .npmrc 中把 cache 指向项目目录。

浏览器 QA：

~~~powershell
Set-Location 'E:\CodexTools\BrowserQA'
npm init -y
npm install playwright-core
~~~

使用本机 Chrome executable，profile 放 E:\CodexData\BrowserQA，截图/JSON 放 E:\CodexQA。浏览器程序本身可使用已安装的 Chrome；关键是不要把自动化 profile 和证据写回 C 盘。

Cloudflare：

1. 项目 devDependencies 安装 Wrangler。
2. 把 @napi-rs/keyring 安装到 E:\CodexTools\Cloudflare\npm-global。
3. 使用 E:\CodexTools\Cloudflare\wrangler.cmd 统一设置 XDG_CONFIG_HOME、XDG_CACHE_HOME、npm_config_cache、npm_config_prefix 和 NODE_PATH。
4. 执行 login --use-keyring，并只申请 Pages 所需的最小权限。

~~~powershell
$env:npm_config_prefix = 'E:\CodexTools\Cloudflare\npm-global'
$env:npm_config_cache = 'E:\CodexData\npm-cache'
npm install --global @napi-rs/keyring@1.3.0
& 'E:\CodexTools\Cloudflare\wrangler.cmd' login --use-keyring --scopes account:read user:read pages:write
& 'E:\CodexTools\Cloudflare\wrangler.cmd' whoami
~~~

wrapper 必须指向当前项目 node_modules 中的 wrangler；复制本项目 wrapper 到新项目时要先改项目绝对路径。安装后把实际版本、路径与凭据方式写入 CURRENT_SITE_HANDOFF.md。

XDG 变量不会改变 Wrangler 固定创建在项目根目录的 .wrangler/tmp。若用户要求持久工具数据全部位于 E 盘，应先确认 .wrangler 已被 .gitignore 排除，再把它做成指向 E 盘项目缓存的目录联接：

~~~powershell
$project = 'D:\path\to\project'
$storage = 'E:\CodexData\Cloudflare\project-cache\PROJECT_NAME\.wrangler'
New-Item -ItemType Directory -Path $storage -Force
New-Item -ItemType Junction -Path (Join-Path $project '.wrangler') -Target $storage
~~~

创建前如果项目内已存在 .wrangler，必须先验证它确实只含可丢弃的 Wrangler 临时文件，并确认解析后的绝对路径仍位于该项目内，再安全删除；不得对未知目录或已有联接执行递归删除。创建后用 pages functions build 做一次非生产检查，确认联接目标与 tmp 都在 E 盘。

### Go 条件

- 代码托管、构建、部署、表单和 Secret 边界明确。
- 能说明每个外部服务为什么存在。
- V1 没有不必要的运行成本与攻击面。
- 所有工具、缓存、浏览器 profile 和 QA 证据都落在用户允许的位置。

## 7. 阶段 4：初始化与前端实现

### 建议结构

~~~text
src/                    页面、组件与样式
public/assets/          经确认可发布的真实素材
public/_headers         Cloudflare 安全和缓存响应头
functions/api/          Pages Functions
tests/                  服务端接口自动化测试
design/                 视觉参考
docs/                   执行、发布、故障与交接文档
~~~

### 基础命令

~~~powershell
npm install
npm run dev
~~~

要求 Node.js 20+。项目代码可以位于工作盘；工具、缓存与 QA 数据遵循用户指定的 E 盘策略。

### 实现顺序

1. 先搭语义结构和真实文案。
2. 再实现桌面核心布局。
3. 接入真实图片并设置明确尺寸，减少布局跳动。
4. 实现移动导航、断点和触控区域。
5. 实现诊断、弹窗、复制、表单和错误状态。
6. 添加键盘焦点、减少动态效果与必要的 aria 属性。
7. 最后做装饰曲线、背景和微动效。

### Go 条件

- 主 CTA 可达，导航和弹窗可用。
- 1440 px 与 390 px 不横向溢出。
- 中文标题没有不自然的单字/双字孤行。
- 真实证据在暗色/亮色区都清晰可读。
- 装饰层不遮挡 CTA、人物、证据或文本。

## 8. 阶段 5：表单、Pages Function 与飞书

### 前端要求

- 只收集完成沟通所必需的信息。
- 必填项、错误提示和成功/受控失败状态清楚。
- 提交前有主动隐私同意。
- 隐私说明可从表单内打开，且不会破坏当前诊断状态。
- 隐藏蜜罐字段不影响真实用户。

### 服务端最低防护

- 只接受 POST 与 application/json。
- 当浏览器请求带有 Origin/Referer 时检查同源关系；两者均缺失的非浏览器请求不会被这一项拦截，因此它不能单独充当鉴权边界。
- 同时检查 Content-Length 和实际 UTF-8 请求体字节数。
- 拒绝 null、数组和无效 JSON；删除控制字符并把字段安全截断到允许长度。
- 检查最短/最长填写时间。
- 使用蜜罐拦截简单机器人。
- 做基础 IP 频率限制；流量增大后升级 Turnstile 或平台级 Rate Limiting。
- 只从 context.env 读取 FEISHU_WEBHOOK_URL。
- 飞书 HTTP 2xx 后仍解析 JSON，并要求业务码为 0。
- 响应不回显 Secret、Webhook 或用户完整数据。

### 本地变量

将 .dev.vars.example 复制为 .dev.vars，仅用于本机 Wrangler 测试；.dev.vars 必须被 .gitignore 排除。

### 生产 Secret

不要把真实值写入命令历史、聊天、日志或仓库。优先让操作者从剪贴板通过交互式标准输入传入：

~~~powershell
& 'E:\CodexTools\Cloudflare\wrangler.cmd' pages secret put FEISHU_WEBHOOK_URL --project-name jianzhou-ai-site
~~~

然后：

~~~powershell
& 'E:\CodexTools\Cloudflare\wrangler.cmd' pages secret list --project-name jianzhou-ai-site
~~~

列表只证明名称存在，不证明值有效。Cloudflare Pages Secret 必须在使用它的 deployment 之前设置，因此配置后必须创建一次新部署：

~~~powershell
$commit = git rev-parse HEAD
npm run build
& 'E:\CodexTools\Cloudflare\wrangler.cmd' pages deploy dist --project-name jianzhou-ai-site --branch main --commit-hash $commit --commit-message "Enable production contact secret"
~~~

新部署成功后，再做一次生产真实提交，并在飞书目标群确认收到消息。参考 Cloudflare Pages 官方 Bindings 文档：https://developers.cloudflare.com/pages/functions/bindings/。

### 状态解释

- 本地纯 Vite 对 /api/contact 返回 404：预期，因为 Vite 不运行 Pages Function；UI 可显示“预览状态”，但函数仍需单测/Wrangler 验证。
- 生产返回 503 contact_channel_not_configured：函数已到达但缺 Secret。它可以作为“内容上线”的受控状态，不能称为“转化上线”。

## 9. 阶段 6：安全、隐私与开源边界

### 必须完成

- public/_headers 至少包含 CSP、HSTS、nosniff、Referrer-Policy、frame 限制和权限策略。
- CSP 必须在生产浏览器中验证；构建后的字体可能需要 font-src 'self' data:。
- 联系表单页面提供真实的个人信息处理说明：字段、用途、接收方、保存期限、权利和联系方式。
- 代码许可证与品牌/人物/案例素材许可分开。
- 素材来源、授权状态和第三方依赖许可可追踪。
- 不得提交 .dev.vars、.env、token、Webhook、浏览器 profile、CLI 配置或凭据文件。

### 本项目边界

- 程序代码：MIT。
- 品牌、人物、案例与内容素材：保留权利。
- 详情见根目录 CONTENT_LICENSE.md、ASSET_SOURCES.md、THIRD_PARTY_NOTICES.md。

## 10. 阶段 7：本地质量门

在准备提交前执行：

~~~powershell
npm test
npm run build
npm audit --audit-level=high
git status --short
git diff --check
~~~

还要扫描敏感信息，但不要把搜索结果中的真实 Secret 输出到共享日志。检查名称、文件是否被跟踪即可：

~~~powershell
git ls-files
git status --ignored --short
~~~

### Go 条件

- 测试、构建和高危依赖审计全通过。
- Git diff 没有空白错误。
- 工作区只包含预期变更。
- Secret 文件没有被 Git 跟踪。

## 11. 阶段 8：Chrome 视觉与交互验收

### 必测视口

- 桌面：1440 × 1000。
- 移动：390 × 844。
- 如受众常用平板，再补 768 px。

### 初始加载

- console error = 0。
- page error = 0。
- failed request = 0。
- HTTP status ≥ 400 = 0。
- favicon、字体、图片和主 JS 均加载。

### 页面与交互

- 文档宽度等于视口宽度，无横向溢出。
- 滚动到懒加载图片后再断言 naturalWidth > 0。
- 桌面锚点导航、移动菜单和主 CTA 可用。
- Tab 第一目标合理，焦点环清晰。
- 三步诊断能生成确定性建议。
- 复制/继续、合作表单、同意框和结果状态完整。
- 隐私弹窗在桌面/移动端可读，无溢出；多个 dialog 的自动化选择器必须先限定作用域。
- prefers-reduced-motion 下没有强制复杂动画。

### 视觉对照

1. 用与参考图一致的语义视口截图。
2. 制作参考图/实现图并排或叠加对照。
3. 按 P0/P1/P2/P3 记录问题。
4. P0/P1/P2 清零后才允许发布；P3 可以记录为有意识差异。
5. 把最终结论写入 design-qa.md，QA 图片保存在 E:\CodexQA，不把大量临时证据塞进生产仓库。

### 浏览器稳定性

- 每轮关键 QA 使用 E 盘独立 Chrome profile。
- profile 被锁或污染时，新建唯一 profile 重试浏览器启动，不跳过验收。
- 自动化失败先判断是页面问题还是浏览器会话问题。

## 12. 阶段 9：GitHub 鉴权、建仓、推送与 CI

### 本机固定位置

~~~text
GitHub CLI 程序：E:\CodexTools\GitHubCLI
GitHub CLI 配置：E:\CodexData\GitHubCLI
~~~

PowerShell 会话：

~~~powershell
$env:GH_CONFIG_DIR = 'E:\CodexData\GitHubCLI'
$gh = 'E:\CodexTools\GitHubCLI\bin\gh.exe'
& $gh auth status
~~~

需要提交 GitHub Actions workflow 时，token 必须含 workflow scope。只检查 scope，不输出 token 值。

### 首次建仓

~~~powershell
git init -b main
git add .
git commit -m "Launch personal site"
& $gh repo create OWNER/REPO --public --source . --remote origin --push
~~~

若仓库已存在：

~~~powershell
git remote -v
git branch -vv
git push origin main
~~~

若网络连接 reset，先确认 commit 和 remote 没问题，再重试：

~~~powershell
git -c http.version=HTTP/1.1 push origin main
~~~

### 设备码登录防错

- 不要把登录进程放进用户看不到的隐藏窗口后等待。
- 使用附着的命令进程捕获设备码；需要时把验证页主动在 Chrome 打开。
- 设备码只能用于当次官方登录，不保存到仓库。
- 完成后立即执行 auth status，并确认账号、协议和 scope。

### CI 最低步骤

~~~text
npm ci
npm test
npm run build
npm audit --audit-level=high
~~~

CI 全绿且远端 commit 与本地预期一致，才能进入生产部署。

## 13. 阶段 10：Cloudflare 鉴权与部署

### 本机固定位置

~~~text
Wrangler 包装器：E:\CodexTools\Cloudflare\wrangler.cmd
Cloudflare 配置/缓存：E:\CodexData\Cloudflare
npm cache：E:\CodexData\npm-cache
~~~

包装器负责设置 XDG_CONFIG_HOME、XDG_CACHE_HOME、npm_config_cache、npm_config_prefix 和 NODE_PATH，避免工具数据回到系统盘或项目目录。凭据使用 Wrangler keyring/Windows Credential Manager。

### 鉴权原则

- Pages 操作使用最小 OAuth 权限，例如 account:read、user:read、pages:write。
- 使用 --use-keyring。
- whoami 出现某些非 Pages scope 警告时，以 Pages project create/deploy 的实际成功为准，不为了消除警告盲目扩大权限。

### 创建项目

~~~powershell
$wrangler = 'E:\CodexTools\Cloudflare\wrangler.cmd'
& $wrangler whoami
& $wrangler pages project create PROJECT_NAME --production-branch main
~~~

### 部署

先确保 HEAD 就是要部署的代码：

~~~powershell
git status --short
$commit = git rev-parse HEAD
npm test
npm run build
& $wrangler pages deploy dist --project-name PROJECT_NAME --branch main --commit-hash $commit --commit-message "Production release"
~~~

本项目也提供 E:\CodexTools\Cloudflare\deploy-jianzhou.cmd，但它只构建和部署；正式发布仍必须先完成测试、CI 和发布检查表。

### 部署后核验

~~~powershell
& $wrangler pages project list
& $wrangler pages deployment list --project-name PROJECT_NAME
~~~

确认：

- Production、main、commit hash 正确。
- 稳定 pages.dev URL 可访问。
- 记录 deployment ID 和上一稳定 deployment。
- GitHub HEAD 晚于生产 commit 时，要判断是否只是文档变更；不得把两个 commit 混写。

## 14. 阶段 11：生产验收与交付

部署后必须重新对生产 URL 执行阶段 8，不得用本地验收代替。

额外检查：

- HTTPS、安全响应头、CSP、缓存策略。
- 生产资源与目标 commit 相符。
- Pages Function 可达。
- 若声明“转化上线”，Secret 已配置，表单返回成功且飞书真实收到消息。
- README 的站点和仓库 URL 正确。
- design-qa.md、CURRENT_SITE_HANDOFF.md 与现实一致。

交付时报告：

- 生产 URL。
- GitHub URL。
- 发布 commit 和 Pages deployment ID。
- CI、测试、构建、Chrome QA、安全头与表单状态。
- 内容上线/转化上线属于哪一种。
- 已知限制和下一步。
- 回滚点。

## 15. 维护与回滚

### 普通变更

1. 只读核验当前状态。
2. 创建最小范围变更。
3. 运行本地质量门与相关 Chrome QA。
4. 提交并推送。
5. 等待 CI 全绿。
6. 部署目标 commit。
7. 做生产回归。
8. 更新 QA 和交接文档。

### 回滚触发条件

- 生产白屏、主 CTA 不可用、严重布局溢出。
- 安全头或 CSP 出现高风险回退。
- 表单泄露 Secret/个人信息或大量失败。
- 部署内容与目标 commit 不一致。

优先使用已记录的上一稳定 Git commit 重新构建并部署；回滚后仍要做最小生产验收并记录原因。

## 16. 新项目启动模板

复制以下内容并填充，不确定时写“待确认”：

~~~text
项目/品牌名：
一句话定位：
核心受众：
三个核心问题：
产品/服务：
唯一主 CTA：
次要 CTA：
真实经历与案例：
可发布素材及授权：
需要收集的信息：
线索接收渠道：
隐私主体与联系方式：
主要访问地区：
域名与备案约束：
V1 必须功能：
V2 候选功能：
禁止出现的表达/风格：
认可的视觉参考：
GitHub 账号/仓库：
Cloudflare 账号/项目名：
工具、缓存与 QA 数据路径：
~~~

## 17. 快速执行顺序

需求边界 → 信息架构 → 唯一视觉参考 → 技术方案 → 前端 → 表单函数 → 隐私与许可 → test/build/audit → 本地 Chrome QA → GitHub + CI → Cloudflare 部署 → 生产 Chrome QA → 表单实投 → 状态交接。

发布细节以 [PERSONAL_SITE_RELEASE_CHECKLIST.md](./PERSONAL_SITE_RELEASE_CHECKLIST.md) 为准；遇到异常先查 [PERSONAL_SITE_FAILURES_AND_FIXES.md](./PERSONAL_SITE_FAILURES_AND_FIXES.md)。
