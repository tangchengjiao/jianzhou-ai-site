# 内容更新与素材对应

## 新增文章

在 `content/articles/` 新建一个英文小写 ID 文件，例如 `my-workflow.md`：

```markdown
---
id: "my-workflow"
title: "一篇清楚的标题"
summary: "一句说明读者能想清或完成什么。"
topic: "AI 工作方法"
format: "思考"
draft: true
state: "draft"
order: 20
exerciseTitles: []
---

## 为什么要讨论这个问题？

写清楚正文。

## 一个可以带走的判断

加入自己的依据与例子。
```

`topic` 使用现有主题：AI 工作方法、Skill 与 Agent、内容与表达、产品实践。`format` 是内容形式，与主题分开。

导读使用 `draft: false`、`state: "source-guide"` 和真实 `source` 地址，页面会标出导读，不假装已有全文。自主文章在本人定稿前保持 `draft: true`。不补写虚假的发布日期。

可选字段：

- `path`：关联学习路线 ID。
- `product`：关联产品 ID。
- `exerciseTitles`：正文中希望添加本地练习输入框的二级标题数组。

正文以二级标题分段，支持段落、列表、链接、加粗等 Markdown。只接入自有、已审核内容；不把外部网页原始 HTML 或未经许可的客户材料直接放入正文。

更新后运行：

```text
pnpm run check
pnpm run build
pnpm test
```

再在预览中核对标题、正文、原文入口与路线关联。

## 产品与素材

当前公开产品 ID：`guanbiao`、`lingshi`、`tanliu`、`zhihui`。用户已明确排除的产品不进入公开数据，也不保留在搜索、联系选项或学习路线里。

图片位于 `public/assets/`，在 `content/evidence.json` 中登记：

```json
{
  "产品ID": {
    "label": "真实演示或功能示意",
    "cover": "该产品的概览图ID",
    "title": "这组素材说明哪条工作路径",
    "intro": "说明素材来源与场景",
    "items": [
      {
        "id": "产品ID-overview",
        "src": "assets/产品ID-overview.png",
        "title": "一个具体工作环节",
        "description": "画面与说明一一对应",
        "caption": "产品、版本或来源时间及素材类型",
        "width": 1440,
        "height": 900
      }
    ]
  }
}
```

概览图同时服务目录卡片和详情页；其他图片按各自环节展示，可点击放大。统一的是外部排版，不重新绘制产品界面、替换真实文字或借用别款截图。

## 学习与课程

公开路线在 `content/learning-paths.json`。每一步用 `article` 或 `product` 引用现有对象，不能只改显示标题而让链接指到别的内容。

当前学习方案仍是提案，不是已开售课程。正式课程需要真实的对象、目标、交付、支持范围、时间、费用和报名方式；没确认时保持学习咨询，不套历史价格。

## 发布与本地构建的区别

`pnpm run build` 只写本地静态文件，不会上传 GitHub 或部署。当前输出默认 `noindex` 与禁止索引的 robots，避免把校对版本当正式站。

上线时需要明确正式域名、内容状态和部署目标，再按现有发布流程检查。不要仅删除 noindex 就认为已经完成生产验收。
