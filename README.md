# 每日数易指南 Pro

移动优先的中文 Next.js PWA，以指定的三层倒金字塔算法提供每日数字、四季节奏、五行配色、穿搭灵感、月历统计与流年／流月／流日综合解读。

## 技术栈

- Next.js 16 App Router、React 19、TypeScript
- Tailwind CSS 4
- Vitest
- Web App Manifest、Service Worker 与离线缓存
- 浏览器 `localStorage`（生日与设置不会发送到服务器）
- 轻量中英文界面切换（语言选择同样保存在浏览器本地）

## 本地运行

需要 Node.js 22。

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。首次访问会要求输入生日，资料只保存在当前浏览器。

## 发布前检查

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

测试覆盖固定验收案例 `1990-11-02 / 2026-10-25`、1–9 化简、四季与五行映射、相生相克配色、45 套穿搭组合、综合解读、月历统计、闰年、本地日期处理、生日校验、本地资料保存及基础组件可访问性。

## 页面

- `/`：每日指南
- `/calendar`：完整月历与月度统计
- `/date/YYYY-MM-DD`：指定日期分析
- `/knowledge`：数易知识
- `/profile`：本地资料和显示设置

## 项目目录

- `app/`：App Router 页面、PWA manifest 与全局样式
- `components/`：每日详情、月历、设置、导航与可视化组件
- `lib/numerology/`：核心算法与集中配置
- `lib/guidance/`：综合解读规则引擎
- `lib/outfits/`：五行 × 场景 × 风格穿搭模板
- `lib/calendar/`：真实月历与统计
- `lib/storage/`：浏览器本地资料
- `tests/`：Vitest 自动化测试

## GitHub 与 Vercel

完整的新手部署步骤见 [DEPLOYMENT.md](./DEPLOYMENT.md)。Vercel 应识别为 **Next.js**；根目录使用仓库根目录，Build Command 使用 `npm run build`，Output Directory 保持默认，不需要配置环境变量。

## 隐私

应用没有账号、数据库或资料提交 API。生日和偏好通过 `localStorage` 保存在使用者自己的浏览器中。清除浏览器网站资料或在设置页删除资料即可移除。

## 内容边界

本应用内容仅供传统文化学习与娱乐参考，不构成科学预测，也不应作为健康、法律或财务等重大决策依据。
