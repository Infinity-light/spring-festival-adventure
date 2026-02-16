'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ACHIEVEMENTS from '@/data/achievements'
import { loadUnlocked } from '@/lib/achievements'
import type { Achievement } from '@/types/game'

interface AchievementPanelProps {
  /** 本局新解锁的成就 ID */
  newlyUnlocked: string[]
}

const CATEGORY_LABELS: Record<string, string> = {
  story: '剧情成就',
  ending: '结局成就',
  milestone: '里程碑',
}

export default function AchievementPanel({ newlyUnlocked }: AchievementPanelProps) {
  const [unlocked, setUnlocked] = useState<Record<string, { unlockedAt: string }>>({})

  useEffect(() => {
    setUnlocked(loadUnlocked())
  }, [newlyUnlocked])

  const totalUnlocked = Object.keys(unlocked).length
  const newSet = new Set(newlyUnlocked)

  // 按类别分组
  const grouped = ACHIEVEMENTS.reduce<Record<string, Achievement[]>>((acc, a) => {
    const cat = a.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(a)
    return acc
  }, {})

  return (
    <motion.div
      className="w-full max-w-sm rounded-2xl bg-festival-gold/10 border border-festival-gold/20 p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <h3 className="text-center text-text-gold font-bold text-base mb-1">
        🏅 成就
      </h3>
      <p className="text-center text-xs text-text-secondary mb-4">
        已解锁 {totalUnlocked}/{ACHIEVEMENTS.length}
      </p>

      <div className="flex flex-col gap-4">
        {Object.entries(grouped).map(([category, achievements]) => (
          <div key={category}>
            <p className="text-xs font-bold text-text-secondary/70 mb-2 tracking-wider">
              {CATEGORY_LABELS[category] ?? category}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {achievements.map((ach, i) => {
                const isUnlocked = !!unlocked[ach.id]
                const isNew = newSet.has(ach.id)
                const showDetails = isUnlocked || !ach.hidden

                return (
                  <motion.div
                    key={ach.id}
                    className={`relative flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      isUnlocked
                        ? 'bg-white/80 border border-festival-gold/30'
                        : 'bg-white/30 border border-border/50 opacity-50'
                    }`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: isUnlocked ? 1 : 0.5 }}
                    transition={{ delay: 0.8 + i * 0.05, type: 'spring', stiffness: 300 }}
                  >
                    <span className={`text-lg leading-none ${isUnlocked ? '' : 'grayscale'}`}>
                      {showDetails ? ach.emoji : '❓'}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-xs font-bold leading-tight truncate ${
                        isUnlocked ? 'text-text-primary' : 'text-text-secondary'
                      }`}>
                        {showDetails ? ach.name : '???'}
                      </span>
                      <span className="text-[10px] text-text-secondary leading-snug truncate">
                        {showDetails ? ach.description : '隐藏成就'}
                      </span>
                    </div>
                    {isNew && (
                      <span className="absolute -top-1.5 -right-1.5 bg-festival-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                        NEW
                      </span>
                    )}
                    {!isUnlocked && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg opacity-30">🔒</span>
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
