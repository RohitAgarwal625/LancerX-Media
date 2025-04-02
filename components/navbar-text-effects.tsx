"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GradientTextProps {
  children: ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
  animate?: boolean
  delay?: number
}

export function GradientText({
  children,
  className = "",
  from = "from-primary",
  via = "via-purple-500",
  to = "to-accent",
  animate = true,
  delay = 0,
}: GradientTextProps) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r ${from} ${via} ${to} bg-size-200 ${className}`}
      initial={{ backgroundPosition: "0% center" }}
      animate={
        animate
          ? {
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }
          : {}
      }
      transition={{
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        delay,
      }}
    >
      {children}
    </motion.span>
  )
}

interface ShimmerTextProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ShimmerText({ children, className = "", delay = 0 }: ShimmerTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ left: "-100%", opacity: 0 }}
        animate={{ left: "100%", opacity: 0.5 }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 3,
          delay,
        }}
      />
    </motion.span>
  )
}

interface GlowTextProps {
  children: ReactNode
  className?: string
  color?: string
  delay?: number
}

export function GlowText({ children, className = "", color = "rgba(124, 58, 237, 0.7)", delay = 0 }: GlowTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={{
        textShadow: [`0 0 0px ${color}`, `0 0 10px ${color}`, `0 0 0px ${color}`],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.span>
  )
}

