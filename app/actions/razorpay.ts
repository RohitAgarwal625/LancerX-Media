"use server"

import Razorpay from "razorpay"

interface OrderParams {
  amount: number
  currency: string
  receipt: string
  notes?: Record<string, string>
}

export async function createRazorpayOrder(params: OrderParams) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    })

    const order = await razorpay.orders.create({
      amount: params.amount,
      currency: params.currency,
      receipt: params.receipt,
      notes: params.notes,
    })

    return order
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    throw new Error("Failed to create payment order")
  }
}

// New server action that provides both the order and key ID
export async function initializeRazorpay(params: OrderParams) {
  try {
    const order = await createRazorpayOrder(params)

    // Return the order along with the key ID
    return {
      order,
      keyId: process.env.RAZORPAY_KEY_ID,
    }
  } catch (error) {
    console.error("Error initializing Razorpay:", error)
    throw new Error("Failed to initialize payment")
  }
}

