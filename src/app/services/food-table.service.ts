import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Food, FoodTable } from '../interfaces/FoodTable';

@Injectable({
  providedIn: 'root',
})
export class FoodTableService {
  private BASE_URL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getTables(userId: number) {
    return this.http
      .get<FoodTable[]>(`${this.BASE_URL}/tables?userIndex=${userId}`)
      .pipe(
        map((response) => response)
        // tap(data => console.dir('Courses:', data))
      );
  }

  getFoodsByUserId(userId: number): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.BASE_URL}/foods?userIndex=${userId}`);
  }

  getAllFoodsPerMeal(id: number): Observable<any>{
    return this.http.get(`${this.BASE_URL}/foods?userIndex=${id}`)
  }

  getTablesByUserId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/tables?userIndex=${id}`);
  }
  createNewTable(table: FoodTable): Observable<FoodTable> {
    return this.http.post<FoodTable>(`${this.BASE_URL}/tables/`, table);
  }
  createNewFood(food: Food): Observable<Food> {
    return this.http.post<Food>(`${this.BASE_URL}/foods/`, food);
  }
  editFood(food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.BASE_URL}/foods/${food.id}`, food)
  }
  edirMeal(meal: FoodTable): Observable<FoodTable> {
    return this.http.put<FoodTable>(`${this.BASE_URL}/tables/${meal.id}`, meal);
  }
  // updateTable(table: Table): Observable<any> {
  //   return this.http.put(`${this.BASE_URL}/tables/${table.id}`, table);
  // }
  deleteFood(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/foods/${id}`);
  }
  deleteTable(id: number): Observable<FoodTable> {
    return this.http.delete<FoodTable>(`${this.BASE_URL}/tables/${id}`);
  }
}
