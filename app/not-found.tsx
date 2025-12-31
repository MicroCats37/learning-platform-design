'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background text-center px-4 relative overflow-hidden">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 space-y-8 max-w-lg mx-auto">
        {/* Número 404 con tu gradiente dorado */}
        <h1 className="text-[10rem] md:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-secondary via-secondary to-secondary/50 select-none opacity-90">
          404
        </h1>

        <div className="space-y-4 -mt-10">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Página no encontrada
          </h2>
          <p className="text-muted-foreground text-lg">
            Parece que la página que buscas se ha movido o ya no existe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            size="lg" 
            className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-white shadow-glow-primary font-bold"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              Volver al Inicio
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary font-bold"
            asChild
          >
            <Link href="/talleres">
              <ArrowLeft className="w-4 h-4" />
              Ver Talleres
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}