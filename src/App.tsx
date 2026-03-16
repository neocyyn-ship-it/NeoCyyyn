import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Download, Mail, Phone, Play } from "lucide-react";
import documentaryHeroImage from "./assets/documentary-hero.jpg";
import documentaryInterviewImage from "./assets/documentary-interview.jpg";
import documentaryMarketTouchImage from "./assets/documentary-market-touch.jpg";
import documentaryMarketWideImage from "./assets/documentary-market-wide.jpg";
import documentaryMorningImage from "./assets/documentary-morning.jpg";
import documentaryMotherImage from "./assets/documentary-mother.jpg";
import documentaryPartnerImage from "./assets/documentary-partner.jpg";
import documentarySetImage from "./assets/documentary-set.jpg";
import documentaryWalkImage from "./assets/documentary-walk.jpg";

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
type EvidenceItem = { title: string; desc: string; src: string };
type DocumentaryCapability = { label: string; title: string; detail: string; tone: string };
type DocumentaryFrame = { title: string; desc: string; src: string };
type DocumentaryPerson = { name: string; role: string; desc: string; src: string };

const baseUrl = import.meta.env.BASE_URL;
const documentaryCover = documentaryHeroImage;
const resumeFile = `${baseUrl}assets/chen-yannian-resume.pdf`;
const documentaryWatchLink = "https://pan.baidu.com/s/15sMVeJ_CkSf2tGbXJz0EXw?pwd=rajy";

const palette = {
  bg: "#F3F6F3",
  panel: "#FFFFFF",
  text: "#243128",
  textSoft: "#4C5A52",
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
    role: "编导 / 摄像 / 后期结构梳理",
    summary: "以视障女性创业者为核心人物的毕业设计纪录片，完成长期跟拍、采访组织与后期叙事结构搭建。",
    highlight: "15 分钟成片 / EKA 天物创意奖二等奖",
    accent: "linear-gradient(135deg, #EAF4FB 0%, #9EBEED 55%, #4E90F5 100%)",
    coverType: "image",
    cover: documentaryCover,
    tags: ["纪录片", "长期跟拍", "编导判断"],
    situation: "毕业设计需要做出一部既有社会观察价值、又能避免同质化表达的人物纪录片，我最终把镜头放在视障女性创业者的职业转型上。",
    action: "完成选题判断、资料调研、采访设计、长期跟拍、现场拍摄与后期结构梳理，把人物命运、社会议题和叙事节奏放进同一条线上。",
    result: "完成 15 分钟人物纪录片成片，入选毕业设计展并获得 2025 EKA 天物创意奖二等奖。",
    detailIntro: "这部片子里，编导做的不是替人物下结论，而是陪她走进生活现场，再把真正有重量的转折留下来。",
    detailPoints: [
      "前期先用大量资料和接触排除掉常见公益叙事，最后把主题压在“创业转型”与“社会连接”上。",
      "拍摄中采用长期观察 + 固定采访双保险，让后期既有情绪流，也有清晰的结构锚点。",
      "后期主动舍弃碎片化的感情线，把重心收回职业困境、行动选择和人物弧光。"
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
    detailIntro: "它不只是一次宣发窗口里的内容发布，更像是一场和平台节奏、观众情绪一起跑的实验。",
    detailPoints: [
      "标题会往角色反差、情绪钩子和一句话记忆点上靠。",
      "内容既要负责破圈，也要把讨论留住。",
      "复盘不是做完才补一页总结，而是为了下次更快找到有效的表达方式。"
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
    detailIntro: "比起把一份方案写完整，更在意怎么让一个想法被理解、被相信，也真的有机会走到现实里。",
    detailPoints: [
      "先把人群、议题和传播路径想清楚，再去做创意。",
      "提案要有逻辑，但也要让人愿意看下去。",
      "好方案不只是“能讲”，还要有一点真的能发生的可能。"
    ]
  }
];

const caseTimelines: Record<ProjectId, TimelineItem[]> = {
  documentary: [
    { date: "2023.12", title: "确定人物方向", desc: "从公益服务类选题转向视障创业者，把故事重心锁定在职业转型与社会连接上。" },
    { date: "2024.04", title: "进入长期跟拍", desc: "从家中工作、日常生活到公共空间活动，开始持续积累人物行动与关系素材。" },
    { date: "2024.11", title: "补齐采访关系", desc: "围绕人物本人、母亲与伙伴三组关系补拍采访，给后期结构留出解释和对照。" },
    { date: "2025.01", title: "重组叙事重点", desc: "在大量生活变化中重新判断主线，舍弃分散注意力的支线素材。" },
    { date: "2025.05", title: "完成成片展出", desc: "完成 15 分钟成片与创作报告，并进入毕业设计展陈系统。" }
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
  { title: "新华社内容协作", desc: "采访、编稿、拍摄、剪辑——在真实的新闻流程里练习怎么把内容做得更准确，也更完整。" },
  { title: "新闻摄影《旅人》组照", desc: "喜欢用镜头去看人和空间之间那些安静但很有情绪的瞬间。" },
  { title: "沉船逃生互动视频项目", desc: "从脚本到互动叙事，试着让内容不只是被看见，也能被“进入”。" }
];

const personalIntroNotes = [
  { title: "有点子", desc: "喜欢把灵感变成具体表达", tone: palette.blue },
  { title: "不掉线", desc: "事情接到手里就会认真推进", tone: palette.apple },
  { title: "会回头看", desc: "做完也会留一点时间给复盘和整理", tone: palette.teal },
];

const documentaryCapabilities: DocumentaryCapability[] = [
  {
    label: "Topic Choice",
    title: "先判断题，再决定怎么拍",
    detail: "前期从大量同类报道和已拍过的视障题材中做排除，最后把重点放在“事业转型”而不是单纯励志叙事上。",
    tone: palette.blue,
  },
  {
    label: "Field Direction",
    title: "长期观察，给后期留足空间",
    detail: "跟拍之外补入固定机位采访、动作细节与场景对照，让素材既能承接真实变化，也能在后期重组出清晰结构。",
    tone: palette.teal,
  },
  {
    label: "Story Cut",
    title: "敢舍弃，才能把人物立住",
    detail: "后期主动舍弃难以承接主线的感情内容，把镜头重新收回创业困境、职业选择和社会价值的表达上。",
    tone: palette.apple,
  },
];

const documentaryFrames: DocumentaryFrame[] = [
  {
    title: "家中采访",
    desc: "固定机位采访补足人物表达，也为后期提供了清晰的结构锚点。",
    src: documentaryInterviewImage,
  },
  {
    title: "公共空间跟拍",
    desc: "在商场和集市里跟着人物移动，让环境关系一起进入叙事。",
    src: documentaryMarketWideImage,
  },
  {
    title: "触觉细节",
    desc: "不只交代她去了哪里，也记录她如何感知与确认眼前的世界。",
    src: documentaryMarketTouchImage,
  },
  {
    title: "关系移动",
    desc: "跟人物一起走，画面里自然带出她和伙伴之间的协作关系。",
    src: documentaryWalkImage,
  },
  {
    title: "生活动作",
    desc: "晨间动作和琐碎日常，是人物状态最有说服力的部分。",
    src: documentaryMorningImage,
  },
  {
    title: "采访现场",
    desc: "预留采访保险镜头，让情绪流和信息流都能在后期接得住。",
    src: documentarySetImage,
  },
];

const documentaryPeople: DocumentaryPerson[] = [
  {
    name: "马寅青",
    role: "核心人物 / 视障创业者",
    desc: "片子围绕她的工作、转型和自我表达展开，不把她拍成“被说明的人”，而是让她成为叙事主动者。",
    src: documentaryHeroImage,
  },
  {
    name: "宣丽英",
    role: "母亲采访 / 家庭视角",
    desc: "母亲采访帮助故事落回人物成长与创业压力，也让职业选择背后的家庭支撑被看见。",
    src: documentaryMotherImage,
  },
  {
    name: "朱君",
    role: "伙伴采访 / 关系补充",
    desc: "从工作伙伴与伴侣的双重关系切入，让人物在工作场与生活场里的变化形成对照。",
    src: documentaryPartnerImage,
  },
];

const createEvidenceSvg = (title: string, subtitle: string, note: string, toneA: string, toneB: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${toneA}" />
          <stop offset="100%" stop-color="${toneB}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="760" rx="36" fill="#F6FAF6"/>
      <rect x="36" y="36" width="1128" height="688" rx="28" fill="#FFFFFF" stroke="#DCE7DE" stroke-width="2"/>
      <rect x="72" y="72" width="340" height="42" rx="18" fill="url(#g)" opacity="0.16"/>
      <text x="72" y="134" font-size="52" fill="#243128" font-family="Arial, sans-serif" font-weight="700">${title}</text>
      <text x="72" y="186" font-size="24" fill="#5E6B61" font-family="Arial, sans-serif">${subtitle}</text>
      <rect x="72" y="236" width="1056" height="184" rx="24" fill="url(#g)" opacity="0.12"/>
      <rect x="108" y="272" width="180" height="112" rx="18" fill="${toneA}" opacity="0.22"/>
      <rect x="318" y="272" width="180" height="112" rx="18" fill="${toneB}" opacity="0.2"/>
      <rect x="528" y="272" width="180" height="112" rx="18" fill="${toneA}" opacity="0.16"/>
      <rect x="738" y="272" width="180" height="112" rx="18" fill="${toneB}" opacity="0.14"/>
      <rect x="948" y="272" width="144" height="112" rx="18" fill="${toneA}" opacity="0.1"/>
      <rect x="72" y="456" width="328" height="220" rx="24" fill="#F7FBFF" stroke="#DCE7DE"/>
      <rect x="436" y="456" width="328" height="220" rx="24" fill="#F9FBF3" stroke="#DCE7DE"/>
      <rect x="800" y="456" width="328" height="220" rx="24" fill="#F7FBFF" stroke="#DCE7DE"/>
      <text x="104" y="520" font-size="24" fill="#5E6B61" font-family="Arial, sans-serif">Evidence</text>
      <text x="104" y="572" font-size="40" fill="#243128" font-family="Arial, sans-serif" font-weight="700">${note}</text>
      <text x="104" y="618" font-size="24" fill="#5E6B61" font-family="Arial, sans-serif">campaign backend capture</text>
    </svg>`
  );

const bilibiliEvidenceWall: EvidenceItem[] = [
  { title: "后台总览截图", desc: "保留累计播放、点赞、评论、收藏、投币等核心结果。", src: createEvidenceSvg("运营总览", "累计指标与账号数据", "98.7 万播放 / 1.59 万点赞", "#4E90F5", "#9EBEED") },
  { title: "近期稿件对比", desc: "展示不同视频在播放、互动率和涨粉上的差异。", src: createEvidenceSvg("稿件对比", "高播放与高互动稿件", "涨粉最高 / 互动最高", "#94C000", "#4B6B03") },
  { title: "视频列表证明", desc: "展示账号主页上真实发布的内容矩阵与发布时间。", src: createEvidenceSvg("视频列表", "上映窗口内容矩阵", "9 条视频 / 4 条 10 万+", "#1C9AA0", "#4E90F5") },
  { title: "单日爆发面板", desc: "强调五一档节点的单日爆发数据和新增粉丝。", src: createEvidenceSvg("单日爆发", "五一档数据拉升", "41.6 万播放 / 净增粉 53", "#4E90F5", "#94C000") },
  { title: "票房窗口参考", desc: "把内容爆发和电影上映期时间节点对齐。", src: createEvidenceSvg("档期节奏", "上映窗口与热度变化", "4.04 上映 / 5.01 爆发", "#F2B45A", "#4B6B03") },
  { title: "海报与题材基调", desc: "用影片主视觉帮助招聘方理解内容语境与风格。", src: createEvidenceSvg("影片主视觉", "大反派 / Super Villain", "喜剧宣发语境", "#D96C3E", "#B53B2F") },
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
  marginBottom: 36,
  display: "flex",
  alignItems: "center",
  gap: 18,
  fontSize: 15,
  fontWeight: 500,
  letterSpacing: "0.08em",
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

function GeneratedCover({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className="generated-cover" style={{ background: project.accent, minHeight: compact ? 236 : undefined }}>
      <div className="generated-cover-glow" />
      <div className="generated-cover-inner" style={{ minHeight: compact ? 236 : undefined, padding: compact ? 24 : 24 }}>
        <div className="generated-cover-label" style={compact ? { fontSize: 15 } : undefined}>
          {project.subtitle}
        </div>
        <div
          className="generated-cover-title"
          style={compact ? { maxWidth: "10ch", fontSize: "clamp(30px, 2.7vw, 38px)", lineHeight: 1.08 } : undefined}
        >
          {project.title}
        </div>
        <div className="generated-cover-tags" style={compact ? { gap: 8 } : undefined}>
          {project.tags.map((tag) => (
            <span key={tag} style={compact ? { padding: "8px 14px", fontSize: 15, background: "rgba(255,255,255,0.08)" } : undefined}>
              {tag}
            </span>
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
              <div style={{ borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.18)", padding: "10px 18px", fontSize: 15, fontWeight: 500, letterSpacing: "0.08em" }}>
                {project.subtitle}
              </div>
              <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.08em", color: "rgba(255,255,255,0.8)" }}>
                {priority ? "Core Project" : "Project"}
              </div>
            </div>

            <div style={{ marginTop: 56, maxWidth: 820 }}>
              <h2 style={{ maxWidth: "12ch", fontSize: "clamp(36px, 4.2vw, 46px)", fontWeight: 600, lineHeight: 1.14, margin: 0 }}>{project.title}</h2>
              <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.72, letterSpacing: "0.04em", color: "rgba(255,255,255,0.9)" }}>{project.role}</p>
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
                  <div key={block.label} style={{ borderRadius: 24, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.18)", padding: 22, backdropFilter: "blur(8px)" }}>
                    <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.08em", color: "rgba(255,255,255,0.82)" }}>{block.label}</div>
                    <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.82, color: "rgba(255,255,255,0.96)" }}>{block.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-row" style={{ display: "flex", flexDirection: "column", gap: 20, padding: "28px 32px" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.08em", color: palette.blue }}>Business Outcome</div>
            <div style={{ marginTop: 14, fontSize: "clamp(30px, 3vw, 38px)", fontWeight: 550, lineHeight: 1.3, color: palette.text }}>{project.highlight}</div>
          </div>
          <button className="detail-trigger-btn" onClick={() => onOpen(project.id)}>
            看看这个项目
            <ArrowRight size={18} />
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
          <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.08em", color: palette.blue }}>Operations Results / Bilibili Campaign</div>
          <h3 style={{ margin: "18px 0 0", fontSize: "clamp(32px, 4vw, 44px)", lineHeight: 1.22, color: palette.text }}>项目结果 / What Happened</h3>
          <p className="ops-card-copy">上映窗口很短，所以每一次标题、节奏和内容切口都要跑得足够准。最后留下来的，是一组还挺漂亮的数据。</p>
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

function EvidenceWall() {
  return (
    <div className="evidence-grid">
      {bilibiliEvidenceWall.map((item) => (
        <div key={item.title} className="evidence-card">
          <div className="evidence-media">
            <img src={item.src} alt={item.title} />
          </div>
          <div className="evidence-body">
            <div className="evidence-title">{item.title}</div>
            <p className="evidence-copy">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DocumentaryDetailModule() {
  const [leadFrame, ...supportingFrames] = documentaryFrames;

  return (
    <div className="documentary-stack">
      <div className="documentary-overview-grid">
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.08em", color: palette.blue }}>Director&apos;s Lens / Documentary</div>
          <h3 className="documentary-title">不是只记录她做了什么，而是把她怎样继续和世界发生连接这件事拍清楚。</h3>
          <p className="ops-card-copy">
            这次项目最重要的不是“拍到很多素材”，而是判断哪些素材真的能说明人物。选题、关系建立、长期跟拍、采访补位和后期取舍，都是编导工作的一部分。
          </p>
        </div>

        <div className="documentary-watch-card">
          <div className="documentary-watch-label">成片入口</div>
          <div className="documentary-watch-value">15 分钟人物纪录片</div>
          <p className="ops-card-copy">原始文件体量较大，线上项目页先放可直接打开的成片链接，方便浏览和投递使用。</p>
          <div className="hero-actions" style={{ marginTop: 28 }}>
            <a className="primary-btn" href={documentaryWatchLink} target="_blank" rel="noreferrer">
              打开成片
              <Play size={16} />
            </a>
          </div>
          <div className="documentary-watch-meta">
            百度网盘提取码：
            <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace" }}> rajy</span>
          </div>
        </div>
      </div>

      <div className="documentary-capability-grid">
        {documentaryCapabilities.map((item) => (
          <div key={item.title} className="documentary-capability-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div className="documentary-capability-label">{item.label}</div>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: item.tone, flexShrink: 0 }} />
            </div>
            <div className="documentary-capability-title">{item.title}</div>
            <p className="documentary-capability-copy">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="documentary-frame-grid">
        <div className="documentary-frame-card documentary-frame-lead">
          <div className="documentary-frame-media documentary-frame-media-lead">
            <img src={leadFrame.src} alt={leadFrame.title} />
          </div>
          <div className="documentary-frame-body">
            <div className="documentary-frame-title">{leadFrame.title}</div>
            <p className="documentary-frame-copy">{leadFrame.desc}</p>
          </div>
        </div>

        <div className="documentary-frame-side">
          {supportingFrames.map((item) => (
            <div key={item.title} className="documentary-frame-card">
              <div className="documentary-frame-media">
                <img src={item.src} alt={item.title} />
              </div>
              <div className="documentary-frame-body">
                <div className="documentary-frame-title">{item.title}</div>
                <p className="documentary-frame-copy">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="documentary-people-grid">
        {documentaryPeople.map((item) => (
          <div key={item.name} className="documentary-person-card">
            <div className="documentary-person-media">
              <img src={item.src} alt={item.name} />
            </div>
            <div className="documentary-person-body">
              <div className="documentary-person-name">{item.name}</div>
              <div className="documentary-person-role">{item.role}</div>
              <p className="documentary-person-copy">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailPage({
  project,
  onBack,
  onOpen,
  prevProject,
  nextProject,
}: {
  project: Project;
  onBack: () => void;
  onOpen: (id: ProjectId) => void;
  prevProject: Project;
  nextProject: Project;
}) {
  const timeline = caseTimelines[project.id];
  const closingSectionNumber = project.id === "bilibili" ? "06" : project.id === "documentary" ? "05" : "04";

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
                  <div className="detail-page-label">Selected Work</div>
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

          {project.id === "documentary" ? (
            <section className="section-block">
              <SectionLabel number="04" title="Director's Lens" />
              <Panel style={{ borderRadius: 36 }}>
                <div className="dashboard-wrap">
                  <DocumentaryDetailModule />
                </div>
              </Panel>
            </section>
          ) : null}

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

          {project.id === "bilibili" ? (
            <section className="section-block">
              <SectionLabel number="05" title="Evidence Wall" />
              <Panel style={{ borderRadius: 36 }}>
                <div className="dashboard-wrap">
                  <div className="evidence-head">
                    <div>
                      <div className="detail-card-label">Screenshot Evidence</div>
                      <h3 className="evidence-heading">后台截图 / Real Screenshots</h3>
                      <p className="ops-card-copy">把几张最关键的后台截图放在这里，既能看见结果，也能更直观地感受到这次宣发是怎么跑出来的。</p>
                    </div>
                  </div>
                  <EvidenceWall />
                </div>
              </Panel>
            </section>
          ) : null}

          <section className="section-block">
            <SectionLabel number={closingSectionNumber} title="More Cases" />
            <div className="case-switch-grid">
              <button className="case-switch-card" onClick={() => onOpen(prevProject.id)}>
                <div className="case-switch-label">上一页案例</div>
                <div className="case-switch-title">{prevProject.title}</div>
                <div className="case-switch-meta">{prevProject.subtitle}</div>
              </button>
              <button className="case-switch-card" onClick={() => onOpen(nextProject.id)}>
                <div className="case-switch-label">下一页案例</div>
                <div className="case-switch-title">{nextProject.title}</div>
                <div className="case-switch-meta">{nextProject.subtitle}</div>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectId | null>(null);
  const selectedProject = useMemo(() => projects.find((item) => item.id === selectedProjectId) ?? null, [selectedProjectId]);
  const selectedIndex = useMemo(() => projects.findIndex((item) => item.id === selectedProjectId), [selectedProjectId]);
  const prevProject = selectedIndex >= 0 ? projects[(selectedIndex + projects.length - 1) % projects.length] : projects[0];
  const nextProject = selectedIndex >= 0 ? projects[(selectedIndex + 1) % projects.length] : projects[1];

  useEffect(() => {
    if (selectedProjectId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProjectId]);

  if (selectedProject) {
    return (
      <DetailPage
        project={selectedProject}
        onBack={() => setSelectedProjectId(null)}
        onOpen={setSelectedProjectId}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: palette.bg, color: palette.text }}>
      <div className="page-shell">
        <header className="site-header">
          <div className="header-inner">
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.2, color: palette.text }}>陈衍年</div>
              <div style={{ marginTop: 6, fontSize: 15, fontWeight: 500, letterSpacing: "0.06em", color: palette.blue }}>
                Ideas, images, and things becoming real
              </div>
            </div>
            <nav className="desktop-nav">
              <a href="#work">Projects</a>
              <a href="#additional">Additional</a>
              <a href="#contact">Contact</a>
            </nav>
            <a className="ghost-btn" href={resumeFile} download="chen-yannian-resume.pdf" style={{ textDecoration: "none" }}>
              下载简历
            </a>
          </div>
        </header>

        <main className="home-main">
          <section className="hero-section">
            <Panel style={{ borderRadius: 46, boxShadow: "0 18px 44px rgba(36,49,40,0.05)", maxWidth: 1480, margin: "0 auto" }}>
              <div className="hero-card home-hero-stage" style={{ padding: "clamp(32px, 4vw, 60px)" }}>
                <div className="home-hero-identity">
                  <div style={{ fontSize: "clamp(30px, 2.4vw, 38px)", fontWeight: 600, lineHeight: 1.08, color: palette.text }}>陈衍年</div>
                  <div style={{ fontSize: "clamp(16px, 1vw, 18px)", fontWeight: 500, letterSpacing: "0.04em", color: palette.blue }}>
                    Ideas, images, and things becoming real
                  </div>
                </div>

                <h1 className="hero-title home-hero-title" style={{ marginTop: 8 }}>
                  <span className="home-hero-line">有一点想象力，</span>
                  <span className="home-hero-line">也有一点把它变成现实的魔法。</span>
                </h1>

                <div className="home-hero-bottom">
                  <p className="hero-copy home-hero-copy" style={{ margin: 0 }}>
                    影像、内容、策划和执行，都是把脑海里的东西一点点带到现实里的方式。
                  </p>
                  <div className="home-hero-aside">
                    <div className="home-hero-tags">
                      <span>影像内容</span>
                      <span>策划执行</span>
                      <span>项目落地</span>
                    </div>
                    <div className="hero-actions home-hero-actions" style={{ marginTop: 0 }}>
                      <a href="#work" className="primary-btn">
                        先看作品
                        <ArrowRight size={18} />
                      </a>
                      <a className="ghost-large-btn" href={resumeFile} download="chen-yannian-resume.pdf" style={{ textDecoration: "none" }}>
                        下载简历
                        <Download size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </section>

          <section id="work" className="section-block" style={{ paddingTop: 0 }}>
            <div className="home-sheet-wrap">
              <div className="home-works-head" style={{ marginBottom: 40, maxWidth: 860 }}>
                <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.08em", color: palette.blue }}>Selected Works</div>
                <h2
                  style={{
                    margin: "14px 0 0",
                    fontSize: "clamp(34px, 3.2vw, 46px)",
                    lineHeight: 1.18,
                    fontWeight: 600,
                    color: palette.text,
                    textWrap: "balance",
                  }}
                >
                  把想法慢慢做成看得见的东西。
                </h2>
              </div>

              <div className="project-preview-grid">
                {projects.map((item, idx) => {
                  const isFeatured = idx === 0;
                  const softs = ["#F7FBFF", "#F6FBF0", "#F6FBF6"];
                  const dots = [palette.blue, palette.apple, palette.moss];
                  const [leadHighlight, supportingHighlight] = item.highlight.split(" / ");
                  const mediaNode =
                    item.coverType === "image" && item.cover ? (
                      <div className="home-preview-media" style={{ overflow: "hidden", borderRadius: isFeatured ? 24 : 20 }}>
                        <img
                          src={item.cover}
                          alt={item.title}
                          style={{
                            height: isFeatured ? "100%" : "clamp(200px, 13vw, 236px)",
                            minHeight: isFeatured ? 320 : undefined,
                            width: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="home-preview-media">
                        <GeneratedCover project={item} compact />
                      </div>
                    );

                  return (
                    <button key={item.id} className="preview-card-btn" onClick={() => setSelectedProjectId(item.id)}>
                      <Panel style={{ borderRadius: 34, boxShadow: "0 10px 24px rgba(36,49,40,0.04)", height: "100%" }}>
                        {isFeatured ? (
                          <div
                            className="home-preview-card home-preview-card-featured"
                            style={{
                              borderRadius: 28,
                              border: `1px solid ${palette.line}`,
                              padding: "28px 28px 26px",
                              background: softs[idx],
                              textAlign: "left",
                              height: "100%",
                            }}
                          >
                            <div className="home-preview-featured-grid">
                              <div className="home-preview-featured-media">{mediaNode}</div>
                              <div className="home-preview-featured-content">
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: dots[idx], display: "inline-block" }} />
                                    <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: palette.blue }}>{item.subtitle}</div>
                                  </div>
                                  <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: palette.textSoft }}>0{idx + 1}</div>
                                </div>

                                <div
                                  style={{
                                    marginTop: 22,
                                    fontSize: "clamp(38px, 3vw, 50px)",
                                    fontWeight: 600,
                                    lineHeight: 1.08,
                                    color: palette.text,
                                    textWrap: "balance",
                                  }}
                                >
                                  {item.title}
                                </div>

                                <div style={{ marginTop: 18 }}>
                                  <p style={{ margin: 0, fontSize: 19, lineHeight: 1.76, color: palette.textSoft }}>{item.summary}</p>
                                </div>

                                <div style={{ marginTop: "auto", paddingTop: 24, borderTop: `1px solid ${palette.line}` }}>
                                  <p style={{ margin: 0, fontSize: "clamp(22px, 1.8vw, 28px)", lineHeight: 1.42, color: palette.textSoft }}>
                                    <span style={{ fontWeight: 600, color: palette.text }}>{leadHighlight}</span>
                                    {supportingHighlight ? <span style={{ color: dots[idx] }}> · {supportingHighlight}</span> : null}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="home-preview-card home-preview-card-secondary"
                            style={{
                              borderRadius: 28,
                              border: `1px solid ${palette.line}`,
                              padding: "28px 28px 26px",
                              background: softs[idx],
                              textAlign: "left",
                              display: "flex",
                              flexDirection: "column",
                              gap: 0,
                              height: "100%",
                              minHeight: "clamp(480px, 34vw, 560px)",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ width: 10, height: 10, borderRadius: "50%", background: dots[idx], display: "inline-block" }} />
                                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: palette.blue }}>{item.subtitle}</div>
                              </div>
                              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: palette.textSoft }}>0{idx + 1}</div>
                            </div>

                            <div style={{ marginTop: 20 }}>{mediaNode}</div>

                            <div
                              style={{
                                marginTop: 22,
                                fontSize: "clamp(32px, 2.5vw, 40px)",
                                fontWeight: 600,
                                lineHeight: 1.08,
                                color: palette.text,
                                textWrap: "balance",
                              }}
                            >
                              {item.title}
                            </div>

                            <div style={{ marginTop: 16 }}>
                              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.72, color: palette.textSoft }}>{item.summary}</p>
                            </div>

                            <div style={{ marginTop: "auto", paddingTop: 18, borderTop: `1px solid ${palette.line}` }}>
                              <p style={{ margin: 0, fontSize: "clamp(18px, 1.4vw, 22px)", lineHeight: 1.45, color: palette.textSoft }}>
                                <span style={{ fontWeight: 600, color: palette.text }}>{leadHighlight}</span>
                                {supportingHighlight ? <span style={{ color: dots[idx] }}> · {supportingHighlight}</span> : null}
                              </p>
                            </div>
                          </div>
                        )}
                      </Panel>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="section-block" style={{ paddingTop: 8 }}>
            <Panel style={{ borderRadius: 40, boxShadow: "0 12px 28px rgba(36,49,40,0.035)", maxWidth: 1480, margin: "0 auto" }}>
              <div
                className="dashboard-wrap home-about-shell"
                style={{
                  padding: "clamp(28px, 3.8vw, 52px)",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(247,250,247,0.96) 50%, rgba(250,247,241,0.92))",
                  borderRadius: 40,
                }}
              >
                <div className="home-about-copy">
                  <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.08em", color: palette.blue }}>About Me</div>
                  <h2
                    style={{
                      margin: "20px 0 0",
                      maxWidth: 760,
                      fontSize: "clamp(44px, 3.6vw, 60px)",
                      lineHeight: 1.12,
                      fontWeight: 600,
                      color: palette.text,
                      textWrap: "balance",
                    }}
                  >
                    一个有点子，
                    <br />
                    也很会把事情做出来的人。
                  </h2>
                  <p
                    style={{
                      margin: "22px 0 0",
                      maxWidth: 780,
                      fontSize: "clamp(22px, 1.45vw, 26px)",
                      lineHeight: 1.78,
                      color: palette.textSoft,
                    }}
                  >
                    会做内容，会推项目，也会认真回头看看——让好想法不只停在想法里。
                  </p>
                  <div
                    style={{
                      marginTop: 18,
                      fontSize: 20,
                      fontWeight: 500,
                      lineHeight: 1.6,
                      letterSpacing: "0.03em",
                      color: "#8A958D",
                      fontStyle: "italic",
                    }}
                  >
                    Good ideas deserve to come true.
                  </div>
                </div>

                <div className="home-about-notes-grid">
                  {personalIntroNotes.map((item) => (
                    <div
                      key={item.title}
                      className="home-about-note"
                      style={{
                        borderRadius: 28,
                        border: `1px solid ${palette.line}`,
                        background: "rgba(255,255,255,0.78)",
                        padding: "28px 28px 26px",
                        boxShadow: "0 6px 14px rgba(36,49,40,0.02)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: item.tone,
                            flexShrink: 0,
                          }}
                        />
                        <div
                          style={{
                            fontSize: "clamp(26px, 1.6vw, 32px)",
                            lineHeight: 1.22,
                            fontWeight: 600,
                            color: palette.text,
                          }}
                        >
                          {item.title}
                        </div>
                      </div>
                      <p
                        style={{
                          margin: "14px 0 0",
                          fontSize: 20,
                          lineHeight: 1.7,
                          color: palette.textSoft,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
          </section>

          <section id="case-studies" className="section-block">
            <div className="home-sheet-wrap">
              <SectionLabel number="01" title="CASE STUDIES" />
              <div style={{ display: "grid", gap: 24 }}>
                <CaseCard project={projects[0]} onOpen={setSelectedProjectId} priority />
                <CaseCard project={projects[1]} onOpen={setSelectedProjectId} />
                <CaseCard project={projects[2]} onOpen={setSelectedProjectId} />
              </div>
            </div>
          </section>

          <section className="section-block">
            <div className="home-sheet-wrap">
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
            </div>
          </section>

          <section id="additional" className="section-block">
            <div className="home-sheet-wrap">
              <SectionLabel number="03" title="MORE" />
              <Panel style={{ borderRadius: 36, boxShadow: "0 8px 20px rgba(36,49,40,0.03)" }}>
                <div className="dashboard-wrap">
                  <div style={{ marginBottom: 24, fontSize: 15, fontWeight: 500, letterSpacing: "0.08em", color: palette.blue }}>MORE</div>
                  <h2 style={{ margin: "0 0 32px", fontSize: "clamp(32px, 3.8vw, 46px)", lineHeight: 1.22, fontWeight: 600, color: palette.text }}>
                    还有一些零零碎碎、但也很喜欢的小事。
                  </h2>
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
            </div>
          </section>

          <section id="contact" className="contact-section">
            <div className="home-sheet-wrap">
              <SectionLabel number="04" title="Contact" />
              <div className="contact-grid">
                <div>
                  <h2 className="contact-title">
                    如果你刚好也喜欢把想法做成现实，
                    <br />
                    欢迎来找我。
                  </h2>
                  <p className="contact-copy">无论是内容、影像、策划，还是一个还在发光的项目灵感，都很愿意继续聊下去。</p>
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
                      <a className="primary-btn" href={resumeFile} download="chen-yannian-resume.pdf">
                        下载简历
                        <Download size={16} />
                      </a>
                      <a href="#work" className="ghost-large-btn" style={{ textDecoration: "none" }}>
                        回到作品
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                </Panel>
              </div>
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
  bilibiliEvidenceWall.length === 6,
  bayerVisuals.length === 2,
  documentaryCapabilities.length === 3,
  documentaryFrames.length === 6,
  documentaryPeople.length === 3,
].every(Boolean);

if (!sanityChecks) {
  throw new Error("Portfolio data is incomplete.");
}
