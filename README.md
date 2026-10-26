# 每日数易指南 Pro

一款移动优先的中文 PWA，以指定的三层倒金字塔算法提供每日数字、四季节奏、五行配色、穿搭灵感、月历统计与流年／流月／流日综合解读。

## 本地运行

```bash
npm install
npm run dev
```

打开终端显示的本地地址。首次访问会要求输入生日；资料只存储在浏览器 `localStorage`。

## 验证

```bash
npm test
npm run lint
npm run build
```

测试包含固定验收案例 `1990-11-02 / 2026-10-25`、1–9 化简、四季与五行映射、相生相克配色、三种穿搭风格与场景、组合解读、完整月历、统计、闰年、日期解析及生日校验。

## 目录

- `app/`：App Router 页面、PWA manifest 与全局样式
- `components/`：每日详情、月历、设置、导航与可视化组件
- `lib/numerology/`：唯一的核心算法与集中配置
- `lib/guidance/`：综合解读规则引擎
- `lib/outfits/`：五行 × 场景 × 风格穿搭模板
- `lib/calendar/`：真实月历与统计
- `lib/storage/`：本地资料模型
- `tests/`：Vitest 自动化测试

## Vercel 部署

1. 将仓库推送至 GitHub、GitLab 或 Bitbucket。
2. 在 Vercel 选择 **Add New → Project** 并导入仓库。
3. Framework Preset 选择 **Next.js**，Build Command 保持 `npm run build`。
4. 本项目不需要环境变量、数据库或外部 API。
5. 点击 Deploy。发布后用 HTTPS 访问即可安装 PWA。

本代码库同时包含 `.openai/hosting.json`，可通过 ChatGPT Sites 构建并私有部署。

## 内容边界

本应用内容仅供传统文化学习与娱乐参考，不构成科学预测，也不应作为健康、法律或财务等重大决策依据。
