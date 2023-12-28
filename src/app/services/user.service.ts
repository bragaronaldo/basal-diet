import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  createUserData(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/users/`, user);
  }

  getUserData(id: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`)
  }
}
