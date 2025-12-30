"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { RegistrationSection } from "@/components/registration-section"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />

      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 mb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              Talleres Destacados de <span className="text-gradient-gold">Verano</span>
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
              Explora nuestra selección premium de cursos diseñados para potenciar la creatividad y el talento técnico.
            </p>
          </motion.div>
        </div>
        <FeaturedCarousel />
      </section>

      <FeaturesSection />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">¿Cómo inscribirse?</h2>
              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Elige tu taller",
                    desc: "Explora nuestro catálogo de talleres de verano y encuentra el perfecto para ti.",
                  },
                  {
                    step: "02",
                    title: "Completa el registro",
                    desc: "Llena tus datos en nuestro formulario simplificado y seguro.",
                  },
                  {
                    step: "03",
                    title: "Recibe confirmación",
                    desc: "Recibirás un correo con toda la información para iniciar tu taller.",
                  },
                  {
                    step: "04",
                    title: "¡Empieza a crear!",
                    desc: "Asiste a tu primera clase y comienza tu aventura de aprendizaje.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-6 items-start"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-5xl font-black text-primary/10">{item.step}</span>
                    <div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-glow-primary border-4 border-white">
                <img src="/student-registering-online.jpg" className="object-cover w-full h-full" alt="registro" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <CHANGE> Added Registration Section */}
      <RegistrationSection />

      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
