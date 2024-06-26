export interface Meal {
  user_id: number;
  id?: number;
  name: string;
}
export interface Food {
  user_id: number;
  meal_id: number;
  id?: number;
  name: string;
  amount: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  calories: number;
}
