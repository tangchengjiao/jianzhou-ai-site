# 个人站发布检查表

使用方式：每次生产发布复制一份本表到发布记录，逐项填写证据。任何适用项未通过均为 No-Go；不得用“应该没问题”代替验证。

发布类型：

- [ ] 内容上线
- [ ] 转化上线

~~~text
检查日期：
执行人/Codex 任务：
目标分支：
目标 commit：
上一稳定 commit：
Cloudflare 项目：
生产 URL：
上一稳定 deployment ID：
~~~

## A. 范围、内容与授权

- [ ] 本次变更范围明确，工作区没有用户的无关改动被覆盖。
- [ ] “我是谁、帮助谁、解决什么、下一步是什么”仍然清楚。
- [ ] 唯一主 CTA 没有被新增功能稀释。
- [ ] 案例、数字、经历和评价可验证，不含虚假占位内容。
- [ ] 客户身份、人物、截图和个人信息已经授权或匿名/脱敏。
- [ ] ASSET_SOURCES.md、CONTENT_LICENSE.md、THIRD_PARTY_NOTICES.md 与本次新增内容一致。
- [ ] 中国大陆备案、可访问性、支付或经营资质没有被写成不准确的绝对承诺。

证据/备注：

~~~text

~~~

## B. 代码、Secret 与依赖

- [ ] Node.js 版本满足 package.json 的 engines。
- [ ] .dev.vars、.env、token、Webhook、CLI 凭据、浏览器 profile 均未被 Git 跟踪。
- [ ] 前端包中没有 Secret、Webhook 或服务端凭据。
- [ ] git status --short 只显示预期变更。
- [ ] git diff --check 通过。
- [ ] npm test 通过。
- [ ] npm run build 通过。
- [ ] npm audit --audit-level=high 通过，或高危项有经过确认的处置记录。
- [ ] dist 来自当前目标 commit 的干净构建。

证据：

~~~text
test：
build：
audit：
git status：
~~~

## C. 表单、函数、隐私与反滥用

- [ ] 表单字段为完成沟通所必需。
- [ ] 主动隐私同意存在，隐私说明可打开且内容与实际处理一致。
- [ ] Pages Function 只接受允许的方法和 JSON media type。
- [ ] 带 Origin/Referer 的浏览器请求同源检查通过；已确认缺少这些 Header 的非浏览器请求仍依靠其他校验/限流。
- [ ] Header 与实际 UTF-8 请求体字节限制都经过测试。
- [ ] null、数组和无效 JSON 被拒绝；超长字段被截断，控制字符被删除。
- [ ] 蜜罐、填写时长和基础频率限制有效。
- [ ] 飞书 HTTP 状态和业务码都被校验。
- [ ] 失败响应不泄露 Secret 或完整用户数据。
- [ ] 若只发布内容，未配置 Secret 的生产 503 被明确记录为受控限制。
- [ ] 配置/更新 FEISHU_WEBHOOK_URL 后已经创建新的生产 deployment。
- [ ] 若声明转化上线，FEISHU_WEBHOOK_URL 名称存在、生产提交成功且目标群真实收到消息。

证据：

~~~text
接口测试：
Secret 状态（只写 configured/not configured）：
生产提交 HTTP/业务结果：
飞书接收确认：
~~~

## D. 本地 Chrome 视觉与交互

- [ ] 使用当前选定参考图做同视口对照。
- [ ] 1440 × 1000：无横向溢出。
- [ ] 390 × 844：无横向溢出。
- [ ] 中文标题没有单字/双字孤行。
- [ ] 装饰曲线、背景和动效没有遮挡 CTA、人物、证据或正文。
- [ ] 懒加载图片已先滚动触发，再确认 naturalWidth > 0。
- [ ] 初始 console error = 0。
- [ ] 初始 page error = 0。
- [ ] 初始 failed request = 0。
- [ ] 初始 HTTP ≥ 400 = 0。
- [ ] 桌面导航和锚点通过。
- [ ] 移动菜单在视口内可读、可关闭。
- [ ] 键盘 Tab 顺序合理，焦点环清楚。
- [ ] 三步诊断、复制/继续、表单和同意框通过。
- [ ] 隐私弹窗在桌面与移动端可读且不溢出。
- [ ] prefers-reduced-motion 行为可接受。
- [ ] 没有待处理 P0/P1/P2 视觉问题；P3 已记录。

证据：

~~~text
QA 目录：
结构化结果：
design-qa.md 更新：
~~~

## E. GitHub

- [ ] GH_CONFIG_DIR 指向 E:\CodexData\GitHubCLI。
- [ ] gh auth status 显示正确账号；未输出 token 值。
- [ ] 若变更 .github/workflows，OAuth scope 含 workflow。
- [ ] origin、main 和目标仓库正确。
- [ ] 本地目标 commit 已推送到 origin/main。
- [ ] GitHub Actions 的 npm ci、test、build、audit 全绿。
- [ ] GitHub 显示的目标 commit 与待部署 commit 一致。

证据：

~~~text
仓库：
GitHub run URL/ID：
CI 结论：
~~~

## F. Cloudflare Pages

- [ ] Wrangler 使用 E:\CodexTools\Cloudflare\wrangler.cmd。
- [ ] 配置/缓存指向 E:\CodexData\Cloudflare，npm cache 指向 E:\CodexData\npm-cache。
- [ ] whoami/实际 Pages 命令确认当前账号有最小必要权限。
- [ ] Pages 项目名、生产分支和稳定 URL 正确。
- [ ] 部署命令明确传入 branch main 和目标 commit hash。
- [ ] deployment list 显示 Production、main、目标 commit 与 Success。
- [ ] 已记录新 deployment ID 和上一稳定 deployment ID。
- [ ] GitHub HEAD 若晚于生产资产 commit，差异原因已明确记录。

证据：

~~~text
项目：
deployment ID：
deployment URL：
生产资产 commit：
~~~

## G. 生产 URL 回归

- [ ] HTTPS 与稳定 pages.dev URL 正常。
- [ ] CSP 实际生效且不阻止 JS、字体、图片或 API。
- [ ] HSTS、nosniff、Referrer-Policy、frame/permissions policy 等响应头正确。
- [ ] 生产首屏初始错误四项均为 0。
- [ ] 生产桌面与移动端无横向溢出。
- [ ] 生产导航、菜单、诊断、隐私和 CTA 通过。
- [ ] Pages Function 的实际状态符合“内容上线/转化上线”的声明。
- [ ] README、design-qa.md 与 CURRENT_SITE_HANDOFF.md 已更新。

## H. Go / No-Go

~~~text
结论：GO / NO-GO
内容上线：YES / NO
转化上线：YES / NO
未通过项：
已知限制：
回滚 commit：
回滚 deployment ID：
复核时间：
~~~

只有所有适用项通过且结论为 GO，才可以向用户宣布上线完成。
