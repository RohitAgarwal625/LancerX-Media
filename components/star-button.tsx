"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface StarButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  size?: "sm" | "md" | "lg"
}

export default function StarButton({ children, className = "", onClick = () => {}, size = "md" }: StarButtonProps) {
  // Get the appropriate size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "py-2 px-4 text-sm"
      case "lg":
        return "py-4 px-8 text-lg"
      default:
        return "py-3 px-6 text-base"
    }
  }

  return (
    <motion.button
      onClick={onClick}
      className={`star-button relative rounded-full font-bold text-white bg-primary hover:bg-transparent hover:text-primary transition-all duration-300 ${getSizeClasses()} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Star SVGs */}
      <svg className="star-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          className="fil0"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
      <svg className="star-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          className="fil0"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
      <svg className="star-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          className="fil0"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
      <svg className="star-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          className="fil0"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
      <svg className="star-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          className="fil0"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
      <svg className="star-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          className="fil0"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>

      {children}
    </motion.button>
  )
}

