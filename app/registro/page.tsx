import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RegistrationSection } from "@/components/registration-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Registro de Talleres | CIP",
  description: "Formulario de inscripción para los talleres de verano del Colegio de Ingenieros del Perú.",
}

export default function RegistroPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <RegistrationSection />
      </div>
      <Footer />
    </main>
  )
}
