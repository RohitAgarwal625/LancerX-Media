"use client"

import type React from "react"

import LiquidButton from "./liquid-button"
import GlitchButton from "./glitch-button"
import NeonButton from "./neon-button"
import MorphingButton from "./morphing-button"

interface AnimatedButtonsProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "liquid" | "glitch" | "neon" | "morphing"
  color?: string
  size?: "sm" | "md" | "lg"
}

export default function AnimatedButton({
  children,
  className = "",
  onClick = () => {},
  variant = "liquid",
  color = "#7C3AED",
  size = "md",
}: AnimatedButtonsProps) {
  switch (variant) {
    case "liquid":
      return (
        <LiquidButton className={className} onClick={onClick} color={color} size={size}>
          {children}
        </LiquidButton>
      )
    case "glitch":
      return (
        <GlitchButton className={className} onClick={onClick} color={color} size={size}>
          {children}
        </GlitchButton>
      )
    case "neon":
      return (
        <NeonButton className={className} onClick={onClick} color={color} size={size}>
          {children}
        </NeonButton>
      )
    case "morphing":
      return (
        <MorphingButton className={className} onClick={onClick} color={color} size={size}>
          {children}
        </MorphingButton>
      )
    default:
      return (
        <LiquidButton className={className} onClick={onClick} color={color} size={size}>
          {children}
        </LiquidButton>
      )
  }
}

