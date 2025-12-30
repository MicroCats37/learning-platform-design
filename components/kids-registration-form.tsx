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

interface Props {
  availableOptions?: typeof talleresOptions
  defaultTallerSlug?: string
}

export function KidsRegistrationForm({ 
  availableOptions = talleresOptions, 
  defaultTallerSlug 
}: Props) {
  
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
          talleres_slugs: defaultTallerSlug ? [defaultTallerSlug] : [],
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
      console.log("[Form] Submitting Registration:", data)
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

  // Función auxiliar para limpiar inputs numéricos (solo números)
  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Elimina todo lo que no sea número
    onChange(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* === SECCIÓN DATOS DEL COLEGIADO === */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold border-b pb-2 text-[#2A2A29]">Datos del Colegiado</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CIP (Solo números, máx 9) */}
            <FormField
              control={form.control}
              name="colegiado.cip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CIP del Colegiado</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ej. 123456" 
                      maxLength={9}
                      {...field} 
                      onChange={(e) => handleNumericInput(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Primer Nombre */}
            <FormField
              control={form.control}
              name="colegiado.nombre_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primer Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Segundo Nombre */}
            <FormField
              control={form.control}
              name="colegiado.nombre_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segundo Nombre (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Segundo nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Apellido Paterno */}
            <FormField
              control={form.control}
              name="colegiado.apellido_paterno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido Paterno</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido Paterno" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Apellido Materno */}
            <FormField
              control={form.control}
              name="colegiado.apellido_materno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido Materno</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido Materno" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Correo */}
            <FormField
              control={form.control}
              name="colegiado.correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Teléfono (Solo números, máx 9) */}
            <FormField
              control={form.control}
              name="colegiado.telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono / Celular</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="999 999 999" 
                      maxLength={9}
                      {...field} 
                      onChange={(e) => handleNumericInput(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* === SECCIÓN DATOS DE LOS HIJOS === */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between border-b pb-2">
            <h3 className="text-xl font-bold text-[#2A2A29]">Datos de los Hijos</h3>
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
              className="gap-2 border-[#D7B56D] text-[#2A2A29] hover:bg-[#D7B56D]/10"
            >
              <UserPlus className="w-4 h-4" />
              Agregar Hijo
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id} className="relative overflow-hidden border-secondary/20 shadow-sm">
              <CardHeader className="bg-secondary/5 py-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-[#2A2A29]">Hijo #{index + 1}</CardTitle>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="h-8 w-8 p-0 text-[#E31E24] hover:text-[#E31E24]/80 hover:bg-[#E31E24]/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* DNI Hijo (Solo números, EXACTAMENTE 8) */}
                  <FormField
                    control={form.control}
                    name={`hijos.${index}.dni`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DNI</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="DNI del menor" 
                            maxLength={8}
                            {...field} 
                            onChange={(e) => handleNumericInput(e, field.onChange)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Fecha Nacimiento */}
                  <FormField
                    control={form.control}
                    name={`hijos.${index}.fecha_nacimiento`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Nacimiento</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Nombre 1 Hijo */}
                  <FormField
                    control={form.control}
                    name={`hijos.${index}.nombre_1`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primer Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Nombre 2 Hijo */}
                  <FormField
                    control={form.control}
                    name={`hijos.${index}.nombre_2`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Segundo Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Segundo nombre (Opcional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Apellido Paterno Hijo */}
                  <FormField
                    control={form.control}
                    name={`hijos.${index}.apellido_paterno`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido Paterno</FormLabel>
                        <FormControl>
                          <Input placeholder="Apellido Paterno" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Apellido Materno Hijo */}
                  <FormField
                    control={form.control}
                    name={`hijos.${index}.apellido_materno`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido Materno</FormLabel>
                        <FormControl>
                          <Input placeholder="Apellido Materno" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* MultiSelect Talleres */}
                  <FormField
                    control={form.control}
                    name={`hijos.${index}.talleres_slugs`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Talleres</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={availableOptions}
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

        <Button 
          type="submit" 
          className="w-full h-12 text-lg font-bold gap-2 shadow-glow-primary bg-[#E31E24] hover:bg-[#E31E24]/90 text-white"
        >
          <Send className="w-5 h-5" />
          Finalizar Inscripción
        </Button>
      </form>
    </Form>
  )
}