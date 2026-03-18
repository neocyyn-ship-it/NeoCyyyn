import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Download, Mail, Pause, Phone, Play } from "lucide-react";
import documentaryHeroImage from "./assets/documentary-hero.jpg";
import documentaryInterviewImage from "./assets/documentary-interview.jpg";
import documentaryMarketTouchImage from "./assets/documentary-market-touch.jpg";
import documentaryMarketWideImage from "./assets/documentary-market-wide.jpg";
import documentaryMorningImage from "./assets/documentary-morning.jpg";
import documentaryMotherImage from "./assets/documentary-mother.jpg";
import documentaryPartnerImage from "./assets/documentary-partner.jpg";
import documentarySetImage from "./assets/documentary-set.jpg";
import documentaryWalkImage from "./assets/documentary-walk.jpg";
import bayerMallImage from "./assets/bayer-mall.jpg";
import bayerPosterImage from "./assets/bayer-poster.png";
import bayerProductsImage from "./assets/bayer-products.jpg";
import bayerStageImage from "./assets/bayer-stage.jpg";
import bayerVenueImage from "./assets/bayer-venue.jpg";
import bayerVrImage from "./assets/bayer-vr.jpg";

type ProjectId = "documentary" | "sinkingShip" | "bilibili" | "bayer";

type Project = {
  id: ProjectId;
  title: string;
  titleLines?: string[];
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
type ExperienceLink = { label: string; href: string; meta: string };
type ExperienceItem = {
  title: string;
  desc: string;
  links?: ExperienceLink[];
  note?: string;
  featured?: boolean;
  href?: string;
  actionLabel?: string;
};
type EvidenceItem = { title: string; desc: string; src: string };
type DocumentaryCapability = { label: string; title: string; detail: string; tone: string };
type DocumentaryFrame = { title: string; desc: string; src: string };
type DocumentaryPerson = { name: string; role: string; desc: string; src: string };
type BayerStrategyCard = { label: string; title: string; detail: string; tone: string };
type BayerPhase = { title: string; desc: string; src: string };
type SiteSectionId = "home" | "about" | "projects" | "experience" | "contact";
type SiteSection = { id: SiteSectionId; label: string; cue: string; index: string };
type XinhuaSectionData = { label: string; title: string; intro: string; meta: string[] };
type AIFeatureMetric = { label: string; value: string };
type AIFeatureStep = { label: string; title: string; detail: string; tone: string };
type AIFeatureVideo = { title: string; detail: string; note: string; src: string };
type XinhuaWork = {
  id: string;
  title: string;
  tag: string;
  year: string;
  link: string;
  summary: string;
  role: string;
};

const baseUrl = import.meta.env.BASE_URL;
const documentaryCover = documentaryHeroImage;
const resumeFile = `${baseUrl}assets/chen-yannian-resume.pdf`;
const documentaryWatchLink = "https://pan.baidu.com/s/15sMVeJ_CkSf2tGbXJz0EXw?pwd=rajy";
const aiFashionDraftVideo = `${baseUrl}assets/ai-fashion-draft.mp4`;
const aiFashionEditedVideo = `${baseUrl}assets/ai-fashion-edited.mp4`;

const palette = {
  bg: "#EFE9DE",
  panel: "#FBF8F2",
  text: "#181716",
  textSoft: "#5C564D",
  line: "#D8D0C5",
  blue: "#1F4F8F",
  sky: "#95ADC9",
  apple: "#7B8F4D",
  moss: "#475A31",
  teal: "#2D6F70",
};

const PROJECT_AUTOPLAY_MS = 6800;
const XINHUA_AUTOPLAY_MS = 6200;

const projects: Project[] = [
  {
    id: "documentary",
    title: "纪录片《视界之外》",
    titleLines: ["纪录片", "《视界之外》"],
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
    titleLines: ["《大反派》", "B站运营宣发"],
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
    titleLines: ["拜耳724", "传播策划"],
    subtitle: "PR Strategy Case",
    role: "项目负责人 / 洞察分析 / 提案表达",
    summary: "大学生公共关系策划创业大赛提案项目，围绕“724 国际自我保健日”为拜耳健康消费品搭建整合传播方案。",
    highlight: "公关策划创业大赛三等奖",
    accent: "linear-gradient(135deg, #F3F6F3 0%, #9EBEED 55%, #94C000 100%)",
    coverType: "image",
    cover: bayerPosterImage,
    tags: ["传播提案", "受众洞察", "竞赛项目"],
    situation: "比赛要求围绕品牌议题提出一套面对年轻群体的公共关系方案。我把切口放在拜耳品牌认知模糊、科技优势不够被看见，以及 Z 世代健康盲区之间的连接上。",
    action: "负责行业调研、SWOT 分析、目标人群拆解、传播路径设计、活动架构和提案视觉整理，把一套竞赛型方案做成能讲清逻辑也能看见画面的完整提案。",
    result: "输出围绕 724 国际自我保健日的三段式传播提案，并获得第九届中国大学生公共关系策划创业大赛三等奖。",
    detailIntro: "这是一个竞赛提案，但我不想只做空泛口号，而是尽量把问题、受众、媒介和现场体验都搭成一套能说服人的传播结构。",
    detailPoints: [
      "先把品牌问题拆成“科研认知弱、品牌定位混淆、公益影响力不足”三类，再决定策略主线。",
      "围绕 Z 世代的信息获取习惯和健康误区搭建提案，不把年轻人只当流量入口，而是当真正的沟通对象。",
      "把传播路径拆成预热、互动、主展演三段，让提案不只停在一页口号，而是能落到媒介排期和空间触点。"
    ]
  },
  {
    id: "sinkingShip",
    title: "沉船逃生互动视频项目",
    titleLines: ["沉船逃生", "互动视频"],
    subtitle: "Interactive Video Case",
    role: "策划 / 剧情树梳理 / 剪辑执行",
    summary: "基于真实沉船事故改编的 B 站互动视频课程项目，用学生、乘客、船员三条身份线和 23 个结局，让观众在选择中进入灾难现场。",
    highlight: "23 个结局 / 3 条角色线 / 23:57 互动视频",
    accent: "linear-gradient(135deg, #EAF1F8 0%, #9EB6C9 50%, #3C4F67 100%)",
    coverType: "generated",
    tags: ["互动视频", "叙事设计", "剪辑执行"],
    situation: "课程希望尝试融合新闻和互动视频的表达方式，我们最终没有把它做成单纯追求刺激的“逃生游戏”，而是想让观众在选择里感受到灾难现场的信息误判、时间压力和求生判断。",
    action: "我负责提出视频设想并编写策划案，整理资料和事故时间线，把学生、乘客、船员三条线梳理成剧情树，同时承担船员线、乘客线剪辑，以及片头和“真相”部分制作。",
    result: "最终完成一支总时长 23:57 的 B 站互动视频，设置 23 个结局和三条身份线，让项目既能被进入，也能在结尾重新回到真实事故本身。",
    detailIntro: "这不是把灾难题材做成刺激性的互动闯关，而是希望观众在一次次选择里，更具体地感受到事故过程、判断失误和失去是怎样发生的。",
    detailPoints: [
      "从设想到策划案，先把互动视频的方向、资料来源和真实事件框架搭起来。",
      "把学生、乘客、船员三条身份线整理成完整剧情树，让分支选择和时间推进保持清楚的逻辑。",
      "负责船员线、乘客线剪辑，以及片头和“真相”部分制作，让互动体验最终回到真实事件的反思。"
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
  sinkingShip: [
    { date: "3.14 - 3.30", title: "提出设想", desc: "先了解融合新闻的形式与表达，再由组内提出构想、投票筛选，确定互动视频方向。" },
    { date: "4.1 - 4.13", title: "搭建剧本", desc: "结合电影与资料，把事故过程拆成学生、乘客、船员三条线，写剧本并整理成剧情树。" },
    { date: "4.13 - 4.20", title: "剪辑与审核", desc: "一边推进画面和剪辑，一边修改剧本、检查逻辑，补全片头与“真相”部分。" },
    { date: "4.30", title: "完成交付", desc: "在课程节点前完成成片、互动分支与报告整理。" }
  ],
  bilibili: [
    { date: "2024.04.04", title: "上映节点启动", desc: "围绕电影上映窗口开始集中发布内容。" },
    { date: "2024.05.01", title: "五一流量爆发", desc: "高情绪切口内容带来显著播放与互动抬升。" },
    { date: "2024.05.09", title: "形成复盘结论", desc: "整理出高播放、高涨粉和高互动内容规律。" }
  ],
  bayer: [
    { date: "调研阶段", title: "定义品牌问题", desc: "从行业、竞品和品牌现状切入，把传播问题先拆清楚。" },
    { date: "洞察阶段", title: "锁定 Z 世代视角", desc: "围绕年轻人的健康盲区、社交表达和平台习惯确定核心沟通对象。" },
    { date: "策划阶段", title: "搭建三段式提案", desc: "用 VR 体验展、互动展和 7.24 主展演串起完整传播路径。" },
    { date: "答辩阶段", title: "完成提案路演", desc: "把策略逻辑、活动结构、媒介排期和预算整合成比赛展示方案。" }
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
  {
    title: "新华社实习作品集",
    desc: "把实习期间参与的新华社融媒作品和网页稿件集中放在这里，方便直接打开查看成品页面。",
    featured: true,
    note: "共整理 7 个作品链接；原始列表里的重复网页稿件已去重。",
    links: [
      { label: "融媒作品 01", href: "https://h.xinhuaxmt.com/vh512/share/11567023?d=134b1e2&channel=weixin", meta: "h.xinhuaxmt.com" },
      { label: "融媒作品 02", href: "https://h.xinhuaxmt.com/vh512/share/11581193?d=134b232&channel=weixin", meta: "h.xinhuaxmt.com" },
      { label: "融媒作品 03", href: "https://h.xinhuaxmt.com/vh512/share/11593645?d=134b23a&channel=weixin", meta: "h.xinhuaxmt.com" },
      { label: "融媒作品 04", href: "https://h.xinhuaxmt.com/vh512/share/11614388?d=134b249&channel=weixin", meta: "h.xinhuaxmt.com" },
      { label: "融媒作品 05", href: "https://h.xinhuaxmt.com/vh512/share/11619493?d=134b291&channel=weixin", meta: "h.xinhuaxmt.com" },
      { label: "融媒作品 06", href: "https://h.xinhuaxmt.com/vh512/share/11641855?d=134b2a1&channel=weixin", meta: "h.xinhuaxmt.com" },
      { label: "网页报道", href: "http://sh.news.cn/20230912/35d5d91126f34a3596fc4118459d4450/c.html", meta: "sh.news.cn" },
    ],
  },
];

const sinkingShipProject = {
  title: "沉船逃生互动视频项目",
  label: "Interactive Video / Bilibili",
  link: "https://www.bilibili.com/video/BV1RA4y1Q76c?share_source=copy_web",
  intro:
    "这是一次把真实事故改编成互动视频的课程项目。我们没有把它做成单纯追求刺激的“逃生游戏”，而是希望玩家在学生、乘客、船员三条身份线中不断做选择时，对事故过程、信息误判和求生判断产生更具体的感受。",
  background:
    "项目取材于 4·16 韩国客轮沉没事故，以船上学生、教师、船务人员与其他乘客的不同身份视角推进剧情。视频开头提供学生线、乘客线、船员线（审判线）三条故事线，并通过不同选择通向 23 个结局。",
  endingNote:
    "互动视频的结尾会回到剧本缘由与真实惨案本身，让玩家在完成一次“进入式体验”之后，再回看灾难中的迟疑、误判和失去。",
  metrics: [
    { label: "项目形式", value: "B站互动视频" },
    { label: "总时长", value: "23:57" },
    { label: "结局数量", value: "23" },
    { label: "角色线", value: "学生 / 乘客 / 船员" },
  ],
  process: [
    {
      date: "3.14 - 3.30",
      title: "提出设想",
      desc: "先了解融合新闻的形式与表达，再由组内提出构想、投票筛选，确定互动视频方向。",
    },
    {
      date: "4.1 - 4.13",
      title: "搭建剧本",
      desc: "结合电影与资料，把事故过程拆成学生、乘客、船员三条线，写剧本并整理成剧情树。",
    },
    {
      date: "4.13 - 4.20",
      title: "剪辑与审核",
      desc: "一边推进画面和剪辑，一边修改剧本、检查逻辑，补全片头与“真相”部分。",
    },
    {
      date: "4.30",
      title: "完成交付",
      desc: "在课程节点前完成成片、互动分支与报告整理。",
    },
  ],
  roles: [
    "提出本次视频设想并编写策划案。",
    "整理资料、总结真相，并在观影后梳理最初的事故时间线。",
    "寻找视频制作素材，负责船员线和乘客线的剪辑，以及片头和“真相”部分制作。",
    "把剧本梳理成完整剧情树，并与组员共同审核和修改剧本。",
    "完成报告初稿。",
  ],
};

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

const bayerStrategyCards: BayerStrategyCard[] = [
  {
    label: "Problem Definition",
    title: "先把品牌认知问题拆清楚",
    detail: "提案不是直接想活动，而是先把问题压缩成三件事：科研优势不够被看见、品牌定位混淆、公益影响力传播不足。",
    tone: palette.blue,
  },
  {
    label: "Audience Insight",
    title: "把 Z 世代当成真正的沟通对象",
    detail: "围绕信息过载、健康误区、社交表达和参与感需求来设计传播切口，而不是只把年轻人当作投放对象。",
    tone: palette.teal,
  },
  {
    label: "Campaign Structure",
    title: "用三段活动把路径搭完整",
    detail: "从 7 月上旬预热，到 7.15-7.16 互动展，再到 7.24 主展演，把“认知建立 - 参与互动 - 集中爆发”串成一条线。",
    tone: palette.apple,
  },
  {
    label: "Media Logic",
    title: "线上线下一起发力",
    detail: "把微博、抖音、B 站、小红书和线下空间、KOL 打卡、直播内容打通，让提案既能讲传播逻辑，也能看见落点。",
    tone: palette.moss,
  },
];

const bayerPhases: BayerPhase[] = [
  {
    title: "科技·Z 时代",
    desc: "把产品教育转成可体验的 VR 场景，让“科技赋能健康”不再只是口号，而是能被年轻人进入和感知的第一现场。",
    src: bayerVrImage,
  },
  {
    title: "青春·Z 时代",
    desc: "用商场互动展、游戏机制和打卡传播承接参与感，让品牌和人群之间真正发生接触。",
    src: bayerMallImage,
  },
  {
    title: "新势力·Z 时代",
    desc: "把最终活动收束到 7.24 主展演，用舞台、产品展区和品牌叙事完成集中表达。",
    src: bayerStageImage,
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

const createBayerAwardSvg = () =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F2A35B" />
          <stop offset="55%" stop-color="#C8CEDA" />
          <stop offset="100%" stop-color="#5DA7E6" />
        </linearGradient>
        <linearGradient id="seal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#D0E449" />
          <stop offset="100%" stop-color="#4E90F5" />
        </linearGradient>
      </defs>
      <rect width="1200" height="760" rx="36" fill="url(#bg)"/>
      <rect x="44" y="44" width="1112" height="672" rx="28" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.35)"/>
      <text x="84" y="138" font-size="54" fill="#ffffff" font-family="Arial, sans-serif">第九届中国大学生</text>
      <text x="84" y="204" font-size="54" fill="#ffffff" font-family="Arial, sans-serif">公共关系策划创业大赛</text>
      <text x="84" y="266" font-size="28" fill="rgba(255,255,255,0.92)" font-family="Arial, sans-serif">THE 9th CHINA UNIVERSITY STUDENTS PR PLAN CONTEST</text>
      <circle cx="960" cy="182" r="118" fill="url(#seal)" stroke="rgba(255,255,255,0.45)" stroke-width="16"/>
      <text x="960" y="166" text-anchor="middle" font-size="38" fill="#ffffff" font-family="Arial, sans-serif">团队获奖</text>
      <text x="960" y="222" text-anchor="middle" font-size="86" fill="#ffffff" font-family="Arial, sans-serif" font-weight="700">三等奖</text>
      <rect x="84" y="328" width="610" height="246" rx="26" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.28)"/>
      <text x="120" y="392" font-size="28" fill="#144B96" font-family="Arial, sans-serif">策划主题：Z时代的健康指南</text>
      <text x="120" y="454" font-size="26" fill="#144B96" font-family="Arial, sans-serif">参赛项目：拜耳“724国际自我保健日”传播提案</text>
      <text x="120" y="516" font-size="26" fill="#144B96" font-family="Arial, sans-serif">获奖说明：第九届中国大学生公关策划创业大赛获奖证书</text>
      <text x="120" y="578" font-size="26" fill="#144B96" font-family="Arial, sans-serif">证书编号：NO.KJ2230903067</text>
      <text x="84" y="664" font-size="24" fill="rgba(255,255,255,0.92)" font-family="Arial, sans-serif">China International Public Relations Association / CUSPRPC</text>
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

const bayerEvidenceWall: EvidenceItem[] = [
  { title: "获奖证明", desc: "第九届中国大学生公共关系策划创业大赛三等奖。", src: createBayerAwardSvg() },
  { title: "项目主 KV", desc: "围绕“寻找健康人生 / 724 国际自我保健日”的主视觉方向。", src: bayerPosterImage },
  { title: "产品展示想象", desc: "把品牌沟通落到可见的产品与消费场景，不让提案停在抽象口号。", src: bayerProductsImage },
  { title: "场馆与空间", desc: "从商场互动展到会展中心主场馆，提案里把不同阶段的空间触点一起考虑。", src: bayerVenueImage },
];

const bayerVisuals: VisualItem[] = [
  {
    title: "主 KV 海报",
    desc: "比赛提案中的主视觉方向，用“寻找健康人生”统一整套活动语气。",
    src: bayerPosterImage,
  },
  {
    title: "主展演舞台",
    desc: "7.24 主展演的舞台设想图，把“科技感”真正落实到空间表达里。",
    src: bayerStageImage,
  }
];

const siteSections: SiteSection[] = [
  { id: "home", label: "Home", cue: "Introduction", index: "01" },
  { id: "projects", label: "Projects", cue: "Case browser", index: "02" },
  { id: "experience", label: "Experience", cue: "Practice", index: "03" },
  { id: "contact", label: "Contact", cue: "Reach out", index: "04" },
];

const xinhuaSection: XinhuaSectionData = {
  label: "XINHUA SHANGHAI / INTERNSHIP",
  title: "新华社上海分社实习报道",
  intro:
    "2023 年 6 月至 12 月，我在新华社上海分社音视频采编部参与新闻内容实践，工作覆盖热点观察、实地调研、采访拍摄、脚本撰写、视频剪辑等，报道方向涉及心理健康、民生科普、城市观察、消费报道和乡村振兴。",
  meta: ["2023.06 — 2023.12", "Audio / Video / Reporting", "08 Works"],
};

const xinhuaWorks: XinhuaWork[] = [
  {
    id: "xinhua-01",
    title: "“600号”来信｜国际禁毒日，我们来说说“成瘾”",
    tag: "心理健康 / 公共议题",
    year: "2023",
    link: "https://h.xinhuaxmt.com/vh512/share/11567023?d=134b1e2&channel=weixin",
    summary: "围绕国际禁毒日话题，讨论毒品成瘾、酒精成瘾及网络、游戏、手机等行为成瘾，强调成瘾背后的心理机制，以及及时寻求专业帮助的重要性。",
    role: "Video / Reporting",
  },
  {
    id: "xinhua-02",
    title: "“600号”来信｜钢琴家孔祥东：我如何走出抑郁阴霾",
    tag: "人物故事 / 心理健康",
    year: "2023",
    link: "https://h.xinhuaxmt.com/vh512/share/11581193?d=134b232&channel=weixin",
    summary: "通过孔祥东的亲身经历，讲述其在事业高峰期陷入抑郁、接受治疗，并借由音乐重新找回快乐与价值的过程。",
    role: "Video / Storytelling",
  },
  {
    id: "xinhua-03",
    title: "“三伏天晒背”火了，医生提醒不要盲目跟风",
    tag: "民生科普",
    year: "2023",
    link: "https://h.xinhuaxmt.com/vh512/share/11593645?d=134b23a&channel=weixin",
    summary: "聚焦“三伏天晒背”热潮，从医生视角解释其适用边界与风险，提醒大众不要盲目跟风，以免引发晒伤或中暑等问题。",
    role: "Reporting / Public Health",
  },
  {
    id: "xinhua-04",
    title: "上海崇明：高标准推进世界级生态岛建设",
    tag: "城市发展 / 乡村振兴",
    year: "2023",
    link: "https://h.xinhuaxmt.com/vh512/share/11614388?d=134b249&channel=weixin",
    summary: "围绕崇明生态岛建设，呈现生态保护、绿色农业、科技创新、交通建设与乡村振兴等多个维度的发展图景。",
    role: "Reporting / City Observation",
  },
  {
    id: "xinhua-05",
    title: "上海：土特产“抱团”闯市场 在潮流地标遇见“崇明好物”",
    tag: "消费观察 / 乡村振兴",
    year: "2023",
    link: "https://h.xinhuaxmt.com/vh512/share/11619493?d=134b291&channel=weixin",
    summary: "以“崇明好物”旗舰店为切口，讲述崇明如何通过品牌化、标准化和渠道建设，推动区域土特产与文创产品走向更广阔的消费市场。",
    role: "Reporting / Feature",
  },
  {
    id: "xinhua-06",
    title: "上海：月饼销售渐入旺季 老字号飘出“创新味”",
    tag: "消费报道",
    year: "2023",
    link: "https://h.xinhuaxmt.com/vh512/share/11641855?d=134b2a1&channel=weixin",
    summary: "观察上海中秋消费市场，聚焦老字号月饼品牌如何通过新口味与新包装吸引年轻群体，体现节令消费与城市商业活力。",
    role: "Reporting / Consumer",
  },
  {
    id: "xinhua-07",
    title: "上海：焙烤能手同台竞技 创意碰撞美味对决",
    tag: "赛事报道 / 行业观察",
    year: "2023",
    link: "http://sh.news.cn/20230912/35d5d91126f34a3596fc4118459d4450/c.html",
    summary: "报道焙烤职业技能竞赛上海赛区选拔赛，呈现烘焙技艺展示、创意月饼比拼和行业工匠精神。",
    role: "Reporting / Event",
  },
  {
    id: "xinhua-08",
    title: "在上海·圆桌派｜上海自贸区十年再出发",
    tag: "专题报道",
    year: "2023",
    link: "",
    summary: "Details pending.",
    role: "Pending",
  },
];

const xinhuaPracticeNotes = [
  { label: "工作流程", text: "热点观察、实地调研、采访拍摄、采访提纲、脚本撰写、视频剪辑。" },
  { label: "报道方向", text: "心理健康、民生科普、城市观察、消费报道和乡村振兴等多类题材。" },
  { label: "成长路径", text: "从协作参与，逐步成长到能独立完成部分采访和视频编辑。" },
];

const aiFashionFeatureMetrics: AIFeatureMetric[] = [
  { label: "项目属性", value: "匿名化 Spec Case" },
  { label: "输出内容", value: "2 支 17 秒竖屏样片" },
  { label: "核心工具", value: "TapNow / AI Video / Edit" },
  { label: "能力重点", value: "AI 策划与风格统一" },
];

const aiFashionFeatureSteps: AIFeatureStep[] = [
  {
    label: "Benchmark",
    title: "先挑对参考，再决定往哪里学。",
    detail:
      "从高奢、轻奢与成熟品牌账号里筛选近期案例，不直接抄形式，而是先判断哪些内容真的建立了控制感、节奏感和品牌气质。",
    tone: palette.blue,
  },
  {
    label: "TapNow",
    title: "把直觉拆成可以执行的镜头语言。",
    detail:
      "用 TapNow 拆解镜号、景别、运动、光线和音乐节奏，把参考片里的“好看”拆成后续可以重组的分镜结构。",
    tone: palette.sky,
  },
  {
    label: "AI First Pass",
    title: "先让 AI 出方向，再判断哪里不对。",
    detail:
      "根据品牌时长要求，把镜头语言压缩成 17 秒竖屏样片，先验证材质、廓形和氛围是否成立，而不是一开始就追求完美成片。",
    tone: palette.apple,
  },
  {
    label: "Edit Polish",
    title: "把 AI 的偏差收回来，才是真的完成。",
    detail:
      "AI 初稿可以帮我快速验证方向，但也会出现款式偏差和节奏松散的问题。最后再通过剪辑和整体节奏整理，把样片收回可呈现状态。",
    tone: palette.moss,
  },
];

const aiFashionFeatureVideos: AIFeatureVideo[] = [
  {
    title: "纯 AI 生成版",
    detail: "用于确认镜头方向、材质氛围和整体节奏是否成立。",
    note: "优势是快，问题也暴露得很直接，比如服装类别和画面稳定性会发生偏差。",
    src: aiFashionDraftVideo,
  },
  {
    title: "剪辑修正版",
    detail: "保留有效镜头后重新整理节奏和品牌呈现，更接近可投递的样片版本。",
    note: "这一版更能说明我不只是会生成，也会判断哪里该删、哪里该收、哪里需要重新定调。",
    src: aiFashionEditedVideo,
  },
];

const xinhuaCardGradients = [
  "linear-gradient(160deg, #173a63 0%, #214f84 48%, #e8dcc7 100%)",
  "linear-gradient(160deg, #52463e 0%, #8f6f57 55%, #efe3d1 100%)",
  "linear-gradient(160deg, #395a4c 0%, #5d7c6d 55%, #ece3d5 100%)",
  "linear-gradient(160deg, #38496a 0%, #6178a0 58%, #ece5d9 100%)",
];

const projectSpotlights: Record<ProjectId, string[]> = {
  documentary: ["15 分钟人物纪录片", "长期跟拍与采访组织", "导演 / 摄影 / 后期叙事结构", "2025 EKA 天物创意奖二等奖"],
  sinkingShip: ["B站互动视频课程项目", "3 条身份线 / 23 个结局", "策划案 + 剧情树 + 剪辑执行", "基于真实事故改编的进入式叙事"],
  bilibili: ["累计播放 98.7 万", "4 条视频突破 10 万", "内容节奏与标题优化", "宣发窗口内快速复盘迭代"],
  bayer: ["公关策略提案项目", "品牌问题拆解与受众洞察", "线下展演与媒介路径设计", "中国大学生公共关系策划创业大赛三等奖"],
};

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

function ProjectTitleLines({ project }: { project: Project }) {
  const lines = project.titleLines ?? [project.title];

  return (
    <>
      {lines.map((line) => (
        <span key={line} className="project-title-line">
          {line}
        </span>
      ))}
    </>
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
          <ProjectTitleLines project={project} />
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

function BayerDetailModule() {
  return (
    <div className="bayer-stack">
      <div className="bayer-overview-grid">
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.08em", color: palette.blue }}>Planning Lens / PR Competition</div>
          <h3 className="bayer-title">这是一次竞赛提案，但我想做的不是空泛口号，而是一套真的能把问题、受众和传播路径讲清楚的方案。</h3>
          <p className="ops-card-copy">
            拜耳这个项目更能体现我做策略时的工作方式。先从品牌问题和行业环境里拆出传播矛盾，再把 Z 世代洞察、媒介路径、活动节奏和现场体验收成一套完整提案。
          </p>
        </div>

        <div className="bayer-summary-card">
          <div className="bayer-summary-label">提案范围</div>
          <div className="bayer-summary-value">3 段线下活动 + 4 个平台联动</div>
          <p className="ops-card-copy">围绕 7.24 国际自我保健日，把预热、互动、主展演做成三段式结构，同时补足媒介排期、预算和视觉设想。</p>
          <div className="bayer-summary-meta">竞赛提案总预算：98.7 万</div>
        </div>
      </div>

      <div className="bayer-strategy-grid">
        {bayerStrategyCards.map((item) => (
          <div key={item.title} className="bayer-strategy-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div className="bayer-strategy-label">{item.label}</div>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: item.tone, flexShrink: 0 }} />
            </div>
            <div className="bayer-strategy-title">{item.title}</div>
            <p className="bayer-strategy-copy">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="bayer-phase-grid">
        {bayerPhases.map((item) => (
          <div key={item.title} className="bayer-phase-card">
            <div className="bayer-phase-media">
              <img src={item.src} alt={item.title} />
            </div>
            <div className="bayer-phase-body">
              <div className="bayer-phase-title">{item.title}</div>
              <p className="bayer-phase-copy">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="evidence-head">
          <div className="detail-card-label">Proposal Evidence</div>
          <h3 className="evidence-heading">证据图 / Award + Key Visuals</h3>
          <p className="ops-card-copy">这里放的不是执行数据，而是这次比赛方案真正能说明问题的证据：获奖证明、主视觉、产品表达和空间设想。</p>
        </div>
        <div className="evidence-grid">
          {bayerEvidenceWall.map((item) => (
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
  const closingSectionNumber =
    project.id === "bilibili" ? "06" : project.id === "documentary" || project.id === "bayer" || project.id === "sinkingShip" ? "05" : "04";

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

          {project.id === "bayer" ? (
            <section className="section-block">
              <SectionLabel number="04" title="Strategy Evidence" />
              <Panel style={{ borderRadius: 36 }}>
                <div className="dashboard-wrap">
                  <BayerDetailModule />
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

          {project.id === "sinkingShip" ? (
            <section className="section-block">
              <SectionLabel number="04" title="Interactive Setup" />
              <Panel style={{ borderRadius: 36 }}>
                <div className="dashboard-wrap">
                  <SinkingShipDetailModule />
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

function ProjectShowcaseMedia({ project }: { project: Project }) {
  return (
    <div className="project-showcase-media">
      {project.coverType === "image" && project.cover ? (
        <img src={project.cover} alt={project.title} />
      ) : (
        <GeneratedCover project={project} />
      )}
    </div>
  );
}

function SinkingShipDetailModule() {
  return (
    <div className="ship-project-stack">
      <div className="ship-project-head">
        <div>
          <div className="detail-card-label">{sinkingShipProject.label}</div>
          <h3 className="ship-project-title">三条身份线和 23 个结局，把观众带进灾难现场。</h3>
          <p className="ship-project-copy">{sinkingShipProject.intro}</p>
        </div>

        <a className="hero-secondary-btn" href={sinkingShipProject.link} target="_blank" rel="noreferrer">
          打开互动视频
          <ArrowUpRight size={18} />
        </a>
      </div>

      <div className="ship-project-metrics">
        {sinkingShipProject.metrics.map((item) => (
          <div key={item.label} className="ship-project-metric">
            <div className="ship-project-metric-label">{item.label}</div>
            <div className="ship-project-metric-value">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="ship-project-grid">
        <div className="sub-card">
          <div className="sub-label">项目背景</div>
          <div className="sub-title">不是为了刺激，而是为了进入和反思。</div>
          <p className="ops-card-copy">{sinkingShipProject.background}</p>
          <p className="ops-card-copy">{sinkingShipProject.endingNote}</p>
        </div>

        <div className="sub-card">
          <div className="sub-label">我的角色</div>
          <div className="sub-title">从设想到剧情树，再到剪辑落地。</div>
          <div className="detail-points ship-project-points">
            {sinkingShipProject.roles.map((item) => (
              <div key={item} className="detail-point-item">
                <span className="detail-point-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AIFashionPlanningFeature() {
  return (
    <Panel style={{ borderRadius: 34, boxShadow: "0 14px 36px rgba(24,23,22,0.06)", marginTop: 28 }}>
      <div id="ai-visual-planning" className="ai-feature-shell">
        <div className="ai-feature-head">
          <div>
            <div className="ai-feature-eyebrow">AI VISUAL PLANNING / SPEC CASE</div>
            <h3 className="ai-feature-title display-title">把 benchmark、分镜拆解和 AI 生成接成一条能落地的样片流程。</h3>
            <p className="ai-feature-copy">
              这是一次面向某女装品牌的匿名化测试案例。公开版只保留方法和结果，不公开品牌诊断细节。重点不是“让 AI 自动出片”，而是把参考判断、
              镜头语言、时长压缩和后期修正接在一起，做成一条可复用的内容策划流程。
            </p>
          </div>

          <div className="ai-feature-note">
            <span className="ai-feature-note-label">Public version</span>
            <span>Brand anonymized</span>
          </div>
        </div>

        <div className="ai-feature-chip-row">
          {["Luxury benchmark screening", "TapNow shot analysis", "AI sample generation", "Editing polish"].map((item) => (
            <span key={item} className="ai-feature-chip">
              {item}
            </span>
          ))}
        </div>

        <div className="ai-feature-metrics">
          {aiFashionFeatureMetrics.map((item) => (
            <div key={item.label} className="ai-feature-metric">
              <div className="ai-feature-metric-label">{item.label}</div>
              <div className="ai-feature-metric-value">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="ai-feature-video-grid">
          {aiFashionFeatureVideos.map((item) => (
            <div key={item.title} className="ai-feature-video-card">
              <div className="ai-feature-video-frame">
                <video src={item.src} controls muted loop playsInline preload="metadata" />
              </div>
              <div className="ai-feature-video-body">
                <div className="ai-feature-video-title">{item.title}</div>
                <p className="ai-feature-video-copy">{item.detail}</p>
                <p className="ai-feature-video-note">{item.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ai-feature-process-grid">
          {aiFashionFeatureSteps.map((item) => (
            <div key={item.label} className="ai-feature-process-card">
              <div className="ai-feature-process-head">
                <span className="ai-feature-process-dot" style={{ background: item.tone }} />
                <div className="ai-feature-process-label">{item.label}</div>
              </div>
              <div className="ai-feature-process-title">{item.title}</div>
              <p className="ai-feature-process-copy">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectId | null>(null);
  const [activeSection, setActiveSection] = useState<SiteSectionId>("home");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeXinhuaIndex, setActiveXinhuaIndex] = useState(0);
  const [isProjectAutoplayEnabled, setIsProjectAutoplayEnabled] = useState(false);
  const [isXinhuaAutoplayEnabled, setIsXinhuaAutoplayEnabled] = useState(false);
  const [isProjectAutoplayPaused, setIsProjectAutoplayPaused] = useState(false);
  const [isXinhuaAutoplayPaused, setIsXinhuaAutoplayPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const selectedProject = useMemo(() => projects.find((item) => item.id === selectedProjectId) ?? null, [selectedProjectId]);
  const selectedIndex = useMemo(() => projects.findIndex((item) => item.id === selectedProjectId), [selectedProjectId]);
  const prevProject = selectedIndex >= 0 ? projects[(selectedIndex + projects.length - 1) % projects.length] : projects[0];
  const nextProject = selectedIndex >= 0 ? projects[(selectedIndex + 1) % projects.length] : projects[1];
  const activeProject = projects[activeProjectIndex];
  const activeXinhuaWork = xinhuaWorks[activeXinhuaIndex];
  const isProjectAutoplayRunning =
    isDesktop && !selectedProjectId && activeSection === "projects" && isProjectAutoplayEnabled && !isProjectAutoplayPaused;
  const isXinhuaAutoplayRunning =
    isDesktop && !selectedProjectId && activeSection === "experience" && isXinhuaAutoplayEnabled && !isXinhuaAutoplayPaused;
  const projectAutoplayLabel = !isProjectAutoplayEnabled ? "Manual" : isProjectAutoplayRunning ? "Auto" : "Paused";
  const xinhuaAutoplayLabel = !isXinhuaAutoplayEnabled ? "Manual" : isXinhuaAutoplayRunning ? "Auto" : "Paused";
  const featuredExperience = additionalWorks.find((item) => item.featured) ?? additionalWorks[0];
  const supportingExperienceWorks = additionalWorks.filter((item) => item.title !== featuredExperience.title);
  const mainRef = useRef<HTMLElement | null>(null);
  const projectWheelLockRef = useRef(0);
  const sectionRefs = useRef<Record<SiteSectionId, HTMLElement | null>>({
    home: null,
    about: null,
    projects: null,
    experience: null,
    contact: null,
  });

  const setSectionRef =
    (id: SiteSectionId) =>
    (node: HTMLElement | null): void => {
      sectionRefs.current[id] = node;
    };

  const scrollToSection = (id: SiteSectionId) => {
    const target = sectionRefs.current[id];
    if (!target) return;
    setActiveSection(id);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToSectionStep = (direction: 1 | -1) => {
    const currentIndex = siteSections.findIndex((section) => section.id === activeSection);
    const target = siteSections[currentIndex + direction];
    if (target) {
      scrollToSection(target.id);
    }
  };

  const stepProject = (direction: 1 | -1) => {
    setActiveProjectIndex((current) => {
      const nextIndex = current + direction;

      if (nextIndex < 0) {
        scrollToSection("home");
        return 0;
      }

      if (nextIndex >= projects.length) {
        scrollToSection("experience");
        return current;
      }

      return nextIndex;
    });
  };

  const cycleProject = (direction: 1 | -1) => {
    setActiveProjectIndex((current) => (current + direction + projects.length) % projects.length);
  };

  const stepXinhua = (direction: 1 | -1) => {
    setActiveXinhuaIndex((current) => (current + direction + xinhuaWorks.length) % xinhuaWorks.length);
  };

  const handleAutoplayBlur =
    (setPaused: React.Dispatch<React.SetStateAction<boolean>>) =>
    (event: React.FocusEvent<HTMLElement>) => {
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) return;
      setPaused(false);
    };

  useEffect(() => {
    if (selectedProjectId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProjectId]);

  useEffect(() => {
    if (isDesktop && !selectedProjectId && activeSection === "projects") return;
    setIsProjectAutoplayPaused(false);
  }, [activeSection, isDesktop, selectedProjectId]);

  useEffect(() => {
    if (isDesktop && !selectedProjectId && activeSection === "experience") return;
    setIsXinhuaAutoplayPaused(false);
  }, [activeSection, isDesktop, selectedProjectId]);

  useEffect(() => {
    if (!isProjectAutoplayRunning) return;

    const timer = window.setTimeout(() => {
      setActiveProjectIndex((current) => (current + 1) % projects.length);
    }, PROJECT_AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [activeProjectIndex, isProjectAutoplayRunning]);

  useEffect(() => {
    if (!isXinhuaAutoplayRunning) return;

    const timer = window.setTimeout(() => {
      setActiveXinhuaIndex((current) => (current + 1) % xinhuaWorks.length);
    }, XINHUA_AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [activeXinhuaIndex, isXinhuaAutoplayRunning]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncMedia = () => setIsDesktop(mediaQuery.matches);

    syncMedia();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", syncMedia);
      return () => mediaQuery.removeEventListener("change", syncMedia);
    }

    mediaQuery.addListener(syncMedia);
    return () => mediaQuery.removeListener(syncMedia);
  }, []);

  useEffect(() => {
    const observedSections = siteSections
      .map((section) => sectionRefs.current[section.id])
      .filter(Boolean) as HTMLElement[];

    if (!observedSections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id as SiteSectionId);
        }
      },
      {
        root: isDesktop ? mainRef.current : null,
        threshold: [0.45, 0.62, 0.8],
      }
    );

    observedSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop || selectedProjectId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const targetTag = target?.tagName ?? "";

      if (["INPUT", "TEXTAREA", "SELECT"].includes(targetTag) || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (activeSection === "projects" && event.key === "ArrowRight") {
        event.preventDefault();
        cycleProject(1);
        return;
      }

      if (activeSection === "projects" && event.key === "ArrowLeft") {
        event.preventDefault();
        cycleProject(-1);
        return;
      }

      if (activeSection === "experience" && event.key === "ArrowRight") {
        event.preventDefault();
        stepXinhua(1);
        return;
      }

      if (activeSection === "experience" && event.key === "ArrowLeft") {
        event.preventDefault();
        stepXinhua(-1);
        return;
      }

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        goToSectionStep(1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goToSectionStep(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, isDesktop, selectedProjectId]);

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

  const handleProjectWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    if (!isDesktop) return;

    event.preventDefault();

    if (Math.abs(event.deltaY) < 18) return;

    const now = Date.now();
    if (now - projectWheelLockRef.current < 650) return;

    projectWheelLockRef.current = now;
    stepProject(event.deltaY > 0 ? 1 : -1);
  };

  return (
    <div className={`portfolio-shell${isDesktop ? " desktop-mode" : " mobile-mode"}`} style={{ background: palette.bg, color: palette.text }}>
      <div className="portfolio-backdrop" />

      <header className="portfolio-nav">
        <div className="portfolio-brand">
          <div className="portfolio-brand-name">陈衍年</div>
          <div className="portfolio-brand-tag">Content, visual storytelling, and execution</div>
        </div>

        <nav className="portfolio-nav-links" aria-label="Primary">
          {siteSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`portfolio-nav-link${activeSection === section.id ? " is-active" : ""}`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <a className="portfolio-nav-cta" href={resumeFile} download="chen-yannian-resume.pdf">
          Resume
          <Download size={16} />
        </a>
      </header>

      <main ref={mainRef} className={`portfolio-main${isDesktop ? " is-desktop" : ""}`}>
        <section id="home" ref={setSectionRef("home")} className="snap-section">
          <div className="section-frame hero-frame">
            <div className="section-intro">
              <span className="section-index">01</span>
              <div>
                <div className="section-kicker">Personal Brand Portfolio</div>
                <div className="section-cue">A chapter-based portfolio experience</div>
              </div>
            </div>

            <div className="hero-layout">
              <div className="hero-copy-block">
                <div className="hero-note">Content / Image / Strategy / Delivery</div>
                <h1 className="hero-headline display-title">
                  把想法做成
                  <br />
                  能被看见、被记住、也能真正落地的内容。
                </h1>
                <p className="hero-summary">
                  陈衍年，内容策划、影像创作与项目执行。擅长把内容逻辑、视觉表达和落地节奏接在一起，做成完整、可靠、可呈现的作品体验。
                </p>

                <div className="hero-actions">
                  <button type="button" className="hero-primary-btn" onClick={() => scrollToSection("projects")}>
                    View Projects
                    <ArrowRight size={18} />
                  </button>
                  <a className="hero-secondary-btn" href={resumeFile} download="chen-yannian-resume.pdf">
                    Download Resume
                    <Download size={18} />
                  </a>
                </div>

                <button type="button" className="scroll-hint" onClick={() => scrollToSection("projects")}>
                  Scroll to projects
                  <ChevronDown size={16} />
                </button>
              </div>

              <div className="hero-side-panel">
                <div className="hero-note-stack">
                  {personalIntroNotes.map((item) => (
                    <div key={item.title} className="hero-note-card">
                      <div className="hero-note-card-dot" style={{ background: item.tone }} />
                      <div className="hero-note-card-title">{item.title}</div>
                      <p className="hero-note-card-copy">{item.desc}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {false ? <section id="about" ref={setSectionRef("about")} className="snap-section">
          <div className="section-frame about-frame">
            <div className="section-intro">
              <span className="section-index">02</span>
              <div>
                <div className="section-kicker">About</div>
                <div className="section-cue">What kind of collaborator I am</div>
              </div>
            </div>

            <div className="section-heading-row">
              <div>
                <h2 className="section-title display-title">不是只会想点子，也会把节奏、表达和落地一起顾好的那种人。</h2>
                <p className="section-summary">
                  我喜欢把内容做得更准确，把画面做得更有情绪，把项目推进得更稳。对我来说，作品不只是结果，也包括前期判断、中途调整和最后能否真正成立。
                </p>
              </div>

              <div className="about-quote-card">
                <div className="about-quote-label">Working Principle</div>
                <div className="about-quote-text">Good ideas deserve structure, rhythm, and a reliable way to land.</div>
              </div>
            </div>

            <div className="about-card-grid">
              {personalIntroNotes.map((item) => (
                <div key={item.title} className="about-card">
                  <div className="about-card-dot" style={{ background: item.tone }} />
                  <div className="about-card-title">{item.title}</div>
                  <p className="about-card-copy">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section> : null}

        <section id="projects" ref={setSectionRef("projects")} className="snap-section">
          <div className="section-frame project-frame">
            <div className="section-intro">
              <span className="section-index">02</span>
              <div>
                <div className="section-kicker">Projects</div>
                <div className="section-cue">One project, one screen</div>
              </div>
            </div>

            <div className="section-heading-row project-heading-row">
              <div>
                <h2 className="section-title display-title">每次切换，只看一个项目。</h2>
                <p className="section-summary">
                  这一屏只保留项目最重要的判断、亮点和入口。想继续深读时，再进入对应 case detail。
                </p>
              </div>

              <div className="project-nav-controls">
                <button type="button" className="project-nav-btn" onClick={() => cycleProject(-1)} aria-label="Previous project">
                  <ChevronLeft size={18} />
                </button>
                <div className="project-nav-meter">
                  <div className="project-nav-status">
                    <span>{`0${activeProjectIndex + 1} / 0${projects.length}`}</span>
                    {isDesktop ? (
                      <span
                        className={`autoplay-badge${isProjectAutoplayEnabled ? " is-active" : ""}${
                          isProjectAutoplayEnabled && !isProjectAutoplayRunning ? " is-paused" : ""
                        }`}
                      >
                        {projectAutoplayLabel}
                      </span>
                    ) : null}
                  </div>
                  <div className={`project-nav-track${isProjectAutoplayEnabled ? "" : " is-idle"}`} aria-hidden="true">
                    <span
                      key={`${activeProject.id}-${isProjectAutoplayEnabled ? activeSection : "manual"}`}
                      className={`project-nav-fill${isProjectAutoplayEnabled ? " is-active" : ""}`}
                      style={
                        isProjectAutoplayEnabled
                          ? {
                              animationDuration: `${PROJECT_AUTOPLAY_MS}ms`,
                              animationPlayState: isProjectAutoplayRunning ? "running" : "paused",
                            }
                          : undefined
                      }
                    />
                  </div>
                </div>
                <button type="button" className="project-nav-btn" onClick={() => cycleProject(1)} aria-label="Next project">
                  <ChevronRight size={18} />
                </button>
                {isDesktop ? (
                  <button
                    type="button"
                    className={`autoplay-toggle-btn${isProjectAutoplayEnabled ? " is-active" : ""}`}
                    onClick={() => setIsProjectAutoplayEnabled((current) => !current)}
                    aria-pressed={isProjectAutoplayEnabled}
                    aria-label={isProjectAutoplayEnabled ? "Stop automatic project rotation" : "Start automatic project rotation"}
                  >
                    {isProjectAutoplayEnabled ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isProjectAutoplayEnabled ? "Stop autoplay" : "Start autoplay"}</span>
                  </button>
                ) : null}
              </div>
            </div>

            {isDesktop ? (
              <div
                className="project-browser"
                onWheel={handleProjectWheel}
                onMouseEnter={() => setIsProjectAutoplayPaused(true)}
                onMouseLeave={() => setIsProjectAutoplayPaused(false)}
                onFocusCapture={() => setIsProjectAutoplayPaused(true)}
                onBlurCapture={handleAutoplayBlur(setIsProjectAutoplayPaused)}
              >
                <div key={`${activeProject.id}-copy`} className="project-browser-copy project-panel-animate">
                  <div className="project-browser-meta">
                    <span className="project-subtitle">{activeProject.subtitle}</span>
                    <span className="project-role-chip">{activeProject.role}</span>
                  </div>

                  <h3 className="project-browser-title display-title">
                    <ProjectTitleLines project={activeProject} />
                  </h3>
                  <p className="project-browser-summary">{activeProject.summary}</p>

                  <div className="project-highlight-grid">
                    {projectSpotlights[activeProject.id].map((item) => (
                      <div key={item} className="project-highlight-card">
                        <span className="project-highlight-dot" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="project-tag-row">
                    {activeProject.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-browser-actions">
                    <button type="button" className="hero-primary-btn" onClick={() => setSelectedProjectId(activeProject.id)}>
                      View Case Detail
                      <ArrowUpRight size={18} />
                    </button>
                    {activeProject.id === "documentary" ? (
                      <a className="hero-secondary-btn" href={documentaryWatchLink} target="_blank" rel="noreferrer">
                        Watch Film
                        <Play size={18} />
                      </a>
                    ) : activeProject.id === "sinkingShip" ? (
                      <a className="hero-secondary-btn" href={sinkingShipProject.link} target="_blank" rel="noreferrer">
                        Open Interactive Video
                        <ArrowUpRight size={18} />
                      </a>
                    ) : (
                      <button type="button" className="hero-secondary-btn" onClick={() => scrollToSection("contact")}>
                        Discuss Similar Work
                        <ArrowRight size={18} />
                      </button>
                    )}
                  </div>

                  <div className="project-browser-hint">
                    {isProjectAutoplayEnabled
                      ? "自动播放会在悬停、聚焦或开始手动切换时暂停，不会打断阅读。"
                      : activeProjectIndex === projects.length - 1
                        ? "项目默认静止展示，读完这一页后继续滚动就能进入 Experience。"
                        : "项目默认静止展示，你可以慢慢读，也可以用箭头、分页点或 Start autoplay 往下看。"}
                  </div>
                </div>

                <div key={`${activeProject.id}-visual`} className="project-browser-visual project-panel-animate">
                  <ProjectShowcaseMedia project={activeProject} />

                  <div className="project-browser-footer">
                    <div className="project-browser-highlight">{activeProject.highlight}</div>
                    <div className="project-browser-pagination">
                      {projects.map((project, index) => (
                        <button
                          key={project.id}
                          type="button"
                          className={`project-pagination-item${activeProjectIndex === index ? " is-active" : ""}`}
                          onClick={() => setActiveProjectIndex(index)}
                        >
                          <span className="project-pagination-index">{`0${index + 1}`}</span>
                          <span className="project-pagination-title">{project.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="project-mobile-list">
                {projects.map((project, index) => (
                  <Panel key={project.id} style={{ borderRadius: 30, boxShadow: "0 14px 36px rgba(24,23,22,0.06)" }}>
                    <div className="project-mobile-card">
                      <div className="project-mobile-header">
                        <span className="project-subtitle">{project.subtitle}</span>
                        <span className="project-nav-status">{`0${index + 1}`}</span>
                      </div>
                      <ProjectShowcaseMedia project={project} />
                      <h3 className="project-mobile-title display-title">
                        <ProjectTitleLines project={project} />
                      </h3>
                      <p className="project-browser-summary">{project.summary}</p>
                      <div className="project-highlight-grid">
                        {projectSpotlights[project.id].map((item) => (
                          <div key={item} className="project-highlight-card">
                            <span className="project-highlight-dot" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <button type="button" className="hero-primary-btn project-mobile-btn" onClick={() => setSelectedProjectId(project.id)}>
                        View Case Detail
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                  </Panel>
                ))}
              </div>
            )}

            <AIFashionPlanningFeature />
          </div>
        </section>

        <section id="experience" ref={setSectionRef("experience")} className="snap-section">
          <div className="section-frame experience-frame">
            <div className="section-intro">
              <span className="section-index">03</span>
              <div>
                <div className="section-kicker">Experience</div>
                <div className="section-cue">Editorial internship and media reporting practice</div>
              </div>
            </div>

            <div className="xinhua-section-head">
              <div className="xinhua-heading-copy">
                <div className="xinhua-eyebrow">{xinhuaSection.label}</div>
                <h2 className="section-title display-title">{xinhuaSection.title}</h2>
                <p className="section-summary xinhua-summary">{xinhuaSection.intro}</p>
              </div>

              <div className="xinhua-meta-grid">
                {xinhuaSection.meta.map((item) => (
                  <div key={item} className="xinhua-meta-card">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="xinhua-showcase">
              <div className="xinhua-carousel-column">
                <div
                  className="xinhua-carousel-shell"
                  onMouseEnter={() => setIsXinhuaAutoplayPaused(true)}
                  onMouseLeave={() => setIsXinhuaAutoplayPaused(false)}
                  onFocusCapture={() => setIsXinhuaAutoplayPaused(true)}
                  onBlurCapture={handleAutoplayBlur(setIsXinhuaAutoplayPaused)}
                >
                  <div className="xinhua-carousel-stage">
                    {xinhuaWorks.map((work, index) => {
                      let delta = index - activeXinhuaIndex;
                      if (delta > xinhuaWorks.length / 2) delta -= xinhuaWorks.length;
                      if (delta < -xinhuaWorks.length / 2) delta += xinhuaWorks.length;

                      const arcX = Math.sin(delta * 0.62) * 250;
                      const arcZ = (Math.cos(delta * 0.62) - 1) * 330;
                      const absDelta = Math.abs(delta);
                      const scale = Math.max(0.58, 1 - absDelta * 0.14);
                      const opacity = absDelta > 3 ? 0 : Math.max(0.14, 1 - absDelta * 0.22);
                      const blur = absDelta * 1.4;
                      const rotation = delta * 30;

                      return (
                        <button
                          key={work.id}
                          type="button"
                          className={`xinhua-rotary-card${index === activeXinhuaIndex ? " is-active" : ""}`}
                          onClick={() => setActiveXinhuaIndex(index)}
                          style={
                            {
                              "--xinhua-x": `${arcX}px`,
                              "--xinhua-z": `${arcZ}px`,
                              "--xinhua-rotate": `${rotation}deg`,
                              "--xinhua-scale": scale,
                              "--xinhua-opacity": opacity,
                              "--xinhua-blur": `${blur}px`,
                              "--xinhua-order": 20 - absDelta,
                              "--xinhua-gradient": xinhuaCardGradients[index % xinhuaCardGradients.length],
                            } as React.CSSProperties
                          }
                        >
                          <div className="xinhua-card-topline">
                            <span>{work.tag}</span>
                            <span>{work.year}</span>
                          </div>
                          <div className="xinhua-card-title">{work.title}</div>
                          <p className="xinhua-card-summary">{work.summary}</p>
                          <div className="xinhua-card-footer">
                            <span>{`0${index + 1}`}</span>
                            <span>{work.link ? "查看原文" : "Details Pending"}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="xinhua-carousel-controls">
                    <button type="button" className="project-nav-btn" onClick={() => stepXinhua(-1)} aria-label="Previous report">
                      <ChevronLeft size={18} />
                    </button>
                    <div className="xinhua-progress-meter">
                      <div className="xinhua-progress-copy">
                        <span>{`${String(activeXinhuaIndex + 1).padStart(2, "0")} / ${String(xinhuaWorks.length).padStart(2, "0")}`}</span>
                        {isDesktop ? (
                          <span
                            className={`autoplay-badge${isXinhuaAutoplayEnabled ? " is-active" : ""}${
                              isXinhuaAutoplayEnabled && !isXinhuaAutoplayRunning ? " is-paused" : ""
                            }`}
                          >
                            {xinhuaAutoplayLabel}
                          </span>
                        ) : null}
                      </div>
                      <div className={`xinhua-progress-track${isXinhuaAutoplayEnabled ? "" : " is-idle"}`} aria-hidden="true">
                        <span
                          key={`${activeXinhuaWork.id}-${isXinhuaAutoplayEnabled ? activeSection : "manual"}`}
                          className={`xinhua-progress-fill${isXinhuaAutoplayEnabled ? " is-active" : ""}`}
                          style={
                            isXinhuaAutoplayEnabled
                              ? {
                                  animationDuration: `${XINHUA_AUTOPLAY_MS}ms`,
                                  animationPlayState: isXinhuaAutoplayRunning ? "running" : "paused",
                                }
                              : undefined
                          }
                        />
                      </div>
                    </div>
                    <button type="button" className="project-nav-btn" onClick={() => stepXinhua(1)} aria-label="Next report">
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  <div className="xinhua-dot-row">
                    {xinhuaWorks.map((work, index) => (
                      <button
                        key={work.id}
                        type="button"
                        className={`xinhua-dot${index === activeXinhuaIndex ? " is-active" : ""}`}
                        onClick={() => setActiveXinhuaIndex(index)}
                        aria-label={work.title}
                      />
                    ))}
                  </div>
                </div>
                {isDesktop ? (
                  <button
                    type="button"
                    className={`autoplay-toggle-btn autoplay-toggle-btn--center${isXinhuaAutoplayEnabled ? " is-active" : ""}`}
                    onClick={() => setIsXinhuaAutoplayEnabled((current) => !current)}
                    aria-pressed={isXinhuaAutoplayEnabled}
                    aria-label={isXinhuaAutoplayEnabled ? "Stop automatic report rotation" : "Start automatic report rotation"}
                  >
                    {isXinhuaAutoplayEnabled ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isXinhuaAutoplayEnabled ? "Stop autoplay" : "Start autoplay"}</span>
                  </button>
                ) : null}
              </div>

              <div
                className="xinhua-detail-column"
                onMouseEnter={() => setIsXinhuaAutoplayPaused(true)}
                onMouseLeave={() => setIsXinhuaAutoplayPaused(false)}
                onFocusCapture={() => setIsXinhuaAutoplayPaused(true)}
                onBlurCapture={handleAutoplayBlur(setIsXinhuaAutoplayPaused)}
              >
                <Panel key={activeXinhuaWork.id} style={{ borderRadius: 32, boxShadow: "0 14px 36px rgba(24,23,22,0.06)" }}>
                  <div className="xinhua-detail-shell xinhua-detail-animate">
                    <div className="xinhua-detail-meta">
                      <span className="xinhua-detail-index">{`${String(activeXinhuaIndex + 1).padStart(2, "0")} / ${String(
                        xinhuaWorks.length
                      ).padStart(2, "0")}`}</span>
                      <span className="project-role-chip">{activeXinhuaWork.role}</span>
                    </div>

                    <div className="xinhua-detail-tag">{activeXinhuaWork.tag}</div>
                    <h3 className="xinhua-detail-title display-title">{activeXinhuaWork.title}</h3>
                    <p className="xinhua-detail-summary">{activeXinhuaWork.summary}</p>

                    <div className="xinhua-detail-actions">
                      {activeXinhuaWork.link ? (
                        <a className="hero-primary-btn" href={activeXinhuaWork.link} target="_blank" rel="noreferrer">
                          查看原文
                          <ArrowUpRight size={18} />
                        </a>
                      ) : (
                        <div className="xinhua-pending-chip">Details pending</div>
                      )}
                    </div>

                    <div className="xinhua-practice-grid">
                      {xinhuaPracticeNotes.map((item) => (
                        <div key={item.label} className="xinhua-practice-card">
                          <div className="xinhua-practice-label">{item.label}</div>
                          <p className="xinhua-practice-copy">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Panel>

                {supportingExperienceWorks.length > 0 ? (
                  <div className="xinhua-support-strip">
                    {supportingExperienceWorks.map((item) => (
                      item.href ? (
                        <a key={item.title} className="xinhua-support-card xinhua-support-card-link" href={item.href} target="_blank" rel="noreferrer">
                          <div className="xinhua-support-label">Outside The Newsroom</div>
                          <div className="xinhua-support-title">{item.title}</div>
                          <p className="xinhua-support-copy">{item.desc}</p>
                          <div className="xinhua-support-action">
                            <span>{item.actionLabel ?? "查看项目"}</span>
                            <ArrowUpRight size={16} />
                          </div>
                        </a>
                      ) : (
                        <div key={item.title} className="xinhua-support-card">
                          <div className="xinhua-support-label">Outside The Newsroom</div>
                          <div className="xinhua-support-title">{item.title}</div>
                          <p className="xinhua-support-copy">{item.desc}</p>
                        </div>
                      )
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" ref={setSectionRef("contact")} className="snap-section">
          <div className="section-frame contact-frame">
            <div className="section-intro">
              <span className="section-index">04</span>
              <div>
                <div className="section-kicker">Contact</div>
                <div className="section-cue">Let&apos;s build something tangible</div>
              </div>
            </div>

            <div className="contact-layout-shell">
              <div className="contact-copy-shell">
                <h2 className="section-title display-title">如果你也想把一个想法做成真正站得住的项目，我们可以聊聊。</h2>
                <p className="section-summary">
                  无论是内容策划、影像表达、项目推进，还是一个还在发光的创意雏形，我都愿意一起把它理清、做实、推进下去。
                </p>

                <div className="contact-actions">
                  <a className="hero-primary-btn" href="mailto:NeoCyyyn@163.com">
                    Send Email
                    <Mail size={18} />
                  </a>
                  <button type="button" className="hero-secondary-btn" onClick={() => scrollToSection("home")}>
                    Back to Top
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              <Panel style={{ borderRadius: 34, boxShadow: "0 14px 36px rgba(24,23,22,0.06)" }}>
                <div className="contact-panel-shell">
                  <div className="contact-card-row">
                    <span className="contact-card-label">Email</span>
                    <a href="mailto:NeoCyyyn@163.com">NeoCyyyn@163.com</a>
                  </div>
                  <div className="contact-card-row">
                    <span className="contact-card-label">Phone</span>
                    <a href="tel:19283287512">192-8328-7512</a>
                  </div>
                  <div className="contact-card-row">
                    <span className="contact-card-label">Bilibili</span>
                    <a href="https://space.bilibili.com/1099530248?spm_id_from=333.1007.0.0" target="_blank" rel="noreferrer">
                      账号主页
                    </a>
                  </div>

                  <div className="contact-panel-actions">
                    <a className="hero-secondary-btn" href={resumeFile} download="chen-yannian-resume.pdf">
                      Download Resume
                      <Download size={18} />
                    </a>
                    <button type="button" className="hero-secondary-btn" onClick={() => scrollToSection("projects")}>
                      View Projects Again
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </section>
      </main>
    </div>
  );

  /*
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
              <div style={{ display: "grid", gap: 20 }}>
                <SinkingShipFeature />
                <Panel style={{ borderRadius: 36, boxShadow: "0 8px 20px rgba(36,49,40,0.03)" }}>
                  <div className="dashboard-wrap">
                    <div style={{ marginBottom: 24, fontSize: 15, fontWeight: 500, letterSpacing: "0.08em", color: palette.blue }}>MORE</div>
                    <h2 style={{ margin: "0 0 32px", fontSize: "clamp(32px, 3.8vw, 46px)", lineHeight: 1.22, fontWeight: 600, color: palette.text }}>
                      还有一些零零碎碎、但也很喜欢的小事。
                    </h2>
                    <div className="two-col-grid">
                      {additionalWorkCards.map((item) => (
                        <div key={item.title} className={`experience-card${item.featured ? " experience-card-featured" : ""}`}>
                          <div className="experience-title">{item.title}</div>
                          <p className="experience-copy">{item.desc}</p>
                          {item.links ? (
                            <div className="experience-links">
                              {item.links.map((link) => (
                                <a key={link.href} className="experience-link" href={link.href} target="_blank" rel="noreferrer">
                                  <div className="experience-link-copy">
                                    <span className="experience-link-label">{link.label}</span>
                                    <span className="experience-link-meta">{link.meta}</span>
                                  </div>
                                  <ArrowRight size={16} />
                                </a>
                              ))}
                            </div>
                          ) : null}
                          {item.note ? <p className="experience-note">{item.note}</p> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </Panel>
              </div>
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
  */
}

const sanityChecks = [
  projects.length === 4,
  additionalWorks.length === 1,
  xinhuaWorks.length === 8,
  bilibiliStats.length === 4,
  operationsMetrics.length === 8,
  breakoutMetrics.length === 6,
  operationsInsights.length === 4,
  bilibiliEvidenceWall.length === 6,
  bayerVisuals.length === 2,
  documentaryCapabilities.length === 3,
  documentaryFrames.length === 6,
  documentaryPeople.length === 3,
  bayerStrategyCards.length === 4,
  bayerPhases.length === 3,
  bayerEvidenceWall.length === 4,
].every(Boolean);

if (!sanityChecks) {
  throw new Error("Portfolio data is incomplete.");
}
