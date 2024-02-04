import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL: string = 'http://localhost:3000';

  private DJANGO_URL: string = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  createUserData(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/users/`, user);
  }
  getUserData(id: string) {
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`);
  }

  // createUserData(user: User): Observable<User> {
  //   return this.http.post<User>(`${this.DJANGO_URL}create-user`, user);
  // }
}
