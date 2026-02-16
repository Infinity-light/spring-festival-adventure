'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GameEngine } from '@/components/GameEngine'
import ParticleEffect from '@/components/ParticleEffect'
import allStoryNodes from '@/data/chapters'
import { loadUnlocked } from '@/lib/achievements'

export default function Home() {
  const [isStarted, setIsStarted] = useState(false)
  const [hasCleared, setHasCleared] = useState(false)
  const [hasUnicorn, setHasUnicorn] = useState(false)

  useEffect(() => {
    const unlocked = loadUnlocked()
    const hasEnding = Object.keys(unlocked).some((k) => k.startsWith('ending_'))
    setHasCleared(hasEnding)
    setHasUnicorn(!!unlocked['ending_unicorn_night'])
  }, [])

  if (isStarted) {
    return <GameEngine storyNodes={allStoryNodes} />
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <ParticleEffect type="redpacket" count={10} />

      {/* 装饰线 */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-festival-red/30 rounded-full" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-text-secondary text-xs tracking-[0.3em] uppercase mb-4"
      >
        2026 · 丙午马年
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-black text-festival-red mb-2"
      >
        春节回家历险记
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-12 h-px bg-festival-gold mx-auto my-4"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-text-secondary text-sm leading-7 mb-12 space-y-1"
      >
        <p>🐴 扮演一匹在大城市打工的马</p>
        <p>经历春运回家的重重考验</p>
        <p>搞笑吐槽 · 生存选择 · 专属贺卡</p>
        <p className="text-text-secondary/50 text-xs mt-2">10 种结局等你解锁，含隐藏结局 🐴</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsStarted(true)}
        className="px-10 py-4 text-lg font-bold rounded-full
          bg-festival-red text-white
          shadow-lg shadow-festival-red/20
          active:scale-95 transition-transform cursor-pointer"
      >
        🐴 开始冒险
      </motion.button>

      {hasCleared && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-4 flex flex-col items-center gap-2"
        >
          <Link
            href="/afterword"
            className="text-sm text-text-secondary opacity-70 hover:opacity-100 transition-opacity"
          >
            📝 后日谈
          </Link>
          {hasUnicorn && (
            <Link
              href="/afterword2"
              className="text-sm text-text-secondary opacity-70 hover:opacity-100 transition-opacity"
            >
              🦄 后后日谈
            </Link>
          )}
        </motion.div>
      )}

      <p className="absolute bottom-4 text-text-secondary/40 text-[10px]">
        水中鱼 @godpenai.com, Cytopia, 2026
      </p>
    </div>
  )
}
