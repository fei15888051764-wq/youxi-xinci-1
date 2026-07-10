# 游戏俚语热词工作流指令 v10（最终版 — 网站专用）

> 作者：GEBILAOWANG
> 核心逻辑：搜50候选词 → 时间梯度筛选 → 黑名单过滤 → 热度验证 → 素材收集 → 内容生成 → 网站上传
> 适用网站：gamerterms.com
> 上次更新：2026-07-10

---

## 第一部分：已产出热词黑名单（严禁重复）

> 每次产出新批次后自动追加到此列表。上传前必须逐一核对，确保无重复。

**第1-3批（29个）：**
ego, peek, healing, tweaking, rat, cracked, bot, od, pocket, gg, afk, noob, meta, clutch, frag, nerf, buff, smurf, tilt, toxic, sweat, touch-grass, pog, cooked, beamed, c9, boop, griefing, ez-clap

**第4批（10个）：**
npc, debuff, mald, oof, sheesh, monkas, pepehands, jebaited, sus, tryhard

**第5批（9个）：**
ads, headshot, ace, skin, emote, irl, lul, recoil, headglitch

**第6批（10个）：**
f, pogchamp, boost, rotate, trade, utility, eco, dox, fomo, gatekeep

**第7批（10个）：**
scuffed, clipped, rez, full-send, bopped, lasered, one-tap, whiffed, scrub, poggers

**第8批（10个）：**
rng, camping, loot, carry, troll, salty, lag, rage-quit, wallbang, gank

**补充批次 — 第1-7批遗漏（24个）：**
bm, camp, copium, diff, dlc, feed, glhf, griefer, grind, kappa, kekw, lore, op, patch, respawn, sadge, skill-issue, sweaty, teabag, throw, ttk, unalive, w, wp

**第9批（10个）：**
dps, pwned, tank, boss, easter-egg, mod, stream-sniping, hype-train, killstreak, loot-boxes

**总计：112个**

---

## 第二部分：语言规则（极其重要）

### 生成的热词内容必须是纯正英文

> 网站面向海外（英语为主）用户，所有热词正文内容必须是地道准确的英文，**绝对不能出现中文或其他语言**。

**具体要求：**
- 正文（Trajectory / High-Fidelity Contextual Dialogues / Socio-Cultural Gain / FAQ / Sources）：**纯正英文**
- Front Matter 字段（description / summary / shortDescription）：**英文**
- GEBILAOWANG 观察句：**英文**
- 对话场景：**英文**（自然带 gamer slang）
- Tags：**英文**

**例外情况（极少）：**
- 某些术语起源涉及日语/韩语等语言时，可以提及原文，但必须配合英文解释
- 例如：`"GG comes from the Korean 'good game' tradition"` → 这里"good game"可以保留，整句还是英文

**语气要求：**
- 像20岁英语母语玩家在跟新手聊天
- 自然 casual，带口语和 slang
- **不是**百科全书式正式写法
- 参考之前已上传的热词文件的语气风格

**自检方法：**
- 生成完每个热词后，快速扫一遍确认全文无中文
- FAQ 的回答要像 Reddit 热心老哥在回帖
- 对话要像真实美国/英国玩家在 Discord 里聊天

---

## 第三部分：网站技术约束（生成前必读）

### A. Front Matter 必填格式

```yaml
---
title: "短热词名"                    # 必须简短，如 "GG" / "FOMO"，绝不用长句子
date: YYYY-MM-DDT08:00:00+08:00    # 时间递增，第1个08:00，第2个08:10...
slug: "热词-gaming"                 # 如 "clutch-gaming"
description: "..."                  # SEO元描述，120字符内
description: "Learn the meaning of '[热词]' — [一句话定义]. Usage, origin & examples."
summary: "..."                      # 40-60词核心定义，用于AI Overview
author: "GEBILAOWANG"
category: slang                      # 单数！不是categories
shortDescription: "..."             # **必填！** 用于详情页 Quick Definition 框显示
updated: "Jul 10, 2026"            # 固定格式
readTime: "4 min read"             # 根据字数调整
tags:
  - "tag1"                           # 列表格式，每行一个，带双引号
  - "tag2"
  - "tag3"
---
```

**title 规则（极其重要）：**
- ❌ `title: "What Does 'FOMO' Mean in Gaming? Slang Explained (2026)"`
- ✅ `title: "FOMO"`

**category 规则：**
- ❌ `categories: ["gaming-slang"]`
- ✅ `category: slang`

**shortDescription 规则（极其重要，新增）：**
- **必须存在！** 否则详情页的 Quick Definition 框不会显示
- 50-65字符，一行简介
- 格式：`[热词] stands for '[全称]' and refers to [一句话定义].`
- 示例：`RNG stands for 'Random Number Generator' and refers to random outcomes in games.`
- 绝对不能与 description 或 summary 重复

**description 规则：**
- 每个热词**必须**有 description 字段
- 120字符以内
- 格式：`Learn the meaning of '[热词]' — [一句话定义]. Usage, origin & examples.`
- **绝对不能**与正文任何 section 内容重复
- **绝对不能**与 summary 或 shortDescription 重复

---

### B. 正文 Section 结构

网站详情页显示以下模块，**必须全部存在**：

| 模块 | 用途 | 字数 | h2标题 |
|------|------|------|--------|
| **Trajectory & Chronology** | 起源/传播路径/时间线 | 120-150词 | `## Trajectory & Chronology` |
| **High-Fidelity Contextual Dialogues** | 3组真实对话 | 每组3-5句 | `## High-Fidelity Contextual Dialogues` |
| **Socio-Cultural Gain** | 文化意义/使用场景 | 100-120词 | `## Socio-Cultural Gain` |
| **FAQ** | 4个问题 | 简洁回答 | `## FAQ` |
| **Sources** | 1-2个来源，带URL | 标准格式 | `## Sources` |

**h2 标题格式要求（极其重要）：**
- h2 标题必须是以上5个固定名称
- 不要缩写或改名称，否则 TOC（Table of Contents）导航无法正确匹配
- 正确：`## Trajectory & Chronology`
- 错误：`## Trajectory and Chronology` / `## Origin Story`

**模块间分隔符：**
```markdown
---

## Trajectory & Chronology

内容...
```

---

### C. Section 排列差异化（防Google批量识别）

每批次10个热词用不同排列：

```
排列1: Trajectory → Dialogues → Socio-Cultural → FAQ → Sources
排列2: Socio-Cultural → Trajectory → Dialogues → FAQ → Sources
排列3: Dialogues → Trajectory → Socio-Cultural → FAQ → Sources
排列4: Trajectory → Socio-Cultural → Dialogues → FAQ → Sources
排列5: Socio-Cultural → Dialogues → Trajectory → FAQ → Sources
排列6: Dialogues → Socio-Cultural → Trajectory → FAQ → Sources
排列7: Trajectory → Dialogues → FAQ → Socio-Cultural → Sources
排列8: FAQ → Trajectory → Socio-Cultural → Dialogues → Sources
排列9: Dialogues → FAQ → Trajectory → Socio-Cultural → Sources
排列10: Socio-Cultural → FAQ → Trajectory → Dialogues → Sources
```

**注意：** FAQ 和 Sources 固定在最后两个位置（模板限制）。

---

### D. GEBILAOWANG 观察句

**内容中不出现 About the Author！** 网站模板自动添加。

每个热词正文必须包含1-2句主观观察：
```markdown
> **GEBILAOWANG:** [casual口吻的点评，像懂行玩家随口吐槽]
```

---

## 第四部分：图片生成规范

### 核心原则：图片上**不加任何文字**

> Google 2026明确建议避免图片上放文字。可读性差、屏幕阅读器无法识别、压缩后模糊。

### 文件要求
- 格式：JPG
- 比例：16:9
- 分辨率：1280×720
- 质量：82
- 体积目标：80-150KB
- 文件名：`{slug}.jpg`
- 保存路径：`/mnt/agents/output/slang_images_batch{N}/`

### 图片 Alt 文本（SEO优化）
网站模板已自动优化图片alt文本格式为：`"{Title} gaming slang meaning definition 2026"`
- 无需在Front Matter中额外设置
- 确保 title 字段是短热词名即可

### 生成提示词要求
- 贴合热词核心含义
- 暗色调、游戏/电竞风格
- **绝对不加文字、水印、品牌Logo**
- 不生成真人面部特写

---

## 第五部分：找词渠道（A类）

| 序号 | 搜索方式 | 预期产出 |
|------|----------|----------|
| A1 | `gaming slang 2026 popular terms list` | 热门清单 |
| A2 | `video game slang dictionary 2026 most searched` | 高频搜索词 |
| A3 | `gaming slang words every gamer should know 2026` | 通用必备词 |
| A4 | `esports slang terms 2026 popular` | 电竞俚语 |
| A5 | `gaming terminology 2026 trending` | 趋势术语 |
| A6 | `valorant cs2 fortnite apex minecraft roblox slang 2026` | 特定游戏俚语 |
| A7 | `twitch gaming slang 2026 popular` | 直播社区俚语 |
| A8 | `new gamer lingo 2026 trending` | 新兴玩家用语 |
| A9 | `spawnpoint gaming slang 2026` | SpawnPoint词库 |
| A10 | `playstation gaming glossary 2026` | PlayStation官方词库 |

---

## 第六部分：热度筛选（B类）

| 序号 | 搜索方式 | 看什么 |
|------|----------|--------|
| B1 | `"[词]" gaming slang 2026` | 搜索结果数量和时效性 |
| B2 | `"[词]" gaming meaning how to use` | PAA问题数量 |
| B3 | `"[词]" gaming slang reddit community` | Reddit讨论 |
| B4 | `"[词]" valorant fortnite apex cs2` | 特定游戏使用频率 |
| B5 | `"[词]" gaming slang explained video` | YouTube视频 |
| B6 | `knowyourmeme "[词]" gaming` | KYM收录（viral信号）|
| B7 | `urbandictionary "[词]" gaming` | UD定义和赞同数 |

**热度判断：**
- 3个以上B渠道有数据 → **高热度** ✅
- 2个有数据 → **中热度** ⚠️
- 1个有数据 → **低热度**（≤14天词淘汰）
- 全部零命中 → **淘汰** ❌

---

## 第七部分：素材收集（C类）

| 序号 | 搜索方式 | 补充素材 |
|------|----------|----------|
| C1 | `spawnpoint "[词]" gaming slang` | 标准定义 + 首次记录时间 |
| C2 | `playstation "[词]" gaming glossary` | 权威定义 |
| C3 | `"[词]" gaming slang origin story history` | 起源故事 |
| C4 | `knowyourmeme "[词]" gaming` | viral传播路径 |
| C5 | `urbandictionary "[词]" gaming` | 用户定义 + 例句 |
| C6 | `"[词]" gaming slang explained video title` | 视频标题素材 |
| C7 | `"[词]" game wiki fandom definition` | 游戏Wiki定义 |
| C8 | `kotaku polygon "[词]" gaming culture` | 文化背景 |
| C9 | `hltv liquipedia "[词]" esports` | 电竞场景 |
| C10 | `"[词]" gaming 2024 2025 2026 origin history` | 历史演变 |
| C11 | `smileloverz meanlypro "[词]" slang 2026` | 俚语追踪站 |
| C12 | `bark.us gamequitters "[词]" gaming terms` | 术语指南 |

---

## 第八部分：执行流程

### Step 1: 找词（A1-A10）
1. 依次执行A1-A10搜索
2. 提取所有游戏俚语候选词
3. 汇总目标50个（允许30-50个）

### Step 2: 黑名单过滤
- 与第一部分黑名单比对
- 命中 → 删除
- 未命中 → 进入Step 3

### Step 3: 热度筛选（B1-B7）

| 梯度 | 时间范围 | 标准 | 内容模式 |
|------|----------|------|----------|
| 第一层 | ≤3天 | 3+B有数据 | 新词丰富模式 |
| 第二层 | ≤7天 | 3+B有数据 | 新词丰富模式 |
| 第三层 | ≤14天 | 3+B有数据 | 新词丰富模式 |
| 第四层 | ≤30天 | 2+B有数据 | 老词深度模式 |
| 第五层 | ≤60天 | 2+B有数据 | 老词深度模式 |
| 第六层 | ≤90天 | 2+B有数据 | 老词深度模式 |
| 第七层 | >90天 | 选B1最多的 | 老词深度模式 |

### Step 4: 素材收集（C1-C12）

### Step 5: 内容生成（逐个生成，严禁批量）

**每个词条独立完成，逐个检查后再下一个。**

1. 确定 section 排列（第三部分C的10种）
2. 确定 Trajectory 开头句式（第九部分T1-T10）
3. 确定3组对话场景（第九部分D1-D10，各不相同）
4. 确定FAQ排列（第九部分F1-F12）
5. 生成内容（**必须是纯正英文**）
6. 执行逐项核对（第十部分）
7. 确认无误 → 开始下一个

### Step 6: 上传网站

**1. 创建markdown文件**
- 10个文件，文件名：`{slug}.md`
- 严格遵循第三部分A的Front Matter格式
- 内容一字不改

**2. 生成图片**
- 10张图片，文件名：`{slug}.jpg`
- 严格遵循第四部分规范
- 图片贴合热词内容

**3. 推送到GitHub**
- 文件路径：`content/slang/{slug}.md`
- 提交信息：`Add batch {N}: {热词列表}`

**4. 上传前最终自检（必须全部通过）**

**A. 文件完整性**
- [ ] 10个 .md 文件全部创建
- [ ] 10个 .md 文件名与 slug 完全对应
- [ ] 10张 .jpg 图片全部生成
- [ ] 10张图片文件名与 slug 完全对应

**B. Front Matter 抽查（全部10个文件）**
- [ ] title 是短热词名（不超过3个单词）
- [ ] category 是 `slang`（单数）
- [ ] shortDescription 存在且50-65字符
- [ ] description 存在且120字符内
- [ ] description 不与 shortDescription / summary / 正文重复
- [ ] tags 是列表格式带引号

**C. 黑名单确认**
- [ ] 10个新热词与112个已产出词逐一比对
- [ ] 确认零重复

**D. 内容差异化**
- [ ] 10个词条使用10种不同section排列
- [ ] Trajectory 开头句式编号无重复
- [ ] FAQ 排列编号无重复
- [ ] h2 标题使用标准名称（Trajectory & Chronology / High-Fidelity Contextual Dialogues / Socio-Cultural Gain / FAQ / Sources）

**E. 图片检查**
- [ ] 10张图片上无任何文字/水印
- [ ] 图片尺寸 1280×720
- [ ] 图片体积 80-150KB

**F. 语言检查（关键）**
- [ ] 10个词条内容全文为纯正英文
- [ ] 无中文、无其他语言
- [ ] 对话自然像英语母语玩家

**G. 推送后网站检查（5分钟内）**
- [ ] 首页显示新卡片（标题/简介/日期/标签正确）
- [ ] 新卡片排在最上面
- [ ] 详情页显示 Quick Definition 框（有 shortDescription 才显示）
- [ ] 详情页 TOC 导航全部6个链接可点击
- [ ] 详情页内容完整（5个section）
- [ ] 无AI水印/前缀

---

## 第九部分：差异化执行工具

### Trajectory 开头句式库（每批次内不重复）

| 编号 | 句式 | 示例 |
|------|------|------|
| T1 | "The term '[词]' emerged from [来源] in [时间段]." | "The term 'camping' emerged from early FPS in the late 1990s..." |
| T2 | "'[词]' entered gaming vocabulary through [路径], first appearing in [游戏/平台]." | "'OP' entered through MMORPG discussions, first in EverQuest..." |
| T3 | "Gamers started using '[词]' around [时间], when [背景事件]." | "Gamers started using 'throw' around early 2000s when ranked made losses costly..." |
| T4 | "The origins of '[词]' trace back to [原始来源], before [社区] adopted it." | "The origins of 'salty' trace back to 1930s English, before gaming adopted it..." |
| T5 | "'[词]' became gaming slang after [关键事件], spreading through [平台]." | "'GLHF' became slang after StarCraft's scene took off..." |
| T6 | "By [时间段], '[词]' had become standard in [社区], crossing into [更广领域]." | "By mid-2000s, 'lore' was standard in RPG communities..." |
| T7 | "'[词]' started as [原始含义], then evolved within gaming to mean [当前含义]." | "'BM' started as business terminology, then evolved to 'Bad Manners'..." |
| T8 | "Few gaming terms have the staying power of '[词]', in use since [时间]." | "Few terms have the staying power of 'GG', in use since the late 1990s..." |
| T9 | "The rise of '[词]' coincided with [趋势], making it a marker of that era." | "The rise of 'respawn' coincided with the shift from arcade to multiplayer..." |
| T10 | "While many terms fade, '[词]' has remained relevant because [原因], since [时间]." | "While many fade, 'WP' has remained because it fills a social need..." |

### 对话场景轮换池（3组必选不同场景）

| 编号 | 场景 | 语气 |
|------|------|------|
| D1 | 游戏内语音/Voice Comms | 紧张、急促 |
| D2 | Discord 群聊 | casual、日常 |
| D3 | Twitch 直播间弹幕 | 搞笑、meme |
| D4 | Reddit 评论串 | 争论、说服 |
| D5 | 赛后大厅/Lobby Chat | 放松、复盘 |
| D6 | 线下赛事/观赛现场 | 激动、呐喊 |
| D7 | 游戏内文字/All-chat | 挑衅、嘲讽 |
| D8 | 朋友间日常聊天 | 随意、真实 |
| D9 | 论坛求助帖 | 困惑、求教 |
| D10 | 速配组队/Matchmaking | 陌生人初次互动 |

### FAQ 标准4问（顺序每条例打乱）

- **Q1**: 与相似词的区别（Is X the same as Y?）
- **Q2**: 具体用法/场景（When/how do you use X?）
- **Q3**: 流行度/现状（Is X still used in 2026?）
- **Q4**: 向非玩家解释（How to explain X to a non-gamer?）

**可用排列：**
F1: 1→2→3→4 | F2: 1→3→2→4 | F3: 1→4→2→3 | F4: 2→1→3→4 | F5: 2→3→1→4
F6: 2→4→1→3 | F7: 3→1→2→4 | F8: 3→2→4→1 | F9: 3→4→1→2 | F10: 4→1→2→3
F11: 4→2→3→1 | F12: 4→3→1→2

---

## 第十部分：常见错误陷阱

**陷阱1：Trajectory 开头语法断裂**
- ❌ "The term first surfaced in The term 'camping' emerged from..."
- ✅ 直接以 "The term 'X' emerged/entered/originated from..." 开头

**陷阱2：对话数量不足**
- ❌ 只写1-2组对话
- ✅ 严格3组，每组之间用 `---` 分隔

**陷阱3：About the Author 残留**
- ❌ 输出中包含 `## About the Author`
- ✅ 作者简介由网站模板自动添加，内容中完全不出现

**陷阱4：Tags 格式错误**
- ❌ `tags: [general, fps, competitive]`
- ✅ 列表格式，每行一个，带双引号

**陷阱5：模板化批量输出**
- ❌ 10个词条用同样开头句式、同样FAQ排列、同样对话场景
- ✅ 每个词条在开头句式、FAQ顺序、对话场景、观察句上都不同

**陷阱6：title 用长句子**
- ❌ `title: "What Does 'FOMO' Mean in Gaming? Slang Explained (2026)"`
- ✅ `title: "FOMO"`

**陷阱7：category 用复数**
- ❌ `categories: ["gaming-slang"]`
- ✅ `category: slang`

**陷阱8：description 与正文重复**
- ❌ description: `"Scuffed means broken or low-quality..."` 正文: `"Scuffed means broken, janky, or low-quality..."`
- ✅ description: `"Learn the meaning of 'Scuffed' — gaming slang for broken, janky setups. Usage, origin & examples."`
- 检查方法：写完正文后，把 description 和 Trajectory 第一段对比，确保没有连续3个以上相同单词

**陷阱9：图片上加了文字**
- ❌ 生成的图片上有热词名字、标语或标注
- ✅ 图片纯视觉，零文字

**陷阱10：内容出现中文或其他语言**
- ❌ 正文、对话、FAQ 中出现中文
- ✅ 全部为纯正英文
- 检查方法：生成完后快速扫一遍，确认全文无中文

**陷阱11：shortDescription 缺失（新增）**
- ❌ 忘记写 shortDescription 字段
- ✅ 必须存在，50-65字符，用于详情页 Quick Definition 框
- 后果：没有 shortDescription，详情页不会显示 Quick Definition

**陷阱12：h2 标题不标准（新增）**
- ❌ `## Origin Story` / `## Cultural Background`
- ✅ `## Trajectory & Chronology` / `## Socio-Cultural Gain`
- 后果：h2 标题不标准，TOC 导航无法正确跳转

---

## 第十一部分：Google 2026 SEO 合规

### E-E-A-T 信号

| 要求 | 执行方式 |
|------|----------|
| Named Author | author: "GEBILAOWANG" |
| datePublished | date 字段 |
| dateModified | updated 字段 |
| Original insight | GEBILAOWANG 1-2句主观观察 |
| Credible sources | 1-2个来源，带URL |

### AI Overviews 优化

| 要求 | 执行方式 |
|------|----------|
| 核心定义 | summary 字段40-60词 |
| 自包含段落 | 每个section下内容独立完整 |
| FAQ Schema | 4个FAQ，标准化格式（JS动态生成） |

### 反SpamBrain

| 要求 | 执行方式 |
|------|----------|
| Section顺序差异化 | 10种排列轮换 |
| FAQ顺序差异化 | 12种排列轮换 |
| 对话场景差异化 | 10种场景选3 |
| Trajectory开头差异化 | 10种句式轮换 |
| GEBILAOWANG观察句差异化 | 每条独特 |

### SEO关键词

- 核心词：`gaming slang 2026`、`what does [词] mean gaming`
- 密度：自然融入，1-2次，不堆砌
- 位置：description + summary 中各1次

### 已部署的SEO功能（模板级）

网站模板已自动处理以下SEO功能，**内容生成时无需额外操作**：

| 功能 | 状态 |
|------|------|
| Schema.org Article | ✅ 自动生成 |
| Schema.org BreadcrumbList | ✅ 自动生成 |
| Schema.org DefinedTerm | ✅ 自动生成 |
| Schema.org FAQPage | ✅ JS动态生成 |
| Open Graph Tags | ✅ 自动生成 |
| Twitter Card | ✅ 自动生成 |
| Meta Description | ✅ 从shortDescription/description自动提取 |
| Meta Keywords | ✅ 自动包含tags + gaming slang通用词 |
| Canonical URL | ✅ 自动生成 |
| 图片alt优化 | ✅ 自动格式：`"{Title} gaming slang meaning definition 2026"` |
| 搜索框autocomplete=off | ✅ 已添加 |
| 外链noopener | ✅ 已添加 |
| font-display: swap | ✅ Google Fonts URL已包含 |
| Sitemap priority 0.8 | ✅ 已配置 |

---

> 本指令为活文档，每次执行后更新黑名单和总计数。
> 作者：GEBILAOWANG
> 版本：v10 FINAL（网站专用版 — 2026-07-10更新）
