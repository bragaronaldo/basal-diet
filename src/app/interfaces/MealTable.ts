export interface Meal {
  userIndex: number;
  id?: number;
  name: string;
}
export interface Food {
  userIndex: number;
  mealIndex: number;
  id?: number;
  name: string;
  amount: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  calories: number;
}
