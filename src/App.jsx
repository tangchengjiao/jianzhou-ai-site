import { useMemo, useRef, useState } from "react";
import {
  Aperture,
  ArrowRight,
  Buildings,
  ChartLineUp,
  Check,
  CheckCircle,
  ClipboardText,
  Copy,
  FileText,
  FilmSlate,
  FolderOpen,
  ImageSquare,
  Lightbulb,
  List,
  NotePencil,
  PaperPlaneTilt,
  Stack,
  Target,
  User,
  UsersThree,
  X,
} from "@phosphor-icons/react";

const workflowSteps = [
  {
    key: "topic",
    title: "选题",
    eyebrow: "输入与判断",
    description: "从受众问题、行业变化和已有素材中，形成可持续的选题池。",
    image: "/assets/workflow/topic-matrix-template.png",
    width: 1832,
    height: 671,
    icon: Lightbulb,
    format: ".xlsx",
  },
  {
    key: "script",
    title: "脚本",
    eyebrow: "结构与表达",
    description: "把经验沉淀成稳定结构，让每一次表达都有清晰目标。",
    image: "/assets/workflow/script-trust-first-transcript.png",
    width: 993,
    height: 1404,
    icon: NotePencil,
    format: ".docx",
  },
  {
    key: "edit",
    title: "剪辑",
    eyebrow: "成片与包装",
    description: "把重复动作交给工作流，让人专注内容判断与审美。",
    image: "/assets/workflow/edit-codex-tutorial-timeline-contact.jpg",
    width: 1280,
    height: 540,
    icon: FilmSlate,
    format: ".mp4",
  },
  {
    key: "cover",
    title: "封面",
    eyebrow: "识别与点击",
    description: "从标题到版式形成统一规范，减少每次从零设计。",
    image: "/assets/workflow/cover-oral-video-editor-skill.png",
    width: 1920,
    height: 1080,
    icon: ImageSquare,
    format: ".png",
  },
  {
    key: "publish",
    title: "发布",
    eyebrow: "节奏与协同",
    description: "明确渠道、负责人和检查项，把内容稳定交付出去。",
    image: "/assets/workflow/publish-weekly-execution-plan.png",
    width: 1216,
    height: 651,
    icon: PaperPlaneTilt,
    format: ".xlsx",
  },
  {
    key: "review",
    title: "复盘",
    eyebrow: "反馈与迭代",
    description: "记录内容反馈与下一步动作，让经验进入下一轮生产。",
    image: "/assets/workflow/review-content-performance-sheet.png",
    width: 2216,
    height: 532,
    icon: ChartLineUp,
    format: ".xlsx",
  },
];

const audiencePaths = [
  {
    id: "creator",
    title: "个人创作者工作台",
    description: "一个人，也能拥有专业的内容生产线。",
    badge: "个人路径",
    icon: User,
    stages: ["选题洞察", "脚本成稿", "剪辑成片", "发布复盘"],
  },
  {
    id: "team",
    title: "内容团队与企业",
    description: "多人协作，把经验沉淀为团队资产。",
    badge: "团队路径",
    icon: Buildings,
    stages: ["内容规划", "标准生产", "多平台分发", "数据复盘"],
  },
];

const caseStages = [
  {
    number: "01",
    title: "访谈与诊断",
    subtitle: "把问题与目标说清楚",
    image: "/assets/cases/jianzhou-ai-feishu-knowledge-library.png",
    width: 1365,
    height: 1000,
    meta: "诊断报告（节选）",
    icon: ClipboardText,
  },
  {
    number: "02",
    title: "搭建工作流",
    subtitle: "确定流程与模板",
    image: "/assets/cases/content-workflow-chain-dark.png",
    width: 1600,
    height: 900,
    meta: "内容生产 SOP v1.0",
    icon: Stack,
  },
  {
    number: "03",
    title: "内容生产落地",
    subtitle: "验证真实任务",
    image: "/assets/cases/anonymous-video-output-strip.jpg",
    width: 1332,
    height: 762,
    meta: "成片与素材包",
    icon: FilmSlate,
  },
  {
    number: "04",
    title: "复盘与迭代",
    subtitle: "优化与沉淀",
    image: "/assets/cases/workflow-lab-dashboard-dark.png",
    width: 1600,
    height: 900,
    meta: "复盘与改进清单",
    icon: ChartLineUp,
  },
];

const diagnosisMap = {
  选题不稳定: {
    title: "先建立可持续的选题输入层",
    summary: "把受众问题、行业变化和已有素材放进同一套选题矩阵，先解决每次都从零开始的问题。",
    actions: ["整理过去30天被反复问到的问题", "建立3类固定选题来源", "为每条选题记录验证信号"],
  },
  脚本耗时: {
    title: "先固化你的高频脚本结构",
    summary: "与其追求一次生成完美，不如先把开头、论证、案例和行动建议沉淀成可复用结构。",
    actions: ["选出3条最满意的旧脚本", "拆出稳定的表达结构", "建立带边界条件的脚本 Skill"],
  },
  剪辑太慢: {
    title: "先拆掉剪辑里的重复动作",
    summary: "把粗剪、字幕、包装、导出和质检拆成标准步骤，再判断哪些可以交给自动化。",
    actions: ["记录一条视频的完整剪辑动作", "标记重复且规则明确的环节", "先自动化一个最耗时步骤"],
  },
  团队协作混乱: {
    title: "先统一团队交付标准",
    summary: "团队效率问题通常不是工具不够，而是输入、交付物和验收标准没有被说清楚。",
    actions: ["明确每个环节唯一负责人", "为交付物建立可视化模板", "把验收标准写进工作流"],
  },
  发布不连续: {
    title: "先建立一周可执行节奏",
    summary: "把内容生产改造成有库存、有检查点、有复盘日的节奏，而不是依赖临时灵感。",
    actions: ["确定每周最低发布频次", "建立内容库存看板", "设置固定复盘时间"],
  },
  复盘没方向: {
    title: "先定义能指导行动的反馈",
    summary: "少看一堆数字，多记录哪些内容信号会影响下一轮选题、表达和制作。",
    actions: ["只保留3个核心反馈指标", "记录评论与私信中的真实问题", "每周只确定一个优化动作"],
  },
};

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="见舟AI首页">
      <span className="brand-mark" aria-hidden="true"><Aperture weight="bold" /></span>
      <span>见舟AI</span>
    </a>
  );
}

function Header({ onOpenDiagnosis }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["案例", "#case"],
    ["服务与合作", "#paths"],
    ["免费体检", "#diagnosis"],
    ["内容", "#knowledge"],
    ["关于", "#about"],
  ];

  return (
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="主导航">
        {links.map(([label, href], index) => (
          <a className={index === 0 ? "active" : ""} href={href} key={href}>{label}</a>
        ))}
      </nav>
      <button className="header-cta" type="button" onClick={onOpenDiagnosis}>开始体检</button>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X /> : <List />}
      </button>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="移动端导航">
          {links.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <button type="button" onClick={() => { setMenuOpen(false); onOpenDiagnosis(); }}>免费做一次工作流体检</button>
        </nav>
      )}
    </header>
  );
}

function Hero({ onOpenDiagnosis }) {
  return (
    <section className="hero section-dark" id="top">
      <Header onOpenDiagnosis={onOpenDiagnosis} />
      <div className="hero-shell page-shell">
        <div className="hero-copy">
          <p className="eyebrow">JIANZHOU WORKFLOW LAB / METHOD 01</p>
          <h1>让你的内容工作流，<br />真正跑起来</h1>
          <p className="hero-description">把零散AI工具沉淀成可复用的流程、模板与Skill。</p>
          <div className="proof-row" aria-label="交付特点">
            {["可运行", "可复用", "可交付"].map((item) => (
              <span key={item}><CheckCircle weight="fill" />{item}</span>
            ))}
          </div>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={onOpenDiagnosis}>
              诊断我的工作流 <ArrowRight weight="bold" />
            </button>
            <a className="button button-secondary" href="#case">查看交付案例</a>
          </div>
        </div>

        <aside className="founder-note" id="about" aria-label="关于见舟">
          <img src="/assets/jianzhou-portrait.png" alt="见舟本人" width="2048" height="1077" fetchPriority="high" />
          <div>
            <strong>由见舟亲自搭建</strong>
            <span>内容工作流设计师</span>
            <span>AI服务与自动化实践者</span>
            <em>见舟</em>
          </div>
        </aside>

        <div className="workflow-visual" aria-label="选题到复盘的内容工作流">
          <img className="workflow-curve" src="/assets/hero-workflow-curve.png" alt="六步工作流路径" width="1440" height="520" decoding="async" />
          <div className="workflow-grid">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article className="workflow-step" key={step.key}>
                  <div className="workflow-step-title">
                    <Icon weight="duotone" />
                    <h2>{step.title}</h2>
                  </div>
                  <div className="workflow-thumb">
                    <img src={step.image} alt={`${step.title}环节真实交付物：${step.eyebrow}`} width={step.width} height={step.height} loading="lazy" decoding="async" />
                  </div>
                  <span className="workflow-eyebrow">{step.eyebrow}</span>
                  <p>{step.description}</p>
                  <small>{step.format}</small>
                </article>
              );
            })}
          </div>
        </div>

        <article className="knowledge-proof" id="knowledge">
          <div className="knowledge-image-wrap">
            <img src="/assets/cases/jianzhou-ai-feishu-knowledge-library.png" alt="见舟AI实战教程知识库文件夹截图" width="1365" height="1000" loading="lazy" decoding="async" />
          </div>
          <div className="knowledge-copy">
            <FolderOpen weight="duotone" aria-hidden="true" />
            <p className="eyebrow">REAL DELIVERABLE / 真实资产</p>
            <h2>基于真实交付<br />沉淀的知识库</h2>
            <ul>
              <li><CheckCircle weight="fill" />83篇AI实战教程</li>
              <li><CheckCircle weight="fill" />覆盖11类高频场景</li>
              <li><CheckCircle weight="fill" />可复用、可协作、可追溯</li>
            </ul>
            <p className="asset-note">图中为真实知识库界面，不代表平台官方背书。</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function Paths() {
  const stageIcons = [Target, FileText, FilmSlate, ChartLineUp];
  return (
    <section className="paths-section section-light" id="paths">
      <div className="page-shell">
        <div className="section-heading light-heading">
          <p className="eyebrow">TWO CLEAR PATHS</p>
          <h2>为不同角色，提供一条清晰的<span>起跑线。</span></h2>
          <p>个人用AI，先找任务；企业用AI，先找场景。</p>
        </div>
        <div className="path-grid">
          {audiencePaths.map((path) => {
            const PathIcon = path.icon;
            return (
              <article className="path-card" key={path.id}>
                <div className="path-card-heading">
                  <span className="path-icon"><PathIcon weight="duotone" /></span>
                  <div>
                    <h3>{path.title}</h3>
                    <p>{path.description}</p>
                  </div>
                  <small>{path.badge}</small>
                </div>
                <p className="path-label">典型任务路径</p>
                <ol className="path-stages">
                  {path.stages.map((stage, index) => {
                    const StageIcon = stageIcons[index];
                    return (
                      <li key={stage}>
                        <span><StageIcon weight="duotone" /></span>
                        <strong>{stage}</strong>
                        {index < path.stages.length - 1 && <ArrowRight aria-hidden="true" />}
                      </li>
                    );
                  })}
                </ol>
                <a href="#case">查看{path.id === "creator" ? "个人创作" : "团队协作"}案例 <ArrowRight /></a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section className="case-section section-dark" id="case">
      <div className="page-shell case-shell">
        <div className="case-intro">
          <p className="eyebrow">CASE STUDY</p>
          <span className="case-number">01</span>
          <h2>从一堆教培资料，<br />到一套能复用的内容生产<br />和诊断工作流</h2>
          <span className="anonymous-tag">匿名案例</span>
          <div className="case-summary">
            <h3>背景</h3>
            <p>资料分散在课程、产品说明和过往内容中，团队缺少统一的内容生产标准。</p>
            <h3>我们交付</h3>
            <p>内容生产Skill OS、多Skill编排工作流，以及AI学习力诊断智能体。</p>
          </div>
          <a href="#diagnosis">从我的场景开始 <ArrowRight /></a>
        </div>

        <div className="case-process">
          {caseStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <article className="case-stage" key={stage.number}>
                <div className="case-stage-heading">
                  <span>{stage.number}</span>
                  <div><h3>{stage.title}</h3><p>{stage.subtitle}</p></div>
                </div>
                <div className="case-stage-image">
                  <img src={stage.image} alt={`${stage.title}真实交付物示意`} width={stage.width} height={stage.height} loading="lazy" decoding="async" />
                </div>
                <small><Icon weight="duotone" />{stage.meta}</small>
              </article>
            );
          })}
          <div className="deliverables-row">
            <strong>交付物清单（部分）</strong>
            {["诊断报告", "内容生产SOP", "脚本与模板", "Skill文件", "复盘清单"].map((item) => (
              <span key={item}><FileText weight="duotone" />{item}</span>
            ))}
          </div>
          <p className="case-disclaimer">基于真实项目材料整理；客户身份与敏感业务信息已匿名处理。</p>
        </div>
      </div>
    </section>
  );
}

function DiagnosisSection({ onOpenDiagnosis }) {
  const steps = [
    ["01", "描述卡点", "告诉我你当前的内容阻碍与目标，预计3分钟。"],
    ["02", "获得诊断", "得到一条清晰的优先级和下一步建议。"],
    ["03", "选择下一步", "自行执行，或提交合作需求继续沟通。"],
  ];
  return (
    <section className="diagnosis-section section-dark" id="diagnosis">
      <div className="page-shell diagnosis-shell">
        <div className="section-heading centered-heading">
          <p className="eyebrow">FREE WORKFLOW CHECKUP</p>
          <h2>免费做一次工作流体检</h2>
          <p>三步获得你的专属诊断与建议</p>
        </div>
        <div className="diagnosis-steps">
          {steps.map(([number, title, description], index) => (
            <article key={number}>
              <span>{number}</span>
              <div className="diagnosis-step-line"><i /></div>
              <h3>{title}</h3>
              <p>{description}</p>
              <small>{index === 0 ? "预计3分钟" : index === 1 ? "即时生成" : "按需选择"}</small>
            </article>
          ))}
        </div>
        <button className="button button-primary diagnosis-button" type="button" onClick={onOpenDiagnosis}>
          免费做一次工作流体检 <ArrowRight weight="bold" />
        </button>
        <p className="diagnosis-promise">无需注册 · 不推销 · 只给可落地的下一步</p>
      </div>
    </section>
  );
}

function SiteFooter({ onOpenPrivacy }) {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-shell">
        <Brand />
        <p>先跑通一个真实场景，再谈一整套AI系统。</p>
        <div>
          <a href="#case">案例</a>
          <a href="#paths">服务与合作</a>
          <a href="#diagnosis">免费体检</a>
          <button className="footer-link" type="button" onClick={onOpenPrivacy}>个人信息处理说明</button>
        </div>
        <small>© 2026 见舟AI · 网站代码采用 MIT License，品牌与内容保留权利。</small>
      </div>
    </footer>
  );
}

function DiagnosisDialog({ dialogRef, onClose, onOpenPrivacy }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ role: "个人创作者", bottleneck: "选题不稳定", frequency: "每周1-2条", details: "", name: "", contact: "", website: "" });
  const startedAtRef = useRef(Date.now());
  const [copied, setCopied] = useState(false);
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const diagnosis = useMemo(() => diagnosisMap[form.bottleneck], [form.bottleneck]);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function copyDiagnosis() {
    const text = `见舟AI工作流体检\n当前卡点：${form.bottleneck}\n建议：${diagnosis.title}\n${diagnosis.summary}\n下一步：${diagnosis.actions.join("；")}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function submitContact(event) {
    event.preventDefault();
    setSubmitState("loading");
    setSubmitMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, diagnosis: diagnosis.title, source: "website-workflow-checkup", startedAt: startedAtRef.current }),
      });
      if (!response.ok) throw new Error("request-failed");
      setSubmitState("success");
      setSubmitMessage("已收到。见舟会基于你的场景判断是否适合继续沟通。");
    } catch {
      const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
      setSubmitState(isLocal ? "preview" : "error");
      setSubmitMessage(isLocal ? "本地预览已完成表单流程；部署并配置飞书 Webhook 后会正式发送。" : "暂时未能提交，请稍后重试，或先复制诊断结果留存。");
    }
  }

  function resetAndClose() {
    setStep(1);
    setSubmitState("idle");
    setSubmitMessage("");
    startedAtRef.current = Date.now();
    onClose();
  }

  return (
    <dialog className="diagnosis-dialog" ref={dialogRef} onClose={resetAndClose}>
      <div className="dialog-shell">
        <div className="dialog-header">
          <div>
            <p className="eyebrow">WORKFLOW CHECKUP / {String(step).padStart(2, "0")}</p>
            <h2>{step === 1 ? "先说清楚你的真实卡点" : step === 2 ? "你的第一优先级建议" : "把诊断变成下一步"}</h2>
          </div>
          <form method="dialog"><button type="submit" aria-label="关闭体检"><X /></button></form>
        </div>
        <div className="dialog-progress" aria-label={`体检进度：第${step}步，共3步`}>
          {[1, 2, 3].map((item) => <span className={item <= step ? "active" : ""} key={item} />)}
        </div>

        {step === 1 && (
          <form className="checkup-form" onSubmit={(event) => { event.preventDefault(); setStep(2); }}>
            <label>
              <span>你现在的角色</span>
              <select name="role" value={form.role} onChange={updateField}>
                <option>个人创作者</option><option>内容团队负责人</option><option>企业经营者</option><option>服务商 / 顾问</option>
              </select>
            </label>
            <fieldset>
              <legend>当前最影响效率的一件事</legend>
              <div className="choice-grid">
                {Object.keys(diagnosisMap).map((item) => (
                  <label className={form.bottleneck === item ? "selected" : ""} key={item}>
                    <input type="radio" name="bottleneck" value={item} checked={form.bottleneck === item} onChange={updateField} />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label>
              <span>当前内容产出频率</span>
              <select name="frequency" value={form.frequency} onChange={updateField}>
                <option>还没稳定开始</option><option>每周1-2条</option><option>每周3-5条</option><option>基本日更</option><option>团队多账号生产</option>
              </select>
            </label>
            <label>
              <span>补充说明（可选）</span>
              <textarea name="details" value={form.details} onChange={updateField} placeholder="例如：团队有3个人，但脚本、剪辑和发布都在等我确认……" rows="3" />
            </label>
            <button className="button button-primary form-submit" type="submit">生成我的诊断 <ArrowRight /></button>
          </form>
        )}

        {step === 2 && (
          <div className="diagnosis-result">
            <span className="result-icon"><Target weight="duotone" /></span>
            <p className="result-label">你的第一优先级</p>
            <h3>{diagnosis.title}</h3>
            <p>{diagnosis.summary}</p>
            <ol>
              {diagnosis.actions.map((action, index) => <li key={action}><span>{String(index + 1).padStart(2, "0")}</span>{action}</li>)}
            </ol>
            <div className="result-actions">
              <button className="button button-secondary" type="button" onClick={() => setStep(1)}>返回修改</button>
              <button className="button button-secondary" type="button" onClick={copyDiagnosis}>{copied ? <Check /> : <Copy />}{copied ? "已复制" : "复制结果"}</button>
              <button className="button button-primary" type="button" onClick={() => { startedAtRef.current = Date.now(); setStep(3); }}>继续下一步 <ArrowRight /></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form className="contact-form" onSubmit={submitContact}>
            <div className="contact-intro">
              <p>你可以先拿走诊断自行执行。如果希望一起跑通这个场景，留下一个方便联系的方式。</p>
              <strong>不承诺玄学结果，只讨论真实任务、资料和边界。</strong>
            </div>
            <div className="contact-grid">
              <label><span>怎么称呼你</span><input required name="name" value={form.name} onChange={updateField} placeholder="你的名字" /></label>
              <label><span>联系方式</span><input required name="contact" value={form.contact} onChange={updateField} placeholder="微信号 / 邮箱 / 手机号" /></label>
            </div>
            <label className="honeypot" aria-hidden="true"><span>网站</span><input name="website" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" /></label>
            <label className="consent-row">
              <input required type="checkbox" />
              <span>我已阅读并同意<button className="privacy-inline" type="button" onClick={onOpenPrivacy}>《个人信息处理说明》</button>，信息仅用于本次诊断与合作联系。</span>
            </label>
            <div className="submit-row">
              <button className="button button-secondary" type="button" onClick={() => setStep(2)}>返回诊断</button>
              <button className="button button-primary" type="submit" disabled={submitState === "loading"}>
                {submitState === "loading" ? "正在提交…" : "提交合作需求"} <ArrowRight />
              </button>
            </div>
            {submitMessage && <p className={`submit-message ${submitState}`}>{submitMessage}</p>}
          </form>
        )}
      </div>
    </dialog>
  );
}

function PrivacyDialog({ dialogRef, onClose }) {
  return (
    <dialog className="privacy-dialog" ref={dialogRef} onClose={onClose}>
      <article className="privacy-shell">
        <header>
          <div>
            <p className="eyebrow">PRIVACY / UPDATED 2026-07-15</p>
            <h2>个人信息处理说明</h2>
          </div>
          <form method="dialog"><button type="submit" aria-label="关闭个人信息处理说明"><X /></button></form>
        </header>
        <p className="privacy-lead">你可以只使用免费体检而不留下联系方式。仅当你主动提交合作需求时，见舟AI才会处理以下信息。</p>
        <div className="privacy-grid">
          <section><h3>收集什么</h3><p>称呼、微信号/邮箱/手机号，以及你填写的角色、内容卡点、产出频率和补充说明。</p></section>
          <section><h3>为什么使用</h3><p>生成并回看本次工作流诊断、判断是否适合进一步沟通、回复合作咨询；不会出售，也不会用于公开展示。</p></section>
          <section><h3>如何传输</h3><p>网站由 Cloudflare Pages 承载，表单经服务端转发到见舟AI使用的飞书群机器人。相关平台可能按其规则处理必要的网络与安全日志。</p></section>
          <section><h3>保存多久</h3><p>未形成合作的信息默认不超过 180 天；形成合作或依法需要留存的，按实际项目与法定义务保存，到期后删除或匿名化。</p></section>
          <section><h3>你的选择</h3><p>你可以请求查询、更正或删除。可再次通过合作表单提交“个人信息请求”，并使用原联系方式完成身份核验。</p></section>
          <section><h3>安全措施</h3><p>Webhook 仅在服务端读取；接口包含字段校验、蜜罐、填写时长与频率限制。互联网传输无法保证绝对安全，请勿提交身份证件或敏感资料。</p></section>
        </div>
        <button className="button button-primary privacy-confirm" type="button" onClick={() => dialogRef.current?.close()}>我知道了</button>
      </article>
    </dialog>
  );
}

export function App() {
  const dialogRef = useRef(null);
  const privacyDialogRef = useRef(null);

  function openDiagnosis() {
    if (dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }

  function closeDiagnosis() {
    if (dialogRef.current?.open) dialogRef.current.close();
  }

  function openPrivacy() {
    if (privacyDialogRef.current && !privacyDialogRef.current.open) privacyDialogRef.current.showModal();
  }

  function closePrivacy() {
    if (privacyDialogRef.current?.open) privacyDialogRef.current.close();
  }

  return (
    <>
      <Hero onOpenDiagnosis={openDiagnosis} />
      <Paths />
      <CaseStudy />
      <DiagnosisSection onOpenDiagnosis={openDiagnosis} />
      <SiteFooter onOpenPrivacy={openPrivacy} />
      <DiagnosisDialog dialogRef={dialogRef} onClose={closeDiagnosis} onOpenPrivacy={openPrivacy} />
      <PrivacyDialog dialogRef={privacyDialogRef} onClose={closePrivacy} />
    </>
  );
}
