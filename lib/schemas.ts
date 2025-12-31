import { z } from "zod"

export const colegiadoSchema = z.object({
  cip: z.string().min(6, "CIP debe tener al menos 6 caracteres").max(9, "CIP debe tener máximo 6 caracteresquerido"),
  dni: z.string().min(8, "DNI debe tener al menos 8 caracteres").max(8, "DNI debe tener máximo 8 caracteres"),
  nombre: z.string().min(1, "Nombre requerido"),
  apellido_paterno: z.string().min(1, "Apellido paterno requerido"),
  apellido_materno: z.string().optional(),
  correo: z.string().email("Correo inválido"),
  telefono: z.string().min(1, "Teléfono requerido"),
})

export const kidsRegistrationSchema = z.object({
  colegiado: colegiadoSchema,
  hijos: z
    .array(
      z.object({
        dni: z.string().min(8, "DNI debe tener al menos 8 caracteres").max(8, "DNI debe tener máximo 8 caracteres"),
        nombre: z.string().min(1, "Nombre requerido"),
        apellido_paterno: z.string().min(1, "Apellido paterno requerido"),
        apellido_materno: z.string().optional(),
        fecha_nacimiento: z.string().min(1, "Fecha de nacimiento requerida"), // YYYY-MM-DD
        talleres: z.array(z.string()).min(1, "Seleccione al menos un taller"),
      }),
    )
    .min(1, "Debe agregar al menos un hijo"),
})

export const taichiRegistrationSchema = z.object({
  colegiado: colegiadoSchema,
  slug: z.literal("taichi-verano-2026").default("taichi-verano-2026"),
})

export type KidsRegistrationValues = z.infer<typeof kidsRegistrationSchema>
export type TaiChiRegistrationValues = z.infer<typeof taichiRegistrationSchema>
