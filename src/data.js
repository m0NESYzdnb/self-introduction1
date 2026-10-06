export const certificates = [
 ['Prompt 工程师认证','Prompt Engineering','科大讯飞','iFLYTEK','ai','2026-09-25'],
 ['微调工程师认证','Fine-tuning Engineering','科大讯飞','iFLYTEK','ai','2026-09-25'],
 ['智能体工程师认证','AI Agent Engineering','科大讯飞','iFLYTEK','ai','2026-09-25'],
 ['RAG 工程师认证','RAG Engineering','科大讯飞','iFLYTEK','ai','2026-09-25'],
 ['人工智能初识微认证','Introduction to AI · Micro-certification','华为','Huawei','ai','2026-09-25'],
 ['人工智能训练师 · 高级课程','AI Trainer · Advanced Course','智能达摩 · 智能技术事业部','Intelligent DAMO','ai','2026-09-13'],
 ['人工智能训练师 · 初级课程','AI Trainer · Junior Course','智能达摩 · 智能技术事业部','Intelligent DAMO','ai','2026-09-12'],
 ['AI4S Cup · Python 基础能力认证','AI4S Cup · Python Fundamentals','AI4S Cup','AI4S Cup','python','2026-09-25'],
 ['Spring AI 应用开发（入门）','Spring AI Application Development · Intro','阿里云','Alibaba Cloud','cloud',null],
 ['RAG 应用构建及优化','RAG Application Development & Optimization','阿里云','Alibaba Cloud','cloud',null],
 ['VISION 人工智能设计（进阶）','VISION AI Design · Advanced','阿里云','Alibaba Cloud','cloud',null],
 ['基于 PAI ArtLab 的 AIGC 设计基础','AIGC Design with PAI ArtLab','阿里云','Alibaba Cloud','cloud',null],
 ['基于百炼平台构建智能体应用','AI Agents with Alibaba Cloud Model Studio','阿里云','Alibaba Cloud','cloud',null],
 ['利用大模型提升内容生产能力','Content Creation with Large Language Models','阿里云','Alibaba Cloud','cloud',null],
 ['VISION 人工智能设计（入门）','VISION AI Design · Intro','阿里云','Alibaba Cloud','cloud',null],
].map((c,id)=>({id,title:{zh:c[0],en:c[1]},issuer:{zh:c[2],en:c[3]},category:c[4],date:c[5],image:`${import.meta.env.BASE_URL}certificates/cert-${id}.${[5,6].includes(id)?'jpg':'png'}`}));

export const skills = [
 {icon:'logic',title:{zh:'数学思维与逻辑推理',en:'Mathematical & logical thinking'},level:{zh:'核心优势',en:'Core strength'},body:{zh:'从已知条件出发，拆解复杂问题、组织推导链条，并从不同角度检验结论。',en:'Break complex problems into manageable parts, build clear reasoning chains, and test conclusions from different angles.'},tags:{zh:['问题拆解','定量思维','逻辑验证'],en:['Problem decomposition','Quantitative thinking','Validation']}},
 {icon:'code',title:{zh:'Python 基础应用',en:'Python fundamentals'},level:{zh:'基础掌握',en:'Foundational'},body:{zh:'以数学与逻辑为起点学习编程，关注执行顺序与输出结果，已取得 Python 基础能力认证。',en:'Apply mathematical reasoning to programming, with attention to execution flow and results. Supported by a Python fundamentals certificate.'},tags:{zh:['Python','编程基础','AI4S Cup 认证'],en:['Python','Programming basics','AI4S Cup certified']}},
 {icon:'slides',title:{zh:'PPT 与信息呈现',en:'Presentations & communication'},level:{zh:'熟练使用',en:'Proficient'},body:{zh:'擅长用演示文稿梳理信息，支持课程展示、小组汇报与阶段性成果表达。',en:'Organize information into clear presentations for coursework, group reporting, and communicating progress.'},tags:{zh:['PowerPoint','结构化表达','信息组织'],en:['PowerPoint','Structured storytelling','Information design']}},
];
