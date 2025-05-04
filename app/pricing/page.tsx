"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CheckCircle2, Target, Zap, Crown, Flame, Star, Sparkles, Gift, X } from "lucide-react"
import Link from "next/link"
import AnimatedLetterText from "@/components/animated-letter-text"
import GradientText from "@/components/gradient-text"
import WaveText from "@/components/wave-text"
import { FloatingElement } from "@/components/animated-elements"
import StarButton from "@/components/star-button"
import RazorpayModal from "@/components/razorpay-modal"

export default function PricingPage() {
  const [pricingType, setPricingType] = useState<"monthly" | "package">("monthly")
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const [animateComparison, setAnimateComparison] = useState(false)
  const comparisonRef = useRef(null)
  const isComparisonInView = useInView(comparisonRef, { once: true, amount: 0.3 })

  // Razorpay modal state
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null)

  const openRazorpayModal = (planName: string, planPrice: string) => {
    setSelectedPlan({ name: planName, price: planPrice })
    setIsRazorpayModalOpen(true)
  }

  useEffect(() => {
    if (isComparisonInView) {
      setTimeout(() => setAnimateComparison(true), 500)
    }
  }, [isComparisonInView])

  // Features for each plan
  const planFeatures = {
    starter: [
      "1 video per week",
      "Basic video editing",
      "Script writing",
      "Thumbnail design",
      "Basic SEO optimization",
      "Email support",
    ],
    growth: [
      "2 videos per week",
      "Advanced video editing",
      "Professional script writing",
      "Custom thumbnail design",
      "Advanced SEO optimization",
      "Content strategy",
      "Priority support",
      "Monthly strategy call",
    ],
    viral: [
      "4 videos per week",
      "Premium video editing",
      "Expert script writing",
      "Custom thumbnail design",
      "Advanced SEO optimization",
      "Complete content strategy",
      "24/7 VIP support",
      "Weekly strategy calls",
      "Performance analytics",
      "Growth guarantee",
    ],
  }

  // Package features
  const packageFeatures = {
    basic: [
      "12 professional videos",
      "Content research & strategy",
      "Custom editing style",
      "Thumbnail design",
      "Basic SEO optimization",
      "Email & chat support",
    ],
    professional: [
      "24 professional videos",
      "Advanced content strategy",
      "Custom editing style",
      "Premium thumbnail design",
      "Advanced SEO optimization",
      "24/7 support",
      "Bi-weekly strategy calls",
      "Performance analytics",
    ],
    premium: [
      "48 premium videos",
      "Complete content strategy",
      "Custom editing style",
      "Premium thumbnail design",
      "Advanced SEO optimization",
      "24/7 VIP support",
      "Weekly strategy calls",
      "Detailed analytics",
      "Custom branding kit",
      "Dedicated account manager",
    ],
  }

  // Comparison data for the table
  const comparisonData = [
    { feature: "Video Quality", competitors: "Basic editing", us: "Professional production" },
    { feature: "Content Strategy", competitors: "Generic approach", us: "Customized strategy" },
    { feature: "Support", competitors: "Email only", us: "24/7 dedicated team" },
    { feature: "Results", competitors: "No guarantees", us: "Growth guarantees" },
    { feature: "Production Time", competitors: "2-3 weeks", us: "5-7 days" },
  ]

  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />

        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-pricing-${i}`}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -50 - 20],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-primary/20 rounded-bl-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-1/4 h-1/4 bg-accent/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            className="inline-flex items-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="mr-3"
            >
              <Target className="text-red-500 w-12 h-12" />
            </motion.div>
            <AnimatedLetterText
              text="Pricing & Packages"
              tag="h1"
              className="text-5xl md:text-6xl font-bold"
              delay={0.1}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <WaveText text="Choose What Fits You Best!" tag="p" className="text-xl md:text-2xl mt-4 mb-8" delay={0.2} />
          </motion.div>

          {/* Animated divider */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: isComparisonInView ? "200px" : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Pricing Toggle */}
          <motion.div
            className="inline-flex bg-gray-800/80 p-1.5 rounded-full mb-12 backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={() => setPricingType("monthly")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all relative overflow-hidden ${
                pricingType === "monthly" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
              whileHover={{ scale: pricingType !== "monthly" ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {pricingType === "monthly" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full -z-10"
                  layoutId="pricingTabBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="flex items-center gap-2">
                <Zap className={`w-4 h-4 ${pricingType === "monthly" ? "text-white" : "text-gray-400"}`} />
                Monthly Plans
              </span>
            </motion.button>

            <motion.button
              onClick={() => setPricingType("package")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all relative overflow-hidden ${
                pricingType === "package" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
              whileHover={{ scale: pricingType !== "package" ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {pricingType === "package" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full -z-10"
                  layoutId="pricingTabBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="flex items-center gap-2">
                <Gift className={`w-4 h-4 ${pricingType === "package" ? "text-white" : "text-gray-400"}`} />
                Package Deals
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Monthly Pricing Plans */}
      <AnimatePresence mode="wait">
        {pricingType === "monthly" && (
          <motion.section
            className="pb-20 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            key="monthly"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Starter Package */}
                <PricingCard
                  popular={false}
                  title="Starter Package"
                  price="699"
                  period="/month"
                  icon={<Zap className="w-6 h-6" />}
                  features={planFeatures.starter}
                  buttonText="Get Started"
                  buttonLink="#contact"
                  delay={0.1}
                  onHover={() => setHoveredPlan("starter")}
                  onLeave={() => setHoveredPlan(null)}
                  isHovered={hoveredPlan === "starter"}
                  accentColor="from-blue-500 to-blue-600"
                  iconBg="bg-blue-500/20"
                  iconColor="text-blue-500"
                  openRazorpayModal={openRazorpayModal}
                />

                {/* Growth Package */}
                <PricingCard
                  popular={true}
                  title="Growth Package"
                  price="1299"
                  period="/month"
                  icon={<Target className="w-6 h-6" />}
                  features={planFeatures.growth}
                  buttonText="Unlock Growth"
                  buttonLink="#contact"
                  delay={0.2}
                  onHover={() => setHoveredPlan("growth")}
                  onLeave={() => setHoveredPlan(null)}
                  isHovered={hoveredPlan === "growth"}
                  accentColor="from-primary to-accent"
                  iconBg="bg-primary/20"
                  iconColor="text-primary"
                  bestValue={true}
                  openRazorpayModal={openRazorpayModal}
                />

                {/* Viral Domination Package */}
                <PricingCard
                  popular={false}
                  title="Viral Domination"
                  price="2499"
                  period="/month"
                  icon={<Crown className="w-6 h-6" />}
                  features={planFeatures.viral}
                  buttonText="Get Viral"
                  buttonLink="#contact"
                  delay={0.3}
                  onHover={() => setHoveredPlan("viral")}
                  onLeave={() => setHoveredPlan(null)}
                  isHovered={hoveredPlan === "viral"}
                  accentColor="from-amber-500 to-amber-600"
                  iconBg="bg-amber-500/20"
                  iconColor="text-amber-500"
                  openRazorpayModal={openRazorpayModal}
                />
              </div>

              <div className="text-center mt-16">
                <motion.p
                  className="text-xl flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Flame className="text-orange-500 mr-2" />
                  Whether you're just starting or ready to dominate, we have the perfect plan for you
                </motion.p>
                <motion.p
                  className="mt-6 text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <span className="inline-flex items-center">
                    <span className="text-2xl mr-2">🚀</span>
                    Want a Custom Package?!
                  </span>
                  <Link href="#contact" className="text-primary hover:text-accent ml-2 underline">
                    Contact us
                  </Link>
                </motion.p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Package Deals */}
      <AnimatePresence mode="wait">
        {pricingType === "package" && (
          <motion.section
            className="pb-20 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            key="package"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Basic Package */}
                <PricingCard
                  popular={false}
                  title="Basic"
                  price="2999"
                  period="3 month"
                  discount="23% OFF"
                  icon={<Zap className="w-6 h-6" />}
                  features={packageFeatures.basic}
                  buttonText="Get Started"
                  buttonLink="#contact"
                  delay={0.1}
                  onHover={() => setHoveredPlan("basic")}
                  onLeave={() => setHoveredPlan(null)}
                  isHovered={hoveredPlan === "basic"}
                  accentColor="from-blue-500 to-blue-600"
                  iconBg="bg-blue-500/20"
                  iconColor="text-blue-500"
                  openRazorpayModal={openRazorpayModal}
                />

                {/* Professional Package */}
                <PricingCard
                  popular={true}
                  title="Professional"
                  price="4999"
                  period="6 month"
                  discount="36% OFF"
                  icon={<Target className="w-6 h-6" />}
                  features={packageFeatures.professional}
                  buttonText="Unlock Growth"
                  buttonLink="#contact"
                  delay={0.2}
                  onHover={() => setHoveredPlan("professional")}
                  onLeave={() => setHoveredPlan(null)}
                  isHovered={hoveredPlan === "professional"}
                  accentColor="from-primary to-accent"
                  iconBg="bg-primary/20"
                  iconColor="text-primary"
                  bestValue={true}
                  openRazorpayModal={openRazorpayModal}
                />

                {/* Premium Package */}
                <PricingCard
                  popular={false}
                  title="Premium"
                  price="8999"
                  period="12 month"
                  discount="43% OFF"
                  icon={<Crown className="w-6 h-6" />}
                  features={packageFeatures.premium}
                  buttonText="Get Viral"
                  buttonLink="#contact"
                  delay={0.3}
                  onHover={() => setHoveredPlan("premium")}
                  onLeave={() => setHoveredPlan(null)}
                  isHovered={hoveredPlan === "premium"}
                  accentColor="from-amber-500 to-amber-600"
                  iconBg="bg-amber-500/20"
                  iconColor="text-amber-500"
                  openRazorpayModal={openRazorpayModal}
                />
              </div>

              <div className="text-center mt-16">
                <motion.p
                  className="text-xl flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Flame className="text-orange-500 mr-2" />
                  We Offer Guaranteed Success with our
                  <span className="font-bold italic mx-1">Professional</span> and
                  <span className="font-bold italic mx-1">Premium</span> Packs
                  <Flame className="text-orange-500 ml-2" />
                </motion.p>
                <motion.p
                  className="mt-6 text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <span className="inline-flex items-center">
                    <span className="text-2xl mr-2">💡</span>
                    We also offer VIP & high-profile client packages tailored to your needs.
                  </span>
                  <Link href="#contact" className="text-primary hover:text-accent ml-2 underline">
                    Contact us
                  </Link>
                </motion.p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Comparison Table */}
      <section className="py-20 px-4 relative overflow-hidden" ref={comparisonRef}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-primary/5 to-black/50 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isComparisonInView ? 1 : 0 }}
          transition={{ duration: 1 }}
        />

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isComparisonInView ? 1 : 0, y: isComparisonInView ? 0 : 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-3"
              animate={
                isComparisonInView
                  ? {
                      filter: [
                        "drop-shadow(0 0 0px rgba(124, 58, 237, 0))",
                        "drop-shadow(0 0 15px rgba(124, 58, 237, 0.7))",
                        "drop-shadow(0 0 0px rgba(124, 58, 237, 0))",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose <GradientText>LancerX Media</GradientText>?
              </h2>
            </motion.div>

            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: isComparisonInView ? "200px" : 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: isComparisonInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              See how our services compare to traditional agencies and why our clients choose us time and time again.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-xl border border-gray-800 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isComparisonInView ? 1 : 0, y: isComparisonInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="p-5 text-left">Feature</th>
                    <th className="p-5 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 mb-1">Other Agencies</span>
                        <motion.div
                          className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"
                          animate={
                            animateComparison
                              ? {
                                  scale: [1, 0.9, 1],
                                  rotate: [0, -5, 0, 5, 0],
                                }
                              : {}
                          }
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </motion.div>
                      </div>
                    </th>
                    <th className="p-5 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-primary font-bold mb-1">LancerX Media</span>
                        <motion.div
                          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                          animate={
                            animateComparison
                              ? {
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 5, 0, -5, 0],
                                }
                              : {}
                          }
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </motion.div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <motion.tr
                      key={index}
                      className="border-b border-gray-800"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: animateComparison ? 1 : 0,
                        x: animateComparison ? 0 : -20,
                      }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    >
                      <td className="p-5 font-medium">{item.feature}</td>
                      <td className="p-5 text-center text-gray-400">{item.competitors}</td>
                      <td className="p-5 text-center">
                        <motion.div
                          className="inline-block"
                          animate={
                            animateComparison
                              ? {
                                  color: ["#ffffff", "#7C3AED", "#ffffff"],
                                }
                              : {}
                          }
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                        >
                          {item.us}
                        </motion.div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-xl -z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: animateComparison ? [0, 0.5, 0] : 0,
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            >
              <div className="absolute inset-0 rounded-xl border-2 border-primary/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-black/95">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <GradientText>Frequently Asked Questions</GradientText>
          </motion.h2>

          <div className="space-y-8">
            <FaqItem
              question="What's included in each package?"
              answer="Each package includes professional video production, content strategy, optimization for the platforms, and regular performance analytics. Higher tier packages include more videos per month, more platforms, and additional services like sales funnels and lead generation."
              delay={0.1}
            />

            <FaqItem
              question="How long does it take to see results?"
              answer="While results can vary based on your industry and audience, most clients start seeing increased engagement within the first month. Significant growth in followers and leads typically begins in months 2-3 as we optimize your strategy based on performance data."
              delay={0.2}
            />

            <FaqItem
              question="Do I need to appear in the videos?"
              answer="Not necessarily. While showing your face can help build stronger connections with your audience, we can create successful faceless content strategies using animations, text overlays, and voiceovers if you prefer not to be on camera."
              delay={0.3}
            />

            <FaqItem
              question="Can I upgrade my package later?"
              answer="You can upgrade your package at any time. Many clients start with our Starter or Growth package and upgrade as they see results and are ready to scale their personal brand further."
              delay={0.4}
            />

            <FaqItem
              question="Do you offer custom packages?"
              answer="Yes, we offer custom packages tailored to your specific needs and goals. Contact us to discuss your requirements, and we'll create a personalized strategy for your personal brand."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-primary/5 to-black/50 -z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-12"
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="Fitness Coach"
              quote="My Instagram following grew by 300% in just 3 months. The leads I'm getting are much more qualified and ready to buy."
              rating={5}
              delay={0.1}
            />

            <TestimonialCard
              name="Michael Chen"
              role="Real Estate Agent"
              quote="The ROI has been incredible. For every $1 I spend on their services, I'm making $15 back in commissions from new clients."
              rating={5}
              delay={0.2}
            />

            <TestimonialCard
              name="Jessica Williams"
              role="Business Consultant"
              quote="I was skeptical at first, but the results speak for themselves. My content is reaching the right audience and converting at rates I never thought possible."
              rating={5}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-primary/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* Floating elements */}
          {[...Array(5)].map((_, i) => (
            <FloatingElement key={i} className="absolute">
              <motion.div
                className="w-4 h-4 rounded-full bg-primary/30"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
              />
            </FloatingElement>
          ))}
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedLetterText
            text="Ready to Transform Your Personal Brand?"
            tag="h2"
            className="text-4xl font-bold mb-6"
            delay={0.1}
          />
          <motion.p
            className="text-xl mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Choose the package that fits your goals and let's start building your 7-figure personal brand today!
          </motion.p>

          <StarButton
            size="lg"
            onClick={() => {
              const element = document.getElementById("contact")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            <motion.span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Get Started Now
            </motion.span>
          </StarButton>
        </div>
      </section>

      {/* Razorpay Modal */}
      {selectedPlan && (
        <RazorpayModal
          isOpen={isRazorpayModalOpen}
          onClose={() => setIsRazorpayModalOpen(false)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
        />
      )}
    </main>
  )
}

// Pricing Card Component
const PricingCard = ({
  popular,
  title,
  price,
  period,
  discount,
  icon,
  features,
  buttonText,
  buttonLink,
  delay,
  onHover,
  onLeave,
  isHovered,
  accentColor,
  iconBg,
  iconColor,
  bestValue = false,
  openRazorpayModal,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative rounded-xl overflow-hidden ${
        popular ? "border-2 border-primary" : "border border-gray-800"
      }`}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.25)",
        transition: { duration: 0.3 },
      }}
    >
      {popular && (
        <motion.div
          className="absolute top-0 left-0 right-0 py-1.5 text-center text-sm font-medium z-10 overflow-hidden"
          initial={{ backgroundColor: "rgba(124, 58, 237, 1)" }}
          animate={{
            backgroundColor: isHovered
              ? ["rgba(124, 58, 237, 1)", "rgba(147, 51, 234, 1)", "rgba(124, 58, 237, 1)"]
              : "rgba(124, 58, 237, 1)",
          }}
          transition={{ duration: 2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
        >
          <motion.span
            animate={
              isHovered
                ? {
                    x: [0, 5, 0, -5, 0],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="flex items-center justify-center gap-1"
          >
            <Star className="w-3.5 h-3.5" fill="white" />
            Most Popular
            <Star className="w-3.5 h-3.5" fill="white" />
          </motion.span>

          {/* Shimmer effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
            />
          )}
        </motion.div>
      )}

      {bestValue && (
        <motion.div
          className="absolute -top-4 -right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full z-20 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [-5, 5, -5] }}
          transition={{
            scale: { duration: 0.3, delay: delay + 0.3 },
            rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
          }}
        >
          BEST VALUE
        </motion.div>
      )}

      <div className={`p-8 bg-gray-900/50 backdrop-blur-sm ${popular ? "pt-12" : ""}`}>
        <div className="flex items-center mb-4">
          <motion.div
            className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center mr-3`}
            animate={
              isHovered
                ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div className={iconColor}>{icon}</motion.div>
          </motion.div>
          <h3 className="text-2xl font-bold">{title}</h3>
          {discount && (
            <motion.span
              className="ml-auto text-red-500 font-bold"
              animate={
                isHovered
                  ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, -3, 0, 3, 0],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              {discount}
            </motion.span>
          )}
        </div>

        <div className="flex items-baseline mb-6">
          <motion.div
            animate={
              isHovered
                ? {
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-5xl font-bold">$</span>
            <GradientText className="text-5xl font-bold">{price}</GradientText>
          </motion.div>
          <span className="text-gray-400 ml-2">{period}</span>
        </div>

        <div className="mb-8">
          <h4 className="text-lg mb-4">Services</h4>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.1 * index }}
              >
                <motion.div
                  className={`mr-2 mt-1 flex-shrink-0 ${iconColor}`}
                  animate={
                    isHovered
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: index * 0.1 }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <StarButton
            onClick={() => {
              if (buttonText === "Get Started" && price === "699") {
                openRazorpayModal(title, price)
              } else {
                const element = document.getElementById(buttonLink.replace("#", ""))
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }
            }}
            className="w-full"
            size={popular ? "lg" : "md"}
          >
            {buttonText}
          </StarButton>
        </motion.div>

        {/* Background gradient effect */}
        {isHovered && (
          <motion.div
            className={`absolute inset-0 -z-10 opacity-20 bg-gradient-to-b ${accentColor}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  )
}

// FAQ Item Component
const FaqItem = ({ question, answer, delay }) => {
  const [isOpen, setIsOpen] = useState(false)
  const faqRef = useRef(null)
  const isInView = useInView(faqRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={faqRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5, delay }}
      className="border border-gray-800 rounded-lg overflow-hidden"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
        whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.7)" }}
      >
        <motion.h3
          className="text-xl font-medium flex items-center"
          animate={
            isOpen
              ? {
                  color: "#7C3AED",
                  textShadow: "0 0 8px rgba(124, 58, 237, 0.5)",
                }
              : {}
          }
        >
          {question}
        </motion.h3>
        <motion.span
          className="transform transition-transform text-primary"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 bg-black/30">
              <p className="text-gray-300">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Testimonial Card Component
const TestimonialCard = ({ name, role, quote, rating, delay }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.5, delay }}
      className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800 relative overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)",
        borderColor: "rgba(124, 58, 237, 0.3)",
      }}
    >
      {/* Blue gradient ball spots on hover */}
      {isHovered && (
        <>
          <motion.div
            className="absolute w-20 h-20 rounded-full bg-blue-500/10 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ top: "10%", right: "10%" }}
          />
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-indigo-500/10 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ bottom: "20%", left: "15%" }}
          />
          <motion.div
            className="absolute w-12 h-12 rounded-full bg-purple-500/10 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ top: "40%", left: "10%" }}
          />
          <motion.div
            className="absolute w-10 h-10 rounded-full bg-cyan-500/10 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ bottom: "10%", right: "20%" }}
          />
        </>
      )}

      {/* Quote mark */}
      <motion.div
        className="absolute -top-2 -left-2 text-6xl text-primary/10 font-serif"
        animate={
          isInView
            ? {
                opacity: [0.1, 0.3, 0.1],
              }
            : {}
        }
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        "
      </motion.div>

      <div className="mb-4">
        <p className="text-gray-300 italic relative z-10">"{quote}"</p>
      </div>

      <div className="flex items-center mt-6">
        <motion.div
          className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3"
          animate={
            isInView
              ? {
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: delay + 0.3 }}
        >
          {name.charAt(0)}
        </motion.div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
        <div className="ml-auto flex">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <motion.span
                key={i}
                className="text-yellow-400"
                animate={
                  isInView
                    ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0, -5, 0],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: delay + 0.1 * i }}
              >
                ★
              </motion.span>
            ))}
        </div>
      </div>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
      />
    </motion.div>
  )
}

