"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

gsap.registerPlugin(TextPlugin)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end center"],
  })

  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])

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
      className="relative min-h-[130vh] md:min-h-[120vh] flex items-center pt-32 pb-56 md:pb-48 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:motion-safe:translate-y-0" // Ensured better mobile behavior
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-6 border border-secondary/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Talleres de Verano 2026 - Inscripciones Abiertas
          </motion.div>

          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter"
          >
            Potencia tu <br />
            <span className="text-primary italic animated-word inline-block min-w-[300px]">Verano</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed font-medium"
          >
            Talleres de verano especializados para jóvenes y niños. Certificados oficiales del Colegio de Ingenieros del
            Perú. ¡Aprende creando!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="h-16 px-10 text-xl font-bold gap-3 bg-primary hover:bg-primary/90 shadow-glow-primary hover-lift rounded-2xl"
              asChild
            >
              <Link href="/#registro">
                Inscribirme Ahora <ArrowRight className="w-6 h-6" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg gap-2 border-primary/20 hover:bg-primary/5 bg-transparent hover-lift"
            >
              <Play className="w-5 h-5 fill-primary text-primary" /> Ver Video
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-[2rem] blur-3xl"
          />

          <div className="relative aspect-[4/5] md:aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden border-4 border-white shadow-glow-primary">
            <img
              src="/placeholder.svg?key=doxu5"
              alt="Estudiantes de robótica"
              className="object-cover w-full h-full"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lifted"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                      className="w-12 h-12 rounded-full border-4 border-white bg-primary/10 overflow-hidden"
                    >
                      <img src={`/diverse-avatars.png?height=40&width=40&query=avatar+${i}`} alt="user" />
                    </motion.div>
                  ))}
                </div>
                <div className="text-sm font-medium">
                  <p className="text-white font-bold">+2,500 Alumnos</p>
                  <p className="text-white/60 text-xs">Inscritos este mes</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
