"use client"

import { motion } from "framer-motion"
import { type ReactNode, useState, useRef } from "react"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export default function AnimatedCard({ children, className = "", delay = 0, hover = true }: AnimatedCardProps) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay,
          },
        },
      }}
      initial="hidden"
      animate="show"
      whileHover={
        hover
          ? {
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 },
            }
          : {}
      }
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Silver rotating outline */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-80 pointer-events-none"
        style={{
          background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.5), rgba(255,255,255,0.1))",
          filter: "blur(1px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Corner accents */}
      {["tl", "tr", "bl", "br"].map((corner, i) => (
        <motion.div
          key={`corner-${i}`}
          className="absolute w-4 h-4 pointer-events-none"
          style={{
            ...(corner === "tl" ? { top: -2, left: -2 } : {}),
            ...(corner === "tr" ? { top: -2, right: -2 } : {}),
            ...(corner === "bl" ? { bottom: -2, left: -2 } : {}),
            ...(corner === "br" ? { bottom: -2, right: -2 } : {}),
            background: "linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
            borderRadius: "50%",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
        animate={
          isHovered
            ? {
                boxShadow: [
                  "0 0 0px rgba(124, 58, 237, 0)",
                  "0 0 20px rgba(124, 58, 237, 0.5)",
                  "0 0 0px rgba(124, 58, 237, 0)",
                ],
                opacity: [0, 0.8, 0],
              }
            : {}
        }
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        }}
      />

      {children}
    </motion.div>
  )
}

