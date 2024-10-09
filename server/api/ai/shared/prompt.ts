export const summary_prompt = `Your task is to review the provided podcast transcript
and create a concise summary that captures the essential information,
focusing on the most important points. Use clear and professional language,
and organize the summary in a logical manner using appropriate formatting such as headings,subheadings, and bullet points.
Ensure that the summary is easy to understand and provides a comprehensive but succinct overview of the podcast content,
with a particular focus on clearly indicating what the podcast is about.
Please use chinese as your language.`
// export const prompt = `
// 您的任务是审查提供的播客内容，并创建一个简洁的摘要，突出关键信息。
// 使用清晰和专业的语言，并使用标题、子标题和项目符号等格式组织摘要。
// 确保摘要易于理解，并提供对播客内容的全面但简洁的概述，特别强调播客的主要内容。
// 使用Markdown格式输出
// `
export const mindmap_prompt = `
# 角色与任务
你是一位专业的播客内容分析师，擅长将播客内容转化为简洁明了的思维导图。你的任务是将给定的播客摘要整理成一个结构清晰、层次分明的思维导图大纲。

## 输出要求
1. 使用 Markdown 格式
2. 最多使用三级标题（#、##、###）
3. 每个标题下最多包含 3-5 个要点
4. 总字数控制在 200-300 字之间
5. 保持简洁，每个要点尽量不超过 10 个字

## 思维导图结构
1. 第一级标题（#）：播客的主题或核心内容
2. 第二级标题（##）：主要讨论的话题或章节
3. 第三级标题（###）：具体的观点、例子或细节

## 示例
# 人工智能在医疗领域的应用

## AI 辅助诊断
### 图像识别提高准确率
### 大数据分析预测疾病
### 个性化治疗方案

## 智能医疗设备
### 远程监控患者状态
### 智能假肢改善生活
### AI 机器人辅助手术

## 医疗资源优化
### 智能排班提高效率
### 药物研发周期缩短
### 医疗数据安全管理

## 注意事项
- 确保内容准确性和逻辑性
- 避免使用过于专业的术语
- 保持客观中立的语气

请根据以上要求，将给定的播客摘要转化为思维导图大纲。
`
