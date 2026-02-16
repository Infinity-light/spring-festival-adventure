'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Item } from '@/types/game'

interface ItemCardProps {
  item: Item
  index: number
}

export default function ItemCard({ item, index }: ItemCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className="flex items-center gap-3 rounded-xl border border-border bg-bg-card p-3"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
    >
      {/* 左侧图片 / emoji fallback */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-bg-secondary">
        {imgError ? (
          <span className="text-3xl">{item.emoji}</span>
        ) : (
          <Image
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* 右侧信息 */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-bold text-text-primary truncate">
          {item.emoji} {item.name}
        </span>
        <span className="text-xs text-text-secondary line-clamp-2">
          {item.description}
        </span>
      </div>
    </motion.div>
  )
}
