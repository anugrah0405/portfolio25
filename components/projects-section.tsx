"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ListTodo, MessageSquareMore, ShoppingCart, Clapperboard, CloudSun, Library, ClipboardPlus, Gamepad2 } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Task Tracker Pro",
    description: "A modern, feature-rich task management application with robust user authentication and database persistence.",
    icon: <ListTodo className="h-8 w-8" />,
    color: "from-red-500/20 to-fuchsia-500/20",
    link: "https://tasktrackerpro.onrender.com",
  },
  {
    id: 2,
    title: "BASTAR DHOKRA ART",
    description: "A responsive e-commerce website showcasing traditional Bastar Dhokra Art products with modern web technologies",
    icon: <ShoppingCart className="h-8 w-8" />,
    color: "from-green-500/20 to-lime-500/20",
    link: "https://bastar-dhokra-art-main.vercel.app/",
  },
  {
    id: 3,
    title: "REAL TIME CHAT APP",
    description: "A real-time chat application built with React for the frontend and Node.js with Express and Socket.IO for the backend.",
    icon: <MessageSquareMore className="h-8 w-8" />,
    color: "from-purple-500/20 to-pink-500/20",
    link: "https://github.com/anugrah0405/real-time-chat-app",
  },
  {
    id: 4,
    title: "IMDB REPLICA",
    description: "A simple React app that fetches movie data from the O-MDb API. Users can search for movies, view details like ratings, release year, and box office collections, and save favorites.",
    icon: <Clapperboard className="h-8 w-8" />,
    color: "from-blue-500/20 to-cyan-500/20",
    link: "https://imdb-replica.vercel.app/",
  },
  {
    id: 5,
    title: "WEATHER APP",
    description: "A responsive React-based weather application that provides current weather conditions and a 5-day forecast for any city, utilizing the OpenWeatherMap API.",
    icon: <CloudSun className="h-8 w-8" />,
    color: "from-green-500/20 to-emerald-500/20",
    link: "https://weather-app-pi-rouge-50.vercel.app/",
  },
  {
    id: 6,
    title: "LIBRARY MANAGEMENT SYSTEM",
    description: "A Library Management System Project using Spring Boot, Spring Data JPA (Hibernate), and MySQL database.",
    icon: <Library className="h-8 w-8" />,
    color: "from-orange-500/20 to-amber-500/20",
    link: "https://example.com/library",
  },
  {
    id: 7,
    title: "KNEE ARTHRITIS WEBSITE",
    description: "A Python-based system design project for detecting and quantifying knee osteoarthritis and its severity.",
    icon: <ClipboardPlus className="h-8 w-8" />,
    color: "from-indigo-500/20 to-violet-500/20",
    link: "https://example.com/space",
  },
  {
    id: 8,
    title: "SNAKE GAME",
    description: "A sleek, fast-paced Snake game with responsive controls and real-time score tracking!",
    icon: <Gamepad2 className="h-8 w-8" />,
    color: "from-red-500/20 to-rose-500/20",
    link: "https://example.com/dashboard",
  },
]

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleDots, setVisibleDots] = useState(projects.length)
  const sectionRef = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Calculate the number of dots based on screen size
  useEffect(() => {
    const calculateVisibleDots = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          // Desktop: one-third of projects
          setVisibleDots(Math.ceil(projects.length / 3))
        } else if (window.innerWidth >= 640) {
          // Tablet: half the projects
          setVisibleDots(Math.ceil(projects.length / 2))
        } else {
          // Mobile: all projects
          setVisibleDots(projects.length)
        }
      }
    }

    calculateVisibleDots()
    window.addEventListener("resize", calculateVisibleDots)

    return () => {
      window.removeEventListener("resize", calculateVisibleDots)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  //for dot indicators
  const scrollToIndex = (index: number) => {
    setActiveIndex(index)
    if (scrollRef.current) {
      const container = scrollRef.current
      const items = container.querySelectorAll(".project-card")
      if (items[index]) {
        const itemWidth = (items[0] as HTMLElement).offsetWidth
        const scrollPosition = index * itemWidth
        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        })
      }
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const scrollPosition = container.scrollLeft
      const item = container.querySelector(".project-card") as HTMLElement | null
      const itemWidth = item?.offsetWidth || 0

      if (itemWidth > 0) {
        const newIndex = Math.round(scrollPosition / itemWidth)
        if (newIndex !== activeIndex && newIndex < visibleDots) {
          setActiveIndex(newIndex)
        }
      }
    }
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-neon">My Projects</h2>
          <h3 className="text-3xl font-bold sm:text-4xl">Recent Work</h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-6xl"
        >
          <div className="relative overflow-hidden">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide py-4"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="project-card w-full flex-shrink-0 snap-center px-4 sm:w-1/2 lg:w-1/3"
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <div
                      className={`group h-full rounded-xl bg-gradient-to-br ${project.color} p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]`}
                    >
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background/50 text-neon transition-all duration-300 group-hover:bg-background/80">
                        {project.icon}
                      </div>
                      <h4 className="mb-2 font-orbitron text-xl font-semibold transition-all duration-300 group-hover:text-neon">
                        {project.title}
                      </h4>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
