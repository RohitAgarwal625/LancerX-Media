"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FloatingTextProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
  rotate?: number
}

export default function FloatingText({
  children,
  className = "",
  delay = 0,
  duration = 10,
  x = 10,
  y = 10,
  rotate = 5,
}: FloatingTextProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: [0, x, 0, -x, 0],
        y: [0, y, 0, -y, 0],
        rotate: [0, rotate, 0, -rotate, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        x: { duration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay },
        y: { duration: duration * 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay },
        rotate: { duration: duration * 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay },
      }}
    >
      {children}
    </motion.div>
  )
}

