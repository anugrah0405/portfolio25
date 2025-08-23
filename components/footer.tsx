"use client"

import { motion } from "framer-motion"
import { Phone, Mail, Github, Linkedin, FileText } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: <Phone className="h-5 w-5" />, href: "tel:+917415778504", label: "Phone" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:anugrahnand@gmail.com", label: "Email" },
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/anugrah0405", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/anugrah-nand-3b672a1a9/", label: "LinkedIn" },
    { icon: <FileText className="h-5 w-5" />, href: "https://drive.google.com/file/d/1Qz1HxOyIszJGqwlt1-NMlC8lCXGTYFxx/view?usp=drive_link", label: "Resume" },
  ]

  return (
    <footer className="border-t bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center">
            <p className="font-audiowide text-lg">PORTFOLIO</p>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} All rights reserved</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors duration-300 hover:bg-neon/20 hover:text-foreground"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
