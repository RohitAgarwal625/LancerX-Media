"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface FallingBallsProps {
  count?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  minDuration?: number
  maxDuration?: number
}

export default function FallingBalls({
  count = 20,
  colors = ["#7C3AED", "#9333EA", "#FF3B30", "#34D399"],
  minSize = 5,
  maxSize = 20,
  minDuration = 10,
  maxDuration = 25,
}: FallingBallsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate random balls
  const balls = Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * (maxSize - minSize) + minSize
    const duration = Math.random() * (maxDuration - minDuration) + minDuration
    const delay = Math.random() * 5
    const color = colors[Math.floor(Math.random() * colors.length)]
    const xPosition = Math.random() * 100 // Random horizontal position (0-100%)

    return { id: i, size, duration, delay, color, xPosition }
  })

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {balls.map((ball) => (
        <motion.div
          key={ball.id}
          className="absolute rounded-full"
          style={{
            width: ball.size,
            height: ball.size,
            backgroundColor: ball.color,
            left: `${ball.xPosition}%`,
            top: "-5%",
            opacity: 0.6,
            filter: "blur(1px)",
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [
              0,
              Math.sin(ball.id) * 100, // Sine wave horizontal movement
              Math.sin(ball.id * 2) * 50,
              0,
            ],
            opacity: [0, 0.6, 0.6, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: ball.duration,
            delay: ball.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            times: [0, 0.4, 0.9, 1], // Control timing of animation phases
          }}
        />
      ))}
    </div>
  )
}

