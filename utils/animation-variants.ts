// Animation variants for Framer Motion
export const fadeIn = (direction: "up" | "down" | "left" | "right" = "up", delay = 0) => {
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
        type: "spring",
        damping: 15,
        stiffness: 80,
        delay,
        duration: 0.8,
      },
    },
  }
}

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }
}

export const textVariant = (delay = 0) => {
  return {
    hidden: {
      y: 50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        delay,
      },
    },
  }
}

export const slideIn = (direction: "up" | "down" | "left" | "right", type: string, delay: number, duration: number) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  }
}

export const zoomIn = (delay: number, duration: number) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        delay,
        duration,
      },
    },
  }
}

export const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    },
  },
}

export const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    },
  },
}

export const glowAnimation = {
  initial: { opacity: 0.8 },
  animate: {
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    },
  },
}

export const rotateAnimation = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  },
}

export const shimmerAnimation = {
  initial: { backgroundPosition: "-500px 0" },
  animate: {
    backgroundPosition: ["500px 0", "-500px 0"],
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      duration: 5,
      ease: "linear",
    },
  },
}

export const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
}

export const buttonHoverAnimation = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 15px -3px rgba(124, 58, 237, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
    boxShadow: "0 5px 10px -3px rgba(124, 58, 237, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
}

export const gradientTextAnimation = {
  initial: { backgroundPosition: "0% center" },
  animate: {
    backgroundPosition: ["0% center", "100% center", "0% center"],
    transition: {
      duration: 5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: "linear",
    },
  },
}

export const bounceAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
}

export const expandAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
}

export const blinkAnimation = {
  initial: { opacity: 1 },
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
}

export const waveTextAnimation = {
  initial: { y: 0 },
  animate: (i: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: "easeInOut",
      delay: i * 0.1,
    },
  }),
}

