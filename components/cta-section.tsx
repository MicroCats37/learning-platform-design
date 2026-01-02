"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, GraduationCap } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden bg-background">
      {/* Blobs de fondo usando tus variables OKLCH */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[oklch(0.51_0.23_25/0.08)] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[oklch(0.82_0.18_85/0.1)] rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Card con tus colores principales en el gradiente */}
          <div className="relative rounded-[2.5rem] overflow-hidden border border-border shadow-2xl">
            
            {/* Gradiente Animado con Rojo CIP y Dorado Vivo */}
            <motion.div 
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "linear-gradient(45deg, oklch(0.51 0.23 25) 0%, oklch(0.82 0.18 85) 100%)",
                  "linear-gradient(45deg, oklch(0.82 0.18 85) 0%, oklch(0.51 0.23 25) 100%)",
                  "linear-gradient(45deg, oklch(0.51 0.23 25) 0%, oklch(0.82 0.18 85) 100%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />

            {/* Overlay de la Card (Usa el color de tu variable --card) */}
            <div className="absolute inset-0 bg-card/90 backdrop-blur-md" />

            <div className="relative z-10 p-10 md:p-20 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-8 border border-primary/20"
              >
                <Sparkles className="w-4 h-4" />
                Inscripciones Abiertas - Verano 2026
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-foreground leading-[1.1]"
              >
                Lleva tu aprendizaje al <br />
                <span className="text-gradient-primary">siguiente nivel</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium"
              >
                Talleres diseñados para despertar la curiosidad y desarrollar habilidades reales. 
                Únete a la nueva generación de talentos del CIP.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                {/* Botón con sombra de tu color primario */}
                <Button 
                  size="lg" 
                  className="h-16 px-10 text-lg font-bold rounded-2xl shadow-glow-primary hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link href="/talleres">
                    Explorar Cursos <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-16 px-10 text-lg font-bold rounded-2xl border-2 border-primary/20 bg-background/50 backdrop-blur-md hover:bg-background transition-all"
                  asChild
                >
                  <Link href="/#registro">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Registrarme ahora
                  </Link>
                </Button>
              </motion.div>

              {/* Tag de descuento con el dorado vivo de tu CSS */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex items-center justify-center gap-2 text-sm font-bold text-[oklch(0.82_0.18_85)]"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                ¡20% de descuento para hijos de colegiados habilitados!
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}