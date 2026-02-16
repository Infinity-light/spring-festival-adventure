# 🐴 春节回家历险记

> 扮演一匹在大城市打工的马，经历春运回家的重重考验。
>
> 搞笑吐槽 · 生存选择 · 专属贺卡 · 10 种结局

**在线体验：** [newyear.godpenai.com](https://newyear.godpenai.com)

## 关于这个项目

这个项目诞生于 2026 年除夕前夜的一个巧合。

那段时间我一直在研究全自动化的 AI 开发工作流，磨合了很多项目，但始终缺乏一点创造的灵感。恰好朋友送了我一只小马挂件，当时没什么礼物可回，于是灵机一动——不如做一款春节贺岁的小游戏，算是回馈给朋友的一点小惊喜。

从第一个 commit 到正式上线，前后大约 20 个小时。

这个项目基于 Next.js，但在此之前我一年来都在写 Vue，没有接触过任何一款 React 应用。仅仅 4 个小时，AI 就帮我完成了探索、规划、迭代、部署、发版的全流程，做好了第一个可用版本。此后一路开着 YOLO 模式跟 AI 讨论需求，连续迭代了几个版本，就有了现在这个样子。

无论世界和时光如何变迁，我们作为人的本真是不变的。就像游戏里的小马一样，不管遇见了多少艰难险阻，最终总是要回家——回到那个或许充满了琐碎和喧闹，但最终总能够让自己的心安宁下来的地方。

值此辞旧迎新之际，祝大家新年快乐，马到成功 🧧

## 玩法

- 🐴 文字冒险 + 资源管理（体力、金钱、心情）
- 🚂 三条回家路线：火车、飞机、高铁（含隐藏分支）
- 🎯 10 种结局等你解锁，含隐藏结局
- 🏅 20 个成就，跨游戏累计
- 🎴 通关后生成专属贺卡，可保存分享

## 技术栈

- **框架**：Next.js 16 / React 19 / TypeScript
- **样式**：Tailwind CSS 4
- **动画**：Framer Motion
- **贺卡截图**：html2canvas
- **分享二维码**：qrcode

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:3000 即可。

## 部署

项目使用 Docker 部署，GitHub Actions 推送到 master 后自动构建上线。

```bash
docker build -t spring-festival-adventure:latest .
docker compose up -d
```

服务运行在 3002 端口。计数器数据（"你是第 N 个回家的小马"）通过 Docker volume 持久化。

## 项目结构

```
src/
├── app/
│   ├── page.tsx              # 首页
│   ├── afterword/            # 后日谈（通关后解锁）
│   └── api/counter/          # 全局到家计数器
├── components/
│   ├── GameEngine.tsx        # 游戏引擎
│   ├── EndingCard.tsx        # 结局贺卡（含二维码分享）
│   ├── AchievementPanel.tsx  # 成就面板
│   └── ParticleEffect.tsx    # 粒子特效
├── data/
│   ├── chapters/             # 剧情章节（6 章）
│   ├── achievements.ts       # 成就定义
│   └── items.ts              # 道具定义
├── lib/
│   ├── achievements.ts       # 成就系统
│   └── gameState.ts          # 游戏状态管理
└── types/
    └── game.ts               # 类型定义
```

## 致谢

感谢每一个玩到结局的你。

如果这趟旅途让你会心一笑，那就是这个项目最大的意义了。

## License

MIT

---

*水中鱼 · 2026 年除夕*
