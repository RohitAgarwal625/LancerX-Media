"use client"

import { motion } from "framer-motion"
import { letterAnimation } from "@/utils/animation-variants"

interface AnimatedLetterTextProps {
  text: string
  className?: string
  delay?: number
  staggerChildren?: number
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

export default function AnimatedLetterText({
  text,
  className = "",
  delay = 0,
  staggerChildren = 0.03,
  tag = "div",
}: AnimatedLetterTextProps) {
  const letters = text.split("")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay,
      },
    }),
  }

  const Component = motion[tag]

  return (
    <Component className={className} variants={container} initial="hidden" animate="visible">
      {letters.map((letter, index) => (
        <motion.span key={index} className="inline-block" variants={letterAnimation}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </Component>
  )
}

