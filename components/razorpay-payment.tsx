"use client"

import { useState, useEffect } from "react"
import { initializeRazorpay } from "@/app/actions/razorpay"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayPaymentProps {
  planName: string
  planPrice: string
  onSuccess?: () => void
  onFailure?: () => void
}

export default function RazorpayPayment({ planName, planPrice, onSuccess, onFailure }: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.onload = () => {
        setIsScriptLoaded(true)
      }
      document.body.appendChild(script)
    }

    if (!window.Razorpay) {
      loadRazorpayScript()
    } else {
      setIsScriptLoaded(true)
    }

    return () => {
      // Cleanup if needed
    }
  }, [])

  const handlePayment = async () => {
    try {
      setIsLoading(true)

      // Convert price to paise (Razorpay uses smallest currency unit)
      const amountInPaise = Math.round(Number.parseFloat(planPrice) * 100)

      // Initialize payment through server action
      const { order, keyId } = await initializeRazorpay({
        amount: amountInPaise,
        currency: "USD",
        receipt: `receipt_${Date.now()}`,
        notes: {
          planName: planName,
        },
      })

      if (!order || !order.id || !keyId) {
        throw new Error("Failed to create order")
      }

      // Initialize Razorpay options
      const options = {
        key: keyId, // Key ID comes from server
        amount: amountInPaise,
        currency: "USD",
        name: "LancerX Media",
        description: `Payment for ${planName} Plan`,
        order_id: order.id,
        handler: (response: any) => {
          // Handle successful payment
          console.log("Payment successful", response)
          if (onSuccess) onSuccess()
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          planName: planName,
        },
        theme: {
          color: "#7C3AED",
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
            if (onFailure) onFailure()
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      setIsLoading(false)
      if (onFailure) onFailure()
    }
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handlePayment}
        disabled={isLoading || !isScriptLoaded}
        className="w-full py-3 px-4 bg-primary hover:bg-accent text-white font-bold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : `Pay $${planPrice} with Razorpay`}
      </button>

      {!isScriptLoaded && <div className="text-sm text-gray-400 mt-2">Loading payment gateway...</div>}
    </div>
  )
}

