import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }
  register(userData: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/auth/register`, userData);
  }
  login(userData: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/auth/login`, userData);
  }
}
