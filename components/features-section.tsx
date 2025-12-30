"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Sparkles, Rocket, BookOpen, Video } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Aprendizaje Rápido",
    description: "Metodologías probadas que aceleran tu progreso hasta 3x más rápido.",
  },
  {
    icon: Shield,
    title: "Certificación Oficial",
    description: "Certificados avalados por el Colegio de Ingenieros del Perú.",
  },
  {
    icon: Video,
    title: "Clases en Vivo",
    description: "Interactúa en tiempo real con instructores expertos de la industria.",
  },
  {
    icon: BookOpen,
    title: "Material Premium",
    description: "Accede a recursos exclusivos, plantillas y proyectos reales.",
  },
  {
    icon: Sparkles,
    title: "Comunidad Activa",
    description: "Conéctate con miles de ingenieros que comparten tus mismos objetivos.",
  },
  {
    icon: Rocket,
    title: "Proyectos Reales",
    description: "Construye un portafolio sólido con casos de estudio del mundo real.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">¿Por qué elegirnos?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ofrecemos la mejor experiencia de aprendizaje diseñada específicamente para ingenieros ambiciosos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Card className="h-full border-none shadow-lifted hover:shadow-card-hover hover-lift group bg-card">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
