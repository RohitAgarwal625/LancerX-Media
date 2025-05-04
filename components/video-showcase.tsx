"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import GlowButton from "./glow-button"

interface VideoItem {
  id: string
  title: string
  thumbnail: string
  wistiaId: string
}

export default function VideoShowcase() {
  // Add Wistia script loading
  useEffect(() => {
    // Load Wistia scripts
    const playerScript = document.createElement("script")
    playerScript.src = "https://fast.wistia.com/assets/external/E-v1.js"
    playerScript.async = true
    document.head.appendChild(playerScript)

    return () => {
      // Clean up if the script element exists
      if (document.head.contains(playerScript)) {
        document.head.removeChild(playerScript)
      }
    }
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)

  // Update the videos array to only include videos with working Wistia IDs
  const videos: VideoItem[] = [
    {
      id: "video1",
      title: "Personal Branding Essentials",
      thumbnail: "/placeholder.svg?height=600&width=300",
      wistiaId: "h07amux97n", // First unique video
    },
    {
      id: "video2",
      title: "Content Strategy Masterclass",
      thumbnail: "/placeholder.svg?height=600&width=300",
      wistiaId: "20yq66lb0d", // Second unique video
    },
    {
      id: "video3",
      title: "Audience Growth Techniques",
      thumbnail: "/placeholder.svg?height=600&width=300",
      wistiaId: "r6rcvilwed", // Third unique video
    },
  ]

  // Set the active video when index changes
  useEffect(() => {
    setActiveVideo(videos[currentIndex].id)
  }, [currentIndex, videos])

  // Handle video navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
  }

  // Get visible videos (3 at a time)
  const visibleVideos = () => {
    const items = []
    const startIndex = currentIndex

    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % videos.length
      items.push(videos[index])
    }

    return items
  }

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Portfolio badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-primary/20 px-4 py-1 rounded-full text-sm font-medium text-white uppercase tracking-wide border border-primary/30">
            Portfolio
          </div>
        </div>

        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Videos that makes your brand
            <br />
            spread like{" "}
            <span className="relative">
              wildfire
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary"></span>
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-4">
            Our system bring you consistent organic followers and
            <br />
            predictably turn them into paying customers!
          </p>
        </div>

        {/* Video showcase */}
        <div className="relative">
          <div className="flex justify-center items-center gap-6 md:gap-10 my-12 relative">
            {visibleVideos().map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Phone mockup */}
                <div className="relative w-[280px] rounded-[36px] overflow-hidden shadow-xl transform rotate-0">
                  {/* Video thumbnail with play button */}
                  <div className="aspect-[9/16] bg-black relative overflow-hidden rounded-[36px] border-8 border-gray-900">
                    <div className="w-full h-full">
                      <iframe
                        src={`https://fast.wistia.net/embed/iframe/${video.wistiaId}?playerColor=7C3AED&controlsVisibleOnLoad=false&volumeControl=false&fullscreenButton=false&playbar=false&smallPlayButton=false&playButton=false&endVideoBehavior=loop`}
                        className="w-full h-full absolute inset-0"
                        allowTransparency={true}
                        frameBorder="0"
                        scrolling="no"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      ></iframe>
                    </div>

                    {/* Wistia branding */}
                    <div className="absolute bottom-3 right-3 z-10">
                      <div className="bg-primary text-white text-xs px-2 py-1 rounded-sm flex items-center">
                        <span className="mr-1">≡</span> wistia
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-primary/80 text-white rounded-full flex items-center justify-center border border-primary/30"
            onClick={handlePrev}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-primary/80 text-white rounded-full flex items-center justify-center border border-primary/30"
            onClick={handleNext}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 gap-3">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-primary" : "bg-gray-700"
              } transition-colors duration-300`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* View More Button */}
      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <GlowButton
          size="lg"
          onClick={() => {
            window.open(
              "https://drive.google.com/drive/folders/1Leh2rK9vQARpL0YdKqlLaCI8Uucwe7EZ?usp=sharing",
              "_blank",
            )
          }}
        >
          View More Videos
        </GlowButton>
      </motion.div>

      {/* Background elements */}
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] rounded-full bg-primary/10 -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full bg-accent/10 translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
    </section>
  )
}

