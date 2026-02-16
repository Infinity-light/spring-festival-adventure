'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { Item } from '@/types/game'
import ItemCard from '@/components/ItemCard'

interface InventoryDrawerProps {
  isOpen: boolean
  onClose: () => void
  inventory: string[]
  items: Record<string, Item>
}

export default function InventoryDrawer({ isOpen, onClose, inventory, items }: InventoryDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 抽屉面板 */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[70] w-80 max-w-[85vw] border-l border-border bg-bg-secondary shadow-xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* 顶栏 */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-lg font-bold text-text-primary">
                {'🎒 我的背包'}
              </h2>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-bg-primary transition-colors"
                aria-label="关闭背包"
              >
                ✕
              </button>
            </div>

            {/* 道具列表 */}
            <div className="flex-1 overflow-y-auto p-4">
              {inventory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-text-secondary">
                  <span className="text-4xl mb-3">🎒</span>
                  <span className="text-sm">背包空空如也~</span>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {inventory.map((itemId, index) => {
                    const item = items[itemId]
                    if (!item) return null
                    return <ItemCard key={itemId} item={item} index={index} />
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
