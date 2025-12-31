import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"



export const metadata: Metadata = {
  title: "CIP | Colegio de Ingenieros del Perú",
  description: "Plataforma de capacitación especializada para ingenieros y profesionales de la industria.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
