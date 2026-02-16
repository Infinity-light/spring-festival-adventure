'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ACHIEVEMENTS_MAP } from '@/data/achievements'

const DISPLAY_DURATION = 1000
const STAGGER_DELAY = 300

interface AchievementToastProps {
  /** 新解锁的成就 ID 队列 */
  queue: string[]
  /** 队列消费完毕后回调 */
  onDone: () => void
}

export default function AchievementToast({ queue, onDone }: AchievementToastProps) {
  const [visible, setVisible] = useState<string | null>(null)
  const [index, setIndex] = useState(0)

  const showNext = useCallback(() => {
    if (index < queue.length) {
      setVisible(queue[index])
      setIndex((i) => i + 1)
    } else {
      setVisible(null)
      setIndex(0)
      onDone()
    }
  }, [index, queue, onDone])

  // 启动队列
  useEffect(() => {
    if (queue.length > 0 && index === 0) {
      setVisible(queue[0])
      setIndex(1)
    }
  }, [queue, index])

  // 自动消失 + 下一个
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => {
      setVisible(null)
      setTimeout(showNext, STAGGER_DELAY)
    }, DISPLAY_DURATION)
    return () => clearTimeout(timer)
  }, [visible, showNext])

  const achievement = visible ? ACHIEVEMENTS_MAP.get(visible) : null

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          key={achievement.id}
          initial={{ y: -80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="flex items-center gap-3 rounded-2xl border-2 border-festival-gold bg-bg-primary/95 backdrop-blur-md px-5 py-3.5 shadow-xl shadow-festival-gold/20">
            <span className="text-3xl leading-none">{achievement.emoji}</span>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-festival-gold tracking-wider uppercase">
                成就解锁
              </span>
              <span className="text-base font-bold text-text-primary leading-tight">
                {achievement.name}
              </span>
              <span className="text-xs text-text-secondary leading-snug mt-0.5">
                {achievement.description}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
