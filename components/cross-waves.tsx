"use client"

import { useEffect, useRef } from "react"

interface CrossWavesProps {
  color?: string
  secondaryColor?: string
  count?: number
  speed?: number
}

export default function CrossWaves({
  color = "rgba(124, 58, 237, 0.1)",
  secondaryColor = "rgba(147, 51, 234, 0.08)",
  count = 3,
  speed = 15,
}: CrossWavesProps) {
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

    const drawWave = (
      amplitude: number,
      wavelength: number,
      speed: number,
      time: number,
      color: string,
      direction: "horizontal" | "vertical" = "horizontal",
    ) => {
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2

      const points = direction === "horizontal" ? canvas.width : canvas.height
      const size = direction === "horizontal" ? canvas.height : canvas.width

      for (let i = 0; i <= points; i += 5) {
        const x = direction === "horizontal" ? i : amplitude * Math.sin(i / wavelength + time * speed) + size / 2
        const y = direction === "horizontal" ? amplitude * Math.sin(i / wavelength + time * speed) + size / 2 : i

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw horizontal waves
      for (let i = 1; i <= count; i++) {
        const amplitude = (canvas.height / (count + 1)) * 0.3
        const wavelength = canvas.width / (2 + i * 0.5)
        const waveSpeed = speed * 0.001 * (1 + i * 0.1)
        const yOffset = (canvas.height / (count + 1)) * i

        ctx.save()
        ctx.translate(0, yOffset)
        drawWave(amplitude, wavelength, waveSpeed, time, color, "horizontal")
        ctx.restore()
      }

      // Draw vertical waves
      for (let i = 1; i <= count; i++) {
        const amplitude = (canvas.width / (count + 1)) * 0.3
        const wavelength = canvas.height / (2 + i * 0.5)
        const waveSpeed = speed * 0.001 * (1 + i * 0.1)
        const xOffset = (canvas.width / (count + 1)) * i

        ctx.save()
        ctx.translate(xOffset, 0)
        drawWave(amplitude, wavelength, waveSpeed, time, secondaryColor, "vertical")
        ctx.restore()
      }

      time += 0.05
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, secondaryColor, count, speed])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40" />
}

