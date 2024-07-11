import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserProfile } from '../interfaces/UserProfile';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUserProfile(user: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.BASE_URL}/user_profiles/`, user);
  }
  getUserProfile(id: string) {
    return this.http.get<UserProfile>(`${this.BASE_URL}/user_profiles/?id=${id}`);
  }
  getUserProfileByUserId(user_id: string) {
    return this.http.get<UserProfile[]>(`${this.BASE_URL}/user_profiles_by_user_id/?user_id=${user_id}`);
  }
  updateUserProfile(user: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.BASE_URL}/user_profiles/${user.id}`, user);
  }
}
