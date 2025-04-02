"use client"

import type React from "react"

import { motion, useAnimationControls, useMotionValue, useTransform } from "framer-motion"
import { type ReactNode, useState, useRef, useEffect } from "react"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  withShimmer?: boolean
  withGlow?: boolean
}

export default function AnimatedButton({
  children,
  className = "",
  onClick = () => {},
  variant = "primary",
  size = "md",
  withShimmer = true,
  withGlow = true,
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number; color: string; angle: number; speed: number; opacity: number }>
  >([])
  const [cornerParticles, setCornerParticles] = useState<
    Array<{ corner: "tl" | "tr" | "bl" | "br"; size: number; color: string }>
  >([])
  const [textCharacters, setTextCharacters] = useState<string[]>([])
  const controls = useAnimationControls()
  const magneticX = useMotionValue(0)
  const magneticY = useMotionValue(0)
  const rotateX = useTransform(magneticY, [-20, 20], [10, -10])
  const rotateY = useTransform(magneticX, [-20, 20], [-10, 10])

  // Generate particles on mount
  useEffect(() => {
    // Inner particles
    const newParticles = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: getRandomColor(),
      angle: Math.random() * 360,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
    }))
    setParticles(newParticles)

    // Corner particles
    const corners: Array<{ corner: "tl" | "tr" | "bl" | "br"; size: number; color: string }> = []
    for (let i = 0; i < 20; i++) {
      corners.push({
        corner: ["tl", "tr", "bl", "br"][Math.floor(Math.random() * 4)] as "tl" | "tr" | "bl" | "br",
        size: Math.random() * 6 + 2,
        color: getRandomColor(),
      })
    }
    setCornerParticles(corners)

    // Split text into characters for animation
    if (typeof children === "string") {
      setTextCharacters(children.split(""))
    } else if (
      children &&
      typeof children === "object" &&
      "props" &&
      "children" in children &&
      typeof children.props.children === "string"
    ) {
      setTextCharacters(children.props.children.split(""))
    }

    // Start continuous animations
    controls.start({
      borderColor: ["#7C3AED", "#9333EA", "#FF3B30", "#7C3AED"],
      transition: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
    })
  }, [children, controls, variant])

  // Update mouse position relative to button for magnetic effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      // Set position for ripple effect
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })

      // Magnetic effect
      const maxDistance = 100
      const maxMovement = 20

      if (Math.abs(distanceX) < maxDistance && Math.abs(distanceY) < maxDistance) {
        const moveX = (distanceX / maxDistance) * maxMovement
        const moveY = (distanceY / maxDistance) * maxMovement
        magneticX.set(moveX)
        magneticY.set(moveY)
      } else {
        magneticX.set(0)
        magneticY.set(0)
      }
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    magneticX.set(0)
    magneticY.set(0)
  }

  const getBaseClasses = () => {
    let classes = "relative rounded-full font-bold transition-all duration-300 overflow-visible perspective-500 "

    // Size
    if (size === "sm") classes += "py-2 px-4 text-sm "
    if (size === "md") classes += "py-3 px-6 text-base "
    if (size === "lg") classes += "py-4 px-8 text-lg "

    // Variant
    if (variant === "primary") classes += "bg-primary hover:bg-accent text-white "
    if (variant === "secondary") classes += "bg-secondary hover:bg-secondary/90 text-white "
    if (variant === "outline")
      classes += "bg-transparent border-2 border-primary hover:border-accent text-primary hover:text-accent "
    if (variant === "ghost") classes += "bg-transparent hover:bg-primary/10 text-primary "

    return classes + className
  }

  // Get primary color based on variant
  const getPrimaryColor = () => {
    if (variant === "primary") return "#7C3AED"
    if (variant === "secondary") return "#FF3B30"
    return "#9333EA"
  }

  // Get random color from theme palette
  const getRandomColor = () => {
    const colors = ["#7C3AED", "#9333EA", "#FF3B30", "#34D399"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Get corner position
  const getCornerPosition = (corner: "tl" | "tr" | "bl" | "br") => {
    switch (corner) {
      case "tl":
        return { top: -10, left: -10 }
      case "tr":
        return { top: -10, right: -10 }
      case "bl":
        return { bottom: -10, left: -10 }
      case "br":
        return { bottom: -10, right: -10 }
    }
  }

  return (
    <div className="relative group">
      {/* Floating elements around button */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            top: `${Math.random() * 200 - 50}%`,
            left: `${Math.random() * 200 - 50}%`,
            opacity: 0.4,
            backgroundColor: getRandomColor(),
          }}
          animate={{
            y: [0, Math.random() * 30 - 15, 0],
            x: [0, Math.random() * 30 - 15, 0],
            scale: [1, Math.random() * 0.5 + 0.8, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: Math.random() * 3 + 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Rotating border effect */}
      <motion.div
        className="absolute -inset-2 rounded-full opacity-70 pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, ${getPrimaryColor()}, #FF3B30, #34D399, ${getPrimaryColor()})`,
          filter: "blur(8px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Pulsing outer glow */}
      <motion.div
        className="absolute -inset-4 rounded-full opacity-0 pointer-events-none"
        animate={{
          boxShadow: [
            `0 0 20px ${getPrimaryColor()}00`,
            `0 0 30px ${getPrimaryColor()}60`,
            `0 0 20px ${getPrimaryColor()}00`,
          ],
          opacity: [0, 0.6, 0],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Corner accents */}
      {cornerParticles.map((particle, i) => (
        <motion.div
          key={`corner-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            ...getCornerPosition(particle.corner),
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
            x: [0, Math.random() * 10 - 5, 0],
            y: [0, Math.random() * 10 - 5, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: Math.random() * 2 + 1,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Silver rotating outline */}
      <motion.div
        className="absolute -inset-1 rounded-full border-2 border-dashed opacity-80 pointer-events-none"
        style={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Noise texture overlay */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden pointer-events-none mix-blend-overlay opacity-20"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.button
        ref={buttonRef}
        className={getBaseClasses()}
        onClick={(e) => {
          setIsPressed(true)
          setTimeout(() => setIsPressed(false), 300)
          onClick()
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          x: magneticX,
          y: magneticY,
          rotateX,
          rotateY,
        }}
        initial={{ opacity: 0, y: 20, rotateX: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          background:
            variant === "primary"
              ? [
                  "linear-gradient(45deg, #7C3AED, #9333EA)",
                  "linear-gradient(225deg, #7C3AED, #9333EA)",
                  "linear-gradient(45deg, #7C3AED, #9333EA)",
                ]
              : undefined,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            background: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
            },
          },
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 10px 25px -5px ${getPrimaryColor()}50, 0 8px 10px -6px ${getPrimaryColor()}30`,
        }}
        whileTap={{
          scale: 0.95,
          rotateX: 10,
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
        }}
      >
        {/* Background pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background:
              variant !== "outline" && variant !== "ghost"
                ? [
                    `radial-gradient(circle at 30% 30%, ${getPrimaryColor()}, ${getPrimaryColor()}CC)`,
                    `radial-gradient(circle at 70% 70%, ${getPrimaryColor()}, ${getPrimaryColor()}CC)`,
                    `radial-gradient(circle at 30% 30%, ${getPrimaryColor()}, ${getPrimaryColor()}CC)`,
                  ]
                : undefined,
            scale: [1, 1.03, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
        />

        {/* Border animation for outline variant */}
        {variant === "outline" && (
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            animate={{
              borderColor: ["#7C3AED", "#9333EA", "#7C3AED"],
              boxShadow: [
                "0 0 0px rgba(124, 58, 237, 0)",
                "0 0 10px rgba(124, 58, 237, 0.5)",
                "0 0 0px rgba(124, 58, 237, 0)",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Multiple shimmer effects */}
        {withShimmer && (
          <>
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%", opacity: 0 }}
              animate={
                isHovered
                  ? {
                      x: "100%",
                      opacity: [0, 0.5, 0],
                      transition: { duration: 1.5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
                    }
                  : {
                      x: "-100%",
                      opacity: 0,
                      transition: { duration: 0.3 },
                    }
              }
            />
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-to-t from-transparent via-white/20 to-transparent"
              initial={{ y: "-100%", opacity: 0 }}
              animate={
                isHovered
                  ? {
                      y: "100%",
                      opacity: [0, 0.3, 0],
                      transition: { duration: 2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, delay: 0.5 },
                    }
                  : {
                      y: "-100%",
                      opacity: 0,
                      transition: { duration: 0.3 },
                    }
              }
            />
          </>
        )}

        {/* Glow pulse effect */}
        {withGlow && (
          <motion.div
            className="absolute inset-0 rounded-full opacity-0"
            animate={{
              boxShadow: [
                `0 0 0px ${getPrimaryColor()}00`,
                `0 0 20px ${getPrimaryColor()}80`,
                `0 0 0px ${getPrimaryColor()}00`,
              ],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2.5,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Inner particles effect */}
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
            }}
            animate={{
              x: [0, Math.cos(particle.angle) * 20, 0],
              y: [0, Math.sin(particle.angle) * 20, 0],
              opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3 / particle.speed,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Click ripple effect */}
        {isPressed && (
          <motion.div
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              width: 10,
              height: 10,
              marginLeft: -5,
              marginTop: -5,
            }}
            initial={{ opacity: 0.7, scale: 0 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{ duration: 0.8 }}
            onAnimationComplete={() => setIsPressed(false)}
          />
        )}

        {/* 3D hover effect based on mouse position */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-0"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`
              : "none",
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Text with character-by-character animations */}
        {textCharacters.length > 0 ? (
          <motion.span className="relative z-10 flex items-center justify-center">
            {textCharacters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  color: variant === "outline" ? ["#7C3AED", "#9333EA", "#7C3AED"] : undefined,
                  textShadow: withGlow ? "0 0 8px rgba(255, 255, 255, 0.8)" : "none",
                }}
                transition={{
                  delay: index * 0.03,
                  color: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{
                  y: -5,
                  scale: 1.2,
                  transition: { type: "spring", stiffness: 500 },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        ) : (
          <motion.span
            className="relative z-10 flex items-center justify-center"
            animate={{
              textShadow: withGlow ? "0 0 8px rgba(255, 255, 255, 0.8)" : "none",
              scale: [1, 1.02, 1],
              color: variant === "outline" ? ["#7C3AED", "#9333EA", "#7C3AED"] : undefined,
            }}
            transition={{
              scale: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut",
              },
              color: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              },
            }}
          >
            {children}
          </motion.span>
        )}
      </motion.button>

      {/* Side accent lines */}
      <motion.div
        className="absolute top-1/2 -left-8 h-0.5 w-6 bg-gradient-to-r from-transparent to-primary"
        animate={{
          scaleX: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/2 -right-8 h-0.5 w-6 bg-gradient-to-l from-transparent to-primary"
        animate={{
          scaleX: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Top and bottom accent lines */}
      <motion.div
        className="absolute -top-8 left-1/2 w-0.5 h-6 bg-gradient-to-b from-transparent to-primary"
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.25 }}
      />

      <motion.div
        className="absolute -bottom-8 left-1/2 w-0.5 h-6 bg-gradient-to-t from-transparent to-primary"
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.75 }}
      />
    </div>
  )
}

