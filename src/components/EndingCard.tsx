'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import type { Ending, GameStats, Resources, Item } from '@/types/game'

const TOTAL_ITEMS = 12

interface EndingCardProps {
  ending: Ending
  stats: GameStats
  resources: Resources
  inventory: string[]
  items: Record<string, Item>
  onRestart: () => void
}

/** 从 Tailwind cardStyle 类名中提取渐变色，转为内联 CSS */
function parseGradient(cardStyle: string): string {
  const colorMap: Record<string, string> = {
    'red-600': '#dc2626', 'red-500': '#ef4444',
    'amber-500': '#f59e0b',
    'sky-500': '#0ea5e9', 'blue-600': '#2563eb',
    'orange-500': '#f97316',
    'emerald-600': '#059669', 'teal-700': '#0f766e',
    'yellow-400': '#facc15', 'yellow-500': '#eab308', 'yellow-600': '#ca8a04',
    'purple-600': '#9333ea', 'pink-600': '#db2777',
  }
  const from = cardStyle.match(/from-(\S+)/)?.[1] ?? ''
  const via = cardStyle.match(/via-(\S+)/)?.[1] ?? ''
  const to = cardStyle.match(/to-(\S+)/)?.[1] ?? ''
  const c1 = colorMap[from] ?? '#dc2626'
  const c2 = colorMap[via] ?? '#b91c1c'
  const c3 = colorMap[to] ?? '#dc2626'
  return `linear-gradient(to bottom right, ${c1}, ${c2}, ${c3})`
}

/** 根据统计数据生成个性化旅途评语 */
function generateCommentary(stats: GameStats, resources: Resources): string[] {
  const comments: string[] = []
  if (stats.itemsCollected >= 8) {
    comments.push('🏅 收集达马！你几乎找到了所有宝贝')
  }
  if (stats.helpfulActions >= 3) {
    comments.push('🤝 热心马！你在旅途中帮助了很多人')
  }
  if (stats.highestMood >= 90 && resources.mood >= 60) {
    comments.push('😊 快乐马！你的好心态让旅途充满阳光')
  }
  if (stats.lowestStamina <= 20) {
    comments.push('💪 铁马！即使精疲力竭也坚持到了终点')
  }
  if (stats.funnyMoments >= 3) {
    comments.push('🤣 搞笑马！一路欢声笑语不断')
  }
  if (stats.totalMoneySpent >= 3000) {
    comments.push('💰 豪气马！花钱如流水，但快乐无价')
  }
  if (comments.length === 0) {
    comments.push('🐴 平安马！稳稳当当走完了回家路')
  }
  return comments
}

/** 计数动画 Hook：从 0 递增到目标值 */
function useCountUp(target: number, duration = 1200): number {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (target === 0) { setValue(0); return }
    const startTime = performance.now()
    let raf: number
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

/** 单个统计卡片 */
function StatCard({ emoji, label, value, suffix }: {
  emoji: string
  label: string
  value: number
  suffix?: string
}) {
  const animated = useCountUp(value)
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-white/15 px-3 py-2.5 backdrop-blur-sm">
      <span className="text-xl leading-none">{emoji}</span>
      <span className="text-lg font-bold leading-none tabular-nums">
        {animated}{suffix ?? ''}
      </span>
      <span className="text-[11px] opacity-80 leading-tight">{label}</span>
    </div>
  )
}

const SCREENSHOT_SCALE = 2

export default function EndingCard({ ending, stats, resources, inventory, items, onRestart }: EndingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleSaveCard = async () => {
    if (!cardRef.current) return
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: SCREENSHOT_SCALE,
        useCORS: true,
        backgroundColor: null,
      })
      const link = document.createElement('a')
      link.download = '春节回家历险记-贺卡.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('贺卡截图失败:', err)
    }
  }

  const gradient = parseGradient(ending.cardStyle)
  const commentary = generateCommentary(stats, resources)

  return (
    <motion.div
      className="flex flex-col items-center gap-6 p-4"
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {/* ---- 贺卡区域 ---- */}
      <div
        ref={cardRef}
        style={{
          background: gradient,
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="w-full max-w-sm rounded-2xl shadow-2xl flex flex-col gap-5 px-6 py-8"
      >
        {/* 顶部：emoji + 标题 */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, lineHeight: 1.2 }}>{ending.emoji}</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>{ending.title}</h2>
        </div>

        {/* 中间：描述 */}
        <p style={{ fontSize: 15, lineHeight: 1.7, textAlign: 'center', opacity: 0.95 }}>
          {ending.description}
        </p>

        {/* 统计数据（旧的简要版，保留在贺卡截图中） */}
        <div style={{ fontSize: 13, lineHeight: 1.8, opacity: 0.85, textAlign: 'center' }}>
          <div>花费：{stats.totalMoneySpent}元</div>
          <div>被问有没有对象：{stats.relationshipQuestions}次</div>
          <div>吃了泡面：{stats.noodleCupsEaten}碗</div>
          <div>最终资源：体力{resources.stamina} 钱包{resources.money} 心情{resources.mood}</div>
        </div>

        {/* 祝福语 */}
        <p style={{ fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic' }}>
          {ending.greeting}
        </p>

        {/* 底部 */}
        <div style={{ textAlign: 'center', fontSize: 11, opacity: 0.6 }}>
          <div>春节回家历险记 · 2026</div>
          <div style={{ marginTop: 2 }}>WaterFish@godpenAI.com, Cytopia, 2026</div>
        </div>
      </div>

      {/* ---- 旅途统计面板 ---- */}
      <motion.div
        className="w-full max-w-sm rounded-2xl bg-festival-red/10 border border-festival-red/20 p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h3 className="text-center text-festival-red-dark font-bold text-base mb-4">
          📊 旅途统计
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          <StatCard emoji="🎯" label="总选择" value={stats.totalChoices} suffix="次" />
          <StatCard emoji="🎒" label="收集道具" value={stats.itemsCollected} suffix={`/${TOTAL_ITEMS}`} />
          <StatCard emoji="🤝" label="助人次数" value={stats.helpfulActions} suffix="次" />
          <StatCard emoji="😂" label="搞笑时刻" value={stats.funnyMoments} suffix="次" />
          <StatCard emoji="💪" label="体力最低谷" value={stats.lowestStamina} />
          <StatCard emoji="😊" label="心情最高峰" value={stats.highestMood} />
        </div>
      </motion.div>

      {/* ---- 道具展示栏 ---- */}
      {inventory.length > 0 && (
        <motion.div
          className="w-full max-w-sm rounded-2xl bg-festival-gold/10 border border-festival-gold/20 p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-center text-text-gold font-bold text-base mb-3">
            🎒 收集的道具
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {inventory.map((itemId) => {
              const item = items[itemId]
              if (!item) return null
              return (
                <motion.div
                  key={itemId}
                  className="flex items-center gap-1.5 rounded-full bg-white/80 border border-festival-gold/30 px-3 py-1.5 text-sm text-text-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + Math.random() * 0.3, type: 'spring', stiffness: 300 }}
                >
                  <span>{item.emoji}</span>
                  <span className="text-xs font-medium">{item.name}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* ---- 旅途评价 ---- */}
      <motion.div
        className="w-full max-w-sm rounded-2xl bg-bg-card border border-border p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <h3 className="text-center text-text-primary font-bold text-base mb-3">
          🐴 旅途评价
        </h3>
        <div className="flex flex-col gap-2">
          {commentary.map((comment, i) => (
            <motion.p
              key={i}
              className="text-sm text-text-secondary text-center leading-relaxed"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.15 }}
            >
              {comment}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* ---- 操作按钮 ---- */}
      <div className="flex gap-4 w-full max-w-sm">
        <button
          type="button"
          onClick={handleSaveCard}
          className="flex-1 py-3 rounded-xl bg-festival-gold text-white font-bold text-base hover:opacity-90 transition-opacity"
        >
          保存贺卡
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="flex-1 py-3 rounded-xl border-2 border-festival-gold text-festival-gold font-bold text-base hover:bg-festival-gold/10 transition-colors"
        >
          再玩一次
        </button>
      </div>

      {/* ---- 打赏 & 群聊区域 ---- */}
      <div className="w-full max-w-sm mt-2 rounded-2xl border border-border bg-bg-card/80 p-5 flex flex-col items-center gap-4">
        <p className="text-text-secondary text-sm text-center">
          如果这趟旅途让你会心一笑，欢迎请作者喝杯咖啡 ☕
        </p>
        <div className="flex gap-6 w-full justify-center">
          {/* 收款码 */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-28 h-28 rounded-xl border border-border bg-bg-secondary flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/qrcode-tip.png"
                alt="打赏二维码"
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <span className="text-xs text-text-secondary">自愿打赏</span>
          </div>
          {/* 群聊码 */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-28 h-28 rounded-xl border border-border bg-bg-secondary flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/qrcode-group.png"
                alt="群聊二维码"
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <span className="text-xs text-text-secondary">加群聊天</span>
          </div>
        </div>
        <p className="text-text-secondary/60 text-xs text-center">
          所有打赏纯属自愿，感谢每一份支持 🧧
        </p>
      </div>
    </motion.div>
  )
}
