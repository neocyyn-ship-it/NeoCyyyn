import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Download, Mail, Phone, Play } from "lucide-react";

type ProjectId = "documentary" | "bilibili" | "bayer";

type Project = {
  id: ProjectId;
  title: string;
  subtitle: string;
  role: string;
  summary: string;
  highlight: string;
  accent: string;
  coverType: "image" | "generated";
  cover?: string;
  tags: string[];
  situation: string;
  action: string;
  result: string;
  detailIntro: string;
  detailPoints: string[];
};

type TimelineItem = {
  date: string;
  title: string;
  desc: string;
};

type StatItem = { label: string; value: string; color: string };
type OpsMetric = { label: string; value: string; note: string; tone: string };
type BreakoutMetric = { label: string; value: string; note: string };
type OpsInsight = { title: string; detail: string };
type VisualItem = { title: string; desc: string; src: string };
type ExperienceItem = { title: string; desc: string };

const documentaryCover = "/assets/documentary-cover.jpg";

const palette = {
  bg: "#F3F6F3",
  panel: "#FFFFFF",
  text: "#243128",
  textSoft: "#5E6B61",
  line: "#DCE7DE",
  blue: "#4E90F5",
  sky: "#9EBEED",
  apple: "#94C000",
  moss: "#4B6B03",
  teal: "#1C9AA0",
};

const projects: Project[] = [
  {
    id: "documentary",
    title: "纪录片《视界之外》",
    subtitle: "Documentary Project",
    role: "编导 / 摄像 / 项目负责人",
    summary: "毕业设计纪录片项目，围绕视障女性创业者展开长期跟拍与内容组织。",
    highlight: "15 分钟成片 / EKA 天物创意奖二等奖",
    accent: "linear-gradient(135deg, #EAF4FB 0%, #9EBEED 55%, #4E90F5 100%)",
    coverType: "image",
    cover: documentaryCover,
    tags: ["纪录片", "长期拍摄", "人物叙事"],
    situation: "毕业设计需要完成一部具备社会观察价值的纪录片作品，我选择了视障女性创业者作为核心人物。",
    action: "负责选题判断、采访沟通、拍摄执行与后期结构梳理，持续推进人物关系和叙事线索。",
    result: "完成 15 分钟成片，并获得 2025 EKA 天物创意奖二等奖。",
    detailIntro: "这个项目更能体现我在长期内容项目里的判断力，不只是拍得到，而是能持续把人和事讲完整。",
    detailPoints: [
      "前期靠大量沟通建立人物信任，再决定进入拍摄。",
      "拍摄周期横跨较长时间，需要持续维护叙事线的连贯性。",
      "后期重点放在人物行动逻辑和情绪推进，而不是信息堆砌。"
    ]
  },
  {
    id: "bilibili",
    title: "《大反派》B 站宣发运营",
    subtitle: "Bilibili Campaign",
    role: "内容策划 / 文案撰写 / 平台运营",
    summary: "围绕电影《大反派》上映窗口完成 B 站内容发布、标题优化与数据复盘。",
    highlight: "累计播放 98.7 万 / 4 条视频破 10 万",
    accent: "linear-gradient(135deg, #EEF6DD 0%, #94C000 55%, #4B6B03 100%)",
    coverType: "generated",
    tags: ["影视宣发", "B 站运营", "内容复盘"],
    situation: "电影上映期需要在 B 站持续输出短视频内容，提升讨论度、拉动播放，并尽可能承接角色与剧情热度。",
    action: "我负责整理宣发素材、撰写标题与文案、按上映节奏安排发布，并根据后台反馈不断优化表达方向。",
    result: "最终跑出近 100 万累计播放、4 条 10 万+ 内容、1 条 30 万级爆款，并形成可复用的运营复盘。",
    detailIntro: "这是一个很适合放进作品集的运营案例，因为它既有明确窗口期，也有清楚的数据反馈，能把内容判断和执行能力一起讲明白。",
    detailPoints: [
      "标题重点往角色反差、冲突感和情绪金句靠，让用户先被一句话钩住。",
      "内容策略上用高播放稿件负责破圈，用高互动稿件负责放大讨论。",
      "复盘中能清晰看到什么样的切口适合 B 站影视宣发场景。"
    ]
  },
  {
    id: "bayer",
    title: "拜耳 724 传播策划",
    subtitle: "PR Strategy Case",
    role: "项目负责人 / 策略梳理 / 提案表达",
    summary: "面向大学生公共关系策划创业大赛的传播方案项目，围绕 724 国际自我保健日进行整合传播设计。",
    highlight: "公关策划创业大赛三等奖",
    accent: "linear-gradient(135deg, #F3F6F3 0%, #9EBEED 55%, #94C000 100%)",
    coverType: "generated",
    tags: ["传播策划", "提案表达", "品牌项目"],
    situation: "比赛要求围绕品牌议题提出针对年轻人的传播方案，既要有策略逻辑，也要能落地执行。",
    action: "完成受众洞察、传播策略、提案结构与视觉表达设计，并输出完整项目方案和展示材料。",
    result: "形成线上线下联动传播方案，并获得中国大学生公共关系策划创业大赛三等奖。",
    detailIntro: "这个案例更偏策略和表达力，能说明我不只是做内容，也能把复杂信息组织成一套可汇报的方案。",
    detailPoints: [
      "先把受众、议题和传播路径梳理清楚，再进入创意表达。",
      "提案结构围绕问题、洞察、策略、执行与效果预估展开。",
      "最终方案兼顾可执行性和展示感，适合比赛与面试场景。"
    ]
  }
];

const caseTimelines: Record<ProjectId, TimelineItem[]> = {
  documentary: [
    { date: "2023.12", title: "确定选题", desc: "完成前期调研并锁定核心人物。" },
    { date: "2024.03", title: "进入拍摄", desc: "开始长期跟拍，收集人物生活与行动素材。" },
    { date: "2025.05", title: "完成成片", desc: "完成纪录片剪辑并用于比赛展示。" }
  ],
  bilibili: [
    { date: "2024.04.04", title: "上映节点启动", desc: "围绕电影上映窗口开始集中发布内容。" },
    { date: "2024.05.01", title: "五一流量爆发", desc: "高情绪切口内容带来显著播放与互动抬升。" },
    { date: "2024.05.09", title: "形成复盘结论", desc: "整理出高播放、高涨粉和高互动内容规律。" }
  ],
  bayer: [
    { date: "前期", title: "受众洞察", desc: "梳理核心人群和传播问题。" },
    { date: "中期", title: "搭建策略", desc: "完成传播路径、话题机制和执行节奏设计。" },
    { date: "终期", title: "提案展示", desc: "输出整合方案并完成比赛路演。" }
  ]
};

const bilibiliStats: StatItem[] = [
  { label: "累计播放", value: "986,900", color: palette.blue },
  { label: "重点稿件", value: "9 条", color: palette.sky },
  { label: "10 万+ 视频", value: "4 条", color: palette.apple },
  { label: "播放峰值", value: "30.8 万", color: palette.moss }
];

const operationsMetrics: OpsMetric[] = [
  { label: "累计播放", value: "98.7 万", note: "9 条视频累计接近百万播放。", tone: palette.blue },
  { label: "累计点赞", value: "1.59 万", note: "角色反差和情绪台词带动了点赞。", tone: palette.teal },
  { label: "累计评论", value: "148", note: "讨论集中在角色梗和剧情吐槽。", tone: palette.apple },
  { label: "累计收藏", value: "685", note: "内容具备回看和转存价值。", tone: palette.moss },
  { label: "累计分享", value: "109", note: "有一定站外扩散能力。", tone: palette.blue },
  { label: "累计投币", value: "144", note: "说明用户认可度不只是停留在播放层。", tone: palette.teal },
  { label: "粉丝总数", value: "68", note: "小体量账号仍实现稳定涨粉。", tone: palette.apple },
  { label: "爆款视频", value: "30.8 万", note: "《魏翔：别问，吊我！！！》成为播放峰值。", tone: palette.moss }
];

const breakoutMetrics: BreakoutMetric[] = [
  { label: "单日净增粉", value: "53", note: "五一档节点拉新明显。" },
  { label: "单日播放", value: "41.6 万", note: "集中放大上映窗口的关注度。" },
  { label: "单日点赞", value: "7273", note: "高情绪切口显著带动互动。" },
  { label: "单日评论", value: "107", note: "评论区讨论集中爆发。" },
  { label: "单日收藏", value: "463", note: "用户愿意保存与回看。" },
  { label: "单日投币", value: "110", note: "认可度在高峰期同步上升。" }
];

const operationsInsights: OpsInsight[] = [
  { title: "播放最高内容", detail: "《魏翔：别问，吊我！！！》播放 30.8 万，说明强人设台词和夸张动作镜头最适合破圈。" },
  { title: "涨粉最高内容", detail: "《是谁？太没素质了，出来游个泳一股尿味！》单条涨粉 19，是最强拉新内容。" },
  { title: "互动最高内容", detail: "《尹正的现挂能力有多强？剧组一整个瑞思拜》互动率 4%，点赞 4226、评论 36，幕后感和群像氛围更容易激发讨论。" },
  { title: "运营结论", detail: "上映窗口内，角色反差、情绪金句、冲突式标题最适合 B 站影视宣发，高播放内容负责破圈，高互动内容负责放大讨论。" }
];

const additionalWorks: ExperienceItem[] = [
  { title: "新华社内容协作", desc: "参与采访、编稿、拍摄与剪辑流程，体现内容生产与协作执行能力。" },
  { title: "新闻摄影《旅人》组照", desc: "可延展为影像展示模块，体现视觉表达与纪实内容判断。" },
  { title: "沉船逃生互动视频项目", desc: "体现脚本整理、叙事设计与互动内容执行经验。" }
];

const bayerVisuals: VisualItem[] = [
  {
    title: "手绘动画页",
    desc: "答辩 PPT 中的动画视觉页。",
    src:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#EAF4FB"/><circle cx="220" cy="180" r="90" fill="#4E90F5" fill-opacity="0.18"/><circle cx="560" cy="290" r="120" fill="#94C000" fill-opacity="0.16"/><text x="80" y="120" font-size="42" fill="#243128" font-family="Arial">Bayer 724</text><text x="80" y="190" font-size="72" fill="#243128" font-family="Arial">Animation Visual</text></svg>'
      )
  },
  {
    title: "角色插画页",
    desc: "PPT 中提取的角色表达页。",
    src:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#F7FBFF"/><rect x="60" y="60" width="220" height="320" rx="28" fill="#9EBEED"/><rect x="300" y="100" width="180" height="260" rx="28" fill="#4E90F5"/><rect x="500" y="140" width="240" height="220" rx="28" fill="#94C000"/><text x="68" y="430" font-size="54" fill="#243128" font-family="Arial">Character Boards</text></svg>'
      )
  }
];

const sectionLabelStyle: React.CSSProperties = {
  marginBottom: 32,
  display: "flex",
  alignItems: "center",
  gap: 16,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  color: palette.blue
};

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div style={sectionLabelStyle}>
      <span>{number}</span>
      <div style={{ height: 1, flex: 1, background: palette.line }} />
      <span style={{ color: palette.textSoft }}>{title}</span>
    </div>
  );
}

function Panel({ children, style = {} as React.CSSProperties }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 30,
        border: `1px solid ${palette.line}`,
        background: palette.panel,
        ...style,
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#FFFFFF,rgba(243,246,243,0.72))" }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

function GeneratedCover({ project }: { project: Project }) {
  return (
    <div className="generated-cover" style={{ background: project.accent }}>
      <div className="generated-cover-glow" />
      <div className="generated-cover-inner">
        <div className="generated-cover-label">{project.subtitle}</div>
        <div className="generated-cover-title">{project.title}</div>
        <div className="generated-cover-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CaseCard({ project, onOpen, priority }: { project: Project; onOpen: (id: ProjectId) => void; priority?: boolean }) {
  const isDocumentary = project.coverType === "image" && project.cover;

  return (
    <section id={`case-${project.id}`}>
      <Panel style={{ borderRadius: 34, boxShadow: "0 8px 18px rgba(36,49,40,0.04)" }}>
        <div style={{ position: "relative", overflow: "hidden", background: project.accent }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 24%), radial-gradient(circle at bottom right, rgba(255,255,255,0.10), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0), rgba(31,36,48,0.06))" }} />
          <div className="case-padding" style={{ position: "relative", zIndex: 1, color: "white" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
              <div style={{ borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.18)", padding: "8px 16px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em" }}>
                {project.subtitle}
              </div>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.72)" }}>
                {priority ? "Core Project" : "Project"}
              </div>
            </div>

            <div style={{ marginTop: 56, maxWidth: 820 }}>
              <h2 style={{ maxWidth: "12ch", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 600, lineHeight: 1.06, margin: 0 }}>{project.title}</h2>
              <p style={{ marginTop: 16, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.82)" }}>{project.role}</p>
            </div>

            <div className="case-grid" style={{ marginTop: 36, display: "grid", gap: 16, gridTemplateColumns: isDocumentary ? "minmax(0,0.95fr) minmax(0,1.05fr)" : "repeat(3, minmax(0,1fr))" }}>
              {isDocumentary ? (
                <div style={{ overflow: "hidden", borderRadius: 24, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.16)" }}>
                  <img src={project.cover} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ) : (
                <GeneratedCover project={project} />
              )}

              <div className="sar-grid" style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}>
                {[
                  { label: "Situation", text: project.situation },
                  { label: "Action", text: project.action },
                  { label: "Result", text: project.result },
                ].map((block) => (
                  <div key={block.label} style={{ borderRadius: 24, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.18)", padding: 20, backdropFilter: "blur(8px)" }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.78)" }}>{block.label}</div>
                    <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.92)" }}>{block.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-row" style={{ display: "flex", flexDirection: "column", gap: 20, padding: "24px 28px" }}>
          <div>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", color: palette.blue }}>Business Outcome</div>
            <div style={{ marginTop: 12, fontSize: "clamp(24px, 3vw, 30px)", fontWeight: 500, color: palette.text }}>{project.highlight}</div>
          </div>
          <button className="detail-trigger-btn" onClick={() => onOpen(project.id)}>
            查看完整案例页
            <ArrowRight size={16} />
          </button>
        </div>
      </Panel>
    </section>
  );
}

function BilibiliDetailModule() {
  return (
    <div style={{ marginTop: 32, display: "grid", gap: 16 }}>
      <div className="ops-hero">
        <div>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.16em", color: palette.blue }}>Operations Results / Bilibili Campaign</div>
          <h3 style={{ margin: "18px 0 0", fontSize: "clamp(28px,4vw,38px)", lineHeight: 1.2, color: palette.text }}>《大反派》运营成果</h3>
          <p className="ops-card-copy">这里把原本分散在后面板块的数据全部收回到案例详情页里，让项目背景、执行动作和结果表现形成一条完整叙事链。</p>
        </div>
        <div className="ops-summary-card">
          <div className="ops-summary-label">阶段结论</div>
          <div className="ops-summary-value">上映期累计播放近 100 万</div>
          <p className="ops-summary-copy">9 条内容覆盖上映前后讨论窗口，跑出 1 条 30 万级爆款、4 条 10 万+ 内容，并在五一档完成单日 41.6 万播放与 53 净增粉。</p>
        </div>
      </div>

      <div className="stats-grid">
        {bilibiliStats.map((item) => (
          <div key={item.label} className="stat-card">
            <div className="stat-head">
              <div className="stat-label">{item.label}</div>
              <span className="stat-dot" style={{ background: item.color }} />
            </div>
            <div className="stat-value">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="ops-metric-grid">
        {operationsMetrics.map((item) => (
          <div key={item.label} className="ops-metric-card">
            <div className="ops-metric-head">
              <div className="ops-metric-label">{item.label}</div>
              <span className="ops-metric-dot" style={{ background: item.tone }} />
            </div>
            <div className="ops-metric-value">{item.value}</div>
            <p className="ops-metric-note">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="ops-split-grid">
        <div className="sub-card">
          <div className="sub-label">Peak Day</div>
          <div className="sub-title">爆发节点</div>
          <p className="ops-card-copy">五一档是最明显的放大窗口，播放、点赞、评论、收藏和投币同步抬升，说明内容节奏和上映节奏形成了有效共振。</p>
          <div className="breakout-grid">
            {breakoutMetrics.map((item) => (
              <div key={item.label} className="breakout-card">
                <div className="breakout-label">{item.label}</div>
                <div className="breakout-value">{item.value}</div>
                <div className="breakout-note">{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="sub-card">
          <div className="sub-label">Content Winners</div>
          <div className="sub-title">内容胜出点</div>
          <div className="insight-list">
            {operationsInsights.map((item) => (
              <div key={item.title} className="insight-item">
                <div className="insight-title">{item.title}</div>
                <p className="insight-copy">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailPage({ project, onBack }: { project: Project; onBack: () => void }) {
  const timeline = caseTimelines[project.id];

  return (
    <div className="detail-page">
      <div className="page-shell">
        <header className="detail-header">
          <button className="detail-back-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            返回项目首页
          </button>
        </header>

        <main>
          <section className="detail-hero-section">
            <Panel style={{ borderRadius: 40, boxShadow: "0 8px 20px rgba(36,49,40,0.03)" }}>
              <div className="detail-hero">
                <div className="detail-hero-copy">
                  <div className="detail-page-label">Case Detail Page</div>
                  <h1 className="detail-page-title">{project.title}</h1>
                  <p className="detail-page-role">{project.role}</p>
                  <p className="detail-page-intro">{project.detailIntro}</p>
                  <div className="detail-tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag} className="detail-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="detail-hero-media">
                  {project.coverType === "image" && project.cover ? <img src={project.cover} alt={project.title} /> : <GeneratedCover project={project} />}
                </div>
              </div>
            </Panel>
          </section>

          <section className="section-block">
            <SectionLabel number="01" title="Project Overview" />
            <div className="detail-overview-grid">
              <Panel style={{ borderRadius: 30 }}>
                <div className="detail-card">
                  <div className="detail-card-label">Situation</div>
                  <p className="detail-card-copy">{project.situation}</p>
                </div>
              </Panel>
              <Panel style={{ borderRadius: 30 }}>
                <div className="detail-card">
                  <div className="detail-card-label">Action</div>
                  <p className="detail-card-copy">{project.action}</p>
                </div>
              </Panel>
              <Panel style={{ borderRadius: 30 }}>
                <div className="detail-card">
                  <div className="detail-card-label">Result</div>
                  <p className="detail-card-copy">{project.result}</p>
                </div>
              </Panel>
            </div>
          </section>

          <section className="section-block">
            <SectionLabel number="02" title="Timeline" />
            <Panel style={{ borderRadius: 36 }}>
              <div className="timeline-wrap">
                {timeline.map((item, index) => (
                  <div key={`${item.date}-${item.title}`} className="timeline-item">
                    <div className="timeline-top">
                      <div className="timeline-date">{item.date}</div>
                      {index < timeline.length - 1 ? <div className="timeline-line" /> : null}
                    </div>
                    <div className="timeline-dot" />
                    <div className="timeline-title">{item.title}</div>
                    <p className="timeline-copy">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          <section className="section-block">
            <SectionLabel number="03" title="Execution Notes" />
            <Panel style={{ borderRadius: 36 }}>
              <div className="detail-points">
                {project.detailPoints.map((point) => (
                  <div key={point} className="detail-point-item">
                    <span className="detail-point-dot" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          {project.id === "bilibili" ? (
            <section className="section-block">
              <SectionLabel number="04" title="Performance Data" />
              <Panel style={{ borderRadius: 36 }}>
                <div className="dashboard-wrap">
                  <BilibiliDetailModule />
                </div>
              </Panel>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectId | null>(null);
  const selectedProject = useMemo(() => projects.find((item) => item.id === selectedProjectId) ?? null, [selectedProjectId]);

  useEffect(() => {
    if (selectedProjectId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProjectId]);

  if (selectedProject) {
    return <DetailPage project={selectedProject} onBack={() => setSelectedProjectId(null)} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: palette.bg, color: palette.text }}>
      <div className="page-shell">
        <header className="site-header">
          <div className="header-inner">
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, color: palette.text }}>陈衍年</div>
              <div style={{ marginTop: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: palette.blue }}>
                Content Strategy · Project Execution
              </div>
            </div>
            <nav className="desktop-nav">
              <a href="#work">Projects</a>
              <a href="#additional">Additional</a>
              <a href="#contact">Contact</a>
            </nav>
            <button className="ghost-btn">下载简历</button>
          </div>
        </header>

        <main>
          <section className="hero-section">
            <div className="hero-grid">
              <Panel style={{ borderRadius: 40, boxShadow: "0 8px 20px rgba(36,49,40,0.03)" }}>
                <div className="hero-card">
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em", color: palette.blue }}>Portfolio / Core Cases</div>
                  <div className="pill">Content · Execution · Strategy</div>
                  <h1 className="hero-title">
                    内容策划、项目执行与传播表达
                    <br />
                    用案例把能力讲清楚
                  </h1>
                  <p className="hero-copy">这版作品集网站重点展示我在内容、宣发、纪录片和传播策划项目里的判断力与执行力。点击案例后，会进入更完整的案例详情页，而不是留在同一屏里机械展开。</p>
                  <div className="hero-actions">
                    <a href="#work" className="primary-btn">
                      查看项目
                      <ArrowRight size={16} />
                    </a>
                    <button className="ghost-large-btn">
                      下载简历
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </Panel>

              <div className="project-preview-grid">
                {projects.map((item, idx) => {
                  const softs = ["#F7FBFF", "#F6FBF0", "#F6FBF6"];
                  const dots = [palette.blue, palette.apple, palette.moss];
                  return (
                    <button key={item.id} className="preview-card-btn" onClick={() => setSelectedProjectId(item.id)}>
                      <Panel style={{ borderRadius: 30, boxShadow: "0 6px 16px rgba(36,49,40,0.02)" }}>
                        <div style={{ borderRadius: 24, border: `1px solid ${palette.line}`, padding: 24, background: softs[idx], textAlign: "left" }}>
                          {item.coverType === "image" && item.cover ? (
                            <div style={{ marginBottom: 16, overflow: "hidden", borderRadius: 18 }}>
                              <img src={item.cover} alt={item.title} style={{ height: 144, width: "100%", objectFit: "cover", display: "block" }} />
                            </div>
                          ) : (
                            <div style={{ marginBottom: 16 }}>
                              <GeneratedCover project={item} />
                            </div>
                          )}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <span style={{ width: 12, height: 12, borderRadius: "50%", background: dots[idx], display: "inline-block" }} />
                              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", color: palette.blue }}>{item.subtitle}</div>
                            </div>
                            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: palette.textSoft }}>0{idx + 1}</div>
                          </div>
                          <div style={{ marginTop: 20, fontSize: 28, fontWeight: 500, lineHeight: 1.14, color: palette.text }}>{item.title}</div>
                          <div style={{ marginTop: 12, fontSize: 14, color: palette.textSoft }}>{item.highlight}</div>
                        </div>
                      </Panel>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="work" className="section-block">
            <SectionLabel number="01" title="Core Cases" />
            <div style={{ display: "grid", gap: 24 }}>
              <CaseCard project={projects[0]} onOpen={setSelectedProjectId} priority />
              <CaseCard project={projects[1]} onOpen={setSelectedProjectId} />
              <CaseCard project={projects[2]} onOpen={setSelectedProjectId} />
            </div>
          </section>

          <section className="section-block">
            <SectionLabel number="02" title="Strategy Visuals" />
            <div className="two-col-grid">
              {bayerVisuals.map((item) => (
                <div key={item.title} className="visual-card">
                  <div className="visual-media">
                    <img src={item.src} alt={item.title} />
                  </div>
                  <div style={{ padding: 20 }}>
                    <div className="visual-title">{item.title}</div>
                    <p className="visual-copy">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="additional" className="section-block">
            <SectionLabel number="03" title="Operational Experience" />
            <Panel style={{ borderRadius: 36, boxShadow: "0 8px 20px rgba(36,49,40,0.03)" }}>
              <div className="dashboard-wrap">
                <div style={{ marginBottom: 32, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.16em", color: palette.blue }}>Operational Experience</div>
                <div className="three-col-grid">
                  {additionalWorks.map((item) => (
                    <div key={item.title} className="experience-card">
                      <div className="experience-title">{item.title}</div>
                      <p className="experience-copy">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
          </section>

          <section id="contact" className="contact-section">
            <SectionLabel number="04" title="Contact" />
            <div className="contact-grid">
              <div>
                <h2 className="contact-title">
                  用项目把能力说清楚，
                  <br />
                  让结果自己成立
                </h2>
                <p className="contact-copy">这个网站不是简单堆经历，而是让浏览者在较短时间里看清我做过什么、怎么做、最后做成了什么。后续还可以继续补真实素材与更多案例截图。</p>
              </div>

              <Panel style={{ borderRadius: 32, boxShadow: "0 8px 20px rgba(36,49,40,0.03)" }}>
                <div className="contact-card">
                  <div className="contact-list">
                    <div className="contact-item">
                      <Mail size={16} />
                      <span>NeoCyyyn@163.com</span>
                    </div>
                    <div className="contact-item">
                      <Phone size={16} />
                      <span>192-8328-7512</span>
                    </div>
                    <div className="contact-item">
                      <Play size={16} />
                      <a href="https://space.bilibili.com/1099530248?spm_id_from=333.1007.0.0" target="_blank" rel="noreferrer">
                        B 站账号主页
                      </a>
                    </div>
                  </div>
                  <div className="hero-actions" style={{ marginTop: 40 }}>
                    <button className="primary-btn">
                      下载简历
                      <Download size={16} />
                    </button>
                    <a href="#work" className="ghost-large-btn" style={{ textDecoration: "none" }}>
                      返回项目
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </Panel>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const sanityChecks = [
  projects.length === 3,
  additionalWorks.length === 3,
  bilibiliStats.length === 4,
  operationsMetrics.length === 8,
  breakoutMetrics.length === 6,
  operationsInsights.length === 4,
  bayerVisuals.length === 2,
].every(Boolean);

if (!sanityChecks) {
  throw new Error("Portfolio data is incomplete.");
}
