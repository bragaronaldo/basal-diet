export interface Alimento {
  tableIndex?: number;
  alimento?: string;
  peso?: number;
  carboidratos?: number;
  proteinas?: number;
  gorduras?: number;
  calorias?: number;
  id?: number;
}

export interface Alimentos extends Array<Alimento> {}
