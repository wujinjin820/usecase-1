# 部署说明

## 快速部署

代码已经提交到本地，需要推送到 GitHub 后自动部署。

### 推送代码到 GitHub

```bash
git push origin usecase-2
```

如果遇到证书问题，可以尝试：
```bash
git config --global http.sslVerify false
git push origin usecase-2
```

### 部署平台

项目已配置以下部署平台：

#### Vercel
- 配置文件：`vercel.json`
- 自动部署：连接 GitHub 仓库后，每次推送自动部署
- 访问：https://vercel.com

#### Netlify  
- 配置文件：`netlify.toml`
- 自动部署：连接 GitHub 仓库后，每次推送自动部署
- 访问：https://app.netlify.com

### 手动部署步骤

1. **推送代码到 GitHub**
   ```bash
   git push origin usecase-2
   ```

2. **在 Vercel 或 Netlify 导入项目**
   - 选择仓库：`wujinjin820/usecase-1`
   - 选择分支：`usecase-2`
   - 发布目录：`.`（根目录）

3. **等待部署完成**
   - 部署完成后会获得一个公开访问链接
   - 链接格式：`https://xxx.vercel.app` 或 `https://xxx.netlify.app`

### 注意事项

- 确保所有文件都已提交（index.html, styles.css, script.js 等）
- 部署后检查 SPA 路由是否正常工作
- 如果使用自定义域名，需要在平台设置中添加域名
