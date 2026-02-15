'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Choice } from '@/types/game'

const ENTRY_DELAY_STEP = 0.1
const SELECTED_RESET_MS = 300

interface ChoiceButtonProps {
  choice: Choice
  index: number
  disabled: boolean
  onChoose: (choice: Choice) => void
}

export default function ChoiceButton({
  choice,
  index,
  disabled,
  onChoose,
}: ChoiceButtonProps) {
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    if (disabled || isSelected) return
    setIsSelected(true)
    setTimeout(() => onChoose(choice), SELECTED_RESET_MS)
  }

  const isHighlighted = isSelected

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      title={choice.tooltip}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isHighlighted ? 1.04 : 1,
      }}
      transition={{ delay: index * ENTRY_DELAY_STEP, duration: 0.3 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`
        w-full px-5 py-3 rounded-xl text-left
        bg-bg-card border-2 text-text-primary
        transition-colors duration-200
        ${isHighlighted
          ? 'border-festival-gold shadow-lg'
          : 'border-festival-red-dark hover:border-festival-gold'
        }
        ${disabled && !isSelected
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer'
        }
      `}
    >
      <span className="text-base leading-relaxed">
        {choice.emoji && (
          <span className="mr-2" aria-hidden="true">
            {choice.emoji}
          </span>
        )}
        {choice.text}
      </span>
    </motion.button>
  )
}
