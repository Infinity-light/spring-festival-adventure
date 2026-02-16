'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { loadUnlocked } from '@/lib/achievements'

export default function Afterword2Page() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const unlocked = loadUnlocked()
    if (!unlocked['ending_unicorn_night']) {
      router.replace('/')
    } else {
      setReady(true)
    }
  }, [router])

  if (!ready) return null

  return (
    <div className="min-h-screen bg-bg-main flex flex-col items-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <p className="text-5xl mb-4">🦄</p>
          <h1 className="text-2xl font-bold text-festival-red-dark">
            后后日谈
          </h1>
          <p className="text-xs text-text-secondary/50 mt-2">全成就解锁后的隐藏篇章</p>
        </div>

        <div className="bg-bg-card border border-border rounded-2xl p-6 sm:p-8 mb-8">
          <div className="text-text-secondary text-[15px] leading-[2] text-left">

            <p>如果你看到了这里，说明你已经解锁了全部成就。</p>

            <br />

            <p>恭喜你，真正的独角兽。🦄</p>

            <br />

            <p>
              今天凌晨 2 点，我把项目发给了友人 X。
            </p>

            <br />

            <p>
              X 硬生生跟我玩了两个小时，打出了全成就。
            </p>

            <br />

            <p>
              在这两个小时里，X 一边玩一边给我提 bug、提建议、提新点子。我的四个 Claude Code 进程风驰电掣地运转，为整个游戏添加了 10 余处修复和近 50% 的内容更新。
            </p>

            <br />

            <p>
              两个小时，烧掉了 1100 万 token。
            </p>

            <br />

            <p className="text-center text-text-primary font-medium">
              人类对 AI 的探索，还远没有到达极限。
            </p>

            <br />
            <br />

            <p className="text-right text-text-secondary/60 text-sm">
              水中鱼
              <br />
              2026 年正月初一
            </p>

          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/afterword">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-2.5 rounded-full border-2 border-border text-text-secondary font-medium cursor-pointer transition-colors hover:bg-border/10"
            >
              后日谈
            </motion.span>
          </Link>
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-2.5 rounded-full border-2 border-festival-gold text-festival-gold font-medium cursor-pointer transition-colors hover:bg-festival-gold/10"
            >
              返回首页
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
