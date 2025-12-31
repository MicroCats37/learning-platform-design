import talleresData from "./data.json"

export const talleresOptions = talleresData.talleres
  .filter(
    (taller) =>
      taller.slug !== "clases-de-tai-chi" &&
      taller.slug !== "clases-de-natacion"
  )
  .map((taller) => ({
    label: taller.titulo,
    value: taller.slug,
  }))
