# 🚀 快速部署指南

## 当前状态
✅ 代码已提交到本地仓库  
✅ 项目已配置 Vercel 和 Netlify  
⚠️ 需要推送到 GitHub 后才能自动部署

## 部署步骤

### 第一步：推送代码到 GitHub

在终端执行以下命令：

```bash
cd /Users/wujinjin/Documents/GitHub/usecase-1
git push origin usecase-2
```

如果遇到认证问题，使用以下方式之一：

**方式1：使用 SSH（推荐）**
```bash
# 检查是否已有 SSH key
ls -la ~/.ssh

# 如果没有，生成新的 SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# 添加 SSH key 到 GitHub
# 复制公钥内容
cat ~/.ssh/id_ed25519.pub

# 然后到 GitHub Settings > SSH and GPG keys > New SSH key 添加
```

**方式2：使用 Personal Access Token**
1. 访问：https://github.com/settings/tokens
2. 生成新 token（选择 `repo` 权限）
3. 推送时使用 token 作为密码：
```bash
git push origin usecase-2
# Username: 你的GitHub用户名
# Password: 粘贴你的token
```

**方式3：临时禁用SSL验证（仅用于测试）**
```bash
git config http.sslVerify false
git push origin usecase-2
git config http.sslVerify true
```

### 第二步：在 Vercel 部署

#### 方法A：通过网站部署（最简单）

1. **访问 Vercel**
   - 打开：https://vercel.com/new
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Continue with GitHub"
   - 授权访问仓库
   - 在仓库列表中找到 `wujinjin820/usecase-1`
   - 点击 "Import"

3. **配置项目**
   - Framework Preset: **Other**（或留空）
   - Root Directory: `./`（默认）
   - Build Command: **留空**（静态网站）
   - Output Directory: `./`（默认）
   - Install Command: **留空**

4. **选择分支**
   - Branch: 选择 `usecase-2`

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待 1-2 分钟

6. **获取链接**
   - 部署完成后会显示：`https://usecase-1-xxx.vercel.app`
   - 这就是你的网站链接！🎉

#### 方法B：使用 Vercel CLI（需要 Node.js）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署到生产环境
cd /Users/wujinjin/Documents/GitHub/usecase-1
vercel --prod
```

### 第三步：验证部署

部署完成后，访问你的 Vercel 链接，检查：
- ✅ 首页是否正常显示
- ✅ 导航链接是否正常工作（Home, Careers, Team, Industries, Locations）
- ✅ 页面切换是否流畅
- ✅ 响应式设计是否正常

## 自动部署设置

部署成功后，Vercel 会自动：
- ✅ 监听 GitHub 仓库的推送
- ✅ 自动重新部署新代码
- ✅ 为每次部署生成预览链接

## 自定义域名（可选）

1. 在 Vercel 项目设置中
2. 点击 "Domains"
3. 添加你的自定义域名
4. 按照提示配置 DNS 记录

## 故障排除

### 问题1：找不到仓库
- 确保已授权 Vercel 访问 GitHub
- 检查仓库名称是否正确：`wujinjin820/usecase-1`

### 问题2：部署失败
- 检查 `vercel.json` 配置是否正确
- 确保所有文件都在根目录
- 查看 Vercel 部署日志

### 问题3：页面404
- 检查 SPA 路由配置
- 确保 `index.html` 在根目录
- 检查 `vercel.json` 中的路由配置

## 项目信息

- **仓库**: wujinjin820/usecase-1
- **分支**: usecase-2
- **类型**: 静态网站（SPA）
- **配置文件**: vercel.json, netlify.toml

---

**需要帮助？** 查看详细文档：`VERCEL_DEPLOY.md`
