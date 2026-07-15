# 个人站故障与防错库

遇到相同症状时先按本库定位，不要立即发明新的绕过方式。每条都必须完成“修复”和“回归验证”；若根因不同，应新增记录而不是强套旧结论。

## 1. 视觉与响应式

### 装饰曲线压暗 CTA 或证据区

- 症状：按钮或卡片突然变暗，点击区视觉层级异常。
- 根因：带不透明背景的曲线图片越过自己的区域，且 z-index 高于内容。
- 修复：限制装饰图定位范围；为 hero、人物、CTA 和证据层设置明确 stacking order。
- 预防：每个装饰层都检查透明度、边界、pointer-events 和 z-index。
- 回归：桌面长截图、CTA 对比度和点击测试全部通过。

### 曲线穿过卡片正文

- 症状：线条压住工作流卡片标题/说明。
- 根因：曲线坐标按占位内容设计，真实文案密度更高。
- 修复：将曲线移动到信息层上方；窄屏直接禁用复杂曲线。
- 预防：装饰轨迹必须在真实文案接入后复验。
- 回归：1440 px 和 390 px 均无文字交叉。

### 中文标题出现单字或双字孤行

- 症状：标题最后一行只剩一两个汉字。
- 根因：字号、列宽、字重和文本 measure 不匹配。
- 修复：按断点调整字号、最大宽度或列比例，不靠插入大量硬换行。
- 预防：桌面和 390 px 都把中文孤行列为发布阻断项。
- 回归：hero、案例标题和 CTA 标题逐一截图检查。

### 明亮真实截图破坏暗色基调

- 症状：白底截图像“洞”一样跳出暗色页面。
- 根因：参考图使用暗色占位资产，真实证据亮度更高。
- 修复：使用克制的 brightness/contrast、边框和背景容器处理，不篡改证据内容。
- 预防：视觉参考与真实资产并行确认。
- 回归：截图仍清晰可辨，暗色区层级一致。

### CTA 看起来偏左或不在视觉中心

- 症状：CSS 几何居中但受周边内容影响，视觉重心偏移。
- 根因：容器、文字宽度或旁边装饰造成光学偏差。
- 修复：在完整区块中调整 CTA 容器和文字 measure。
- 预防：同时检查几何中心和整区光学中心。
- 回归：参考图/实现图同视口对照。

## 2. 浏览器与自动化 QA

### 首屏出现 favicon 404

- 症状：页面可见正常，但初始网络存在 404。
- 根因：index.html 未配置有效图标。
- 修复：使用已授权的真实资源作为 favicon 或加入专用图标。
- 预防：favicon 纳入“初始零错误”门禁。
- 回归：干净 profile 首次加载 HTTP ≥ 400 为 0。

### 图片被误判为加载失败

- 症状：naturalWidth 为 0，但手动滚动后图片正常。
- 根因：图片使用 loading=lazy，断言前尚未进入加载范围。
- 修复：先滚动目标元素进入视口，等待 load/decode，再检查自然尺寸。
- 预防：所有懒加载断言显式包含触发和等待。
- 回归：所有工作流图和案例图 naturalWidth > 0。

### Chrome 截图/持久化会话偶发失败

- 症状：浏览器启动失败、profile 被锁、截图无响应或状态污染。
- 根因：复用正在使用或损坏的持久化 profile。
- 修复：为该轮 QA 创建 E 盘唯一 profile，并只重试浏览器启动部分。
- 预防：工具放 E:\CodexTools\BrowserQA，profile 放 E:\CodexData\BrowserQA，证据放 E:\CodexQA。
- 回归：同一脚本在干净 profile 完整跑通。

### 新增第二个 dialog 后 locator 歧义

- 症状：自动化提示 strict mode violation 或点击到错误弹窗。
- 根因：使用全局 role/text 选择器，页面同时存在诊断和隐私 dialog。
- 修复：先定位具体 dialog，再在其作用域内查找按钮和字段。
- 预防：弹窗自动化选择器必须 scoped。
- 回归：隐私弹窗打开/关闭不破坏诊断弹窗状态。

## 3. 表单与 Pages Function

### 本地 Vite 提交 /api/contact 返回 404

- 症状：npm run dev 下表单网络 404。
- 根因：Vite 只提供前端，不执行 Cloudflare Pages Functions。
- 修复：UI 在本地显示受控预览状态；函数用 node test 或 wrangler pages dev 验证。
- 预防：区分“前端预览”“本地 Functions”“生产”三种环境。
- 回归：本地 UI 不崩溃，函数自动化测试全绿。

### 生产表单返回 503 contact_channel_not_configured

- 症状：页面与函数均可达，提交得到受控 503。
- 根因：Pages 项目未配置 FEISHU_WEBHOOK_URL。
- 修复：通过 Wrangler/Cloudflare Secret 交互式配置，然后强制创建一次新的生产 deployment 再实投。
- 预防：状态文档只写 configured/not configured；转化上线前必须真实接收确认。
- 回归：生产响应成功，飞书业务码为 0，目标群收到消息。

### 超大请求绕过 Content-Length

- 症状：客户端不发送或伪造 Content-Length，服务器仍读取超大正文。
- 根因：只信任 Header。
- 修复：读取正文后再用 TextEncoder 检查实际 UTF-8 字节数。
- 预防：Header 用于快速拒绝，实际字节数作为最终判断。
- 回归：Header 超限和实际正文超限测试均通过。

### 飞书 HTTP 200 但消息未送达

- 症状：fetch response.ok 为真，接收群没有消息。
- 根因：飞书以 HTTP 200 返回业务失败码。
- 修复：解析 JSON，兼容 code/StatusCode/status_code，并要求数值为 0。
- 预防：外部 API 一律区分传输状态和业务状态。
- 回归：模拟业务失败返回 502；真实成功有接收证据。

### 跨站浏览器请求或机器人请求进入接口

- 症状：异常来源、秒级自动提交或高频重复请求。
- 根因：缺少来源、媒体类型、时间、蜜罐或频率校验。
- 修复：对带 Origin/Referer 的浏览器请求校验同源，并组合 application/json、startedAt、hidden website、IP window。两种 Header 都缺失时当前代码会放行来源检查，所以该项不是非浏览器请求的鉴权边界。
- 预防：轻量防护不能承诺强安全；公开流量增大后加 Turnstile/平台 Rate Limiting。
- 回归：对应单测覆盖 403/415/400/429 路径。

## 4. CSP、安全头与资源

### CSP 阻止打包字体

- 症状：生产控制台报字体违反 CSP，页面回退字体。
- 根因：构建工具把字体内联为 data:，但 font-src 只允许 self。
- 修复：在确认字体来自本地构建后使用 font-src 'self' data:。
- 预防：CSP 不能只看配置文本，必须在生产 Chrome 实测。
- 回归：干净生产加载无 CSP 错误，字体正常。

### 安全头文件存在但生产未生效

- 症状：public/_headers 正确，实际响应缺少头。
- 根因：部署平台、路径规则、旧部署或缓存与预期不一致。
- 修复：核验当前 deployment 和实际响应；必要时重新构建部署。
- 预防：发布检查以生产 HTTP 响应为证据。
- 回归：CSP、HSTS、nosniff、Referrer-Policy 等均从稳定 URL 返回。

## 5. GitHub CLI 与 Git

### GitHub 登录没有可见设备码窗口

- 症状：Alt+Tab 找不到黑色窗口，也看不到一次性代码。
- 根因：登录进程在隐藏/分离会话中运行。
- 修复：使用附着进程捕获设备码或经受控剪贴板读取，主动在 Chrome 打开官方验证页。
- 预防：需要用户交互的登录不能放入不可见后台窗口。
- 回归：gh auth status 显示正确账号和 keyring。

### 无法提交或更新 GitHub Actions workflow

- 症状：普通代码可推送，workflow 文件被 GitHub 拒绝。
- 根因：OAuth token 缺 workflow scope。
- 修复：刷新授权，增加 workflow scope，再用 auth status 验证。
- 预防：项目含 .github/workflows 时，在首次推送前检查 scope。
- 回归：workflow commit 推送成功且 Actions 运行。

### git push connection reset

- 症状：提交完整，但 push 在传输阶段连接重置。
- 根因：部分网络链路的 HTTP/2 连接不稳定。
- 修复：先确认本地 commit 未丢失，再用 git -c http.version=HTTP/1.1 push origin main 重试。
- 预防：不要因网络错误重建仓库、重写提交或删除工作区。
- 回归：origin/main 指向目标 commit。

## 6. Cloudflare / Wrangler

### 默认 OAuth 权限过宽或登录困难

- 症状：授权页请求大量无关能力，或授权流程反复失败。
- 根因：默认 scope 超出 Pages 所需。
- 修复：Pages 使用最小权限，例如 account:read、user:read、pages:write，并使用 --use-keyring。
- 预防：按任务最小授权，不为了消除无关警告扩大权限。
- 回归：pages project/deploy 实际成功。

### Wrangler 凭据和缓存落到系统盘

- 症状：C 盘出现配置、npm cache 或浏览器数据。
- 根因：未设置 XDG/npm/Node 路径；另外 Wrangler 会把项目临时目录固定建在项目根目录的 .wrangler/tmp。
- 修复：统一通过 E:\CodexTools\Cloudflare\wrangler.cmd 设置环境，并把项目的 .wrangler 建成指向 E:\CodexData\Cloudflare\project-cache\<project>\.wrangler 的目录联接。
- 预防：程序、数据、缓存、QA 目录遵循 CURRENT_SITE_HANDOFF.md；系统凭据管理器是唯一允许的安全 OS 例外。
- 回归：联接目标在 E 盘；触发一次 pages functions build 后，tmp 也只出现在该 E 盘目标。

### OAuth 输出文件暂时读不到

- 症状：登录还在运行时日志被锁，普通读取失败。
- 根因：进程持有独占/不兼容文件句柄。
- 修复：使用允许 FileShare.ReadWrite 的读取方式，不重复启动多个登录流程。
- 预防：优先附着终端输出。
- 回归：单次登录完成且 whoami 成功。

### whoami 显示缺少非 Pages scope 警告

- 症状：身份可见但 Wrangler 提示部分权限不足。
- 根因：有意识使用最小 Pages 权限。
- 修复：用具体 pages project/list/deploy 命令验证能力；仅在实际操作被拒绝时增加必要 scope。
- 预防：不要把“零警告”当作比最小权限更高的目标。
- 回归：目标 Pages 操作成功。

### GitHub HEAD 与 Cloudflare 生产 commit 不同

- 症状：GitHub 最新提交晚于 deployment source。
- 根因：CLI 直传不会因 GitHub push 自动部署，或后续只是文档提交。
- 修复：判断差异是否影响 dist；影响生产资产则完成检查表并部署目标 commit，不影响则在交接文档明确记录。
- 预防：每次部署传 --commit-hash，分别记录 GitHub HEAD 与生产资产 commit。
- 回归：deployment list 和状态文档一致。

## 7. 文档、编码与环境

### PowerShell 读取中文 Markdown 乱码

- 症状：中文显示为问号或错码。
- 根因：Windows PowerShell 按旧默认编码读取 UTF-8 无 BOM。
- 修复：读取时显式使用 Get-Content -Encoding UTF8，并将控制台输出设为 UTF-8。
- 预防：文档统一 UTF-8；修改使用 apply_patch。
- 回归：终端和 GitHub 均正确显示。

### 文档与现实状态冲突

- 症状：手册写“已部署/已配置”，CLI 或生产结果不同。
- 根因：动态状态没有随发布更新，或把历史聊天当当前事实。
- 修复：按 docs/README.md 的事实源顺序只读核验，再更新 CURRENT_SITE_HANDOFF.md。
- 预防：每次生产发布把状态更新作为完成门禁。
- 回归：Git、GitHub、Cloudflare、生产 URL 和交接文档互相一致。

## 8. 新故障记录模板

~~~text
标题：
首次发现日期：
影响范围：
症状：
根因：
修复：
为什么这个修复安全：
预防规则：
自动化/人工回归证据：
关联 commit/deployment：
~~~
