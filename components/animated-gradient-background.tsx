"use client"

import { useEffect, useRef } from "react"

export default function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createGradient = (t: number) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      // Primary color (purple)
      gradient.addColorStop(0, `rgba(124, 58, 237, ${0.05 + 0.02 * Math.sin(t * 0.0005)})`)

      // Accent color (lighter purple)
      gradient.addColorStop(0.5, `rgba(147, 51, 234, ${0.04 + 0.01 * Math.sin(t * 0.001 + 1)})`)

      // Secondary color (red)
      gradient.addColorStop(1, `rgba(255, 59, 48, ${0.02 + 0.01 * Math.sin(t * 0.0015 + 2)})`)

      return gradient
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create animated gradient background
      ctx.fillStyle = createGradient(time)
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 1
      animationFrameId = requestAnimationFrame(draw)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
}

