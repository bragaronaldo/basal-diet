import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food, Meal } from '../interfaces/MealTable';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MealTableService {

  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}
  createNewMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(`${this.BASE_URL}/meals/`, meal);
  }
  getMeals(user_id: number) {
    return this.http.get<Meal[]>(`${this.BASE_URL}/meals/?user_id=${user_id}`);
  }
  editMeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.BASE_URL}/meals/${meal.id}`, meal);
  }
  deleteMeal(id: number): Observable<Meal> {
    return this.http.delete<Meal>(`${this.BASE_URL}/meals/${id}`);
  }
  createNewFood(food: Food): Observable<Food> {
    return this.http.post<Food>(`${this.BASE_URL}/foods/`, food);
  }
  getFoodsByUserId(user_id: number): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.BASE_URL}/foods/?user_id=${user_id}`);
  }
  editFood(food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.BASE_URL}/foods/${food.id}`, food);
  }
  deleteFood(id: number): Observable<Food> {
    return this.http.delete<Food>(`${this.BASE_URL}/foods/${id}`);
  }
}
