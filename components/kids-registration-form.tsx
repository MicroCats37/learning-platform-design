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

// ==========================================
// 1. BASE DE DATOS DE HORARIOS (HARDCODED PARA VALIDACIÓN)
// ==========================================
// Esto asegura que la validación funcione aunque 'talleresOptions' solo tenga label/value.
const FULL_TALLERES_DATA: Record<string, { horario: string; dias: string }> = {
  "clases-de-guitarra": { horario: "10:00 am - 11:00 am", dias: "L - M - V" },
  "clases-de-cajon": { horario: "11:00 am - 12:00 pm", dias: "L - M - V" },
  "robotica-e-internet-de-las-cosas-kids": { horario: "8:30 am – 11:00 am", dias: "L - M" },
  "robotica-e-internet-de-las-cosas-junior": { horario: "11:00 am – 1:30 pm", dias: "L - M" },
  "robotica-avanzada-para-competidores": { horario: "3:00 pm – 5:30 pm", dias: "L - M" },
  "programacion-e-inteligencia-artificial-kids": { horario: "8:30 am – 11:00 am", dias: "M - J" },
  "programacion-e-inteligencia-artificial-junior": { horario: "11:00 am – 1:30 pm", dias: "M - J" },
  "clases-de-natacion": { horario: "Por confirmar", dias: "Por confirmar" },
  "clases-de-tai-chi": { horario: "10:00 am – 11:00 am", dias: "Sábados" },
};

// ==========================================
// 2. HELPERS (Protegidos contra crashes)
// ==========================================

function parseTime(timeStr: string): number {
  if (!timeStr || typeof timeStr !== 'string') return -1;
  const cleanStr = timeStr.toLowerCase().trim();
  if (cleanStr.includes("confirmar")) return -1;
  
  // Divide "10:00 am" -> ["10:00", "am"]
  const parts = cleanStr.split(" ");
  if (parts.length < 2) return -1;

  const [time, modifier] = parts;
  let [hours, minutes] = time.split(":").map(Number);
  
  if (isNaN(hours) || isNaN(minutes)) return -1;

  if (modifier === "pm" && hours !== 12) hours += 12;
  if (modifier === "am" && hours === 12) hours = 0;
  
  return hours * 60 + minutes;
}

function getScheduleRange(horarioStr: string) {
  if (!horarioStr || typeof horarioStr !== 'string') return null;
  // Soporta guion normal (-) y guion largo (–) que a veces viene en el JSON
  const separator = horarioStr.includes("–") ? "–" : "-";
  
  if (!horarioStr.includes(separator)) return null;

  const [startStr, endStr] = horarioStr.split(separator); 
  const start = parseTime(startStr);
  const end = parseTime(endStr);

  if (start === -1 || end === -1) return null;

  return { start, end };
}

function getDaysArray(diasStr: string): string[] {
  if (!diasStr || typeof diasStr !== 'string') return [];
  if (diasStr.toLowerCase().includes("confirmar")) return [];
  
  // Limpia espacios y separa. Ej: "L - M" -> ["L", "M"]
  return diasStr.split("-").map(d => d.trim());
}

// ==========================================
// 3. LÓGICA DE CONFLICTO (Tu lógica corregida)
// ==========================================
function checkConflict(tallerA_Slug: string, tallerB_Slug: string): boolean {
  // Buscamos la info real en nuestra constante
  const infoA = FULL_TALLERES_DATA[tallerA_Slug];
  const infoB = FULL_TALLERES_DATA[tallerB_Slug];

  // Si no tenemos datos de alguno, asumimos que no hay conflicto (para no bloquear)
  if (!infoA || !infoB) return false;
  
  // Validación de seguridad: si no tienen propiedad horario o dias
  if (!infoA.horario || !infoB.horario) return false;
  if (infoA.horario.includes("confirmar") || infoB.horario.includes("confirmar")) return false;

  // Paso A: Verificar Días
  const diasA = getDaysArray(infoA.dias);
  const diasB = getDaysArray(infoB.dias);
  
  // Si no comparten ningún día, no chocan
  const compartenDia = diasA.some(dia => diasB.includes(dia));
  if (!compartenDia) return false;

  // Paso B: Verificar Minutos (Solo si comparten día)
  const rangeA = getScheduleRange(infoA.horario);
  const rangeB = getScheduleRange(infoB.horario);

  if (!rangeA || !rangeB) return false;

  // Fórmula matemática de cruce: (StartA < EndB) y (StartB < EndA)
  return rangeA.start < rangeB.end && rangeB.start < rangeA.end;
}

// ==========================================
// 4. COMPONENTE (Con la corrección aplicada)
// ==========================================

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

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    onChange(value);
  };

  // Lógica inteligente de selección
  const handleTallerSelection = (
    currentSlugs: string[], 
    newSlug: string, 
    onChange: (value: string[]) => void,
    labelNuevoTaller: string // Pasamos el label para mostrarlo bonito en el toast
  ) => {
    // 1. Deseleccionar si ya existe
    if (currentSlugs.includes(newSlug)) {
      onChange(currentSlugs.filter((s) => s !== newSlug));
      return;
    }

    // 2. Validar conflicto con los que YA están seleccionados
    for (const slugExistente of currentSlugs) {
      if (checkConflict(slugExistente, newSlug)) {
        // Buscamos el nombre del taller existente para el mensaje
        const labelExistente = availableOptions.find(opt => opt.value === slugExistente)?.label || "otro taller";
        
        toast({
          title: "⚠️ Cruce de Horarios",
          description: `No puedes elegir "${labelNuevoTaller}" porque se cruza con "${labelExistente}".`,
          variant: "destructive",
          duration: 4000,
        });
        return; // Detenemos: No agregamos el nuevo slug
      }
    }

    // 3. Si pasa todas las pruebas, agregamos
    onChange([...currentSlugs, newSlug]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Datos del Colegiado */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold border-b pb-2 text-[#2A2A29]">Datos del Colegiado</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="colegiado.cip" render={({ field }) => (<FormItem><FormLabel>CIP del Colegiado</FormLabel><FormControl><Input placeholder="Ej. 123456" maxLength={9} {...field} onChange={(e) => handleNumericInput(e, field.onChange)}/></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="colegiado.nombre_1" render={({ field }) => (<FormItem><FormLabel>Primer Nombre</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="colegiado.nombre_2" render={({ field }) => (<FormItem><FormLabel>Segundo Nombre</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="colegiado.apellido_paterno" render={({ field }) => (<FormItem><FormLabel>Apellido Paterno</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="colegiado.apellido_materno" render={({ field }) => (<FormItem><FormLabel>Apellido Materno</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="colegiado.correo" render={({ field }) => (<FormItem><FormLabel>Correo</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="colegiado.telefono" render={({ field }) => (<FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input type="tel" maxLength={9} {...field} onChange={(e) => handleNumericInput(e, field.onChange)}/></FormControl><FormMessage /></FormItem>)} />
          </div>
        </div>

        {/* Datos de los Hijos */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between border-b pb-2">
            <h3 className="text-xl font-bold text-[#2A2A29]">Datos de los Hijos</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ dni: "", nombre_1: "", nombre_2: "", apellido_paterno: "", apellido_materno: "", fecha_nacimiento: "", talleres_slugs: [] })}
              className="gap-2 border-[#D7B56D] text-[#2A2A29] hover:bg-[#D7B56D]/10"
            >
              <UserPlus className="w-4 h-4" /> Agregar Hijo
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id} className="relative border-secondary/20 shadow-sm overflow-visible">
              <CardHeader className="bg-secondary/5 py-3 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-[#2A2A29]">Hijo #{index + 1}</CardTitle>
                  {fields.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)} className="h-8 w-8 p-0 text-[#E31E24] hover:text-[#E31E24]/80 hover:bg-[#E31E24]/10"><Trash2 className="w-4 h-4" /></Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name={`hijos.${index}.dni`} render={({ field }) => (<FormItem><FormLabel>DNI</FormLabel><FormControl><Input maxLength={8} {...field} onChange={(e) => handleNumericInput(e, field.onChange)} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`hijos.${index}.fecha_nacimiento`} render={({ field }) => (<FormItem><FormLabel>Nacimiento</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`hijos.${index}.nombre_1`} render={({ field }) => (<FormItem><FormLabel>Nombre 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`hijos.${index}.nombre_2`} render={({ field }) => (<FormItem><FormLabel>Nombre 2</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`hijos.${index}.apellido_paterno`} render={({ field }) => (<FormItem><FormLabel>Ap. Paterno</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`hijos.${index}.apellido_materno`} render={({ field }) => (<FormItem><FormLabel>Ap. Materno</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />

                  <FormField
                    control={form.control}
                    name={`hijos.${index}.talleres_slugs`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2 mt-2">
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <div className="mb-3">
                              <FormLabel className="text-base font-semibold text-[#2A2A29]">Selección de Talleres</FormLabel>
                              <p className="text-xs text-muted-foreground mt-1">El sistema bloqueará automáticamente talleres con horarios cruzados.</p>
                          </div>
                          <FormControl>
                            <MultiSelect
                              options={availableOptions}
                              selected={field.value}
                              onChange={(newValues) => {
                                // Detectamos cuál fue el último clic para validarlo
                                if (newValues.length > field.value.length) {
                                  const addedSlug = newValues.find(slug => !field.value.includes(slug));
                                  if (addedSlug) {
                                    // Buscamos el label bonito para mostrar en el error
                                    const label = availableOptions.find(o => o.value === addedSlug)?.label || "Taller";
                                    handleTallerSelection(field.value, addedSlug, field.onChange, label);
                                  }
                                } else {
                                  // Si estamos borrando, dejamos pasar siempre
                                  field.onChange(newValues);
                                }
                              }}
                              placeholder="🔍 Buscar talleres..."
                              className="bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button type="submit" className="w-full h-12 text-lg font-bold gap-2 shadow-glow-primary bg-[#E31E24] hover:bg-[#E31E24]/90 text-white">
          <Send className="w-5 h-5" /> Finalizar Inscripción
        </Button>
      </form>
    </Form>
  )
}