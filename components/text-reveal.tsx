"use client"

import { motion } from "framer-motion"

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  staggerChildren?: number
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.02,
  tag = "div",
}: TextRevealProps) {
  const words = text.split(" ")

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

  const child = {
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  }

  const Component = motion[tag]

  return (
    <Component className={className} variants={container} initial="hidden" animate="visible">
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block mr-1" variants={child}>
          {word}
        </motion.span>
      ))}
    </Component>
  )
}

