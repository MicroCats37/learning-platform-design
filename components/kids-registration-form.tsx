"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { kidsRegistrationSchema, type KidsRegistrationValues } from "@/lib/schemas"
import { talleresOptions } from "@/lib/talleres-options"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MultiSelect } from "@/components/ui/multi-select"
import { useToast } from "@/hooks/use-toast"
import { Trash2, UserPlus, Send } from "lucide-react"

export function KidsRegistrationForm() {
  const { toast } = useToast()
  const form = useForm<KidsRegistrationValues>({
    resolver: zodResolver(kidsRegistrationSchema),
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
      hijos: [
        {
          dni: "",
          nombre_1: "",
          nombre_2: "",
          apellido_paterno: "",
          apellido_materno: "",
          fecha_nacimiento: "",
          talleres_slugs: [],
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "hijos",
    control: form.control,
  })

  async function onSubmit(data: KidsRegistrationValues) {
    try {
      console.log("[v0] Submitting Kids Registration:", data)
      const response = await fetch("/api/v1/registro-ninos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Error en el registro")

      toast({
        title: "¡Registro exitoso!",
        description: "Los talleres han sido reservados correctamente.",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo completar el registro. Intente nuevamente.",
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
                <FormLabel>CIP del Colegiado</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. 123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ... existing fields ... */}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Datos de los Hijos</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  dni: "",
                  nombre_1: "",
                  nombre_2: "",
                  apellido_paterno: "",
                  apellido_materno: "",
                  fecha_nacimiento: "",
                  talleres_slugs: [],
                })
              }
              className="gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Agregar Hijo
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id} className="relative overflow-hidden border-secondary/20">
              <CardHeader className="bg-secondary/5 py-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Hijo #{index + 1}</CardTitle>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`hijos.${index}.dni`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DNI</FormLabel>
                        <FormControl>
                          <Input placeholder="DNI del menor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`hijos.${index}.talleres_slugs`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Talleres</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={talleresOptions}
                            selected={field.value}
                            onChange={field.onChange}
                            placeholder="Seleccione uno o más talleres"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button type="submit" className="w-full h-12 text-lg font-bold gap-2 shadow-glow-primary">
          <Send className="w-5 h-5" />
          Finalizar Inscripción
        </Button>
      </form>
    </Form>
  )
}
