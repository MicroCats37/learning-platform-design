"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image" // Importamos Image para optimización
import { ExpandableGallery } from "@/components/expandible-gallery"

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Navbar />
      <HeroSection />

      {/* SECCIÓN 1: TALLERES (Fondo con degradado sutil hacia dorado) */}
      <section className="py-12 md:py-24  relative overflow-hidden bg-gradient-to-b from-background via-white to-secondary/15">
        {/* Decoración de fondo (Blob sutil) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none opacity-40">
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 mb-16 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              Vacaciones Útiles <span className="text-gradient-gold drop-shadow-sm">2026</span>
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Explora nuestra selección de talleres para potenciar la creatividad y el talento único.
            </p>
          </motion.div>
        </div>

        {/* Carrusel con z-index para estar sobre los blobs */}
        <div className="relative z-10">
          <ExpandableGallery />
        </div>
      </section>

      {/* SECCIÓN 2: REGISTRO (Fondo cálido institucional para romper el blanco) */}
      <section className="py-12 md:py-24  bg-secondary/5 relative overflow-hidden">
        {/* Decoración lateral */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Columna de Pasos */}
            <div className="flex-1 space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                  ¿Cómo <span className="text-gradient-primary">Inscribirse?</span>
                </h2>
                <p className="text-lg text-muted-foreground">Sigue estos tres simples pasos para asegurar tu vacante.</p>
              </motion.div>

              <div className="space-y-10">
                {[
                  {
                    step: "01",
                    title: "Elige tu taller",
                    desc: "Explora nuestro catálogo de talleres de verano y encuentra el perfecto para ti.",
                  },
                  {
                    step: "02",
                    title: "Completa el registro",
                    desc: "Llena tus datos en nuestro formulario simplificado y 100% seguro.",
                  },
                  {
                    step: "03",
                    title: "¡Inscripción y Cupo!",
                    desc: "En breve nos pondremos en contacto con usted para confirmar su cupo y completar el proceso de inscripción.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-6 items-start group"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    viewport={{ once: true }}
                  >
                    {/* Número con estilo outline y color primario */}
                    <div className="relative">
                      <span className="text-6xl font-black text-transparent stroke-text-primary/20 select-none absolute -top-4 -left-2 opacity-20 scale-125">
                        {item.step}
                      </span>
                      <span className="text-5xl font-black text-primary relative z-10 drop-shadow-md">
                        {item.step}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Columna de Imagen */}
            <div className="flex-1 relative w-full max-w-xl lg:max-w-none">
              {/* Efecto de brillo detrás de la imagen */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-secondary to-primary opacity-20 blur-2xl rounded-full" />

              <motion.div
                className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                {/* Reemplazado img por Image para optimización */}
                {/* Asegúrate de tener una imagen válida en public/student-registering-online.jpg, si no, cambia la ruta */}
                <Image
                  src="/images/hero.jpeg" // He puesto la imagen del hero temporalmente, cámbiala por la tuya si tienes otra
                  alt="Estudiante registrándose"
                  fill
                  className="object-cover"
                />

                {/* Overlay sutil para unificar tono */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}