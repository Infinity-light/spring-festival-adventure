# 春节回家历险记 - 项目文档

## 项目概述

春节贺岁互动文字冒险游戏。玩家扮演一匹在大城市打工的马，经历春运回家的重重考验。

- **线上地址**：https://newyear.godpenai.com（备用：https://spring.godpenai.com）
- **仓库**：https://github.com/Infinity-light/spring-festival-adventure

### 技术栈

- Next.js 16 / React 19 / TypeScript
- Tailwind CSS 4（`@theme inline` 方式注册自定义色）
- Framer Motion（页面动画、粒子特效）
- html2canvas（贺卡截图）+ qrcode（分享二维码）
- Docker + GitHub Actions CI/CD

## 架构设计

### 整体结构

```
用户 → Next.js App Router (CSR为主)
         ├── page.tsx          首页（开始游戏入口）
         ├── afterword/        后日谈（通关后解锁）
         └── api/counter/      全局到家计数器（文件持久化）
```

游戏逻辑全部在客户端运行，唯一的服务端接口是 `/api/counter`（POST 递增、GET 读取）。

### 游戏引擎流程

```
GameEngine (状态机)
  ├── useReducer(gameReducer) 管理 GameState
  ├── StoryScene 渲染当前节点叙事 + 选项
  ├── ResourceBar 显示体力/金钱/心情
  ├── InventoryDrawer 背包抽屉
  ├── AchievementToast 成就弹窗
  └── EndingCard 结局贺卡（含截图、二维码、统计）
```

### 数据流

1. `src/data/chapters/` 定义剧情节点（StoryNode[]），按章节拆分
2. `src/data/items.ts` 定义道具，`src/data/endings.ts` 定义结局
3. `src/data/achievements.ts` 定义成就条件
4. `src/lib/gameState.ts` 包含 reducer 和结局判定逻辑
5. `src/lib/achievements.ts` 管理成就解锁（localStorage 持久化，跨游戏累计）

## 核心模块

### 剧情系统 (`src/data/chapters/`)

- 7 个章节文件（chapter1-7），通过 `index.ts` 合并导出
- 每个 StoryNode 包含：叙事文本数组、选项列表、条件门控
- 三条主线路：火车（train）、飞机（plane）、高铁（hsr，含隐藏分支）
- 选项可附带：资源效果、道具获取/移除、tag（helpful/funny）

### 游戏状态 (`src/lib/gameState.ts`)

- `GameState` 包含：当前节点、资源、背包、统计、交通方式、结局
- `gameReducer` 处理所有 GameAction
- 结局判定：`determineEnding()` 根据资源、统计、道具综合判断
- 10 种结局：hidden_lucky、perfect、helpful_hero、funny_king、frugal_master、normal、barely、exhausted、broke、breakdown

### 成就系统 (`src/lib/achievements.ts`)

- 20 个成就，分三类：story（剧情触发）、ending（结局触发）、milestone（跨游戏累计）
- `localStorage` 存储：`unlocked`（已解锁成就集合）、`cumulative`（跨游戏累计数据）
- 累计数据包含：totalGames、totalEndings、totalItems、totalHelpful、totalFunny、totalStamina、totalMoney
- milestone 成就在每局结束时根据累计数据检查

### 贺卡组件 (`src/components/EndingCard.tsx`)

- 渐变背景从结局的 `cardStyle` 类名解析为内联 CSS（因 html2canvas 不支持 Tailwind）
- 底部左文右码布局：游戏名称 + 白色二维码（qrcode 库生成 dataURL）
- 统计面板：6 项数据带计数动画（useCountUp hook）
- 打赏区：收款码 `public/qrcode-tip.png` + 群聊码 `public/qrcode-group.png`

### 后日谈 (`src/app/afterword/page.tsx`)

- 路由守卫：检查 localStorage 中是否有 `ending_` 前缀的成就，无则重定向到首页
- 首页入口：`hasCleared` 状态控制"📝 后日谈"链接的显示

### 全局计数器 (`src/app/api/counter/route.ts`)

- POST：读取 → +1 → 写入 → 返回 `{ number }`
- GET：返回 `{ count }`
- 数据文件：`$COUNTER_DATA_DIR/counter.json`（Docker 中挂载 volume）

## 设计规范

### 色彩体系（globals.css）

| 变量 | 值 | 用途 |
|------|-----|------|
| `festival-red` | #C53030 | 主色调、按钮、强调 |
| `festival-gold` | #D69E2E | 辅助色、金色装饰 |
| `bg-primary` | #FDF6EC | 页面背景（暖米色） |
| `bg-card` | #FFFFFF | 卡片背景 |
| `text-primary` | #2D1B0E | 正文 |
| `text-secondary` | #8B6F5E | 次要文字 |
| `border` | #E8D5C0 | 边框 |

### 字体

Noto Sans SC（Google Fonts CDN），权重 400/500/700/900。

### 动画

- `fadeInUp`：文字渐显（0.5s）
- `resourceFlash`：资源变化闪烁（0.3s × 3）
- `goldGlow`：隐藏结局金色光晕（2s 循环）

## 部署

### 服务器

- 阿里云 ECS：47.98.171.82
- 部署目录：`/opt/spring-festival-adventure/spring-festival-adventure`
- 端口：3002

### Nginx

两个域名各自独立 server block + SSL 证书（Let's Encrypt）：
- `spring.godpenai.com` → 证书路径 `/etc/letsencrypt/live/spring.godpenai.com/`
- `newyear.godpenai.com` → 证书路径 `/etc/letsencrypt/live/newyear.godpenai.com/`
- 配置文件：`/etc/nginx/sites-available/spring-festival-adventure`

### CI/CD

GitHub Actions（`.github/workflows/deploy.yml`）：
1. push master 触发
2. scp 源码到服务器
3. 服务器上 `docker build` + `docker compose up -d`
4. 健康检查（curl 127.0.0.1:3002，最多重试 5 次）

### Docker

- 多阶段构建：builder（npm ci + build）→ production（仅运行时依赖）
- `counter-data` volume 持久化计数器数据
- 环境变量 `COUNTER_DATA_DIR` 可自定义数据目录（默认 `./data`）

## 静态资源

| 文件 | 说明 |
|------|------|
| `public/afterword-horse.png` | 后日谈中的小马挂件照片 |
| `public/qrcode-tip.png` | 打赏收款码 |
| `public/qrcode-group.png` | 群聊二维码 |
| `public/items/*.png` | 12 个道具图片（AI 生成） |
