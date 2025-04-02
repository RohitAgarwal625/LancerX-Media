"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import PayPalDirectForm from "./paypal-direct-form"

interface PayPalModalProps {
  isOpen: boolean
  onClose: () => void
  hostedButtonId: string
  planName: string
  planPrice: string
}

export default function PayPalModal({ isOpen, onClose, hostedButtonId, planName, planPrice }: PayPalModalProps) {
  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="relative bg-gray-900 rounded-xl border border-primary/30 p-8 max-w-md w-full mx-4"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Modal content */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Subscribe to {planName}</h3>
              <p className="text-gray-300 mb-4">${planPrice}/month</p>

              <div className="bg-primary/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-300">
                  You'll be charged ${planPrice} monthly until you cancel your subscription. You can cancel anytime from
                  your PayPal account.
                </p>
              </div>
            </div>

            {/* PayPal direct form */}
            <PayPalDirectForm hostedButtonId={hostedButtonId} planName={planName} planPrice={planPrice} />

            {/* Alternative payment method */}
            <div className="mt-6 pt-6 border-t border-gray-800 text-center">
              <p className="text-sm text-gray-400">
                Prefer to pay another way?{" "}
                <button onClick={onClose} className="text-primary hover:text-accent underline">
                  Contact us
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

