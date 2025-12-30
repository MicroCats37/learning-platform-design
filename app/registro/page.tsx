"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function RegistroPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold mb-6">
              Únete a la Comunidad <span className="text-primary">CIP</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Crea tu cuenta para acceder a contenidos exclusivos, seguimiento de tus talleres y certificaciones
              oficiales.
            </p>
            <div className="space-y-6">
              {[
                { title: "Certificación oficial", desc: "Validada por el Colegio de Ingenieros del Perú." },
                { title: "Acceso de por vida", desc: "Repasa las clases grabadas cuando quieras." },
                { title: "Soporte 24/7", desc: "Expertos listos para resolver tus dudas." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-none shadow-2xl p-4">
              <CardHeader>
                <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Nombres</Label>
                    <Input id="first-name" placeholder="Ej. Juan" className="h-12 border-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Apellidos</Label>
                    <Input id="last-name" placeholder="Ej. Pérez" className="h-12 border-muted" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dni">Número de DNI / CIP</Label>
                  <Input id="dni" placeholder="Ingresa tu documento" className="h-12 border-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="juan.perez@email.com" className="h-12 border-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" className="h-12 border-muted" />
                </div>
                <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-lg font-bold mt-4 transition-transform active:scale-95">
                  Registrarme
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Al registrarte, aceptas nuestros términos de servicio y políticas de privacidad.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
