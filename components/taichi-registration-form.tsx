"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { taichiRegistrationSchema, type TaiChiRegistrationValues } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Send } from "lucide-react"

export function TaiChiRegistrationForm() {
  const { toast } = useToast()
  const form = useForm<TaiChiRegistrationValues>({
    resolver: zodResolver(taichiRegistrationSchema),
    defaultValues: {
      colegiado: {
        cip: "",
        nombre_1: "",
        nombre_2: "",
        apellido_paterno: "",
        apellido_materno: "",
        correo: "",
        telefono: "",
      },
      slug: "taichi-verano-2026",
    },
  })

  async function onSubmit(data: TaiChiRegistrationValues) {
    try {
      console.log("[v0] Submitting Tai Chi Registration:", data)
      const response = await fetch("/api/v1/registro-taichi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Error en el registro")

      toast({
        title: "¡Inscripción exitosa!",
        description: "Se ha registrado correctamente al taller de Tai Chi.",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo completar la inscripción. Intente nuevamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="colegiado.cip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIP</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. 123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ... existing fields ... */}
        </div>

        <Button type="submit" className="w-full h-12 text-lg font-bold gap-2 shadow-glow-primary">
          <Send className="w-5 h-5" />
          Inscribirme al Taller
        </Button>
      </form>
    </Form>
  )
}
