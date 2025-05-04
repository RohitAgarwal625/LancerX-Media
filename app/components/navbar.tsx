"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import GlowButton from "@/components/glow-button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animated particles for the navbar background
  const NavbarParticles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "py-1" : "py-2"}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Animated background */}
      <motion.div
        className={`absolute inset-0 ${isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"}`}
        layoutId="navBackground"
        transition={{ duration: 0.5 }}
      >
        {isScrolled && <NavbarParticles />}

        {/* Gradient border bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(124, 58, 237, 0), rgba(124, 58, 237, 0.7), rgba(147, 51, 234, 0.7), rgba(124, 58, 237, 0))",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: isScrolled ? 1 : 0,
            opacity: isScrolled ? 1 : 0,
          }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Image
                src="/images/7fm-transparent.png"
                alt="7 Figures Media Logo"
                width={800}
                height={224}
                className="h-28 w-auto max-w-[350px]"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" label="Home" />
            <NavLink href="/pricing" label="Pricing" />

            <motion.div className="ml-4">
              <GlowButton
                size="sm"
                onClick={() => {
                  const element = document.getElementById("contact")
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Let's Chat
              </GlowButton>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md border-t border-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {["Home", "Pricing"].map((item, index) => {
                const href = item === "Home" ? "/" : "/pricing"

                return (
                  <MobileNavLink key={item} href={href} onClick={() => setIsMenuOpen(false)} delay={index * 0.1}>
                    {item}
                  </MobileNavLink>
                )
              })}

              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GlowButton
                  onClick={() => {
                    setIsMenuOpen(false)
                    const element = document.getElementById("contact")
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="w-full"
                >
                  Let's Chat
                </GlowButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const [isHovered, setIsHovered] = useState(false)
  const isInternalAnchor = href.startsWith("/#")

  const handleClick = () => {
    if (isInternalAnchor) {
      const id = href.replace("/#", "")
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const Component = isInternalAnchor ? motion.button : motion.div

  return (
    <Component
      className="relative px-3 py-2 group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {isInternalAnchor ? (
        <span className="text-sm font-medium transition-colors relative">
          {label}
          {isHovered && (
            <motion.span
              className="absolute left-0 right-0 -bottom-1 h-[2px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
              style={{
                background: "linear-gradient(90deg, transparent, #7C3AED, transparent)",
              }}
            />
          )}
        </span>
      ) : (
        <Link href={href} className="relative" onClick={() => window.scrollTo(0, 0)}>
          <motion.span
            className="text-sm font-medium transition-colors"
            initial={{ color: "rgb(209, 213, 219)" }}
            animate={{
              color: isHovered ? "#ffffff" : "rgb(209, 213, 219)",
              textShadow: isHovered ? "0 0 8px rgba(124, 58, 237, 0.5)" : "none",
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
            {isHovered && (
              <motion.span
                className="absolute left-0 right-0 -bottom-1 h-[2px]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "linear-gradient(90deg, transparent, #7C3AED, transparent)",
                }}
              />
            )}
          </motion.span>
        </Link>
      )}

      {/* Hover glow effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-md -z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.1, 0],
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(124, 58, 237, 0) 70%)",
          }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </Component>
  )
}

const MobileNavLink = ({ href, onClick, children, delay = 0 }: { 
  href: string; 
  onClick: () => void; 
  children: React.ReactNode; 
  delay?: number 
}) => {
  const isInternalAnchor = href.startsWith("/#")
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (isInternalAnchor) {
      const id = href.replace("/#", "")
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        onClick()
      }
    } else {
      onClick()
    }
  }

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.3 }}>
      {isInternalAnchor ? (
        <motion.button
          onClick={handleClick}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="block w-full px-3 py-3 text-base font-medium text-left transition-colors border-b border-gray-800"
          whileHover={{ x: 5, backgroundColor: "rgba(124, 58, 237, 0.1)" }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <motion.span
              animate={{
                color: isHovered ? "#ffffff" : "rgb(209, 213, 219)",
                textShadow: isHovered ? "0 0 8px rgba(124, 58, 237, 0.5)" : "none",
              }}
              className="bg-clip-text"
              style={{
                backgroundImage: isHovered ? "linear-gradient(90deg, #ffffff, #7C3AED)" : "none",
                WebkitBackgroundClip: isHovered ? "text" : "none",
                color: isHovered ? "transparent" : "inherit",
              }}
            >
              {children}
            </motion.span>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown size={16} className="transform -rotate-90 text-primary" />
            </motion.div>
          </div>
        </motion.button>
      ) : (
        <Link
          href={href}
          onClick={(e) => {
            window.scrollTo(0, 0)
            onClick()
          }}
          className="block px-3 py-3 text-base font-medium transition-colors border-b border-gray-800"
        >
          <motion.div
            className="flex items-center justify-between"
            whileHover={{ x: 5, backgroundColor: "rgba(124, 58, 237, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.span
              animate={{
                color: isHovered ? "#ffffff" : "rgb(209, 213, 219)",
                textShadow: isHovered ? "0 0 8px rgba(124, 58, 237, 0.5)" : "none",
              }}
              className="bg-clip-text"
              style={{
                backgroundImage: isHovered ? "linear-gradient(90deg, #ffffff, #7C3AED)" : "none",
                WebkitBackgroundClip: isHovered ? "text" : "none",
                color: isHovered ? "transparent" : "inherit",
              }}
            >
              {children}
            </motion.span>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown size={16} className="transform -rotate-90 text-primary" />
            </motion.div>
          </motion.div>
        </Link>
      )}
    </motion.div>
  )
}

