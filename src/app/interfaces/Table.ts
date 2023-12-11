import { Alimentos } from "./Alimento"

export interface Table {
  userIndex: number
  tableIndex: number
  id: number
  alimentos: Alimentos
  cols: [
    {
      field: string, header: string
    },
    {
      field: string, header: string
    },
    {
      field: string, header: string
    },
    {
      field: string, header: string
    },
    {
      field: string, header: string
    },
    {
      field: string, header: string
    },
  ],
}
export interface Tables extends Array<Table> {}
