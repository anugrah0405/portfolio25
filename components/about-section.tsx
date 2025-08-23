"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

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

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-secondary/30 py-20">
      {/* Background animated lines */}
      <div className="absolute inset-0 z-0 opacity-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] w-full bg-neon"
            style={{
              top: `${i * 10}%`,
              left: 0,
              transform: `translateY(${Math.sin(i) * 20}px)`,
              opacity: 0.5 - i * 0.03,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-12 md:grid-cols-2 md:gap-16"
        >
          <motion.div variants={itemVariants} className="flex justify-center md:justify-end">
            <div className="relative h-80 w-80 overflow-hidden rounded-2xl border-4 border-neon/20 sm:h-96 sm:w-96">
              <Image src="https://images.squarespace-cdn.com/content/v1/64c911ae7388967e1679a000/4588e0ef-db34-4a80-895a-1fb0eb2e8e77/8e8e8bf3-9f3c-4b5b-9045-5ebb945e8aea.png" alt="Profile" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-neon/20 to-transparent opacity-60" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-neon">About Me</h2>
            <h3 className="mb-6 text-3xl font-bold sm:text-4xl">Software Developer & Enthusiast</h3>

            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a passionate developer with expertise in creating modern, interactive web experiences that combine
                aesthetic design with technical excellence.
              </p>
              <p>
                My approach blends creativity with problem-solving, resulting in digital solutions that are both
                beautiful and functional.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="group rounded-lg bg-background/50 p-4 transition-all duration-300 hover:bg-background/80 hover:shadow-md">
                <h4 className="font-orbitron text-lg font-semibold group-hover:text-neon">Frontend</h4>
                <p className="text-sm text-muted-foreground">React, Next.js, Typescript Tailwind CSS, Redux</p>
              </div>
              <div className="group rounded-lg bg-background/50 p-4 transition-all duration-300 hover:bg-background/80 hover:shadow-md">
                <h4 className="font-orbitron text-lg font-semibold group-hover:text-neon">Backend</h4>
                <p className="text-sm text-muted-foreground">Java, Springboot, Node.js, Express.js</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
