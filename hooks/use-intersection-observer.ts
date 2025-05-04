"use client"

import { useEffect, useState, type RefObject } from "react"

interface UseIntersectionObserverProps {
  ref: RefObject<Element>
  options?: IntersectionObserverInit
}

export function useIntersectionObserver({ ref, options = { threshold: 0.1 } }: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return isIntersecting
}

