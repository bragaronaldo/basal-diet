import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../interfaces/Table';
import { Alimento } from '../interfaces/Alimento';

@Injectable({
  providedIn: 'root',
})
export class FoodTableService {
  private BASE_URL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getTables(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/tables`);
  }
  getTablesByUserId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/tables?userIndex=${id}`);
  }
  createNewTable(table: Table): Observable<any> {
    return this.http.post(`${this.BASE_URL}/tables/`, table);
  }
  createNewFood(food: Alimento): Observable<any> {
    return this.http.post(`${this.BASE_URL}/foods/`, food);
  }
  getFoodsByTableId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/foods?tableIndex=${id}`);
  }
  updateTable(table: Table): Observable<any> {
    return this.http.put(`${this.BASE_URL}/tables/${table.id}`, table);
  }
  deleteFood(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/foods/${id}`);
  }
  deleteTable(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/tables/${id}`);
  }
}
