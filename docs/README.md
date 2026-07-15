# 个人站交付文档入口

这套文档把“需求澄清 → 定位与内容 → 视觉实现 → 表单与安全 → GitHub → Cloudflare Pages → Chrome 生产验收 → 维护交接”固化成可重复执行的链路。它的目的不是承诺永远不出错，而是让错误在上线前被检查表和证据门禁发现。

最后复核：2026-07-15。

## 先按任务选文档

| 任务 | 开始前必读 | 完成后必须更新 |
| --- | --- | --- |
| 从零搭建新的个人站 | [零到一运行手册](./PERSONAL_SITE_ZERO_TO_ONE_PLAYBOOK.md) | 新项目的 README、AGENTS.md、状态交接文档 |
| 修改定位、页面、功能或架构 | [零到一运行手册](./PERSONAL_SITE_ZERO_TO_ONE_PLAYBOOK.md)对应阶段、[当前站点交接](./CURRENT_SITE_HANDOFF.md) | 相关代码、QA 证据、交接状态 |
| 视觉与响应式优化 | [AGENTS.md](../AGENTS.md)、[Design QA](../design-qa.md)、选定参考图 | design-qa.md |
| 发布或重新部署 | [发布检查表](./PERSONAL_SITE_RELEASE_CHECKLIST.md)、[当前站点交接](./CURRENT_SITE_HANDOFF.md) | 发布结论、commit、部署和 QA 记录 |
| 遇到登录、推送、构建、浏览器、CSP 或表单问题 | [故障与防错库](./PERSONAL_SITE_FAILURES_AND_FIXES.md) | 若出现新根因，补充故障库 |
| 接手当前项目 | [当前站点交接](./CURRENT_SITE_HANDOFF.md) | 只读核验后更新发生变化的状态 |

## 强制阅读顺序

未来 Codex 在规划、修改、测试、部署或维护本项目之前：

1. 先读仓库根目录的 [AGENTS.md](../AGENTS.md)。
2. 再读本页，并按上表选择对应文档。
3. 涉及视觉时，同时读取 [design-qa.md](../design-qa.md) 和 design/selected-workflow-lab-reference.png。
4. 涉及发布时，逐项完成发布检查表；任何适用的 No-Go 项都不能跳过。
5. 文档与现实冲突时，先只读核验 Git、GitHub、Cloudflare 和生产站点，再修正文档；不得凭旧聊天记录猜测。

## 事实源优先级

动态状态可能过期，判断当前事实时按以下顺序：

1. 当前 Git 工作区、GitHub API/CLI、Cloudflare CLI 和生产 URL 的只读结果。
2. [CURRENT_SITE_HANDOFF.md](./CURRENT_SITE_HANDOFF.md) 中带日期的状态。
3. [design-qa.md](../design-qa.md) 中已保存的验收证据。
4. 本手册中的通用方法与历史记录。
5. 聊天记录只作线索，不作最终事实。

## 现有证据与边界

- 线上站点：https://jianzhou-ai-site.pages.dev
- GitHub：https://github.com/tangchengjiao/jianzhou-ai-site
- 视觉与交互验收：[design-qa.md](../design-qa.md)
- 素材来源：[ASSET_SOURCES.md](../ASSET_SOURCES.md)
- 内容授权：[CONTENT_LICENSE.md](../CONTENT_LICENSE.md)
- 第三方许可：[THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md)

## 以后可以直接这样要求 Codex

> 先完整读取 AGENTS.md 和 docs/README.md，再根据我的任务读取对应运行手册。先只读核验当前状态，然后按阶段门执行；不得跳过发布检查表，不得提交或输出 Secret。完成后更新 QA 与 CURRENT_SITE_HANDOFF.md，并把验证结果和可回滚 commit 告诉我。

## 文档维护规则

- 通用方法写入零到一运行手册。
- 可勾选的发布门禁写入发布检查表。
- 真实新故障按“症状 → 根因 → 修复 → 预防 → 回归验证”写入故障库。
- URL、commit、Secret 配置状态、工具路径和待办只写入当前站点交接。
- 永远只记录 Secret 的“已配置/未配置”，不记录 Secret 值。
- 每次生产发布后同步更新 design-qa.md、发布记录和当前站点交接。
