"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { taichiRegistrationSchema, type TaiChiRegistrationValues } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Send } from "lucide-react"
import { postGeneric } from "@/services/api/function"
interface TaiChiRegistrationFormProps {
  onSuccess?: () => void
}

export function TaiChiRegistrationForm({ onSuccess }: TaiChiRegistrationFormProps) {
  const { toast } = useToast()
  
  const form = useForm<TaiChiRegistrationValues>({
    resolver: zodResolver(taichiRegistrationSchema),
    defaultValues: {
      colegiado: {
        cip: "",
        dni: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        correo: "",
        telefono: "",
      },
      slug: "clases-de-tai-chi",
    },
  })

async function onSubmit(data: TaiChiRegistrationValues) {
  console.log("Submitting Tai Chi Registration:", data);

  // 1. Llamada al servicio genérico
  const result = await postGeneric<any, TaiChiRegistrationValues>(
    "/api/v1/registro-taichi",
    data
  );

  // 2. Manejo de Error usando result.error
  if (!result.success) {
    toast({
      title: "Error",
      description: result.error, // <--- CAMBIO: Usamos el error que viene del result  // <--- Esto pone el Toast en color rojo (Shadcn)
    });
    return;
  }

  // 3. Éxito
  toast({
    title: "¡Inscripción exitosa!",
    description: "Se ha registrado correctamente al taller de Tai Chi.",
    // Aquí no ponemos variant o usamos "default" para que sea verde/azul
  });
  
  // 4. Limpieza y cierre
  form.reset();

  if (onSuccess) {
    setTimeout(() => onSuccess(), 1500);
  }
}

  // Función para bloquear letras en campos numéricos
  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Solo números
    onChange(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="space-y-4">
          <h3 className="text-xl font-bold border-b pb-2 text-[#2A2A29]">Datos del Participante</h3>
          
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
            <FormField
              control={form.control}
              name="colegiado.dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI del Colegiado</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ej. 87654321" 
                      maxLength={8} 
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
              name="colegiado.nombre"
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

        <Button 
          type="submit" 
          className="w-full h-12 text-lg font-bold gap-2 shadow-glow-primary bg-[#E31E24] hover:bg-[#E31E24]/90 text-white"
        >
          <Send className="w-5 h-5" />
          Inscribirme al Taller
        </Button>
      </form>
    </Form>
  )
}
