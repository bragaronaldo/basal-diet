// import { Injectable } from '@angular/core';
// import { CanActivate, Router, UrlTree } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoggedGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) { }

//   canActivate(
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     if (this.authService.isLoggedIn()) {
//       this.router.navigate(['diet', 99]);
//     }
//     return true;
//   }
// }
