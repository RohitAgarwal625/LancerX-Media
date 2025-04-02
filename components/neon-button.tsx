"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

interface NeonButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  color?: string
  glowColor?: string
  size?: "sm" | "md" | "lg"
}

export default function NeonButton({
  children,
  className = "",
  onClick = () => {},
  color = "#7C3AED",
  glowColor = "rgba(124, 58, 237, 0.6)",
  size = "md",
}: NeonButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "py-2 px-4 text-sm"
      case "lg":
        return "py-4 px-8 text-lg"
      default:
        return "py-3 px-6 text-base"
    }
  }

  return (
    <motion.button
      className={`relative rounded-full font-bold text-white overflow-visible ${getSizeClasses()} ${className}`}
      style={{
        backgroundColor: "transparent",
        border: `2px solid ${color}`,
        boxShadow: isHovered ? `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, inset 0 0 10px ${glowColor}` : "none",
        textShadow: isHovered ? `0 0 5px white, 0 0 10px ${color}` : "none",
        transition: "box-shadow 0.3s, text-shadow 0.3s",
      }}
      onClick={() => {
        setIsPressed(true)
        setTimeout(() => setIsPressed(false), 300)
        onClick()
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      whileHover={{
        scale: 1.05,
        color: "white",
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full z-[-1]"
        animate={
          isHovered
            ? {
                opacity: [0.5, 0.8, 0.5],
                boxShadow: [
                  `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 30px ${glowColor}`,
                  `0 0 15px ${glowColor}, 0 0 25px ${glowColor}, 0 0 35px ${glowColor}`,
                  `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 30px ${glowColor}`,
                ],
              }
            : {}
        }
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 2,
          ease: "easeInOut",
        }}
      />

      {/* Flickering effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full bg-white mix-blend-overlay"
          animate={{
            opacity: [0, 0.05, 0, 0.1, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 0.5,
            times: [0, 0.2, 0.4, 0.45, 0.5],
            ease: "easeInOut",
          }}
        />
      )}

      {/* Text with flicker effect */}
      <motion.span
        className="relative z-10"
        animate={
          isHovered
            ? {
                opacity: [1, 0.9, 1, 0.95, 1],
              }
            : {}
        }
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 3,
          times: [0, 0.1, 0.2, 0.21, 0.3],
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}

