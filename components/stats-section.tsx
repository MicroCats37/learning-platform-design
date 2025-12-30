"use client"

import { motion } from "framer-motion"
import { Award, Users, GraduationCap, Trophy } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "12,000+",
    label: "Alumnos Activos",
    color: "text-primary",
  },
  {
    icon: GraduationCap,
    value: "120+",
    label: "Talleres Disponibles",
    color: "text-secondary",
  },
  {
    icon: Award,
    value: "98%",
    label: "Tasa de Satisfacción",
    color: "text-primary",
  },
  {
    icon: Trophy,
    value: "50+",
    label: "Instructores Expertos",
    color: "text-secondary",
  },
]

export function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Números que <span className="text-gradient-primary">Inspiran</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Somos la comunidad de ingenieros más grande del Perú, comprometidos con tu crecimiento profesional.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-2xl p-8 text-center hover-lift shadow-lifted hover:shadow-card-hover transition-all duration-300">
                <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
                <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                <h3 className="text-4xl font-bold mb-2 text-gradient-primary">{stat.value}</h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
