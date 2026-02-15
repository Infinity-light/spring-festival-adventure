'use client'

import { useMemo } from 'react'

interface ParticleEffectProps {
  type: 'redpacket' | 'firework' | 'blessing'
  count?: number
}

const SHAPES = ['circle', 'diamond', 'dot'] as const

export default function ParticleEffect({ type, count = 15 }: ParticleEffectProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        size: 4 + Math.random() * 8,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        color: type === 'firework'
          ? ['#C53030', '#D69E2E', '#ECC94B', '#E53E3E'][Math.floor(Math.random() * 4)]
          : type === 'redpacket'
            ? ['#C53030', '#9B2C2C', '#E53E3E'][Math.floor(Math.random() * 3)]
            : '#D69E2E',
      })),
    [type, count],
  )

  const animName = type === 'firework' ? 'pFirework' : type === 'redpacket' ? 'pFall' : 'pBlessing'

  return (
    <div
      className="particle-container"
      style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none', overflow: 'hidden' }}
    >
      <style>{`
        @keyframes pFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(50vh) translateX(15px) rotate(180deg); opacity: 0.5; }
          100% { transform: translateY(110vh) translateX(-10px) rotate(360deg); opacity: 0; }
        }
        @keyframes pFirework {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          40% { transform: translateY(-50vh) scale(1.5); opacity: 0.7; }
          70% { transform: translateY(-60vh) scale(2); opacity: 0.4; }
          100% { transform: translateY(-70vh) scale(0.5); opacity: 0; }
        }
        @keyframes pBlessing {
          0% { transform: translateY(-10vh) rotate(-15deg); opacity: 0.6; }
          50% { transform: translateY(50vh) rotate(15deg); opacity: 0.4; }
          100% { transform: translateY(110vh) rotate(-10deg); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: type === 'firework' ? 'auto' : '0',
            bottom: type === 'firework' ? '0' : 'auto',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'dot' ? '50%' : '2px',
            transform: p.shape === 'diamond' ? 'rotate(45deg)' : undefined,
            animation: `${animName} ${p.duration}s ${p.delay}s ease-in-out infinite`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
