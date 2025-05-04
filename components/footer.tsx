"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Linkedin } from "lucide-react"
import { Instagram } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 relative overflow-hidden">
      {/* Subtle background glow */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div>
            <Link href="/" className="flex items-center">
              {/* <Image
                src="/logo.png"
                alt="LancerX Media Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              /> */}
              <span className="ml-2 text-xl font-bold text-white">LancerX Media</span>
            </Link>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase">Services</h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("home")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Content Creation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("home")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Personal Branding
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("home")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Social Media Growth
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("contact")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Lead Generation
                </button>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase">Follow Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.instagram.com/lancerxmedia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/7-figures-media"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase">Legal</h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("home")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("home")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("contact")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800 my-10"></div>

        {/* Bottom section with copyright and social icons */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} LANCERX MEDIA. All Rights Reserved.
          </p>

          {/* Social icons */}
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/lancerxmedia/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/7-figures-media"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

