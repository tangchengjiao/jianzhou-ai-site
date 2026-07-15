# Mandatory Personal-Site Runbook

Before planning, changing, testing, deploying, or maintaining this personal site, read docs/README.md completely and follow its task routing.

- For planning, architecture, implementation, or major changes, read docs/PERSONAL_SITE_ZERO_TO_ONE_PLAYBOOK.md.
- For every release or production deployment, complete docs/PERSONAL_SITE_RELEASE_CHECKLIST.md.
- Before changing infrastructure or assuming current state, read and verify docs/CURRENT_SITE_HANDOFF.md.
- For errors, authentication issues, visual regressions, API failures, or deployment failures, check docs/PERSONAL_SITE_FAILURES_AND_FIXES.md before inventing a workaround.
- For visual work, also read design-qa.md and use design/selected-workflow-lab-reference.png as the source of truth.

Do not deploy or declare completion until every applicable release gate has evidence. Distinguish "content live" from "conversion live"; never claim lead collection is live until a real production submission reaches the configured destination.

Never commit, print, or place secrets in chat, screenshots, logs, or source. Preserve the documented E-drive tool/data policy. When documents and reality differ, verify Git, GitHub, Cloudflare, and the production URL read-only before updating the documents.

After every production release, update design-qa.md, docs/CURRENT_SITE_HANDOFF.md, and any affected failure-prevention rule.

# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable Design Decision

- Selected visual direction: the dark navy “见舟工作流实验室 / Workflow Lab” mock saved at `design/selected-workflow-lab-reference.png`.
- Preserve its deep navy, signal-cyan, warm-amber palette; editorial workflow rail; alternating dark/light sections; compact real-project evidence; and a single primary conversion path into the free workflow diagnostic.
- Avoid generic corporate landing-page sections, oversized portrait photography, purple AI gradients, glassmorphism, fake client logos, unverified performance metrics, and decorative SaaS dashboard chrome.
