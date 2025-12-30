"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-10" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border-gradient p-[2px]">
            <div className="bg-card rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 gradient-secondary opacity-20 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 gradient-primary opacity-20 blur-3xl rounded-full" />

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground font-medium mb-6"
                >
                  <Sparkles className="w-4 h-4 text-secondary" />
                  Talleres de Verano 2026
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-4xl md:text-6xl font-bold mb-6 text-balance"
                >
                  Transforma tu <span className="text-gradient-primary">Verano</span> en Aprendizaje
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                  Inscríbete hoy y obtén 20% de descuento en tu primer taller. Comienza a construir el futuro que
                  mereces.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex flex-wrap gap-4 justify-center"
                >
                  <Button size="lg" className="h-14 px-8 text-lg shadow-glow-primary" asChild>
                    <Link href="/talleres">
                      Ver Todos los Talleres <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 bg-transparent" asChild>
                    <Link href="/#registro">Inscribirme Ahora</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
