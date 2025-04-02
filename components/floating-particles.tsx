"use client"
import { motion } from "framer-motion"

interface FloatingParticlesProps {
  count?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
}

export default function FloatingParticles({
  count = 50,
  colors = ["#7C3AED", "#9333EA", "#FF3B30", "#34D399", "#ffffff"],
  minSize = 2,
  maxSize = 6,
}: FloatingParticlesProps) {
  const particles = Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * (maxSize - minSize) + minSize
    const color = colors[Math.floor(Math.random() * colors.length)]
    const x = Math.random() * 100
    const y = Math.random() * 100
    const duration = Math.random() * 20 + 10
    const delay = Math.random() * 5

    return { id: i, size, color, x, y, duration, delay }
  })

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.4,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, Math.random() * 0.5 + 1, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

