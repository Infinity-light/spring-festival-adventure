# 🐴 春节回家历险记

一款春节贺岁互动文字冒险游戏。扮演一匹在大城市打工的马，经历春运回家的重重考验。

**在线体验：** [newyear.godpenai.com](https://newyear.godpenai.com)

## 玩法

- 文字冒险 + 资源管理（体力、金钱、心情）
- 三条回家路线：火车、飞机、高铁（含隐藏分支）
- 10 种结局，含隐藏结局
- 20 个成就，跨游戏累计解锁
- 通关后生成专属贺卡，支持保存分享

## 技术栈

- Next.js 16 / React 19 / TypeScript
- Tailwind CSS 4
- Framer Motion
- html2canvas（贺卡截图）
- qrcode（分享二维码）

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 部署

Docker 部署：

```bash
docker build -t spring-festival-adventure:latest .
docker compose up -d
```

服务运行在 3002 端口，计数器数据持久化在 `counter-data` volume 中。

## 项目结构

```
src/
├── app/
│   ├── page.tsx            # 首页
│   ├── afterword/          # 后日谈
│   └── api/counter/        # 全局计数器 API
├── components/
│   ├── GameEngine.tsx       # 游戏引擎
│   ├── EndingCard.tsx       # 结局贺卡
│   ├── AchievementPanel.tsx # 成就面板
│   └── ParticleEffect.tsx   # 粒子特效
├── data/
│   ├── chapters/            # 剧情章节（6章）
│   ├── achievements.ts      # 成就定义
│   └── items.ts             # 道具定义
├── lib/
│   ├── achievements.ts      # 成就系统逻辑
│   └── gameState.ts         # 游戏状态管理
└── types/
    └── game.ts              # 类型定义
```

## License

MIT
