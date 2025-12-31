'use client'

import type React from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

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
