export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white">
                C
              </div>
              <span className="font-bold text-lg tracking-tight">CIP E-LEARNING</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              La plataforma líder en capacitación técnica para ingenieros en Perú, impulsada por el Colegio de
              Ingenieros.
            </p>
            <div className="flex gap-4">
              {["FB", "TW", "IG", "LI"].map((s) => (
                <div
                  key={s}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold hover:bg-primary hover:text-white transition-colors cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Blog de ingeniería
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Soporte
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Política de cookies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Libro de reclamaciones
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Colegio de Ingenieros del Perú. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <span>Powered by Vercel AI</span>
            <span>Diseñado para Ingenieros</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
