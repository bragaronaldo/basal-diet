import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserDTO, UserAuth } from '../interfaces/User';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthValidation } from '../interfaces/AuthValidation';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = `${environment.apiUrl}`;
  private readonly isAuthenticatedKey = 'isAuthenticated';

  authValidationEvent: EventEmitter<AuthValidation> =
    new EventEmitter<AuthValidation>();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}
  signup(userData: UserAuth) {
    this.clearCredentials();
    this.http.post<UserDTO>(`${this.BASE_URL}/api/signup`, userData).subscribe(
      (success) => {
        this.setSession(success);
        this.cookieService.set(this.isAuthenticatedKey, 'true', 5, '/');
        const authValidation: AuthValidation = {
          message: 'Conta criada com sucesso!',
          success: true,
          user_id: success.user.id
        };
        this.authValidationEvent.next(authValidation);
      },
      (error) => {
        if(error.error.username[0] === 'A user with that username already exists.') {
          const authValidation: AuthValidation = {
            message: 'Este nome de usuário já está em uso',
            success: false,
          };
          this.authValidationEvent.next(authValidation);
          return;
        }

        const authValidation: AuthValidation = {
          message: '',
          success: false,
        };
        this.authValidationEvent.next(authValidation);
      }
    );
  }
  login(userData: UserAuth) {
    this.clearCredentials();
    this.http.post<UserAuth>(`${this.BASE_URL}/api/login`, userData).subscribe(
      (success) => {
        this.setSession(success);
        this.cookieService.set(this.isAuthenticatedKey, 'true', 5, '/');

        const authValidation: AuthValidation = {
          message: 'Login efetuado com sucesso!',
          success: true,
          userData: JSON.stringify(success),
        };

        this.authValidationEvent.next(authValidation);
      },
      (error) => {
        console.log('Error:', error);
        const authValidation: AuthValidation = {
          message: 'Usuário ou senha incorretos',
          success: false,
        };
        this.authValidationEvent.next(authValidation);
      }
    );
  }
  public logout() {
    this.clearCredentials();
    this.cookieService.set(this.isAuthenticatedKey, 'false', 5, '/');
    this.router.navigate(['/']);
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
  private clearCredentials() {
    const keepAccept = this.cookieService.get('accepted_cookies')
      ? true
      : false;

    this.cookieService.delete('token', '/');
    this.cookieService.delete('isAuthenticated', '/');

    if (keepAccept) {
      this.cookieService.set('accepted_cookies', 'true', 5, '/');
    }
  }
}
