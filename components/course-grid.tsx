"use client"
import data from "@/lib/data.json"
import { CourseCard } from "@/components/course-card"

interface CourseGridProps {
  limit?: number
}

export function CourseGrid({ limit }: CourseGridProps) {
  const talleres = limit ? data.talleres.slice(0, limit) : data.talleres

  return (
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {talleres.map((taller, idx) => (
          <CourseCard key={taller.id} taller={taller} idx={idx} />
        ))}
      </div>
    </div>
  )
}
