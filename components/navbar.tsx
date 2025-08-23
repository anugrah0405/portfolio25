"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a
          href="#home"
          className="font-audiowide text-xl tracking-wider transition-all duration-300 hover:text-neon"
          onClick={(e) => {
            e.preventDefault()
            const target = document.querySelector("#home")
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          }}
        >
          PORTFOLIO
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-orbitron text-sm tracking-wide transition-all duration-300 hover:scale-110 hover:text-neon"
              onClick={(e) => {
                e.preventDefault()
                const target = document.querySelector(link.href)
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              }}
            >
              {link.name}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="ml-2 p-2" aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-background/95 backdrop-blur-md md:hidden"
        >
          <div className="container mx-auto flex flex-col space-y-4 px-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-orbitron text-sm tracking-wide transition-all duration-300 hover:text-neon"
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.querySelector(link.href)
                  if (target) {
                    setMobileMenuOpen(false)
                    target.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
