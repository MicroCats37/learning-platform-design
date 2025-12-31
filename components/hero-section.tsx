"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

// <CHANGE> Updated placeholder images with descriptive queries for institutional context
const backgroundImages = [
  "/placeholder.svg?key=a6stv",
  "/placeholder.svg?key=7aybj",
  "/placeholder.svg?key=gty8k",
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // <CHANGE> Increased interval for more professional pacing
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center">
      {/* <CHANGE> Background Image Slider with Ken Burns Effect - gradient overlay for institutional look */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 2.5 },
              scale: { duration: 10, ease: "linear" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
            />
          </motion.div>
        </AnimatePresence>
        {/* <CHANGE> Gradient overlay for better text readability and institutional feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-10" />
      </div>

      {/* <CHANGE> Fixed Centered Content with institutional messaging */}
      <div className="container relative z-20 px-4 text-center text-white max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div className="inline-block px-6 py-2 mb-8 rounded-full bg-secondary/20 border border-secondary/40 backdrop-blur-sm">
            <span className="text-secondary font-bold tracking-wider text-sm uppercase">
              Talleres de Verano 2026 - Inscripciones Abiertas
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.15] mb-6 tracking-tight">
            Colegio de Ingenieros del Perú
            <br />
            <span className="text-secondary">Programa de Capacitación Técnica</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Formación profesional especializada certificada por el Colegio de Ingenieros del Perú. Desarrolla tus
            competencias técnicas con los mejores instructores del sector.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="h-14 px-10 text-base font-bold gap-3 bg-primary hover:bg-primary/90 text-white rounded-md transition-all shadow-glow-primary"
              asChild
            >
              <Link href="/registro">
                Inscribirme Ahora <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base font-bold border-white/30 hover:bg-white/10 text-white bg-white/5 backdrop-blur-sm rounded-md transition-all"
              asChild
            >
              <Link href="/talleres">Ver Talleres</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
