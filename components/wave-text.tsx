"use client"

import { motion } from "framer-motion"
import { waveTextAnimation } from "@/utils/animation-variants"

interface WaveTextProps {
  text: string
  className?: string
  delay?: number
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

export default function WaveText({ text, className = "", delay = 0, tag = "div" }: WaveTextProps) {
  const letters = text.split("")

  const Component = motion[tag]

  return (
    <Component className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={waveTextAnimation}
          initial="initial"
          animate="animate"
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </Component>
  )
}

