"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { CheckCircle2, Play, Eye, Star } from "lucide-react"
import { AnimatedSection, AnimatedText, AnimatedCard, FloatingElement } from "@/components/animated-elements"

// Add these imports at the top with other imports
import AnimatedButton from "@/components/animated-buttons"
import AnimatedLetterText from "@/components/animated-letter-text"
import GradientText from "@/components/gradient-text"
import GlowButton from "@/components/glow-button"
import VideoShowcase from "@/components/video-showcase"
import LetsTalkSection from "@/components/lets-talk-section"
import TypingAnimation from "@/components/typing-animation"

// CountUp Component
const CountUp = ({ start = 0, end = 100, duration = 2, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(start)
  const countRef = useRef(start)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min(1, (now - startTime) / (endTime - startTime))
      const currentCount = Math.floor(start + progress * (end - start))

      if (countRef.current !== currentCount) {
        countRef.current = currentCount
        setCount(currentCount)
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [start, end, duration])

  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  )
}

// AnimatedBackgroundGlow Component renamed to avoid conflict
const BgGlow = ({ className }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
    />
  )
}

// Video Card Component
const VideoCard = ({ title, views, imageUrl, delay = 0 }) => {
  return (
    <AnimatedCard delay={delay} className="relative group overflow-hidden rounded-xl">
      <div className="aspect-[9/16] bg-gray-800 rounded-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        <div className="w-full h-full bg-gray-800"></div>
        <div className="absolute bottom-4 left-4 z-20 flex items-center text-white">
          <Eye className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">{views}</span>
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 
                  opacity-0 group-hover:opacity-100"
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-primary/80 rounded-full p-3">
            <Play className="w-8 h-8 text-white" fill="white" />
          </div>
        </motion.div>
      </div>
      <h3 className="mt-2 text-sm font-medium text-white">{title}</h3>
    </AnimatedCard>
  )
}

// Brand Card Component for Personal Brand Leads To section
const BrandCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="text-center relative group"
    >
      {/* Icon container with animations */}
      <motion.div
        className="bg-black/50 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 border border-gray-800 relative overflow-hidden"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Rotating gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 opacity-0 group-hover:opacity-100"
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Icon with its own animation */}
        <motion.div whileHover={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 0.5 }} className="relative z-10">
          <Icon className="w-12 h-12 text-primary" />
        </motion.div>
      </motion.div>

      {/* Text with animations */}
      <motion.h3
        className="text-2xl font-bold mb-2 relative"
        whileHover={{
          scale: 1.05,
          color: "#9333EA",
          textShadow: "0 0 8px rgba(147, 51, 234, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {title}
      </motion.h3>

      {/* Description with fade-in animation */}
      <motion.p className="text-gray-300" initial={{ opacity: 0.7 }} whileHover={{ opacity: 1 }}>
        {description}
      </motion.p>
    </motion.div>
  )
}

// Enhanced Testimonial Card Component
const TestimonialCard = ({ name, role, quote, imageUrl, rating = 5, delay = 0, initials, avatarBg = "bg-primary" }) => {
  return (
    <AnimatedCard delay={delay} className="group relative">
      <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 h-full relative overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]">
        {/* Profile section */}
        <div className="flex items-center mb-4">
          <motion.div
            className={`w-14 h-14 rounded-full ${avatarBg}/20 flex items-center justify-center mr-4 relative overflow-hidden group-hover:scale-110`}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {imageUrl ? (
              <img src={imageUrl || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
            ) : (
              <motion.div
                className="font-bold text-xl relative z-10"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                {initials || name.substring(0, 2)}
              </motion.div>
            )}

            {/* Pulsing background effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          <div>
            <motion.h4 className="font-bold text-lg" whileHover={{ color: "#9333EA" }}>
              {name}
            </motion.h4>
            <p className="text-sm text-gray-400">{role}</p>
          </div>
        </div>

        {/* Rating stars */}
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={
                i < rating
                  ? {
                      scale: [1, 1.2, 1],
                      transition: {
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: i * 0.1,
                      },
                    }
                  : {}
              }
            >
              <Star
                className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-600"} mr-1`}
                fill={i < rating ? "#FACC15" : "transparent"}
              />
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          className="relative"
          initial={{ opacity: 0.7 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute -top-3 -left-1 text-4xl text-primary/30"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            "
          </motion.div>
          <p className="text-gray-300 italic relative z-10 pl-4 group-hover:text-white">{quote}</p>
          <motion.div
            className="absolute -bottom-3 -right-1 text-4xl text-primary/30"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          >
            "
          </motion.div>
        </motion.div>

        {/* Animated gradient border on hover - FIXED to use pseudo-element instead */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 pointer-events-none z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0 }}
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(45deg, #7c3aed, #ec4899, #7c3aed)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>
    </AnimatedCard>
  )
}

// Stat Card Component for Testimonial Section
const StatCard = ({ value, label, prefix = "", suffix = "", icon, iconBg = "bg-primary", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800 text-center group hover:border-primary/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]"
    >
      <motion.div
        className={`${iconBg}/20 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110`}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {icon}
      </motion.div>

      <motion.div
        className="text-4xl font-bold mb-2"
        animate={{
          scale: [1, 1.05, 1],
          color: ["#ffffff", "#9333EA", "#ffffff"],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay }}
      >
        <CountUp start={0} end={Number.parseInt(value)} duration={2.5} prefix={prefix} suffix={suffix} />
      </motion.div>

      <p className="text-gray-400">{label}</p>
    </motion.div>
  )
}

const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.6, 1],
      },
    },
  }
}

export default function Home() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  // Array of button variants to showcase different styles
  const buttonVariants = ["liquid", "glitch", "neon", "morphing", "holographic"]

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Tech Startup CEO",
      initials: "SJ",
      quote:
        "Working with this team transformed my personal brand. In just 3 months, my LinkedIn following grew 400% and I secured speaking engagements at major industry conferences.",
      avatarBg: "bg-primary",
    },
    {
      name: "Marcus Chen",
      role: "Financial Advisor",
      initials: "MC",
      quote:
        "The micro-branding strategy they implemented helped me target high-net-worth clients specifically. My client acquisition costs dropped 60% while conversions increased dramatically.",
      avatarBg: "bg-accent",
    },
    {
      name: "Elena Rodriguez",
      role: "Fitness Coach",
      initials: "ER",
      quote:
        "I tried growing my social media for years with minimal results. Within 6 months of working together, I've built a targeted audience of 8,500 followers and launched a successful coaching program.",
      avatarBg: "bg-success",
    },
    {
      name: "David Palmer",
      role: "Real Estate Agent",
      initials: "DP",
      quote:
        "The personal branding system helped me stand out in a crowded market. I'm now recognized as the go-to agent in my area, and my commissions have increased by 215% year-over-year.",
      avatarBg: "bg-sky-500",
    },
    {
      name: "Priya Sharma",
      role: "E-commerce Entrepreneur",
      initials: "PS",
      quote:
        "My online store was struggling until we implemented their branding strategy. The focused audience building approach led to a 178% revenue increase and much higher customer loyalty.",
      avatarBg: "bg-rose-500",
    },
  ]

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section
        id="home"
        ref={targetRef}
        className="min-h-screen flex flex-col justify-center items-center relative px-4 md:px-8 pt-16"
      >
        <BgGlow className="top-20 right-20 w-96 h-96 bg-primary/20" />
        <BgGlow className="bottom-20 left-20 w-72 h-72 bg-accent/10" />

        <motion.div style={{ opacity, scale, y }} className="max-w-5xl mx-auto text-center z-10">
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-4"
          >
            Effortless content creation for{" "}
            <span className="bg-gray-800 px-3 py-1 rounded-full">
              <TypingAnimation
                words={["Brands", "Entrepreneurs", "Creators", "VCs"]}
                typingSpeed={100}
                deletingSpeed={50}
                delayBetweenWords={2000}
              />
            </span>
          </motion.p>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            Fuel Your{" "}
            <span className="bg-gradient-to-r from-white via-purple-400 to-primary text-transparent bg-clip-text">
              Creativity
            </span>
          </h1>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-2">
            Craft Content That{" "}
            <span className="bg-gradient-to-r from-white via-purple-400 to-primary text-transparent bg-clip-text">
              leaves a Mark!
            </span>
          </h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm md:text-base text-gray-300 font-light mb-10 mt-6 max-w-4xl mx-auto"
          >
            We help entrepreneurs, creators, and VCs build distribution with organic videos, which predictably bring
            them more leads and revenue at scale.
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="relative inline-block">
              <GlowButton
                size="lg"
                onClick={() => {
                  const element = document.getElementById("contact")
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Start Your Branding Journey
              </GlowButton>
            </div>

            <div className="relative inline-block">
              <GlowButton
                size="lg"
                onClick={() => {
                  // Direct download link for the brochure
                  const pdfUrl = "https://drive.google.com/uc?export=download&id=1x9qiIElgv7w91EKwCdjgI5bd9Ke0585m"

                  // Create an anchor element and trigger download
                  const link = document.createElement("a")
                  link.href = pdfUrl
                  link.setAttribute("download", "Personal-Branding-7-Figures-Media.pdf")
                  link.setAttribute("target", "_blank")
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                Download Brochure
              </GlowButton>
            </div>
          </motion.div>

          <FloatingElement className="absolute right-10 bottom-20">
            <div className="w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
          </FloatingElement>

          <FloatingElement className="absolute left-10 top-40">
            <div className="w-16 h-16 bg-accent/10 rounded-full blur-xl"></div>
          </FloatingElement>
        </motion.div>
      </section>

      {/* Why Personal Branding Section */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />

          {/* Animated particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-branding-${i}`}
              className="absolute rounded-full bg-primary/20"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -50 - 20],
                x: [0, Math.random() * 50 - 25],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Title with animated gradient and glow effect */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-3"
              animate={{
                filter: [
                  "drop-shadow(0 0 0px rgba(124, 58, 237, 0))",
                  "drop-shadow(0 0 15px rgba(124, 58, 237, 0.7))",
                  "drop-shadow(0 0 0px rgba(124, 58, 237, 0))",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                Why Personal Branding is a{" "}
                <GradientText className="text-6xl md:text-7xl lg:text-8xl">MUST</GradientText> in 2025
              </h2>
            </motion.div>

            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: "200px" }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Main content with animated elements */}
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            {/* Left column with animated text */}
            <div>
              <AnimatedLetterText
                text="IN TODAY'S DIGITAL WORLD, IF YOU'RE NOT VISIBLE, YOU'RE INVISIBLE."
                tag="h3"
                className="text-2xl md:text-3xl font-bold mb-8 text-white"
                delay={0.3}
              />

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-lg md:text-xl text-gray-300">
                  Your personal brand is the key to unlocking massive opportunities, building trust, and attracting
                  high-value clients. Here's why personal branding is no longer optional—it's a necessity in 2025!
                </p>

                <div className="flex items-center space-x-4 mt-8">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(124, 58, 237, 0.3)" }}
                  >
                    <span className="text-xl">🚀</span>
                  </motion.div>
                  <p className="text-lg">
                    <span className="font-bold text-white">93%</span> of consumers trust recommendations from
                    individuals over brands
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(124, 58, 237, 0.3)" }}
                  >
                    <span className="text-xl">💰</span>
                  </motion.div>
                  <p className="text-lg">
                    <span className="font-bold text-white">71%</span> of consumers are more likely to purchase based on
                    social media referrals
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(124, 58, 237, 0.3)" }}
                  >
                    <span className="text-xl">🔥</span>
                  </motion.div>
                  <p className="text-lg">
                    <span className="font-bold text-white">86%</span> of consumers say authenticity is important when
                    deciding what brands to support
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right column with animated card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg opacity-70"></div>
              <div className="relative bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-primary/30">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
                      <span className="text-xl">💎</span>
                    </div>
                  </motion.div>
                  The Digital Revolution
                </h3>

                <ul className="space-y-4">
                  {[
                    "Short-form video content dominates attention spans",
                    "AI-powered algorithms favor personal stories over corporate content",
                    "Micro-influencers outperform traditional celebrities in engagement",
                    "Personal brands can pivot faster than corporate entities",
                    "Authenticity creates deeper connections than polished marketing",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <motion.div whileHover={{ scale: 1.2, color: "#9333EA" }} className="text-primary mr-3 mt-1">
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/30"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(124, 58, 237, 0.2)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <p className="text-lg italic">
                    "In 2025, your personal brand isn't just part of your business strategy—it IS your business
                    strategy."
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom animated text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <AnimatedText tag="p" className="text-3xl md:text-4xl font-bold text-center text-success mb-8" delay={0.7}>
              YOUR PERSONAL BRAND IS YOUR MOST VALUABLE ASSET
            </AnimatedText>

            <AnimatedButton variant="holographic" size="lg" className="mx-auto">
              Start Building Your Brand Today
            </AnimatedButton>

            {/* Animated accent lines */}
            <div className="relative mt-16 max-w-2xl mx-auto">
              <motion.div
                className="absolute left-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1.2 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Video Showcase Section */}
      <VideoShowcase />

      {/* Testimonials Section */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-40 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />

          {/* Animated particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-testimonial-${i}`}
              className="absolute rounded-full bg-primary/20"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -50 - 20],
                x: [0, Math.random() * 50 - 25],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-3"
              animate={{
                filter: [
                  "drop-shadow(0 0 0px rgba(124, 58, 237, 0))",
                  "drop-shadow(0 0 15px rgba(124, 58, 237, 0.7))",
                  "drop-shadow(0 0 0px rgba(124, 58, 237, 0))",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                Real <GradientText className="text-6xl md:text-7xl lg:text-8xl">Results</GradientText> From{" "}
                <span className="text-primary">Real Clients</span>
              </h2>
            </motion.div>

            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: "200px" }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />

            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Don't just take our word for it. See how our clients have transformed their personal brands and achieved
              remarkable growth with our strategies.
            </motion.p>
          </motion.div>

          {/* Stats Section - MOVED ABOVE TESTIMONIALS */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-center mb-8 text-white">
              <GradientText>The Numbers Speak For Themselves</GradientText>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <StatCard
                value="94"
                suffix="%"
                label="Client Satisfaction Rate"
                icon="😍"
                iconBg="bg-rose-500"
                delay={0.2}
              />
              <StatCard
                value="187"
                suffix="%"
                label="Average Growth in Followers"
                icon="👥"
                iconBg="bg-primary"
                delay={0.3}
              />
              <StatCard
                value="215"
                suffix="%"
                label="Average Revenue Increase"
                icon="💰"
                iconBg="bg-success"
                delay={0.4}
              />
            </div>
          </motion.div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                quote={testimonial.quote}
                initials={testimonial.initials}
                avatarBg={testimonial.avatarBg}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>

          {/* Second row of testimonials */}
          <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
            {testimonials.slice(3, 5).map((testimonial, index) => (
              <TestimonialCard
                key={index + 3}
                name={testimonial.name}
                role={testimonial.role}
                quote={testimonial.quote}
                initials={testimonial.initials}
                avatarBg={testimonial.avatarBg}
                delay={0.4 + index * 0.1}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-primary/30 max-w-3xl mx-auto"
              whileHover={{ boxShadow: "0 0 30px rgba(124, 58, 237, 0.3)", borderColor: "rgba(124, 58, 237, 0.5)" }}
            >
              <AnimatedText tag="h3" className="text-2xl md:text-3xl font-bold mb-4" delay={0.3}>
                Start Your Success Story Today
              </AnimatedText>

              <motion.p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the ranks of our successful clients and transform your personal brand into a powerful business
                asset. Our proven strategies deliver real results.
              </motion.p>

              <AnimatedButton variant="holographic" size="lg" className="mx-auto">
                <motion.span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    🚀
                  </motion.span>
                  Book Your Strategy Call
                </motion.span>
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Let's Talk Section - Added above the footer */}
      <LetsTalkSection />
    </main>
  )
}

