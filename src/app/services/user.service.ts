import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  createUserData(user: User): Observable<any> {
    return this.http.post(`${this.BASE_URL}/users/`, user);
  }
}
