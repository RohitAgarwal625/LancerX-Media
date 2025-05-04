"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

interface GlitchButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  color?: string
  size?: "sm" | "md" | "lg"
}

export default function GlitchButton({
  children,
  className = "",
  onClick = () => {},
  color = "#7C3AED",
  size = "md",
}: GlitchButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (isHovered) {
      const glitchInterval = setInterval(() => {
        controls.start({
          x: [0, -3, 3, -2, 0],
          y: [0, 2, -2, 1, 0],
          transition: { duration: 0.2 },
        })
      }, 2000)

      return () => clearInterval(glitchInterval)
    }
  }, [isHovered, controls])

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
    <div className="relative inline-block">
      {/* Glitch layers */}
      {isHovered && (
        <>
          <motion.div
            className={`absolute inset-0 rounded-full font-bold text-white overflow-hidden ${getSizeClasses()}`}
            style={{
              backgroundColor: color,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
            animate={{
              x: [-2, 2, -1, 0],
              opacity: [0.5, 0.3, 0.5],
              clipPath: [
                "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                "polygon(5% 0, 100% 0, 95% 100%, 0 100%)",
                "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
                "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <span className="opacity-0">{children}</span>
          </motion.div>

          <motion.div
            className={`absolute inset-0 rounded-full font-bold overflow-hidden ${getSizeClasses()}`}
            style={{
              backgroundColor: "#FF3B30",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
            animate={{
              x: [2, -2, 1, 0],
              opacity: [0.3, 0.5, 0.3],
              clipPath: [
                "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
                "polygon(0 0, 100% 5%, 100% 100%, 0 95%)",
                "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 0.3,
              ease: "easeInOut",
              delay: 0.05,
            }}
          >
            <span className="opacity-0">{children}</span>
          </motion.div>
        </>
      )}

      {/* Main button */}
      <motion.button
        className={`relative rounded-full font-bold text-white ${getSizeClasses()} ${className}`}
        style={{ backgroundColor: color }}
        onClick={() => {
          setIsPressed(true)
          setTimeout(() => setIsPressed(false), 300)
          onClick()
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        whileHover={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 10 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Scanline effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="w-full h-[2px] bg-white"
                style={{ top: `${i * 10}%` }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  x: ["-100%", "100%"],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 1,
                  delay: i * 0.1,
                  ease: "linear",
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Text with glitch effect */}
        <motion.span
          className="relative z-10 inline-block"
          animate={
            isHovered
              ? {
                  textShadow: [
                    "0 0 0 rgba(255,255,255,0)",
                    "2px 2px 0 #FF3B30, -2px -2px 0 #34D399",
                    "0 0 0 rgba(255,255,255,0)",
                  ],
                }
              : {}
          }
          transition={{
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            repeatType: "loop",
            duration: 2,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.span>
      </motion.button>
    </div>
  )
}

