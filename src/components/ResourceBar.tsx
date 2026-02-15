'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Resources, ResourceType } from '@/types/game'

interface ResourceBarProps {
  resources: Resources
  previousResources?: Resources
}

const RESOURCE_CONFIG: Record<ResourceType, {
  icon: string
  label: string
  colorClass: string
  maxValue: number | null
}> = {
  stamina: { icon: '体', label: '体力', colorClass: 'bg-stamina', maxValue: 100 },
  money:   { icon: '财', label: '钱包', colorClass: 'bg-money',   maxValue: null },
  mood:    { icon: '心', label: '心情', colorClass: 'bg-mood',    maxValue: 100 },
}

const RESOURCE_KEYS: ResourceType[] = ['stamina', 'money', 'mood']

function formatDelta(delta: number): string {
  return delta > 0 ? `+${delta}` : `${delta}`
}

export default function ResourceBar({ resources, previousResources }: ResourceBarProps) {
  const deltas = useMemo(() => {
    if (!previousResources) return null
    return RESOURCE_KEYS.reduce((acc, key) => {
      const diff = resources[key] - previousResources[key]
      if (diff !== 0) acc[key] = diff
      return acc
    }, {} as Partial<Record<ResourceType, number>>)
  }, [resources, previousResources])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2 border-b border-border bg-bg-secondary/95 backdrop-blur-sm px-3 py-2 sm:gap-4 sm:px-6">
      {RESOURCE_KEYS.map((key) => {
        const { icon, label, colorClass, maxValue } = RESOURCE_CONFIG[key]
        const value = resources[key]
        const delta = deltas?.[key]
        const percentage = maxValue ? Math.min((value / maxValue) * 100, 100) : null

        return (
          <div key={key} className="flex flex-1 items-center gap-1.5 sm:gap-2">
            {/* 图标 + 资源名 */}
            <span className={`text-xs font-bold w-5 h-5 rounded flex items-center justify-center text-white ${colorClass}`} aria-label={label}>
              {icon}
            </span>
            <span className="hidden text-xs text-text-secondary sm:inline">
              {label}
            </span>

            {/* 数值 + delta */}
            <div className="relative flex items-center gap-1">
              <motion.span
                key={value}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="text-sm font-bold text-text-primary"
              >
                {value}
              </motion.span>

              <AnimatePresence>
                {delta != null && (
                  <motion.span
                    key={`${key}-delta-${delta}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.6 }}
                    className={`absolute -right-7 text-xs font-semibold ${
                      delta > 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {formatDelta(delta)}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* 进度条（仅体力和心情） */}
            {percentage != null && (
              <div className="ml-1 h-2 flex-1 overflow-hidden rounded-full bg-black/8">
                <motion.div
                  className={`h-full rounded-full ${colorClass}`}
                  initial={false}
                  animate={{ width: `${percentage}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
