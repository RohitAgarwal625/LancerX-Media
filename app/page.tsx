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
import LiquidButton from "@/components/liquid-button"

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
const BrandCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  description: string; 
  delay?: number 
}) => {
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
const TestimonialCard = ({ name, role, quote, imageUrl, rating = 5, delay = 0, initials, avatarBg = "bg-red-500" }: { name: string; role: string; quote: string; imageUrl: string; rating?: number; delay?: number; initials?: string; avatarBg?: string }) => {
  return (
    <AnimatedCard delay={delay} className="group relative">
      <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 h-full relative overflow-hidden transition-all duration-300 group-hover:border-red-500/50 group-hover:shadow-[0_0_30px_rgba(255,59,48,0.3)]">
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
            <motion.h4 className="font-bold text-lg" whileHover={{ color: "#FF3B30" }}>
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
            className="absolute -top-3 -left-1 text-4xl text-red-500/30"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            "
          </motion.div>
          <p className="text-gray-300 italic relative z-10 pl-4 group-hover:text-white">{quote}</p>
          <motion.div
            className="absolute -bottom-3 -right-1 text-4xl text-red-500/30"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          >
            "
          </motion.div>
        </motion.div>

        {/* Animated gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 pointer-events-none z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0 }}
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(45deg, #FF3B30, #FF5A5F, #FF3B30)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>
    </AnimatedCard>
  )
}

// Stat Card Component for Testimonial Section
const StatCard = ({ value, label, prefix = "", suffix = "", icon, iconBg = "bg-primary", delay = 0 }: { value: string; label: string; prefix?: string; suffix?: string; icon: React.ReactNode; iconBg?: string; delay?: number }) => {
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
          color: ["#ffffff", "#FF6464", "#ffffff"],
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
        "LancerX Media transformed our video content strategy. Their professional production quality and strategic approach helped us increase our conversion rate by 300% in just 3 months.",
      avatarBg: "bg-primary",
    },
    {
      name: "Marcus Chen",
      role: "E-commerce Brand Owner",
      initials: "MC",
      quote:
        "The video content they produced for our product launches consistently outperforms our previous content. Our engagement rates have increased by 250% and sales have followed suit.",
      avatarBg: "bg-accent",
    },
    {
      name: "Elena Rodriguez",
      role: "Fitness Influencer",
      initials: "ER",
      quote:
        "Working with LancerX Media has been a game-changer. Their video production quality is exceptional, and their content strategy helped me grow my YouTube channel from 0 to 50K subscribers in 6 months.",
      avatarBg: "bg-success",
    },
    {
      name: "David Palmer",
      role: "Marketing Director",
      initials: "DP",
      quote:
        "The ROI on our video content has been incredible since partnering with LancerX Media. Their end-to-end service from scripting to production has saved us countless hours and delivered outstanding results.",
      avatarBg: "bg-sky-500",
    },
    {
      name: "Priya Sharma",
      role: "SaaS Founder",
      initials: "PS",
      quote:
        "LancerX Media's video production team is simply outstanding. They understand our brand voice perfectly and consistently deliver high-quality content that resonates with our target audience.",
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
            Effortless content creation for for{" "}
            <span className="bg-gray-800 px-3 py-1 rounded-full">
              <TypingAnimation
                words={["Brands", "Startups", "Creators", "Enterprises"]}
                typingSpeed={100}
                deletingSpeed={50}
                delayBetweenWords={2000}
              />
            </span>
          </motion.p>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            Ignite Your{" "}
            <span className="bg-gradient-to-r from-white via-purple-400 to-primary text-transparent bg-clip-text">
              Imagination
            </span>
          </h1>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            Create Content{" "}
            <span className="bg-gradient-to-r from-white via-purple-400 to-primary text-transparent bg-clip-text">
              that resonates !
            </span>
          </h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base text-gray-300 font-light mb-10 mt-6 max-w-4xl mx-auto"
          >
            We take care of everything: ideation, scripting, production, editing, thumbnails, publishing, and strategy—so you can focus on your brand and business.
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
                Start Your Youtube Journey
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
                YouTube as a{" "}
                <GradientText className="text-6xl md:text-7xl lg:text-8xl">Service</GradientText>
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
                text="YOUR YOUTUBE SUCCESS PARTNER"
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
                  We handle everything from ideation to publishing, so you can focus on what matters most - growing your business.
                </p>

                <div className="flex items-center space-x-4 mt-8">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(124, 58, 237, 0.3)" }}
                  >
                    <span className="text-xl">🎯</span>
                  </motion.div>
                  <p className="text-lg">
                    <span className="font-bold text-white">Strategic Content Planning</span> - Data-driven approach to maximize engagement
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(124, 58, 237, 0.3)" }}
                  >
                    <span className="text-xl">🎥</span>
                  </motion.div>
                  <p className="text-lg">
                    <span className="font-bold text-white">Professional Production</span> - High-quality videos that convert
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(124, 58, 237, 0.3)" }}
                  >
                    <span className="text-xl">📈</span>
                  </motion.div>
                  <p className="text-lg">
                    <span className="font-bold text-white">Growth Optimization</span> - Proven strategies to increase views and subscribers
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right column with animated card */}
            <motion.div
              className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-primary/30"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow: "0 0 30px rgba(124, 58, 237, 0.3)",
                borderColor: "rgba(124, 58, 237, 0.5)",
              }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">What We Handle</h3>
              <ul className="space-y-4">
                {[
                  "Content ideation and research",
                  "Script writing and storyboarding",
                  "Professional video production",
                  "High-end editing and effects",
                  "Custom thumbnail design",
                  "SEO optimization and publishing",
                  "Analytics and performance tracking",
                  "Audience engagement strategy"
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
                  "Let us handle the technical side while you focus on your expertise and business growth."
                </p>
              </motion.div>
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
                  "drop-shadow(0 0 0px rgba(255, 59, 48, 0))",
                  "drop-shadow(0 0 15px rgba(255, 59, 48, 0.7))",
                  "drop-shadow(0 0 0px rgba(255, 59, 48, 0))",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                Real <GradientText className="text-6xl md:text-7xl lg:text-8xl">Results</GradientText> From{" "}
                <span className="text-[rgb(255_100_100)]">Real Clients</span>
              </h2>
            </motion.div>

            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-[rgb(255_100_100)] to-[rgb(255_100_100)] rounded-full mx-auto mb-8"
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
                value="98"
                suffix="%"
                label="Client Satisfaction Rate"
                icon="🎥"
                iconBg="bg-red-500"
                delay={0.2}
              />
              <StatCard
                value="300"
                suffix="%"
                label="Average Engagement Increase"
                icon="📈"
                iconBg="bg-red-600"
                delay={0.3}
              />
              <StatCard
                value="250"
                suffix="%"
                label="Average ROI on Video Content"
                icon="💰"
                iconBg="bg-red-700"
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
        </div>
      </AnimatedSection>

      {/* Let's Talk Section - Added above the footer */}
      <LetsTalkSection />
    </main>
  )
}

