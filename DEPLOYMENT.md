# GitHub 与 Vercel 部署指南

以下方式不需要安装 Vercel CLI，最适合第一次部署。

## 一、上传到 GitHub

### 1. 在 GitHub 建立空仓库

1. 登录 GitHub，点击右上角 **+ → New repository**。
2. Repository name 可填写 `daily-shuyi-pro`。
3. 选择 Public 或 Private。
4. **不要**勾选 Add a README、`.gitignore` 或 License；本项目已经包含这些文件。
5. 点击 **Create repository**，复制页面显示的 HTTPS 仓库地址。

### 2. 在项目目录执行

先检查将要上传的内容：

```bash
git status
git diff
git diff --cached
```

确认没有 `.env.local`、密钥或个人资料后执行：

```bash
git add .
git commit -m "Prepare Daily Shuyi Guide for Vercel"
git remote add origin https://github.com/YOUR_USERNAME/daily-shuyi-pro.git
git branch -M main
git push -u origin main
```

把 `YOUR_USERNAME` 换成你的 GitHub 用户名。如果 `git remote -v` 已经出现名为 `origin` 的远程地址，不要再次执行 `git remote add origin`；应先确认它确实是你的目标仓库。

## 二、从 GitHub 部署到 Vercel

1. 登录 [Vercel](https://vercel.com)，建议选择 **Continue with GitHub**。
2. 点击 **Add New → Project**。
3. 在 GitHub 仓库列表找到 `daily-shuyi-pro`，点击 **Import**。
4. 确认设置：
   - Framework Preset：`Next.js`
   - Root Directory：`./`
   - Build Command：`npm run build`（通常自动填写）
   - Output Directory：保持默认，不要填写 `dist`
   - Install Command：保持默认（Vercel 会根据 `package-lock.json` 使用 npm）
   - Node.js Version：`22.x`
5. Environment Variables 留空；本项目不需要密钥或外部 API。
6. 点击 **Deploy**，等待 Build Completed。

部署成功后，Vercel 会提供 `https://项目名.vercel.app` 地址。以后向 GitHub 的 `main` 分支推送代码，Vercel 会自动重新部署生产版本。

## 三、部署后检查

使用手机浏览器依次检查：

1. 打开首页并保存生日。
2. 刷新页面，确认生日仍然存在。
3. 打开 `/calendar`、`/knowledge` 与 `/profile`。
4. 直接在新标签打开 `/date/2026-10-25`。
5. 确认该日期显示流年 5、流月 6、流日 4。
6. 在支持的浏览器选择“添加到主屏幕”，重新打开应用。
7. 暂时离线后打开已经访问过的页面，确认缓存界面可用。

## 四、常见问题

- **Vercel 选择了 Other Framework**：手动改成 Next.js。
- **构建输出要求填写目录**：Next.js 项目保持默认即可，不要填写 `dist`。
- **Git 提示 origin already exists**：运行 `git remote -v` 检查地址，不要直接覆盖。
- **修改后网站没有更新**：确认改动已 commit 并 push 到 Vercel 连接的生产分支。
- **PWA 不能安装**：确认使用 Vercel 的 HTTPS 地址，并至少访问一次首页。
