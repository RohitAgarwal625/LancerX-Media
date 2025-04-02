"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface MorphingButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  color?: string
  size?: "sm" | "md" | "lg"
}

export default function MorphingButton({
  children,
  className = "",
  onClick = () => {},
  color = "#7C3AED",
  size = "md",
}: MorphingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
    }
  }, [children])

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

  // Generate random blob path
  const generateBlobPath = (complexity: number, intensity: number) => {
    const width = dimensions.width + 20
    const height = dimensions.height + 20
    const centerX = width / 2
    const centerY = height / 2
    const minRadius = Math.min(width, height) / 2

    let path = `M ${centerX},${centerY - minRadius} `

    for (let i = 1; i <= complexity; i++) {
      const angle = (i * 2 * Math.PI) / complexity
      const radiusVariation = 1 + (Math.random() * 2 - 1) * intensity
      const radius = minRadius * radiusVariation
      const x = centerX + radius * Math.sin(angle)
      const y = centerY - radius * Math.cos(angle)

      const prevAngle = ((i - 1) * 2 * Math.PI) / complexity
      const prevX = centerX + minRadius * Math.sin(prevAngle)
      const prevY = centerY - minRadius * Math.cos(prevAngle)

      const controlX1 = prevX + (x - prevX) * 0.5 - (y - prevY) * 0.2
      const controlY1 = prevY + (y - prevY) * 0.5 + (x - prevX) * 0.2

      path += `C ${controlX1},${controlY1} ${controlX1},${controlY1} ${x},${y} `
    }

    path += "Z"
    return path
  }

  const initialPath = generateBlobPath(8, 0.1)
  const hoverPath = generateBlobPath(8, 0.3)

  return (
    <div className="relative inline-block">
      <motion.button
        ref={buttonRef}
        className={`relative font-bold text-white overflow-visible ${getSizeClasses()} ${className}`}
        style={{ backgroundColor: "transparent" }}
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
        whileTap={{ scale: 0.95 }}
      >
        {/* SVG Blob Background */}
        <motion.div
          className="absolute inset-0 z-0 flex items-center justify-center"
          style={{
            top: -10,
            left: -10,
            width: dimensions.width + 20,
            height: dimensions.height + 20,
          }}
        >
          <motion.svg
            width={dimensions.width + 20}
            height={dimensions.height + 20}
            viewBox={`0 0 ${dimensions.width + 20} ${dimensions.height + 20}`}
            className="absolute inset-0"
          >
            <motion.path
              d={initialPath}
              fill={color}
              animate={{
                d: isHovered ? hoverPath : initialPath,
                fill: isHovered ? "#9333EA" : color,
              }}
              transition={{
                d: { type: "spring", stiffness: 300, damping: 20 },
                fill: { duration: 0.3 },
              }}
            />
          </motion.svg>
        </motion.div>

        {/* Particles effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  x: [0, (Math.random() * 2 - 1) * 30],
                  y: [0, (Math.random() * 2 - 1) * 30],
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}

        {/* Button text */}
        <motion.span
          className="relative z-10"
          animate={
            isHovered
              ? {
                  y: [0, -2, 0, 2, 0],
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 2,
                    ease: "easeInOut",
                  },
                }
              : {}
          }
        >
          {children}
        </motion.span>
      </motion.button>
    </div>
  )
}

