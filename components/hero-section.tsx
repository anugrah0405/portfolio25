"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Generate random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Animated background particles */}
      <div className="particles-bg">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.left,
              top: particle.top,
              backgroundColor: `hsl(var(--neon) / 0.1)`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-audiowide text-lg tracking-widest text-muted-foreground sm:text-xl">Hello, I am a</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1
            className={`mt-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl ${isLoaded ? "neon-text" : ""}`}
          >
            Software Developer & Enthusiast
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            Crafting digital experiences that blend creativity
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10"
        >
          <a
            href="#projects"
            className="gradient-btn inline-block rounded-full px-8 py-3 font-audiowide text-sm text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            EXPLORE MY WORK
          </a>
        </motion.div>
      </div>
    </section>
  )
}
