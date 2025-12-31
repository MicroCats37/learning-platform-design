"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Cpu, Music, Activity, Wifi, Brain, Box } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Lista filtrada (TODOS menos Tai Chi)
const workshops = [
  {
    id: 1,
    title: "Inteligencia Artificial",
    category: "Tecnología",
    image: "/back/t-ia.jpeg",
    description: "Domina el futuro aprendiendo algoritmos y machine learning.",
    icon: <Brain className="w-6 h-6" />,
    color: "from-violet-500/80 to-purple-600/80"
  },
  {
    id: 2,
    title: "Internet de las Cosas",
    category: "Innovación",
    image: "/back/t-iot.jpeg",
    description: "Conecta dispositivos y crea hogares inteligentes.",
    icon: <Wifi className="w-6 h-6" />,
    color: "from-emerald-500/80 to-green-600/80"
  },
  // <NOTA> Tai Chi excluido según indicación
  {
    id: 3,
    title: "Guitarra",
    category: "Música",
    image: "/back/t-guitarra.jpeg",
    description: "Acordes, ritmo y melodía para despertar tu talento.",
    icon: <Music className="w-6 h-6" />,
    color: "from-amber-500/80 to-orange-600/80"
  },
  {
    id: 4,
    title: "Cajón Peruano",
    category: "Música",
    image: "/back/t-cajon.jpeg",
    description: "Siente el ritmo de nuestras raíces peruanas.",
    icon: <Box className="w-6 h-6" />,
    color: "from-red-500/80 to-rose-600/80"
  },
  {
    id: 5,
    title: "Robótica Kids",
    category: "Tecnología",
    image: "/back/t-robot.jpeg",
    description: "Construye y programa tus primeros robots.",
    icon: <Cpu className="w-6 h-6" />,
    color: "from-blue-500/80 to-indigo-600/80"
  },
  {
    id: 6,
    title: "Natación",
    category: "Deporte",
    image: "/back/t-piscina.jpeg",
    description: "Salud y diversión en el agua este verano.",
    icon: <Activity className="w-6 h-6" />,
    color: "from-cyan-500/80 to-blue-600/80"
  },
]

export function ExpandableGallery() {
  const [activeId, setActiveId] = useState<number | null>(1) // El primero (IA) empieza activo

  return (
    <div className="p-4 w-full md:w-3/4 mx-auto h-[600px] flex flex-col md:flex-row gap-3">
      {workshops.map((item) => (
        <motion.div
          key={item.id}
          layout
          onClick={() => setActiveId(item.id)}
          onHoverStart={() => setActiveId(item.id)}
          className={cn(
            "relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border-2 border-transparent",
            // Ajustamos el tamaño flexible para que quepan 6 elementos
            activeId === item.id 
                ? "flex-[3] md:flex-[5] border-secondary/50 shadow-glow-secondary" 
                : "flex-[0.5] md:flex-[1] hover:flex-[1.5] grayscale-[0.3] hover:grayscale-0"
          )}
        >
          {/* IMAGEN DE FONDO */}
          <div className="absolute inset-0 w-full h-full">
             <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center"
                // Prioridad solo a las primeras imagenes para mejorar carga
                priority={item.id <= 2} 
            />
          </div>

          {/* OVERLAY GRADIENTE */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent transition-opacity duration-300",
            activeId === item.id ? "opacity-100" : "opacity-70"
          )} />

          {/* CONTENIDO */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 overflow-hidden">
            
            {/* ESTADO CERRADO (Vertical) */}
            {activeId !== item.id && (
              <div className="absolute inset-0 flex items-center justify-center md:items-end md:justify-center md:pb-8">
                 <h3 className="hidden md:block text-lg font-bold text-white/90 transform -rotate-90 whitespace-nowrap tracking-widest uppercase opacity-90">
                  {item.category}
                </h3>
                {/* Móvil: Icono */}
                <div className="md:hidden p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
                    {item.icon}
                </div>
              </div>
            )}

            {/* ESTADO ABIERTO */}
            <AnimatePresence mode="popLayout">
            {activeId === item.id && (
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }} // Salida suave al cambiar
                transition={{ duration: 0.3 }}
                className="space-y-3"
                >
                <div className="flex items-center gap-3 mb-2">
                    <div className={cn("p-2 rounded-lg bg-gradient-to-br text-white shadow-lg", item.color)}>
                        {item.icon}
                    </div>
                    <span className="text-secondary font-bold tracking-wider text-xs md:text-sm uppercase px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                    {item.category}
                    </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-black text-white leading-tight">
                    {item.title}
                </h3>
                
                <p className="text-gray-300 text-sm md:text-lg max-w-lg line-clamp-2 md:line-clamp-none">
                    {item.description}
                </p>

                <div className="pt-2">
                    <Link href="/talleres" className="inline-flex items-center gap-2 text-white font-bold group/btn text-sm md:text-base">
                        <span className="border-b-2 border-secondary pb-0.5 group-hover/btn:text-secondary transition-colors">
                            Ver Detalles
                        </span>
                        <div className="bg-white text-black rounded-full p-1 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">
                            <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                    </Link>
                </div>
                </motion.div>
            )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  )
}