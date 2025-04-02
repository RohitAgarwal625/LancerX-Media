"use client"

import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import NeonStarButton from "./neon-star-button"

export default function LetsTalkSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [textRevealed, setTextRevealed] = useState(false)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)

  // Trigger animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          controls.start("visible")

          // Trigger text reveal after initial animations
          setTimeout(() => {
            setTextRevealed(true)
          }, 1500)

          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("contact")
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [controls])

  return (
    <section id="contact" className="relative py-16 overflow-hidden" ref={containerRef}>
      {/* Dark background */}
      <div className="absolute inset-0 -z-10 bg-black" />

      {/* Initial reveal animation - horizontal bars that sweep across */}
      <AnimatePresence>
        {isVisible && !textRevealed && (
          <>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`reveal-bar-${i}`}
                className="absolute h-[10vh] w-full bg-primary/20"
                style={{
                  top: `${i * 10}vh`,
                  left: i % 2 === 0 ? "-100%" : "100%",
                }}
                animate={{
                  left: i % 2 === 0 ? "100%" : "-100%",
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  delay: i * 0.05,
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3 },
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main content container */}
      <div className="max-w-4xl mx-auto px-4 relative z-10 h-[60vh] flex items-center justify-center">
        {/* Text animation container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Dramatic text reveal */}
          <AnimatePresence>
            {textRevealed && (
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* "Let's Talk" with dramatic reveal and effects */}
                <div className="relative">
                  {/* Main text with mask reveal effect */}
                  <div className="relative overflow-hidden">
                    <motion.div
                      className="text-8xl md:text-9xl font-bold text-center"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                    >
                      <span className="text-white">Let's </span>
                      <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                        Talk
                      </span>
                    </motion.div>
                  </div>

                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 1,
                      delay: 0.7,
                      ease: "easeOut",
                    }}
                  />

                  {/* Particle explosion effect */}
                  {[...Array(30)].map((_, i) => {
                    const angle = (i / 30) * Math.PI * 2
                    const distance = 100 + Math.random() * 150
                    const size = Math.random() * 6 + 2
                    const duration = Math.random() * 1.5 + 1
                    const delay = Math.random() * 0.3 + 0.7

                    return (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute rounded-full bg-primary"
                        style={{
                          width: size,
                          height: size,
                          top: "50%",
                          left: "50%",
                          x: -size / 2,
                          y: -size / 2,
                        }}
                        initial={{ scale: 0 }}
                        animate={{
                          x: [0, Math.cos(angle) * distance],
                          y: [0, Math.sin(angle) * distance],
                          opacity: [1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: duration,
                          delay: delay,
                          ease: "easeOut",
                        }}
                      />
                    )
                  })}

                  {/* Glowing orbs that float around */}
                  {[...Array(5)].map((_, i) => {
                    const size = 30 + Math.random() * 40
                    const xOffset = (i - 2) * 100

                    return (
                      <motion.div
                        key={`orb-${i}`}
                        className="absolute rounded-full bg-accent/30 blur-xl"
                        style={{
                          width: size,
                          height: size,
                          top: "50%",
                          left: "50%",
                          x: xOffset - size / 2,
                          y: -size / 2,
                        }}
                        animate={{
                          y: [0, -30, 30, 0],
                          scale: [1, 1.2, 0.8, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 5 + i,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        }}
                      />
                    )
                  })}

                  {/* Animated 3D perspective effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0"
                    animate={{
                      opacity: [0, 0.7, 0],
                      rotateX: [0, 10, 0, -10, 0],
                      rotateY: [0, -10, 0, 10, 0],
                      scale: [1, 1.05, 1, 0.95, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center center",
                    }}
                  >
                    <div className="text-8xl md:text-9xl font-bold text-center">
                      <span className="text-white/30">Let's </span>
                      <span className="bg-gradient-to-r from-primary/30 via-purple-500/30 to-accent/30 bg-clip-text text-transparent">
                        Talk
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Animated accent lines */}
                <div className="absolute -inset-10 -z-10">
                  {/* Horizontal lines */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`h-line-${i}`}
                      className="absolute h-[1px] bg-primary/30"
                      style={{
                        width: "100%",
                        top: `${30 * (i + 1)}%`,
                        left: 0,
                        scaleX: 0,
                        originX: i % 2 === 0 ? 0 : 1,
                      }}
                      animate={{
                        scaleX: [0, 1],
                        opacity: [0, 0.6, 0.2],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 1 + i * 0.2,
                        ease: "easeOut",
                        opacity: {
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          repeatType: "reverse",
                        },
                      }}
                    />
                  ))}

                  {/* Vertical lines */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`v-line-${i}`}
                      className="absolute w-[1px] bg-accent/30"
                      style={{
                        height: "100%",
                        left: `${30 * (i + 1)}%`,
                        top: 0,
                        scaleY: 0,
                        originY: i % 2 === 0 ? 0 : 1,
                      }}
                      animate={{
                        scaleY: [0, 1],
                        opacity: [0, 0.6, 0.2],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 1.3 + i * 0.2,
                        ease: "easeOut",
                        opacity: {
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          repeatType: "reverse",
                        },
                      }}
                    />
                  ))}
                </div>

                {/* Pulsing circle behind text */}
                <motion.div
                  className="absolute rounded-full border border-primary/20"
                  style={{
                    width: 300,
                    height: 300,
                    top: "50%",
                    left: "50%",
                    x: "-50%",
                    y: "-50%",
                    zIndex: -1,
                  }}
                  animate={{
                    scale: [0, 1.5],
                    opacity: [0, 0.2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeOut",
                    repeatDelay: 1,
                  }}
                />
                {/* Add Let's Chat button */}
                <motion.div
                  className="mt-16 flex flex-col items-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.5 }}
                >
                  <motion.p
                    className="text-xl text-gray-300 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.7 }}
                  >
                    Contact our friendly team
                  </motion.p>
                  <NeonStarButton
                    size="lg"
                    onClick={() => {
                      window.open("https://tinyurl.com/3wcb3vzs", "_blank")
                    }}
                  >
                    Let's Chat
                  </NeonStarButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

