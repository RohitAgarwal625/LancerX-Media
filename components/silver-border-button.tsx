"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import AnimatedButton from "./animated-buttons"

interface SilverBorderButtonProps {
  children: ReactNode
  variant?: "liquid" | "glitch" | "neon" | "morphing" | "holographic"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
}

export default function SilverBorderButton({
  children,
  variant = "holographic",
  size = "md",
  className = "",
  onClick,
}: SilverBorderButtonProps) {
  return (
    <div className="relative inline-block">
      {/* Animated silver border */}
      <motion.div
        className="absolute -inset-[3px] rounded-full z-0"
        style={{
          background: "linear-gradient(90deg, #e0e0e0, #a0a0a0, #ffffff, #c0c0c0, #e0e0e0)",
          backgroundSize: "400% 100%",
        }}
        animate={{
          backgroundPosition: ["0% center", "100% center", "0% center"],
          rotate: [0, 360],
        }}
        transition={{
          backgroundPosition: {
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          rotate: {
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
        }}
      />
      <AnimatedButton variant={variant} size={size} className={`relative z-10 ${className}`} onClick={onClick}>
        {children}
      </AnimatedButton>
    </div>
  )
}

