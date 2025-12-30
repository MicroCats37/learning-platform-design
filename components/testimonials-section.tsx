"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "Ingeniero Civil",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Los talleres del CIP transformaron mi carrera. Aprendí técnicas que aplico diariamente en mis proyectos.",
  },
  {
    name: "Ana Paredes",
    role: "Ingeniera de Sistemas",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Instructores de primer nivel y contenido actualizado. La mejor inversión en mi desarrollo profesional.",
  },
  {
    name: "Roberto Silva",
    role: "Ingeniero Mecánico",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Increíble la calidad de los proyectos prácticos. Construí un portafolio que me ayudó a conseguir mi trabajo ideal.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Lo que dicen nuestros <span className="text-gradient-primary">Alumnos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Miles de ingenieros han transformado sus carreras con nuestros talleres especializados.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <Card className="h-full border-none shadow-lifted hover:shadow-card-hover hover-lift group relative overflow-hidden">
                <div className="absolute top-0 right-0 text-secondary/10 transform translate-x-4 -translate-y-2">
                  <Quote className="w-32 h-32" />
                </div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
