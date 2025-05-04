import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/app/components/navbar"
import AnimatedBackground from "@/components/animated-background"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LancerX Media - Personal Branding & Growth System",
  description: "Ultimate Personal Branding & Growth System - From Viral Content to High-Quality Leads",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatedBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'