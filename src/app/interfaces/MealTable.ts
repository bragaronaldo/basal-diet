export interface Meal {
  user_id: number;
  id?: number;
  name: string;
  isLoading?: boolean;
  isEditing?: boolean;
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
  isLoading?: boolean;
}
