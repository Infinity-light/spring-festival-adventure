'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import type { Ending, GameStats, Resources } from '@/types/game'

interface EndingCardProps {
  ending: Ending
  stats: GameStats
  resources: Resources
  onRestart: () => void
}

/** 从 Tailwind cardStyle 类名中提取渐变色，转为内联 CSS */
function parseGradient(cardStyle: string): string {
  const colorMap: Record<string, string> = {
    'yellow-500': '#eab308', 'yellow-600': '#ca8a04', 'yellow-700': '#a16207',
    'yellow-800': '#854d0e', 'red-500': '#ef4444', 'red-600': '#dc2626',
    'orange-600': '#ea580c', 'orange-700': '#c2410c',
    'green-800': '#166534', 'emerald-900': '#064e3b',
    'amber-700': '#b45309', 'amber-800': '#92400e',
    'purple-800': '#6b21a8', 'pink-900': '#831843',
    'sky-700': '#0369a1', 'blue-800': '#1e40af',
  }
  const from = cardStyle.match(/from-(\S+)/)?.[1] ?? ''
  const via = cardStyle.match(/via-(\S+)/)?.[1] ?? ''
  const to = cardStyle.match(/to-(\S+)/)?.[1] ?? ''
  const c1 = colorMap[from] ?? '#dc2626'
  const c2 = colorMap[via] ?? '#b91c1c'
  const c3 = colorMap[to] ?? '#dc2626'
  return `linear-gradient(to bottom right, ${c1}, ${c2}, ${c3})`
}

const CARD_ASPECT = '3 / 4'
const SCREENSHOT_SCALE = 2

export default function EndingCard({ ending, stats, resources, onRestart }: EndingCardProps) {
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
          aspectRatio: CARD_ASPECT,
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="w-full max-w-sm rounded-2xl shadow-2xl flex flex-col justify-between px-6 py-8"
      >
        {/* 四角装饰 */}
        <span style={{ position: 'absolute', top: 8, left: 10, fontSize: 18, opacity: 0.5 }}>🐴</span>
        <span style={{ position: 'absolute', top: 8, right: 10, fontSize: 18, opacity: 0.5 }}>🧧</span>
        <span style={{ position: 'absolute', bottom: 8, left: 10, fontSize: 18, opacity: 0.5 }}>🧨</span>
        <span style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 18, opacity: 0.5 }}>🐴</span>

        {/* 顶部：emoji + 标题 */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, lineHeight: 1.2 }}>{ending.emoji}</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>{ending.title}</h2>
        </div>

        {/* 中间：描述 */}
        <p style={{ fontSize: 15, lineHeight: 1.7, textAlign: 'center', opacity: 0.95 }}>
          {ending.description}
        </p>

        {/* 统计数据 */}
        <div style={{ fontSize: 13, lineHeight: 1.8, opacity: 0.85, textAlign: 'center' }}>
          <div>💰 花费：{stats.totalMoneySpent}元</div>
          <div>💑 被问有没有对象：{stats.relationshipQuestions}次</div>
          <div>🍜 吃了泡面：{stats.noodleCupsEaten}碗</div>
          <div>📊 最终资源：体力{resources.stamina} 钱包{resources.money} 心情{resources.mood}</div>
        </div>

        {/* 祝福语 */}
        <p style={{ fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic' }}>
          {ending.greeting}
        </p>

        {/* 底部 */}
        <div style={{ textAlign: 'center', fontSize: 11, opacity: 0.6 }}>
          <div>🐴 春节回家历险记 2026</div>
          <div>扫码挑战 →</div>
        </div>
      </div>

      {/* ---- 操作按钮 ---- */}
      <div className="flex gap-4 w-full max-w-sm">
        <button
          type="button"
          onClick={handleSaveCard}
          className="flex-1 py-3 rounded-xl bg-festival-gold text-white font-bold text-base hover:opacity-90 transition-opacity"
        >
          📸 保存贺卡
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="flex-1 py-3 rounded-xl border-2 border-festival-gold text-festival-gold font-bold text-base hover:bg-festival-gold/10 transition-colors"
        >
          🔄 再玩一次
        </button>
      </div>
    </motion.div>
  )
}
