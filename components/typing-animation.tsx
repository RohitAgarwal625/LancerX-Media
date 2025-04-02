"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TypingAnimationProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
  className?: string
}

export default function TypingAnimation({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 2000,
  className = "",
}: TypingAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    // Handle typing and deleting
    const timeout = setTimeout(
      () => {
        // If we're deleting
        if (isDeleting) {
          setCurrentText(currentWord.substring(0, currentText.length - 1))

          // If we've deleted the whole word
          if (currentText === "") {
            setIsDeleting(false)
            setIsVisible(false)

            // Move to the next word after a brief pause
            setTimeout(() => {
              setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
              setIsVisible(true)
            }, 200)
          }
        }
        // If we're typing
        else {
          setCurrentText(currentWord.substring(0, currentText.length + 1))

          // If we've typed the whole word
          if (currentText === currentWord) {
            // Wait before starting to delete
            setTimeout(() => {
              setIsDeleting(true)
            }, delayBetweenWords)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, words, typingSpeed, deletingSpeed, delayBetweenWords])

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.span
          key={currentWordIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`inline-block ${className}`}
        >
          {currentText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            className="inline-block ml-1"
          >
            |
          </motion.span>
        </motion.span>
      )}
    </AnimatePresence>
  )
}

