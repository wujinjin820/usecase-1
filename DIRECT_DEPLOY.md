# 🚀 直接部署到 Vercel（绕过 GitHub）

## 方法一：拖拽部署（最简单）

1. **访问 Vercel 拖拽部署页面**
   - 打开：https://vercel.com/new
   - 登录你的 Vercel 账号

2. **拖拽文件夹**
   - 在 Finder 中打开：`/Users/wujinjin/Documents/GitHub/usecase-1`
   - 将整个文件夹拖拽到 Vercel 页面的拖拽区域
   - 或者点击 "Browse" 选择文件夹

3. **配置项目**
   - Project Name: `usecase-1`（或自定义）
   - Framework Preset: **Other**
   - Root Directory: `./`（默认）
   - Build Command: **留空**
   - Output Directory: `./`（默认）

4. **部署**
   - 点击 "Deploy"
   - 等待 1-2 分钟

5. **获取链接**
   - 部署完成后会显示：`https://usecase-1-xxx.vercel.app`

## 方法二：使用 Vercel CLI（需要 Node.js）

如果已安装 Node.js：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署到生产环境
cd /Users/wujinjin/Documents/GitHub/usecase-1
vercel --prod
```

## 方法三：使用 npx（无需安装）

```bash
cd /Users/wujinjin/Documents/GitHub/usecase-1
npx vercel --prod
```

## 注意事项

- ✅ 所有文件都在根目录，无需额外配置
- ✅ `vercel.json` 已配置为最简单的空配置
- ✅ 静态网站会自动识别
- ⚠️ 拖拽部署不会自动更新，需要手动重新拖拽

## 推荐使用方法一（拖拽部署）

这是最简单直接的方式，不需要任何命令行操作！
