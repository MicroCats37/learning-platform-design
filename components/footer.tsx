"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/ciplimaoficial/?locale=es_LA",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/ciplimaoficial",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/ciplimaoficial?igsh=dnF3b215aHBkaGVt",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://pe.linkedin.com/company/ciplimaoficial",
    },
  ]

  return (
    // CAMBIO PRINCIPAL: Fondo oscuro (un azul grisáceo profundo) y textos claros
    <footer className="bg-[#E31E24] border-t border-slate-800 pt-16 pb-8 text-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          
          {/* COLUMNA 1: LOGO E INFO */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              {/* Contenedor del logo con un sutil brillo rojo para destacar "el círculo" */}
              <div className="rounded-full relative w-12 h-12 bg-white/5 p-1 rounded-full overflow-hidden border border-[#E31E24]/20 shadow-[0_0_15px_rgba(227,30,36,0.15)]">
                <Image
                  src="/images/logo.png"
                  alt="Logo CIP"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                {/* Texto en blanco para contraste */}
                <span className="font-extrabold text-xl leading-none text-white">CIP LIMA</span>
                <span className="text-xs font-medium text-slate-100 tracking-widest">CONSEJO DEPARTAMENTAL DE LIMA</span>
              </div>
            </div>
            
            <p className="text-slate-100 text-sm max-w-sm leading-relaxed">
              Promoviendo la excelencia en la ingeniería peruana. 
              Capacitación, certificación y desarrollo profesional para el crecimiento del país.
            </p>

            {/* Redes Sociales Adaptadas al Tema Oscuro */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Fondo oscuro, icono blanco, hover rojo intenso
                  className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#E31E24] hover:border-[#E31E24] hover:shadow-[0_0_10px_rgba(227,30,36,0.4)]"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMNA 2: ENLACES */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-bold text-white mb-6">Plataforma</h4>
            <ul className="space-y-3 text-sm">
              {/* Los enlaces cambian a rojo al pasar el mouse */}
              <li><Link href="/talleres" className="hover:text-[#E31E24] transition-colors">Cursos Disponibles</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: LEGAL */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="https://ciplima.org.pe/sistemas-integrados-gestion/" className="hover:text-[#E31E24] transition-colors" target="_blank" 
    rel="noopener noreferrer">Politica del Sistema Integrado de Gestion</Link></li>
              <li><Link href="https://ciplima.org.pe/politica-privacidad-datos-registrados/" className="hover:text-[#E31E24] transition-colors" target="_blank" 
    rel="noopener noreferrer">Política de privacidad</Link></li>
              <li><Link href="https://servicioscdl.ciplima.org.pe/libro-de-reclamaciones/" className="hover:text-[#E31E24] transition-colors" target="_blank" 
    rel="noopener noreferrer">Libro de reclamaciones</Link></li>
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-white mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                {/* Iconos en rojo CIP */}
                <MapPin className="w-4 h-4 text-[#E31E24] mt-0.5" />
                <span>Calle Barcelona 240, San Isidro, Lima - Perú</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E31E24]" />
                <span>(01) 202-5000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E31E24]" />
                <span>informes@ciplima.org.pe</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BARRA INFERIOR */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-100">
          <p>© 2026 Colegio de Ingenieros del Perú - Lima. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-slate-400">Sistemas operando al 100%</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
