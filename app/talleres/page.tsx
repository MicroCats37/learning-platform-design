"use client"

import { Navbar } from "@/components/navbar"
import { CourseGrid } from "@/components/course-grid"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TalleresPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-bold mb-6 border border-secondary/30">
              <Sparkles className="w-3 h-3" />
              TALLERES 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Catálogo de <span className="text-gradient-primary">Innovación</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explora nuestra oferta completa de talleres de verano diseñados para despertar tu potencial ingenieril con
              proyectos reales y prácticos.
            </p>
            <Button size="lg" className="mt-8 h-14 px-8 font-bold shadow-glow-primary" asChild>
              <Link href="/#registro">Inscribirme ahora</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <CourseGrid />
      </section>

      <Footer />
    </main>
  )
}
