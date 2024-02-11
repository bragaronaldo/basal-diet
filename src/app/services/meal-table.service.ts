import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food, Meal } from '../interfaces/MealTable';

@Injectable({
  providedIn: 'root',
})
export class MealTableService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMeals(userId: number) {
    return this.http.get<Meal[]>(`${this.BASE_URL}/meals?userIndex=${userId}`);
  }

  getFoodsByUserId(userId: number): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.BASE_URL}/foods?userIndex=${userId}`);
  }

  getAllFoodsPerMeal(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/foods?userIndex=${id}`);
  }

  getMealsByUserId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/meals?userIndex=${id}`);
  }
  createNewMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(`${this.BASE_URL}/meals/`, meal);
  }
  createNewFood(food: Food): Observable<Food> {
    return this.http.post<Food>(`${this.BASE_URL}/foods/`, food);
  }
  editFood(food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.BASE_URL}/foods/${food.id}`, food);
  }
  editMeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.BASE_URL}/meals/${meal.id}`, meal);
  }
  deleteFood(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/foods/${id}`);
  }
  deleteMeal(id: number): Observable<Meal> {
    return this.http.delete<Meal>(`${this.BASE_URL}/meals/${id}`);
  }
}
