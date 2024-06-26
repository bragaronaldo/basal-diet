import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUserData(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/users/`, user);
  }
  getUserData(id: string) {
    return this.http.get<User>(`${this.BASE_URL}/users/?id=${id}`);
  }
}
