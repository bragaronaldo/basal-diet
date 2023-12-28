export interface FoodTable {
  userIndex: number;
  id?: number;
  name: string;
}
export interface Food {
  userIndex: number;
  tableIndex: number;
  id?: number;
  name: string;
  amount: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  calories: number;
}
