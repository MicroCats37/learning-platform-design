import talleresData from "./data.json"

export const talleresOptions = talleresData.talleres
  .filter((taller) => taller.slug !== "clases-de-tai-chi")
  .map((taller) => ({
    label: taller.titulo,
    value: taller.slug,
  }))
