import type { Table, GeneralTable } from '../types/cheerioTypes'
import type { TeamInfo } from '../types/tablesTypes'

export default function format(tablaDatos: Table, datosGenerales: GeneralTable): TeamInfo[] {
  const buffer: TeamInfo[] = []

  if (tablaDatos.length > 0) {
    tablaDatos.find('tbody tr').each((_, row) => {
      const columnas = datosGenerales(row).find('td')

      const nombre = columnas.eq(1).text().trim()
      const puntosTotales = parseInt(columnas.eq(2).text(), 10)
      const partidosJugados = parseInt(columnas.eq(3).text(), 10)
      const golesAFavor = parseInt(columnas.eq(7).text(), 10)
      const golesEnContra = parseInt(columnas.eq(8).text(), 10)

      const datosEquipo: TeamInfo = {
        nombre,
        puntosTotales,
        partidosJugados,
        diferenciaGoles: golesAFavor - golesEnContra
      }

      buffer.push(datosEquipo)
    })
    return buffer
  }

  return []
}