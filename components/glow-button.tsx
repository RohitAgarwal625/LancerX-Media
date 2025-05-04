"use client"

import type { ReactNode } from "react"

interface GlowButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  size?: "sm" | "md" | "lg"
}

export default function GlowButton({ children, className = "", onClick = () => {}, size = "md" }: GlowButtonProps) {
  // Get the appropriate width and height based on size
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { width: "160px", height: "40px", fontSize: "0.875rem" }
      case "lg":
        return { width: "260px", height: "60px", fontSize: "1.125rem" }
      default:
        return { width: "220px", height: "50px", fontSize: "1rem" }
    }
  }

  const sizeStyles = getSizeStyles()

  return (
    <button
      onClick={onClick}
      className={`glow-on-hover ${className}`}
      style={{
        ...sizeStyles,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children === "Get Started" ? "Let's Chat" : children}
    </button>
  )
}

