"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { KidsRegistrationForm } from "@/components/kids-registration-form"
import { TaiChiRegistrationForm } from "@/components/taichi-registration-form"
import { Users, Sparkles, UserCircle } from "lucide-react" // Agregué UserCircle

export function RegistrationSection() {
  return (
    <section id="registro" className="py-12 md:py-24 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto" // Reduje un poco el ancho máximo para que se vea más compacto
        >
          {/* Header de la sección */}
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-xs md:text-sm font-medium mb-4 border border-secondary/30"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
              Registro de Talleres 2026
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 md:mb-4 tracking-tight leading-tight">
              Inscríbete <span className="text-gradient-primary">Ahora</span>
            </h2>
            
            <p className="text-sm md:text-lg text-muted-foreground max-w-xl mx-auto px-2">
              Completa el formulario y asegura tu lugar en los mejores talleres de verano.
            </p>
          </div>

          {/* Tarjeta del Formulario */}
          <Card className="border-none shadow-none bg-transparent md:bg-card md:border md:shadow-glow-primary">
            <CardContent className="p-0 md:p-8">
              <Tabs defaultValue="kids" className="w-full">
                
                {/* LISTA DE TABS MEJORADA */}
                {/* h-auto permite que crezca si el texto es largo. p-1 para un borde fino. */}
                <TabsList className="grid w-full grid-cols-2 mb-6 h-auto p-1 bg-muted/50 rounded-xl">
                  <TabsTrigger 
                    value="kids" 
                    className="text-sm md:text-base font-bold gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all"
                  >
                    <Users className="w-4 h-4" />
                    <span className="truncate">Jóvenes y Niños</span> {/* Texto más corto para móvil */}
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="taichi" 
                    className="text-sm md:text-base font-bold gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all"
                  >
                    <UserCircle className="w-4 h-4" />
                    <span>Tai Chi</span>
                  </TabsTrigger>
                </TabsList>

                {/* Contenido con fondo blanco en móvil para resaltar del fondo gris */}
                <div className="bg-card border md:border-none rounded-xl p-4 md:p-0 shadow-sm md:shadow-none">
                    <TabsContent value="kids" className="mt-0">
                    <KidsRegistrationForm />
                    </TabsContent>

                    <TabsContent value="taichi" className="mt-0">
                    <TaiChiRegistrationForm />
                    </TabsContent>
                </div>

              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}