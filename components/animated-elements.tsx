"use client"

import { motion } from "framer-motion"
import { type ReactNode, useRef } from "react"
import { useInView } from "framer-motion"
import {
  fadeIn,
  staggerContainer,
  textVariant,
  zoomIn,
  floatAnimation,
  pulseAnimation,
  glowAnimation,
  bounceAnimation,
  expandAnimation,
  blinkAnimation,
} from "@/utils/animation-variants"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export const AnimatedSection = ({
  children,
  className = "",
  id = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={fadeIn(direction, delay)}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  )
}

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

export const AnimatedText = ({ children, className = "", delay = 0, tag = "div" }: AnimatedTextProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const Component = motion[tag]

  return (
    <Component
      ref={ref}
      variants={textVariant(delay)}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={`text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent text-sm ${className}`}
    >
      {children}
    </Component>
  )
}

interface AnimatedImageProps {
  src: string
  alt: string
  className?: string
  delay?: number
  width?: number
  height?: number
}

export const AnimatedImage = ({ src, alt, className = "", delay = 0, width, height }: AnimatedImageProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      width={width}
      height={height}
      variants={zoomIn(delay, 0.8)}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    />
  )
}

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export const AnimatedCard = ({ children, className = "", delay = 0, hover = true }: AnimatedCardProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("up", delay)}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      whileHover={
        hover
          ? {
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 },
            }
          : {}
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedContainerProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
}

export const AnimatedContainer = ({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
}: AnimatedContainerProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(staggerDelay, delay)}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const FloatingElement = ({ children, className = "" }) => {
  return (
    <motion.div variants={floatAnimation} initial="initial" animate="animate" className={className}>
      {children}
    </motion.div>
  )
}

export const PulsingElement = ({ children, className = "" }) => {
  return (
    <motion.div variants={pulseAnimation} initial="initial" animate="animate" className={className}>
      {children}
    </motion.div>
  )
}

export const GlowingElement = ({ children, className = "" }) => {
  return (
    <motion.div variants={glowAnimation} initial="initial" animate="animate" className={className}>
      {children}
    </motion.div>
  )
}

export const AnimatedButton = ({ children, className = "", onClick = () => {} }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

export const AnimatedGradientText = ({ text, className = "" }) => {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent bg-size-200 ${className}`}
      initial={{ backgroundPosition: "0% center" }}
      animate={{
        backgroundPosition: ["0% center", "100% center", "0% center"],
        transition: {
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
        },
      }}
    >
      {text}
    </motion.span>
  )
}

export const AnimatedBackgroundGlow = ({ className = "" }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  )
}

export const BounceElement = ({ children, className = "" }) => {
  return (
    <motion.div variants={bounceAnimation} initial="initial" animate="animate" className={className}>
      {children}
    </motion.div>
  )
}

export const ExpandElement = ({ children, className = "" }) => {
  return (
    <motion.div variants={expandAnimation} initial="initial" animate="animate" className={className}>
      {children}
    </motion.div>
  )
}

export const BlinkElement = ({ children, className = "" }) => {
  return (
    <motion.div variants={blinkAnimation} initial="initial" animate="animate" className={className}>
      {children}
    </motion.div>
  )
}

export const AnimatedIcon = ({ icon: Icon, className = "", size = 24 }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 10 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={className}
    >
      <Icon size={size} />
    </motion.div>
  )
}

export const ShimmerElement = ({ children, className = "" }) => {
  return (
    <motion.div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 w-full h-full bg-white/10"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
      />
    </motion.div>
  )
}

