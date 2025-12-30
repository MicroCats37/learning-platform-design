"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { CourseCard } from "./course-card"
import data from "@/lib/data.json"

export function FeaturedCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Filtramos los talleres que queremos destacar
  const featuredTalleres = data.talleres.filter((t) => [3, 5, 7, 1].includes(t.id))

  return (
    <div className="relative overflow-hidden py-12">
      <div className="marquee-container overflow-hidden">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {/* Duplicamos los elementos para el efecto infinito */}
          {[...featuredTalleres, ...featuredTalleres].map((taller, idx) => (
            <div key={`${taller.id}-${idx}`} className="w-[350px] md:w-[400px] shrink-0">
              <CourseCard taller={taller} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
