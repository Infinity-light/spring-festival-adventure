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
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6 text-center">
      <ParticleEffect type="redpacket" count={12} />
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-black text-text-gold mb-2"
      >
        春节回家历险记
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-text-secondary text-base mb-8"
      >
        🐴 2026马年新春互动小游戏
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-text-primary/80 text-sm leading-7 mb-12 space-y-1"
      >
        <p>扮演一匹在大城市打工的马</p>
        <p>经历春运回家的重重考验</p>
        <p>搞笑、吐槽、生存选择</p>
        <p>通关生成专属新春贺卡！</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsStarted(true)}
        className="px-10 py-4 text-lg font-bold rounded-full
          bg-gradient-to-r from-festival-gold to-festival-gold-light
          text-bg-primary animate-gold-glow
          active:scale-95 transition-transform cursor-pointer"
      >
        🐴 开始冒险！
      </motion.button>
    </div>
  )
}
