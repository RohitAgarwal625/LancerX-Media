"use client"

import { useState } from "react"
import GlowButton from "./glow-button"
import { motion } from "framer-motion"

export default function GlowButtonDemo() {
  const [clicked, setClicked] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-8 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent">
          Glow Button Animation
        </span>
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        <GlowButton size="sm" onClick={() => setClicked(true)}>
          Small Button
        </GlowButton>

        <GlowButton onClick={() => setClicked(true)}>Medium Button</GlowButton>

        <GlowButton size="lg" onClick={() => setClicked(true)}>
          Large Button
        </GlowButton>
      </div>

      {clicked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-black/50 backdrop-blur-sm rounded-lg border border-primary/30 max-w-md text-center"
        >
          <p>Button clicked! This effect works great for important call-to-action buttons.</p>
          <button className="mt-4 text-sm text-primary hover:text-accent underline" onClick={() => setClicked(false)}>
            Reset
          </button>
        </motion.div>
      )}
    </div>
  )
}

