"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import type { ReactNode } from "react"

interface NeonStarButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  size?: "sm" | "md" | "lg"
}

export default function NeonStarButton({
  children,
  className = "",
  onClick = () => {},
  size = "md",
}: NeonStarButtonProps) {
  // Get the appropriate size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "py-2 px-4 text-sm"
      case "lg":
        return "py-4 px-8 text-xl"
      default:
        return "py-3 px-6 text-lg"
    }
  }

  return (
    <div className="relative group">
      {/* Floating stars around the button */}
      <motion.div
        className="absolute -top-8 -left-8 text-purple-500"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -top-4 -right-10 text-purple-400"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
          rotate: [0, -5, 0, 5, 0],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -bottom-6 -right-6 text-purple-600"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.6, 1, 0.6],
          rotate: [0, 10, 0, -10, 0],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      </motion.div>

      {/* Button with glow effect */}
      <motion.button
        onClick={onClick}
        className={`relative rounded-full font-bold text-purple-400 bg-black border border-purple-500/30 ${getSizeClasses()} ${className} flex items-center justify-center`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow:
            "0 0 15px rgba(168, 85, 247, 0.5), 0 0 30px rgba(168, 85, 247, 0.3), 0 0 45px rgba(168, 85, 247, 0.1)",
        }}
      >
        {/* Inner glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-50"
          animate={{
            boxShadow: [
              "inset 0 0 10px rgba(168, 85, 247, 0.3)",
              "inset 0 0 20px rgba(168, 85, 247, 0.5)",
              "inset 0 0 10px rgba(168, 85, 247, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Sparkle icon */}
        <motion.div
          className="mr-2 text-purple-400"
          animate={{
            rotate: [0, 15, 0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <Sparkles size={size === "lg" ? 24 : size === "sm" ? 16 : 20} />
        </motion.div>

        {/* Button text with glow effect */}
        <motion.span
          animate={{
            textShadow: [
              "0 0 5px rgba(168, 85, 247, 0.5)",
              "0 0 10px rgba(168, 85, 247, 0.7)",
              "0 0 5px rgba(168, 85, 247, 0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          {children}
        </motion.span>
      </motion.button>

      {/* Outer glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full -z-10"
        animate={{
          boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.4)",
            "0 0 30px rgba(168, 85, 247, 0.6)",
            "0 0 20px rgba(168, 85, 247, 0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  )
}

