"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Sparkles, Rocket, BookOpen, Video } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Aprendizaje Efectivo",
    description: "Metodologías pedagógicas probadas que aceleran el desarrollo de competencias técnicas profesionales.",
  },
  {
    icon: Shield,
    title: "Certificación Oficial",
    description:
      "Certificados con respaldo institucional del Colegio de Ingenieros del Perú, reconocidos a nivel nacional.",
  },
  {
    icon: Video,
    title: "Clases Presenciales",
    description: "Formación práctica con instructores calificados en instalaciones equipadas con tecnología moderna.",
  },
  {
    icon: BookOpen,
    title: "Material Especializado",
    description: "Acceso a recursos didácticos actualizados, manuales técnicos y documentación profesional.",
  },
  {
    icon: Sparkles,
    title: "Red Profesional",
    description: "Integración a una comunidad de ingenieros y técnicos que comparten experiencias y conocimientos.",
  },
  {
    icon: Rocket,
    title: "Proyectos Aplicados",
    description: "Desarrollo de casos prácticos basados en necesidades reales de la industria peruana.",
  },
]

export function FeaturesSection() {
  return (
    <section className="section-institutional bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="heading-institutional mb-6">
            ¿Por qué elegir <span className="text-primary">CIP</span>?
          </h2>
          <p className="subheading-institutional">
            Ofrecemos excelencia académica respaldada por décadas de experiencia formando a los mejores profesionales de
            la ingeniería en el Perú.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Card className="card-institutional h-full group">
                <CardContent className="p-6 lg:p-8">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
