import { Alimentos } from './Alimento';

export interface Table {
  userIndex: number;
  tableIndex: number;
  id: number;
  alimentos: Alimentos;
  cols: [
    {
      field: string;
      header: string;
    },
    {
      field: string;
      header: string;
    },
    {
      field: string;
      header: string;
    },
    {
      field: string;
      header: string;
    },
    {
      field: string;
      header: string;
    },
    {
      field: string;
      header: string;
    }
  ];
}
export interface Tables extends Array<Table> {}

export interface newTable {
  userIndex: number;
  id?: number;
  name: string
  foods?: [{
    name: string,
    amount: number,
    carbohydrates: number,
    proteins: number,
    fats: number,
    calories: number
  }]
}
