# Vercel 部署指南

## 快速部署步骤

### 方法一：通过 Vercel 网站部署（推荐）

1. **访问 Vercel**
   - 打开：https://vercel.com/new
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Import Git Repository"
   - 搜索并选择：`wujinjin820/usecase-1`
   - 如果没看到，点击 "Adjust GitHub App Permissions" 授权

3. **配置项目**
   - Framework Preset: Other
   - Root Directory: `./` (默认)
   - Build Command: (留空，静态网站)
   - Output Directory: `./` (默认)
   - Install Command: (留空)

4. **选择分支**
   - Branch: `usecase-2`
   - 或者选择 `main` 分支

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待 1-2 分钟部署完成

6. **获取链接**
   - 部署完成后会显示类似：`https://usecase-1-xxx.vercel.app`
   - 这个就是你的网站链接！

### 方法二：使用 Vercel CLI（需要 Node.js）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

## 注意事项

- ✅ 项目已配置 `vercel.json`，会自动识别为静态网站
- ✅ 所有文件都在根目录，无需额外配置
- ✅ SPA 路由已配置，支持 hash 路由 (#home, #careers 等)
- ⚠️ 确保代码已推送到 GitHub

## 部署后检查

部署完成后，访问你的 Vercel 链接，检查：
- ✅ 首页是否正常显示
- ✅ 导航链接是否正常工作
- ✅ 页面切换是否流畅
- ✅ 响应式设计是否正常

## 自定义域名（可选）

1. 在 Vercel 项目设置中
2. 点击 "Domains"
3. 添加你的自定义域名
4. 按照提示配置 DNS
