"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import AnimatedButton from "./animated-buttons"

interface ButtonShowcaseCardProps {
  variant: "liquid" | "glitch" | "neon" | "morphing" | "holographic"
  index: number
}

export default function ButtonShowcaseCard({ variant, index }: ButtonShowcaseCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Variant-specific colors and descriptions
  const variantInfo = {
    liquid: {
      color: "#7C3AED",
      description: "Fluid, organic movement that responds to your cursor",
      icon: "🌊",
    },
    glitch: {
      color: "#FF3B30",
      description: "Digital distortion effects with cyberpunk vibes",
      icon: "⚡",
    },
    neon: {
      color: "#34D399",
      description: "Glowing edges with a vibrant, electric feel",
      icon: "💫",
    },
    morphing: {
      color: "#9333EA",
      description: "Shape-shifting organic forms that transform on hover",
      icon: "🔄",
    },
    holographic: {
      color: "#7C3AED",
      description: "Iridescent, rainbow effects with depth and dimension",
      icon: "✨",
    },
  }

  const info = variantInfo[variant]

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card background with animated border */}
      <motion.div
        className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-gray-800 flex flex-col items-center relative overflow-hidden"
        animate={
          isHovered
            ? {
                boxShadow: `0 0 30px ${info.color}40`,
                borderColor: info.color,
              }
            : {}
        }
        transition={{ duration: 0.3 }}
      >
        {/* Animated corner accents */}
        {["tl", "tr", "bl", "br"].map((corner, i) => (
          <motion.div
            key={`corner-${i}`}
            className="absolute w-3 h-3 rounded-full bg-white/50"
            style={{
              ...(corner === "tl" ? { top: 4, left: 4 } : {}),
              ...(corner === "tr" ? { top: 4, right: 4 } : {}),
              ...(corner === "bl" ? { bottom: 4, left: 4 } : {}),
              ...(corner === "br" ? { bottom: 4, right: 4 } : {}),
            }}
            animate={
              isHovered
                ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                    backgroundColor: info.color,
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
          />
        ))}

        {/* Variant icon */}
        <motion.div
          className="text-3xl mb-3"
          animate={
            isHovered
              ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }
              : {}
          }
          transition={{ duration: 0.5 }}
        >
          {info.icon}
        </motion.div>

        {/* Variant name */}
        <motion.h3
          className="text-lg font-bold mb-2 capitalize"
          animate={
            isHovered
              ? {
                  color: info.color,
                  textShadow: `0 0 8px ${info.color}80`,
                }
              : {}
          }
        >
          {variant}
        </motion.h3>

        {/* Description - only visible on hover */}
        <motion.p
          className="text-sm text-gray-400 text-center mb-6 h-12"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {info.description}
        </motion.p>

        {/* The button itself */}
        <AnimatedButton variant={variant} size="md" onClick={() => console.log(`${variant} button clicked`)}>
          Click Me
        </AnimatedButton>

        {/* Shimmer effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

