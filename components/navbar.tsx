"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"])
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        backgroundColor,
        borderBottomColor: useTransform(borderOpacity, (o) => `rgba(0, 0, 0, ${o * 0.1})`),
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center font-black text-white text-xl shadow-glow-primary">
              C
            </div>
            <div className="absolute inset-0 gradient-secondary rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter leading-none">CIP E-LEARNING</span>
            <span className="text-[9px] text-muted-foreground font-semibold tracking-wider uppercase">
              Talleres de Verano
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold">
          {[
            { href: "/", label: "Inicio" },
            { href: "/talleres", label: "Talleres" },
            { href: "/registro", label: "Registro" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative hover:text-primary transition-colors group/link"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex font-bold">
            Ingresar
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 font-bold shadow-glow-primary hover:scale-105 transition-transform"
            asChild
          >
            <Link href="/registro">Empezar Gratis</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t bg-background/95 backdrop-blur-md"
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {[
              { href: "/", label: "Inicio" },
              { href: "/talleres", label: "Talleres" },
              { href: "/registro", label: "Registro" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-bold hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
