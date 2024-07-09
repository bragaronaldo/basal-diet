import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private localStorageService: LocalStorageService) { }

  canActivate(
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn()) {
      const id = this.localStorageService.getItem('id');
      this.router.navigate(['diet', id]);
    }
    return true;
  }
}
