"use client"

import { useEffect, useRef } from "react"

interface WaveAnimationProps {
  className?: string
  color?: string
  height?: number
  width?: number
  speed?: number
  amplitude?: number
}

export default function WaveAnimation({
  className = "",
  color = "rgba(124, 58, 237, 0.1)",
  height = 100,
  width = 1000,
  speed = 0.1,
  amplitude = 15,
}: WaveAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let phase = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = height
    }

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = color

      ctx.beginPath()
      ctx.moveTo(0, height)

      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * 0.008 + phase) * amplitude + height / 2
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fill()

      phase += speed
      animationFrameId = requestAnimationFrame(drawWave)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    drawWave()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, height, speed, amplitude])

  return <canvas ref={canvasRef} className={`absolute pointer-events-none ${className}`} />
}

