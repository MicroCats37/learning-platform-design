'use client'

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RegistrationSection } from "@/components/registration-section"



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
