"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import emailjs from "@emailjs/browser"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const formRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      // Shake the form on error
      const form = e.target
      form.classList.add("animate-shake")
      setTimeout(() => form.classList.remove("animate-shake"), 500)
      return
    }

    setIsSubmitting(true)

    // EmailJS configuration
    // Replace these with your actual EmailJS service ID, template ID, and public key
    const serviceId = "service_tmul993"
    const templateId = "template_1yozacs"
    const publicKey = "NuPocIxpvdbtdHdRX"

    try {
      const result = await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)

      console.log("Email sent successfully:", result.text)
      setIsSuccess(true)
      setFormState({ name: "", email: "", message: "" })

      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error sending email:", error)
      setErrors({ submit: "Failed to send message. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="bg-secondary/30 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-neon">Get In Touch</h2>
            <h3 className="text-3xl font-bold sm:text-4xl">Contact Me</h3>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </motion.div>

          <motion.form
            ref={formRef}
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl bg-background/50 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="font-orbitron text-sm">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={`border-muted-foreground/20 bg-background/50 transition-all duration-300 focus:border-neon focus:ring-1 focus:ring-neon ${
                  errors.name ? "border-red-500 animate-shake" : ""
                }`}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="font-orbitron text-sm">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                className={`border-muted-foreground/20 bg-background/50 transition-all duration-300 focus:border-neon focus:ring-1 focus:ring-neon ${
                  errors.email ? "border-red-500 animate-shake" : ""
                }`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="font-orbitron text-sm">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={5}
                className={`border-muted-foreground/20 bg-background/50 transition-all duration-300 focus:border-neon focus:ring-1 focus:ring-neon ${
                  errors.message ? "border-red-500 animate-shake" : ""
                }`}
              />
              {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-neon font-audiowide text-white hover:bg-neon/80"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {errors.submit && <p className="text-center text-sm text-red-500">{errors.submit}</p>}

            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-md bg-green-500/10 p-3 text-center text-sm text-green-500"
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
