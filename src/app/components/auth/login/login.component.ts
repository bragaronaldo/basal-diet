import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData!: User;
  userForm!: FormGroup;

  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService, private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get formControls() {
    return this.userForm.controls;
  }

  login() {
    if (this.userForm.invalid) return;

    this.isLoading = true;

    const username = this.userForm.get('username')?.value;
    const password = this.userForm.get('password')?.value;

    const user: User = {
      username,
      password,
    };

    this.authService.login(user);
    this.authService.loginMessageEvent.subscribe((response) => {
      this.isLoading = false;
      this.router.navigate(['/refeicoes/1']);
    })
      // console.log('User registration!');
      // this.cookieService.set('token', this.authService.)
      // this.isLoading = false;
  }
  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }
}
