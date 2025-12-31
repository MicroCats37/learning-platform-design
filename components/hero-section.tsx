"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"
import Image from "next/image"

gsap.registerPlugin(TextPlugin)

// Tus imágenes de fondo
const backgroundImages = [
  "/talleres/clases_de_robotica_e_internet_de_las_cosas_kids.jpg",
  "/talleres/clases_de_robotica_e_internet_de_las_cosas_junior.jpg",
  "/talleres/clases_guitarra.jpg",
  "/talleres/clases_de_cajon.jpg",
  "/talleres/clases_de_natacion.jpg",
  "/talleres/clases_de_tai_chi.jpeg",
  "/talleres/clases_de_robotica_avanzada_para_competidores.jpg",
  "/talleres/clases_de_programacion_e_inteligencia_artificial_kids.jpg",
  "/talleres/clases_de_programacion_e_inteligencia_artificial_junior.png",
];

export function HeroSection() {
  // --- ESTADOS Y REFS ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isMobile = useIsMobile()

  // --- HOOKS DE FRAMER MOTION ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end center"],
  })

  // Animación de desplazamiento (Parallax)
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])

  // --- EFECTO 1: ROTACIÓN DE IMÁGENES DE FONDO ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  // --- EFECTO 2: ANIMACIÓN DE TEXTO GSAP ---
  useEffect(() => {
    const words = ["Tecnología", "Robótica", "Creatividad"]
    let currentIndex = 0

    const animateText = () => {
      if (titleRef.current) {
        const span = titleRef.current.querySelector(".animated-word")
        if (span) {
          gsap.to(span, {
            duration: 1,
            text: words[currentIndex],
            ease: "power2.inOut",
            onComplete: () => {
              currentIndex = (currentIndex + 1) % words.length
              setTimeout(animateText, 2000)
            },
          })
        }
      }
    }
    setTimeout(animateText, 1000)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-black"
    >
      {/* ------------------------------------------------------- */}
      {/* CAPA 1: SLIDER DE FONDO (Z-0)                          */}
      {/* ------------------------------------------------------- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.5, scale: 1.15 }} // Opacidad media
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 2.5 },
              scale: { duration: 10, ease: "linear" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={backgroundImages[currentImageIndex]}
              alt="Fondo institucional del CIP"
              fill
              className="object-cover object-center"
              priority
              quality={85}
            />
          </motion.div>
        </AnimatePresence>

        {/* OVERLAY / FILTRO (Dorado -> Rojo -> Vino) */}
        <div
          className="absolute inset-0 z-10 mix-blend-multiply"
          style={{
            background: `linear-gradient(
                to bottom, 
                rgba(250, 204, 21, 0.3) 0%,   
                rgba(220, 38, 38, 0.5) 50%,   
                rgba(76, 5, 25, 0.9) 100%    
                )`
          }}
        />
        {/* Capa extra de oscuridad para legibilidad */}
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* ------------------------------------------------------- */}
      {/* CAPA 2: CONTENIDO PRINCIPAL (Z-20) - CENTRADO          */}
      {/* ------------------------------------------------------- */}
      <motion.div
        style={{ y, opacity }}
        // CAMBIO: Eliminado Grid, ahora es Flex Centrado
        className="container mx-auto px-4 relative z-20 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-8 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Vacaciones Útiles 2026 - Inscripciones Abiertas
          </motion.div>

          {/* TITULO CON GSAP */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter text-white"
          >
            Potencia tu <br />
            <span className="text-secondary italic animated-word inline-block min-w-[300px]">Verano</span>
          </h1>

          {/* DESCRIPCIÓN */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-100 mb-12 max-w-2xl mx-auto leading-relaxed font-medium text-shadow-sm"
          >
            Talleres de verano especializados para jóvenes y niños. Certificados oficiales del Colegio de Ingenieros del
            Perú. ¡Aprende creando!
          </motion.p>

          {/* BOTONES CENTRADOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="h-16 px-10 text-xl font-bold gap-3 bg-primary hover:bg-primary/90 text-white shadow-glow-primary hover-lift rounded-2xl border-none"
              asChild
            >
              <Link href="/registro">
                Inscribirme Ahora <ArrowRight className="w-6 h-6" />
              </Link>
            </Button>
            {/* Si no quieres el botón de video, puedes borrarlo. Lo dejo por si acaso. */}
            {/* <Button
              size="lg"
              variant="outline"
              className="h-16 px-8 text-lg gap-2 border-white/30 text-white hover:bg-white/10 bg-transparent hover-lift rounded-2xl"
            >
              <Play className="w-5 h-5 fill-white text-white" /> Ver Video
            </Button> */}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}