"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LiquidButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  color?: string
  size?: "sm" | "md" | "lg"
}

export default function LiquidButton({
  children,
  className = "",
  onClick = () => {},
  color = "#7C3AED",
  size = "md",
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Liquid simulation variables
  const pointsRef = useRef<Array<{ x: number; y: number; originX: number; originY: number; strength: number }>>([])
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()

  // Set up canvas and points
  useEffect(() => {
    if (!buttonRef.current || !canvasRef.current) return

    const updateDimensions = () => {
      if (!buttonRef.current || !canvasRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return // Skip if dimensions are zero

      setDimensions({ width: rect.width, height: rect.height })

      canvasRef.current.width = rect.width
      canvasRef.current.height = rect.height

      // Create points
      const points: Array<{ x: number; y: number; originX: number; originY: number; strength: number }> = []
      const spacing = 20
      const margin = 30

      for (let x = margin; x < rect.width - margin; x += spacing) {
        for (let y = margin; y < rect.height - margin; y += spacing) {
          points.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            strength: Math.random() * 0.5 + 0.5,
          })
        }
      }

      pointsRef.current = points
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
        requestRef.current = undefined
      }
    }
  }, [])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const animate = (time: number) => {
      if (!canvasRef.current || !ctx) return

      if (previousTimeRef.current !== undefined) {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height)

        // Draw liquid effect only if we have points
        if (pointsRef.current && pointsRef.current.length > 0) {
          ctx.fillStyle = color
          ctx.beginPath()

          const points = pointsRef.current

          // Start with the first point
          if (points.length > 0) {
            ctx.moveTo(points[0].x, points[0].y)

            // Draw the shape with quadratic curves
            for (let i = 0; i < points.length; i++) {
              const point = points[i]

              // Update point position based on mouse interaction
              if (isHovered && point && mousePos.x !== 0 && mousePos.y !== 0) {
                const dx = mousePos.x - point.originX
                const dy = mousePos.y - point.originY
                const distance = Math.sqrt(dx * dx + dy * dy)
                const maxDistance = 100

                if (distance < maxDistance) {
                  const force = (1 - distance / maxDistance) * 30 * point.strength
                  point.x = point.originX + (dx / distance) * force
                  point.y = point.originY + (dy / distance) * force
                } else {
                  point.x += (point.originX - point.x) * 0.1
                  point.y += (point.originY - point.y) * 0.1
                }
              } else if (point) {
                point.x += (point.originX - point.x) * 0.1
                point.y += (point.originY - point.y) * 0.1
              }

              // Connect points with curves
              const nextPoint = points[(i + 1) % points.length]
              if (nextPoint) {
                const xc = (point.x + nextPoint.x) / 2
                const yc = (point.y + nextPoint.y) / 2
                ctx.quadraticCurveTo(point.x, point.y, xc, yc)
              }
            }
          }

          ctx.closePath()
          ctx.fill()
        }
      }

      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [color, dimensions, isHovered, mousePos])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

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
      <motion.button
        ref={buttonRef}
        className={`relative rounded-full font-bold text-white overflow-hidden ${getSizeClasses()} ${className}`}
        style={{ backgroundColor: color }}
        onClick={() => {
          setIsPressed(true)
          setTimeout(() => setIsPressed(false), 300)
          onClick()

          // Scroll to top before opening the Calendly link
          window.scrollTo(0, 0)

          // Open Calendly in a new tab
          window.open("https://calendly.com/7figuresmedia/30min", "_blank")
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        whileHover={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 10 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        <span className="relative z-10">{children}</span>
      </motion.button>
    </div>
  )
}

