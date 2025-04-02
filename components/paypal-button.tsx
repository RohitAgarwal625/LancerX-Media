"use client"

import { useEffect, useState } from "react"

interface PayPalButtonProps {
  hostedButtonId: string
  planName: string
  planPrice: string
}

export default function PayPalButton({ hostedButtonId, planName, planPrice }: PayPalButtonProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if PayPal script is loaded
    const checkPayPalLoaded = setInterval(() => {
      if (window.paypal && window.paypal.HostedButtons) {
        clearInterval(checkPayPalLoaded)
        setIsLoading(false)

        const container = document.getElementById(`paypal-button-${hostedButtonId}`)
        if (container) {
          // Clear container first
          container.innerHTML = ""

          // Render the PayPal button
          window.paypal
            .HostedButtons({
              hostedButtonId: hostedButtonId,
            })
            .render(`#paypal-button-${hostedButtonId}`)
        }
      }
    }, 500)

    // Cleanup
    return () => clearInterval(checkPayPalLoaded)
  }, [hostedButtonId])

  // Fallback direct PayPal link in case the hosted button doesn't render
  const paypalDirectLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=${hostedButtonId}`

  return (
    <div className="flex flex-col items-center">
      {/* PayPal hosted button container */}
      <div id={`paypal-button-${hostedButtonId}`} className="min-h-[50px] w-full flex justify-center items-center mb-4">
        {isLoading && <div className="animate-pulse bg-gray-700 h-10 w-40 rounded"></div>}
      </div>

      {/* Fallback link */}
      <div className="text-sm text-gray-400 mt-2">
        <span>If the button doesn't appear, </span>
        <a
          href={paypalDirectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-accent underline"
        >
          click here to subscribe
        </a>
      </div>
    </div>
  )
}

