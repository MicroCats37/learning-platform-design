"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Laura Castillo",
    initials: "LC",
    role: "Mamá de Sofía (8 años)",
    image: "",
    rating: 5,
    text: "¡Sofía llega emocionada cada vez que sale del taller! Ha perdido el miedo a participar y ha hecho nuevos amigos.",
    // Gradiente sutil usando tu Rojo CIP y Dorado
    gradient: "from-[oklch(0.51_0.23_25/0.05)] to-[oklch(0.82_0.18_85/0.1)]",
    avatarColor: "bg-primary",
  },
  {
    name: "Miguel Ángel",
    initials: "MA",
    role: "Papá de Lucas (12 años)",
    image: "",
    rating: 5,
    text: "Buscábamos algo que no fuera aburrido y lo encontramos. La robótica explicada para niños es genial.",
    gradient: "from-[oklch(0.82_0.18_85/0.1)] to-[oklch(0.51_0.23_25/0.05)]",
    avatarColor: "bg-secondary",
  },
  {
    name: "Diana Torres",
    initials: "DT",
    role: "Mamá de Gabriel (Kids)",
    image: "",
    rating: 5,
    text: "Me encanta la paciencia de los instructores. No es solo aprender, es cómo los motivan a ser creativos.",
    gradient: "from-[oklch(0.51_0.23_25/0.08)] to-[oklch(0.82_0.18_85/0.05)]",
    avatarColor: "bg-primary",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decoración de fondo difuminada con tu Dorado Vivo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">
            Voces de nuestra <span className="text-gradient-primary">Comunidad</span>
          </h2>
          <p className="subheading-institutional max-w-2xl mx-auto">
            Lo que los padres y alumnos comparten sobre su experiencia con nosotros.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Card con el gradiente difuminado que pediste */}
              <Card className={`h-full border-border bg-gradient-to-br ${testimonial.gradient} rounded-3xl shadow-lifted hover:shadow-card-hover transition-all duration-300`}>
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback className={`${testimonial.avatarColor} text-white font-bold`}>
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm leading-none mb-1">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <Star className="w-4 h-4 text-gradient-gold fill-current" />
                    </div>
                  </div>

                  {/* Burbuja de mensaje con fondo semi-transparente */}
                  <div className="relative bg-card/60 backdrop-blur-sm p-4 rounded-2xl rounded-tl-none italic border border-white/20">
                    <MessageCircle className="w-4 h-4 absolute -left-2 -top-2 text-primary opacity-30" />
                    <p className="text-sm leading-relaxed text-foreground">
                      "{testimonial.text}"
                    </p>
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