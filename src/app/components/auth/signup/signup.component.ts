import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO, UserAuth } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userData!: UserDTO;
  userForm!: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirm: new FormControl('', Validators.required),
    });
  }

  get formControls() {
    return this.userForm.controls;
  }

  signup() {
    if (this.userForm.invalid) return;

    this.isLoading = true;

    const username = this.userForm.get('username')?.value;
    const email = this.userForm.get('email')?.value;
    const password = this.userForm.get('password')?.value;
    const password2 = this.userForm.get('password_confirm')?.value;

    if (password !== password2) {
      this.errorMessage = 'As senhas não coincidem';
      this.isLoading = false;
      return;
    }

    const user: UserAuth = {
      username,
      email,
      password,
    };

    this.authService.signup(user);

    this.authService.authValidationEvent.subscribe((response) => {
      if (!response.success) {
        this.errorMessage = response.message;
        this.isLoading = false;
        return;
      }

      const user_id = response.user_id;
      this.router.navigate(['profile', user_id]);
    });
  }
}
