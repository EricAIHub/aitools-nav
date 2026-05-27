# AiTool.so - AI 工具导航站

发现最好的 AI 工具。精选 100+ 人工智能工具，覆盖对话、绘画、视频、编程、写作等 10 大分类。

## 🚀 快速开始

```bash
# 本地预览
cd aitools-nav
python -m http.server 8080
# 访问 http://localhost:8080
```

## 📁 项目结构

```
aitools-nav/
├── index.html          # 主页（工具导航）
├── submit.html         # 工具提交页面
├── data/
│   └── tools.json      # 工具数据库
├── assets/             # 静态资源
└── README.md
```

## 🌐 部署

### 方案 1: GitHub Pages（推荐，免费）
1. 创建 GitHub 仓库
2. 推送代码
3. Settings → Pages → Source: Deploy from branch → main
4. 访问 `https://你的用户名.github.io/aitools-nav/`

### 方案 2: Netlify（推荐，免费）
1. 登录 [netlify.com](https://netlify.com)
2. 拖拽项目文件夹到部署区域
3. 自动部署完成

### 方案 3: Vercel
```bash
npx vercel --prod
```

## 💰 变现方案

| 方式 | 说明 | 预期收入 |
|------|------|----------|
| 联盟营销 | 工具推荐链接带 ref 参数 | $500-2000/月 |
| Google AdSense | 展示广告 | $200-1000/月 |
| 付费收录 | 工具提交审核加速 | ¥50-200/条 |
| VIP 会员 | 独家工具推荐 + 早鸟体验 | ¥29-99/月 |

## 📝 添加工具

编辑 `data/tools.json`，按照现有格式添加新工具即可。

工具数据格式：
```json
{
  "id": 21,
  "name": "ToolName",
  "nameZh": "工具中文名",
  "category": "chat",
  "description": "工具简介",
  "url": "https://...",
  "pricing": "免费 / $10/月",
  "rating": 4.5,
  "tags": ["标签1", "标签2"],
  "featured": false,
  "affiliate": false
}
```

## 📄 License

MIT
