"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KidsRegistrationForm } from "@/components/kids-registration-form"
import { TaiChiRegistrationForm } from "@/components/taichi-registration-form"
import { Users, Sparkles } from "lucide-react"

export function RegistrationSection() {
  return (
    <section id="registro" className="py-24 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-6 border border-secondary/30"
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              Registro de Talleres 2026
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
              Inscríbete <span className="text-gradient-primary">Ahora</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Completa el formulario y asegura tu lugar en los mejores talleres de verano del Colegio de Ingenieros del Perú.
            </p>
          </div>

          <Card className="border-none shadow-glow-primary">
            <CardContent className="p-8">
              <Tabs defaultValue="kids" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="kids" className="text-base font-bold gap-2">
                    <Users className="w-4 h-4" />
                    Talleres Juveniles
                  </TabsTrigger>
                  <TabsTrigger value="taichi" className="text-base font-bold gap-2">
                    <Users className="w-4 h-4" />
                    Taller de Tai Chi
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="kids">
                  <KidsRegistrationForm />
                </TabsContent>

                <TabsContent value="taichi">
                  <TaiChiRegistrationForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
