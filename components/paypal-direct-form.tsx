"use client"

interface PayPalDirectFormProps {
  hostedButtonId: string
  planName: string
  planPrice: string
}

export default function PayPalDirectForm({ hostedButtonId, planName, planPrice }: PayPalDirectFormProps) {
  return (
    <div className="flex justify-center">
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className="w-full">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value={hostedButtonId} />
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#0070ba] hover:bg-[#003087] text-white font-bold rounded-md transition-colors"
        >
          Subscribe with PayPal
        </button>
      </form>
    </div>
  )
}

