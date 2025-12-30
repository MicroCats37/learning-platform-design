import talleresData from "./data.json"

export const talleresOptions = talleresData.talleres.map((taller) => ({
  label: taller.titulo,
  value: taller.titulo.toLowerCase().replace(/\s+/g, "-"),
}))
