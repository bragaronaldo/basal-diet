import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { FoodQuery } from './interfaces/foodQuery';
import { FoodDTO } from './interfaces/foodDTO';

@Injectable({
  providedIn: 'root',
})
export class NutritionixService {


  private readonly jsonServer_URL = 'http://localhost:3000/foodsMockUp';

  private readonly BASE_URL = `${environment.nutritionixAPI}v2/natural/nutrients`;
  private readonly headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'x-app-id': '61adf945',
    // 'x-app-key': 'f07bf887a6eed0cd826014d3490731ad',
    'x-app-id': '23aa0ffd',
    'x-app-key': 'a6f09b9214656ace7db8fb1ebb522162',
  });

  constructor(private http: HttpClient) {}

  getFoodDetails(foodName: FoodQuery) {
    return this.http.post<FoodDTO>(`${this.BASE_URL}`, foodName, { headers: this.headers });
  }

  createFoodDetailsMockUp(food: FoodDTO) {
    return this.http.post<FoodDTO>(`${this.jsonServer_URL}`, food);
  }
}
