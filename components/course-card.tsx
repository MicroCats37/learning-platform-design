"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// Agregamos Calendar y Timer a los imports
import { Clock, User, Star, Calendar, Timer } from "lucide-react"
import { RegistrationModal } from "./registration-modal"

interface Taller {
  slug: string
  id: number
  titulo: string
  descripcion: string
  precio: number
  precioHabilitado?: number
  duracion: string
  instructor: string
  imagen?: string
  categoria: string
  nivel: string
  cupos: number
  horario: string
  dias?: string
  modalidad?: string
  lugar?: string
}

interface CourseCardProps {
  taller: Taller
  idx?: number
}

export function CourseCard({ taller, idx = 0 }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card className="group overflow-hidden border-none shadow-lifted hover:shadow-card-hover hover-lift transition-all duration-500 bg-card relative">
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          <img
            src={taller.imagen || `/placeholder.svg?height=400&width=600&query=${taller.titulo}`}
            alt={taller.titulo}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />

          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <Badge className="bg-secondary text-secondary-foreground border-none font-black shadow-glow-secondary px-3 py-1">
              {taller.categoria}
            </Badge>
          </div>

          <div className="absolute top-4 right-4 z-20">
            <div className="bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-md">
              <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
              <span className="text-xs font-black">4.9</span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 z-20">
            <Badge variant="outline" className="bg-primary/90 text-white border-none font-bold text-[10px] px-2">
              {taller.modalidad || "Presencial"}
            </Badge>
          </div>
        </div>

        <CardHeader className="space-y-2 pb-2">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase bg-primary/5 px-2 py-0.5 rounded">
              {taller.nivel}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-black leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
            {taller.titulo}
          </h3>
        </CardHeader>

        <CardContent className="space-y-4 pb-6">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed h-[2.5rem]">{taller.descripcion}</p>

          <div className="flex items-end gap-3 py-1">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">General</span>
              <div className="text-xl font-black text-foreground">
                {taller.precio !== 0 && <span className="text-xs mr-0.5">S/</span>}
                {taller.slug === "clases-de-guitarra" || taller.slug === "clases-de-cajon"
                  ? `${taller.precio} al mes`
                  : (taller.precio === 0 ? "Gratis" : taller.precio)}
              </div>
            </div>
            
            {taller.precioHabilitado && (
              <div className="flex flex-col border-l pl-3 border-border">
                <span className="text-[10px] font-bold text-primary uppercase leading-none mb-1">
                  Habilitado
                </span>
                <div className="text-xl font-black text-primary">
                  {taller.precioHabilitado !== 0 && <span className="text-xs mr-0.5">S/</span>}
                  {taller.slug === "clases-de-guitarra" ||
                    taller.slug === "clases-de-cajon"
                    ? `${taller.precioHabilitado} al mes`
                    : (taller.precioHabilitado === 0 ? "Gratis" : taller.precioHabilitado)}
                </div>
              </div>
            )}
          </div>

          {/* --- AQUÍ ESTÁ LA NUEVA GRID ACTUALIZADA --- */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-muted-foreground">
            
            {/* 1. Días (Nuevo) */}
            {taller.dias && (
               <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-xl border border-border/50">
                 <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                 <span className="truncate">{taller.dias}</span>
               </div>
            )}

            {/* 2. Horario (Nuevo) */}
            <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-xl border border-border/50">
              <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{taller.horario}</span>
            </div>

            {/* 3. Duración (Actualizado a icono Timer para no repetir Clock) */}
            <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-xl border border-border/50">
              <Timer className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{taller.duracion}</span>
            </div>

            {/* 4. Instructor */}
            <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-xl border border-border/50">
              <User className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="truncate">{taller.instructor}</span>
            </div>

          </div>
        </CardContent>

        <CardFooter className="pt-0 pb-6">
          {
            taller.slug==="clases-de-natacion"? (
              <Button className='w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-black shadow-glow-primary group/btn rounded-xl opacity-50'>
                No Disponible
              </Button>
            ):(
              <Button
                className={`cursor-pointer w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-black shadow-glow-primary group/btn rounded-xl`}
                asChild
              >
                <RegistrationModal
                  slug={taller.slug}
                  tallerName={taller.titulo}
                />
              </Button>
            )
          }
        </CardFooter>
      </Card>
    </motion.div>
  )
}