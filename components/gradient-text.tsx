"use client"

import { motion } from "framer-motion"
import { gradientTextAnimation } from "@/utils/animation-variants"
import type { ReactNode } from "react"

interface GradientTextProps {
  children: ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

export default function GradientText({
  children,
  className = "",
  from = "from-primary",
  via = "via-purple-500",
  to = "to-accent",
  tag = "span",
}: GradientTextProps) {
  const Component = motion[tag]

  return (
    <Component
      className={`bg-clip-text text-transparent bg-gradient-to-r ${from} ${via} ${to} bg-size-200 whitespace-nowrap ${className}`}
      variants={gradientTextAnimation}
      initial="initial"
      animate="animate"
    >
      {children}
    </Component>
  )
}

