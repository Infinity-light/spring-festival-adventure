'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GameEngine } from '@/components/GameEngine'
import ParticleEffect from '@/components/ParticleEffect'
import allStoryNodes from '@/data/chapters'

export default function Home() {
  const [isStarted, setIsStarted] = useState(false)

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
        <p className="text-text-secondary/50 text-xs mt-2">7 种结局等你解锁，含 1 个隐藏结局 🐴</p>
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
    </div>
  )
}
