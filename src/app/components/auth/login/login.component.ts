import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      // email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get formControls() {
    return this.userForm.controls;
  }

  login() {
    if (this.userForm.invalid) return;

    const username = this.userForm.get('username')?.value;
    // const email = this.userForm.get('email')?.value;
    const raw_password = this.userForm.get('password')?.value;

    // if (raw_password !== raw_password_confirm) {
      // return;
    // }

    const password = this.hashPassword(raw_password);

    const user: User = {
      username,
      // email,
      password,
    };

    this.authService.login(user).subscribe((response) => {
      console.log('User registration!');
    });
  }
  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }
}
