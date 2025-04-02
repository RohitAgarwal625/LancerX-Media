"use client"

import { motion } from "framer-motion"
import WaveAnimation from "./wave-animation"

export default function BackgroundWaves() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <WaveAnimation
        className="bottom-0 left-0"
        color="rgba(124, 58, 237, 0.05)"
        height={200}
        speed={0.08}
        amplitude={25}
      />
      <WaveAnimation
        className="bottom-0 left-0"
        color="rgba(147, 51, 234, 0.03)"
        height={180}
        speed={0.1}
        amplitude={20}
      />

      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-40 left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}

