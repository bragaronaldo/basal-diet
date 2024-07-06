import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private BASE_URL = `${environment.apiUrl}`;
  private readonly isAuthenticatedKey = 'isAuthenticated';
  loginMessageEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient, private cookieService: CookieService) {}
  signup(userData: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/auth/register`, userData);
  }

  login(userData: User) {
    this.http.post<User>(`${this.BASE_URL}/api/login`, userData).subscribe(
      (success) => {
        this.setSession(success);
        this.cookieService.set(this.isAuthenticatedKey, 'true', 5, '/');
        this.loginMessageEvent.next('Success!');
      },
      (error) => {
        console.log('Error:', error);
        this.loginMessageEvent.next('Usuário ou senha incorretos');
      }
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setSession(authResult: any) {
    this.cookieService.set('token', authResult.token, 5, '/');
  }
  public isLoggedIn(): boolean {
    return this.cookieService.get(this.isAuthenticatedKey) === 'true';
  }

  public getToken() {
    return this.cookieService.get('token');
  }
}
