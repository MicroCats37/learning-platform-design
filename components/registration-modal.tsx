"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { KidsRegistrationForm } from "@/components/kids-registration-form" // Asegúrate de la ruta correcta
import { TaiChiRegistrationForm } from "@/components/taichi-registration-form" // Asegúrate de la ruta correcta
import { ScrollArea } from "./ui/scroll-area"


interface RegistrationModalProps {
  slug: string
  tallerName: string
  triggerText?: string
}

export function RegistrationModal({ slug, tallerName, triggerText = "Reservar mi lugar" }: RegistrationModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Lógica para detectar si es Tai Chi
  // Verificamos si el slug contiene "tai-chi" para ser flexibles con "clases-de-tai-chi" o "taichi-verano-2026"
  const isTaiChi = slug.includes("tai-chi")

  const handleSuccess = () => {
    // Esta función se ejecutará cuando el formulario termine exitosamente
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#E31E24] hover:bg-[#C41218] text-white font-bold shadow-md transition-all active:scale-95">
          {triggerText}
        </Button>
      </DialogTrigger>
      
      {/* max-w-3xl para que sea ancho en desktop, h-[90vh] para que no se salga de la pantalla en móvil */}
      <DialogContent className="sm:max-w-3xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 pb-2 border-b bg-secondary/5">
          <DialogTitle className="text-2xl font-bold text-[#2A2A29]">
            {isTaiChi ? "Inscripción a Evento Exclusivo" : "Inscripción a Taller Juvenil"}
          </DialogTitle>
          <DialogDescription>
            Completando registro para: <span className="font-semibold text-[#E31E24]">{tallerName}</span>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6 overflow-y-auto">
            {isTaiChi ? (
              // Formulario de Tai Chi
              <TaiChiRegistrationForm onSuccess={handleSuccess} />
            ) : (
              // Formulario de Niños (Le pasamos el slug para que lo pre-seleccione)
              <KidsRegistrationForm 
                defaultTallerSlug={slug} 
                onSuccess={handleSuccess} 
              />
            )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}