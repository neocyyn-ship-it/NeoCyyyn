import React, { useState } from "react";
import { ArrowRight, Download, Mail, Phone, Play } from "lucide-react";

type Project = { id: string; title: string; subtitle: string; role: string; s: string; a: string; r: string; highlight: string; accent: string; cover?: string; };
type StatItem = { label: string; value: string; color: string; };
type VisualItem = { title: string; desc: string; src: string; };
type TopContentItem = { title: string; value: number; likes: number; comments: number; tag: string; };
type PromoPhase = { stage: string; date: string; value: number; color: string; desc: string; };
type OpsMetric = { label: string; value: string; note: string; tone: string; };
type BreakoutMetric = { label: string; value: string; note: string; };
type OpsInsight = { title: string; detail: string; };
type CaseDetail = { title: string; points: string[]; };

const documentaryCover = "/assets/documentary-cover.jpg";

const palette = { bg:"#F3F6F3", panel:"#FFFFFF", panelSoft:"#F7FBFF", text:"#243128", textSoft:"#5E6B61", line:"#DCE7DE", accent:"#4E90F5", sky:"#9EBEED", blue:"#4E90F5", apple:"#94C000", moss:"#4B6B03", deepTeal:"#1C9AA0" };

const projects: Project[] = [
  { id:"documentary", title:"纪录片《视界之外》", subtitle:"Documentary Project", role:"编导 / 摄像 / 项目负责人", s:"毕业设计纪录片，拍摄周期为 2023.12—2025.05，记录一位视障女性创业者的生活与行动。", a:"负责选题梳理、采访沟通、拍摄统筹与现场执行，持续推进人物叙事与内容成型。", r:"完成 15 分钟纪录片成片，获 2025 EKA 天物创意奖二等奖。", highlight:"15 分钟成片 / EKA 天物创意奖二等奖", accent:"linear-gradient(135deg, #EAF4FB 0%, #9EBEED 55%, #4E90F5 100%)", cover:documentaryCover },
  { id:"bilibili", title:"《大反派》B站宣发", subtitle:"Bilibili Campaign", role:"内容策划 / 文案撰写 / 平台运营", s:"电影《大反派》宣发期，需要在 B 站持续输出内容并提升讨论度。", a:"整理宣发素材、撰写标题与文案，按档期节奏发布内容，并根据反馈优化表达。", r:"8 条重点稿件累计播放 96.9 万，4 条视频破 10 万，单条最高 30.7 万播放。", highlight:"累计播放 98.7 万 / 4 条视频破 10 万", accent:"linear-gradient(135deg, #EEF6DD 0%, #94C000 55%, #4B6B03 100%)" },
  { id:"bayer", title:"拜耳 724 传播策划", subtitle:"PR Strategy Case", role:"项目负责人 / 策略梳理 / 提案表达", s:"中国大学生公共关系策划创业大赛项目，围绕 724 国际自我保健日设计 Z 世代传播方案。", a:"完成受众调研、传播策略设计、提案结构搭建，并制作项目书、PPT 与动画展示内容。", r:"形成线上线下联动传播方案，获中国大学生公共关系策划创业大赛三等奖。", highlight:"公关策划创业大赛三等奖", accent:"linear-gradient(135deg, #F3F6F3 0%, #9EBEED 55%, #94C000 100%)" }
];

const additionalWorks = [
  { title:"新华社内容协作", desc:"参与采访、编稿、拍摄与剪辑流程，体现内容生产与协作执行能力。" },
  { title:"新闻摄影《旅人》组照", desc:"可延展为影像展示模块，体现视觉表达与纪实内容判断。" },
  { title:"沉船互动视频项目", desc:"体现脚本整理、叙事设计与互动内容执行经验。" }
];

const caseDetails: Record<string, CaseDetail> = {
  documentary: {
    title: "完整案例补充",
    points: [
      "从前期选题、采访沟通到拍摄执行，持续跟进人物线索，保证纪录片叙事完整。",
      "拍摄周期跨越较长时间，需要反复协调拍摄对象状态与时间，保持素材连续性。",
      "最终完成 15 分钟成片，并形成可用于比赛与作品集展示的完整案例。"
    ]
  },
  bilibili: {
    title: "完整案例补充",
    points: [
      "围绕电影上映窗口拆分内容节奏，优先布局角色记忆点、冲突台词和情绪高点。",
      "根据后台反馈持续优化标题和文案方向，让高播放内容负责破圈，高互动内容负责讨论。",
      "最终跑出近 100 万累计播放、4 条 10 万+ 视频和 1 条 30 万级爆款。"
    ]
  },
  bayer: {
    title: "完整案例补充",
    points: [
      "完成受众洞察、传播策略、提案逻辑和视觉表达的整套梳理。",
      "将线上线下联动传播路径拆成可展示、可汇报的提案结构，突出执行可行性。",
      "最终以系统化方案参加比赛并获得奖项，证明策略整理与表达能力。"
    ]
  }
};

const bilibiliStats: StatItem[] = [
  { label:"累计播放", value:"986,951", color:"#4E90F5" },
  { label:"重点稿件", value:"8 条", color:"#9EBEED" },
  { label:"10万+ 视频", value:"4 条", color:"#94C000" },
  { label:"单条最高", value:"30.7 万", color:"#4B6B03" }
];

const topContent: TopContentItem[] = [
  { title:"魏翔：别问，吊我！！！", value:30.8, likes:2535, comments:14, tag:"播放最高" },
  { title:"是谁？太没素质了，出来游个泳一股尿味！", value:19.0, likes:2146, comments:27, tag:"涨粉最高" },
  { title:"贾冰：我终于火辣！", value:12.8, likes:2216, comments:1, tag:"角色记忆点" },
  { title:"尹正的现挂能力有多强？", value:11.0, likes:4224, comments:36, tag:"互动最高" }
];

const promoPhases: PromoPhase[] = [
  { stage:"4月上映期", date:"4.08 - 4.30", value:42, color:"#9EBEED", desc:"电影上映后进入常规宣发阶段，内容持续铺量，但整体热度相对平稳。" },
  { stage:"五一爆发期", date:"5.01 - 5.05", value:100, color:"#4E90F5", desc:"五一档节点叠加高情绪切口内容，播放与讨论明显抬升，形成阶段峰值。" },
  { stage:"节后回落期", date:"5.06 - 5.09", value:46, color:"#94C000", desc:"假期结束后整体流量自然回落，但高记忆点内容仍能维持一定播放表现。" }
];

const operationsMetrics: OpsMetric[] = [
  { label:"累计播放", value:"98.7万", note:"9 条视频累计接近百万播放。", tone:"#4E90F5" },
  { label:"累计点赞", value:"1.59万", note:"强情绪台词和角色反差内容最能带动点赞。", tone:"#1C9AA0" },
  { label:"累计评论", value:"148", note:"讨论集中在角色梗、台词梗和剧情吐槽。", tone:"#94C000" },
  { label:"累计收藏", value:"685", note:"内容具备二次回看与转存价值。", tone:"#4B6B03" },
  { label:"累计分享", value:"109", note:"有一定站外扩散能力。", tone:"#4E90F5" },
  { label:"累计投币", value:"144", note:"说明用户认可度不只是停留在播放层。", tone:"#1C9AA0" },
  { label:"粉丝总数", value:"68", note:"小体量账号仍然实现了稳定涨粉。", tone:"#94C000" },
  { label:"播放峰值", value:"30.8万", note:"《魏翔：别问，吊我！！！》成为爆款视频。", tone:"#4B6B03" }
];

const breakoutMetrics: BreakoutMetric[] = [
  { label:"单日净增粉", value:"53", note:"五一档节点拉新明显。" },
  { label:"单日播放", value:"41.6万", note:"集中放大了上映窗口的关注度。" },
  { label:"单日点赞", value:"7273", note:"情绪切口内容强势放大互动。" },
  { label:"单日评论", value:"107", note:"评论区讨论集中爆发。" },
  { label:"单日收藏", value:"463", note:"用户愿意保存与回看。" },
  { label:"单日投币", value:"110", note:"认可度在高峰期同步上涨。" }
];

const operationsInsights: OpsInsight[] = [
  { title:"播放最高内容", detail:"《魏翔：别问，吊我！！！》播放 30.8 万，说明强人设台词和夸张动作镜头最适合破圈。" },
  { title:"涨粉最高内容", detail:"《是谁？太没素质了，出来游个泳一股尿味！》单条涨粉 19，是最强拉新内容。" },
  { title:"互动最高内容", detail:"《尹正的现挂能力有多强？剧组一整个瑞思拜》互动率 4%，点赞 4226、评论 36，幕后感和群像氛围更容易激发讨论。" },
  { title:"运营结论", detail:"上映窗口内，角色反差、情绪金句、冲突式标题最适合 B 站影视宣传场景，高播放内容负责破圈，高互动内容负责放大讨论。" }
];

const bayerVisuals: VisualItem[] = [
  { title:"手绘动画页", desc:"答辩 PPT 中的动画视觉页。", src:"data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#EAF4FB"/><circle cx="220" cy="180" r="90" fill="#4E90F5" fill-opacity="0.18"/><circle cx="560" cy="290" r="120" fill="#94C000" fill-opacity="0.16"/><text x="80" y="120" font-size="42" fill="#243128" font-family="Arial">Bayer 724</text><text x="80" y="190" font-size="72" fill="#243128" font-family="Arial">Animation Visual</text></svg>') },
  { title:"角色插画页", desc:"PPT 中提取的角色表达页。", src:"data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#F7FBFF"/><rect x="60" y="60" width="220" height="320" rx="28" fill="#9EBEED"/><rect x="300" y="100" width="180" height="260" rx="28" fill="#4E90F5"/><rect x="500" y="140" width="240" height="220" rx="28" fill="#94C000"/><text x="68" y="430" font-size="54" fill="#243128" font-family="Arial">Character Boards</text></svg>') }
];

const sectionLabelStyle: React.CSSProperties = { marginBottom:32, display:"flex", alignItems:"center", gap:16, fontSize:12, textTransform:"uppercase", letterSpacing:"0.18em", color:"#4E90F5" };

function SectionLabel({ number, title }: { number: string; title: string }) {
  return <div style={sectionLabelStyle}><span>{number}</span><div style={{height:1, flex:1, background:"#DCE7DE"}} /><span style={{color:"#5E6B61"}}>{title}</span></div>;
}

function Panel({ children, style = {} as React.CSSProperties }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ position:"relative", overflow:"hidden", borderRadius:30, border:"1px solid #DCE7DE", background:"#FFFFFF", ...style }}>
    <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#FFFFFF,rgba(243,246,243,0.7))" }} />
    <div style={{ position:"relative", zIndex:1 }}>{children}</div>
  </div>;
}

function CaseSection({ project, priority }: { project: Project; priority?: boolean }) {
  const isDocumentary = project.id === "documentary";
  const [expanded, setExpanded] = useState(false);
  const detail = caseDetails[project.id];
  return <section id={`case-${project.id}`}>
    <Panel style={{ borderRadius:34, boxShadow:"0 8px 18px rgba(36,49,40,0.04)" }}>
      <div style={{ position:"relative", overflow:"hidden", background:project.accent }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 24%), radial-gradient(circle at bottom right, rgba(255,255,255,0.10), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0), rgba(31,36,48,0.06))" }} />
        <div className="case-padding" style={{ position:"relative", zIndex:1, color:"white" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:24, flexWrap:"wrap" }}>
            <div style={{ borderRadius:999, border:"1px solid rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.18)", padding:"8px 16px", fontSize:11, textTransform:"uppercase", letterSpacing:"0.14em", boxShadow:"0 8px 20px rgba(36,49,40,0.08)" }}>{project.subtitle}</div>
            <div style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.14em", color:"rgba(255,255,255,0.7)" }}>{priority ? "Core Project" : "Project"}</div>
          </div>
          <div style={{ marginTop:64, maxWidth:780 }}>
            <h2 style={{ maxWidth:"12ch", fontSize:"clamp(36px, 5vw, 72px)", fontWeight:600, lineHeight:1.06, margin:0 }}>{project.title}</h2>
            <p style={{ marginTop:16, fontSize:14, textTransform:"uppercase", letterSpacing:"0.14em", color:"rgba(255,255,255,0.82)" }}>{project.role}</p>
          </div>
          <div className="case-grid" style={{ marginTop:40, display:"grid", gap:16, gridTemplateColumns:isDocumentary ? "minmax(0,0.95fr) minmax(0,1.05fr)" : "repeat(3, minmax(0,1fr))" }}>
            {isDocumentary && project.cover ? <div style={{ overflow:"hidden", borderRadius:24, border:"1px solid rgba(255,255,255,0.25)", background:"rgba(255,255,255,0.16)", boxShadow:"0 8px 20px rgba(36,49,40,0.08)" }}><img src={project.cover} alt={project.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} /></div> : null}
            <div className="sar-grid" style={{ display:"grid", gap:16, gridTemplateColumns:"repeat(3, minmax(0,1fr))" }}>
              {[{label:"Situation", text:project.s},{label:"Action", text:project.a},{label:"Result", text:project.r}].map((block) => <div key={block.label} style={{ borderRadius:24, border:"1px solid rgba(255,255,255,0.25)", background:"rgba(255,255,255,0.18)", padding:20, backdropFilter:"blur(8px)", boxShadow:"0 8px 20px rgba(36,49,40,0.06)" }}>
                <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.14em", color:"rgba(255,255,255,0.78)" }}>{block.label}</div>
                <p style={{ marginTop:16, fontSize:14, lineHeight:1.85, color:"rgba(255,255,255,0.92)" }}>{block.text}</p>
              </div>)}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-row" style={{ display:"flex", flexDirection:"column", gap:20, padding:"24px 28px" }}>
        <div><div style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.14em", color:"#4E90F5" }}>Business Outcome</div><div style={{ marginTop:12, fontSize:"clamp(24px, 3vw, 30px)", fontWeight:500, color:"#243128" }}>{project.highlight}</div></div>
        <button onClick={() => setExpanded((value) => !value)} style={{ display:"inline-flex", alignItems:"center", gap:8, borderRadius:999, border:"1px solid #DCE7DE", background:"#F7FBFF", padding:"12px 20px", fontSize:14, color:"#243128", cursor:"pointer", width:"fit-content" }}>
          {expanded ? "收起案例详情" : "查看完整案例"}
          <ArrowRight size={16} style={{ transform:expanded ? "rotate(90deg)" : "none", transition:"transform 160ms ease" }} />
        </button>
        {expanded && detail ? <div style={{ borderRadius:24, border:"1px solid #DCE7DE", background:"#F7FBFF", padding:20, boxShadow:"0 6px 16px rgba(36,49,40,0.02)" }}>
          <div style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.14em", color:"#4E90F5" }}>{detail.title}</div>
          <div style={{ marginTop:16, display:"grid", gap:12 }}>
            {detail.points.map((point) => <div key={point} style={{ display:"flex", alignItems:"flex-start", gap:10, color:"#243128", fontSize:14, lineHeight:1.85 }}>
              <span style={{ marginTop:8, width:6, height:6, borderRadius:"50%", background:"#4E90F5", flexShrink:0 }} />
              <span>{point}</span>
            </div>)}
          </div>
          {project.id === "bilibili" ? <div style={{ marginTop:24, display:"grid", gap:16 }}>
            <div className="ops-hero">
              <div>
                <div style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.16em", color:"#4E90F5" }}>Operations Results / Bilibili Campaign</div>
                <h3 style={{ margin:"18px 0 0", fontSize:"clamp(28px,4vw,36px)", lineHeight:1.2, color:"#243128" }}>《大反派》运营数据整合进案例详情</h3>
                <p className="ops-card-copy">把后台截图里的累计成绩、爆发节点和内容胜出点都放回这个案例里，浏览者点开一次，就能看完整个项目的执行和结果。</p>
              </div>
              <div className="ops-summary-card">
                <div className="ops-summary-label">阶段结论</div>
                <div className="ops-summary-value">上映期累计播放近 100 万</div>
                <p className="ops-summary-copy">9 条内容覆盖上映前后讨论窗口，跑出 1 条 30 万级爆款、4 条 10 万+ 内容，并在五一档完成单日 41.6 万播放与 53 净增粉。</p>
              </div>
            </div>

            <div className="ops-metric-grid">
              {operationsMetrics.map((item) => <div key={item.label} className="ops-metric-card">
                <div className="ops-metric-head">
                  <div className="ops-metric-label">{item.label}</div>
                  <span className="ops-metric-dot" style={{ background:item.tone }} />
                </div>
                <div className="ops-metric-value">{item.value}</div>
                <p className="ops-metric-note">{item.note}</p>
              </div>)}
            </div>

            <div className="ops-split-grid">
              <div className="sub-card">
                <div className="sub-label">Peak Day</div>
                <div className="sub-title">爆发节点</div>
                <p className="ops-card-copy">五一档是最明显的放大窗口，播放、点赞、评论、收藏和投币同步抬升，说明内容节奏和上映节奏形成了有效共振。</p>
                <div className="breakout-grid">
                  {breakoutMetrics.map((item) => <div key={item.label} className="breakout-card">
                    <div className="breakout-label">{item.label}</div>
                    <div className="breakout-value">{item.value}</div>
                    <div className="breakout-note">{item.note}</div>
                  </div>)}
                </div>
              </div>

              <div className="sub-card">
                <div className="sub-label">Content Winners</div>
                <div className="sub-title">内容胜出点</div>
                <div className="insight-list">
                  {operationsInsights.map((item) => <div key={item.title} className="insight-item">
                    <div className="insight-title">{item.title}</div>
                    <p className="insight-copy">{item.detail}</p>
                  </div>)}
                </div>
              </div>
            </div>
          </div> : null}
        </div> : null}
      </div>
    </Panel>
  </section>;
}

export default function App() {
  return <div style={{ minHeight:"100vh", background:palette.bg, color:palette.text }}>
    <div className="page-shell">
      <header className="site-header">
        <div className="header-inner">
          <div><div style={{ fontSize:22, fontWeight:600, color:"#243128" }}>陈衍年</div><div style={{ marginTop:4, fontSize:11, textTransform:"uppercase", letterSpacing:"0.14em", color:"#4E90F5" }}>Content Strategy · Project Execution</div></div>
          <nav className="desktop-nav"><a href="#work">Projects</a><a href="#additional">Additional</a><a href="#contact">Contact</a></nav>
          <button className="ghost-btn">下载简历</button>
        </div>
      </header>
      <main>
        <section className="hero-section">
          <div className="hero-grid">
            <Panel style={{ borderRadius:40, boxShadow:"0 8px 20px rgba(36,49,40,0.03)" }}>
              <div className="hero-card">
                <div style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.18em", color:"#4E90F5" }}>Portfolio / Core Cases</div>
                <div className="pill">Content · Execution · Strategy</div>
                <h1 className="hero-title">内容策划、项目执行与传播表达<br />三个核心案例，清楚说明</h1>
                <p className="hero-copy">面向内容、品牌与公关岗位的个人作品集网站。进入网页后，可以快速看到我的核心案例、项目角色、执行动作与结果表现。</p>
                <div className="hero-actions"><a href="#work" className="primary-btn">查看案例 <ArrowRight size={16} /></a><button className="ghost-large-btn">下载简历 <Download size={16} /></button></div>
              </div>
            </Panel>
            <div className="project-preview-grid">
              {projects.map((item, idx) => {
                const softs = ["#F7FBFF", "#F6FBF0", "#F6FBF6"];
                const dots = [palette.blue, palette.apple, palette.moss];
                return <a key={item.id} href={`#case-${item.id}`} style={{ textDecoration:"none" }}>
                  <Panel style={{ borderRadius:30, boxShadow:"0 6px 16px rgba(36,49,40,0.02)" }}>
                    <div style={{ borderRadius:24, border:"1px solid #DCE7DE", padding:24, background:softs[idx] }}>
                      {item.cover ? <div style={{ marginBottom:16, overflow:"hidden", borderRadius:18, border:"1px solid rgba(255,255,255,0.6)", background:"rgba(255,255,255,0.7)" }}><img src={item.cover} alt={item.title} style={{ height:144, width:"100%", objectFit:"cover", display:"block" }} /></div> : null}
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:12 }}><span style={{ width:12, height:12, borderRadius:"50%", background:dots[idx], display:"inline-block" }} /><div style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.14em", color:"#4E90F5" }}>{item.subtitle}</div></div>
                        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.18em", color:"#5E6B61" }}>0{idx + 1}</div>
                      </div>
                      <div style={{ marginTop:20, fontSize:28, fontWeight:500, lineHeight:1.14, color:"#243128" }}>{item.title}</div>
                      <div style={{ marginTop:12, fontSize:14, color:"#5E6B61" }}>{item.highlight}</div>
                    </div>
                  </Panel>
                </a>;
              })}
            </div>
          </div>
        </section>

        <section id="work" className="section-block"><SectionLabel number="01" title="Core Cases" /><div style={{ display:"grid", gap:24 }}><CaseSection project={projects[0]} priority /><CaseSection project={projects[1]} /><CaseSection project={projects[2]} /></div></section>

        <section className="section-block">
          <SectionLabel number="02" title="Campaign Performance" />
          <Panel style={{ borderRadius:36, boxShadow:"0 8px 20px rgba(36,49,40,0.03)" }}>
            <div className="dashboard-wrap">
              <div className="dashboard-head">
                <div>
                  <div style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.16em", color:"#4E90F5" }}>《大反派》B站宣发数据看板 / Result Overview</div>
                  <h2 className="dashboard-title">把传播结果整理成可快速判断的页面展示</h2>
                  <p className="dashboard-copy">基于既有 B 站数据，将传播结果整理为简洁的数据看板：先看核心指标，再看内容表现与阶段趋势，以便快速判断项目成效与执行质量。</p>
                </div>
                <div className="stats-grid">
                  {bilibiliStats.map((item) => <div key={item.label} className="stat-card"><div className="stat-head"><div className="stat-label">{item.label}</div><span className="stat-dot" style={{ background:item.color }} /></div><div className="stat-value">{item.value}</div></div>)}
                </div>
              </div>

              <div className="performance-grid">
                <div className="sub-card">
                  <div className="sub-card-head"><div><div className="sub-label">Top Content</div><div className="sub-title">高表现内容</div></div><div className="tiny-pill">播放量 / 万</div></div>
                  <div className="top-content-list">
                    {topContent.map((item, idx) => {
                      const fillColors = [palette.moss, palette.blue, palette.sky, palette.apple];
                      return <div key={item.title} className="top-item">
                        <div className="top-item-head"><div className="top-item-title-wrap"><div className="top-item-title">{item.title}</div><div className="top-item-tag">{item.tag}</div></div><span className="top-item-value">{item.value}万</span></div>
                        <div className="bar-bg"><div className="bar-fill" style={{ width:`${(item.value / 30.8) * 100}%`, background:fillColors[idx] }} /></div>
                        <div className="top-item-meta"><span>点赞 {item.likes}</span><span>评论 {item.comments}</span></div>
                      </div>;
                    })}
                  </div>
                </div>

                <div className="sub-card">
                  <div className="sub-label">Trend</div><div className="sub-title">宣发阶段趋势</div>
                  <div className="phase-chart">
                    {promoPhases.map((item) => <div key={item.stage} className="phase-col"><div className="phase-date">{item.date}</div><div className="phase-bar" style={{ height:`${item.value * 1.5}px`, background:item.color }} /><div className="phase-name">{item.stage}</div></div>)}
                  </div>
                  <div className="phase-list">
                    {promoPhases.map((item) => <div key={item.stage} className="phase-item"><div className="phase-item-head"><span className="phase-item-dot" style={{ background:item.color }} /><span>{item.stage}</span></div><p className="phase-item-copy">{item.desc}</p></div>)}
                  </div>
                </div>
              </div>

              <div className="review-grid">
                <div className="sub-card"><div className="sub-label">My Actions</div><div className="sub-title">我的动作</div><div className="copy-stack"><p>围绕档期节奏整理宣发素材，结合人物标签与情绪切口完成标题和文案设计。</p><p>根据内容反馈持续调整表达方向，优先强化反差感、记忆点和传播效率更高的内容形式。</p></div></div>
                <div className="sub-card"><div className="sub-label">Review</div><div className="sub-title">复盘结论</div><div className="copy-stack"><p>1. 标题上，短句式、情绪先行、带人物反差的表达更容易建立点击欲望。表现最好的内容都不是信息型标题，而是先抛出冲突、人物状态或一句能被记住的话。</p><p>2. 从播放与互动看，强爽点、强反转、强表情管理的内容更适合 B 站影视宣发场景。用户更愿意为“这一幕到底发生了什么”停留，而不是为完整剧情说明停留。</p><p>3. 时长会直接影响新粉触达效率。15 到 25 秒的内容更容易完成快速消费和二次传播；30 秒以上内容需要更强的节奏密度，否则完播和继续点击意愿都会下降。</p><p>4. B 站平台更适合“有梗、有角色感、有讨论口子”的内容。高播放稿件负责拉新，高互动稿件负责放大讨论，两者结合比单纯追求统一风格更有效。</p></div></div>
              </div>
            </div>
          </Panel>
        </section>

        <section className="section-block"><SectionLabel number="03" title="Strategy Visuals" /><div className="two-col-grid">{bayerVisuals.map((item) => <div key={item.title} className="visual-card"><div className="visual-media"><img src={item.src} alt={item.title} /></div><div style={{ padding:20 }}><div className="visual-title">{item.title}</div><p className="visual-copy">{item.desc}</p></div></div>)}</div></section>

        <section id="additional" className="section-block"><SectionLabel number="04" title="Operational Experience" /><Panel style={{ borderRadius:36, boxShadow:"0 8px 20px rgba(36,49,40,0.03)" }}><div className="dashboard-wrap"><div style={{ marginBottom:32, fontSize:12, textTransform:"uppercase", letterSpacing:"0.16em", color:"#4E90F5" }}>Operational Experience</div><div className="three-col-grid">{additionalWorks.map((item) => <div key={item.title} className="experience-card"><div className="experience-title">{item.title}</div><p className="experience-copy">{item.desc}</p></div>)}</div></div></Panel></section>

        <section id="contact" className="contact-section">
          <SectionLabel number="05" title="Contact" />
          <div className="contact-grid">
            <div><h2 className="contact-title">用三个核心案例，<br />建立清晰的用人判断。</h2><p className="contact-copy">这版网站的目标不是堆砌经历，而是让浏览者在较短时间内看清项目判断、执行能力与表达方式。后续补入真实素材后，可直接用于正式投递与面试展示。</p></div>
            <Panel style={{ borderRadius:32, boxShadow:"0 8px 20px rgba(36,49,40,0.03)" }}><div className="contact-card"><div className="contact-list"><div className="contact-item"><Mail size={16} /> <span>NeoCyyyn@163.com</span></div><div className="contact-item"><Phone size={16} /> <span>192-8328-7512</span></div><div className="contact-item"><Play size={16} /> <a href="https://space.bilibili.com/1099530248?spm_id_from=333.1007.0.0" target="_blank" rel="noreferrer">B站账号主页</a></div></div><div className="hero-actions" style={{ marginTop:40 }}><button className="primary-btn">下载简历 <Download size={16} /></button><a href="#work" className="ghost-large-btn" style={{ textDecoration:"none" }}>返回项目 <ArrowRight size={16} /></a></div></div></Panel>
          </div>
        </section>
      </main>
    </div>
  </div>;
}

const sanityChecks = [projects.length === 3, additionalWorks.length === 3, bilibiliStats.length === 4, topContent.length === 4, promoPhases.length === 3, operationsMetrics.length === 8, breakoutMetrics.length === 6, operationsInsights.length === 4, bayerVisuals.length === 2].every(Boolean);
if (!sanityChecks) throw new Error("Portfolio data is incomplete.");
