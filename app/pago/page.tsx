"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Wallet, Banknote, ShieldCheck } from "lucide-react"

export default function PagoPage() {
  return (
    <main className="min-h-screen bg-muted/30 pt-32 pb-20">
      <Navbar />
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-[1fr_350px] gap-8"
        >
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Finalizar Compra</h1>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Método de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="card" className="grid gap-4">
                  {[
                    { id: "card", label: "Tarjeta de Crédito/Débito", icon: CreditCard },
                    { id: "yape", label: "Yape / Plin", icon: Wallet },
                    { id: "transfer", label: "Transferencia Bancaria", icon: Banknote },
                  ].map((method) => (
                    <Label
                      key={method.id}
                      htmlFor={method.id}
                      className="flex items-center justify-between p-4 rounded-xl border-2 border-muted cursor-pointer hover:border-primary/50 [&:has(:checked)]:border-primary transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <method.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{method.label}</span>
                      </div>
                      <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Información de Facturación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>RUC / DNI</Label>
                    <input className="w-full h-11 px-4 rounded-lg bg-muted border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <Label>Razón Social</Label>
                    <input className="w-full h-11 px-4 rounded-lg bg-muted border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-background sticky top-32">
              <CardHeader>
                <CardTitle className="text-lg">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="text-sm">
                    <p className="font-bold">BIM para Edificaciones Complejas</p>
                    <p className="text-muted-foreground text-xs italic">Taller de Especialización</p>
                  </div>
                  <span className="font-bold">S/ 450</span>
                </div>
                <div className="h-px bg-border" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>S/ 381.36</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>IGV (18%)</span>
                    <span>S/ 68.64</span>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center text-lg font-bold text-primary">
                  <span>Total</span>
                  <span>S/ 450.00</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-bold shadow-lg shadow-primary/20">
                  Pagar Ahora
                </Button>
                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Pago seguro encriptado
                </div>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
