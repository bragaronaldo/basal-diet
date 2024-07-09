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
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userData!: UserDTO;
  userForm!: FormGroup;

  isLoading = false;
  errorMessage = ''

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService
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
    this.errorMessage = '';

    const username = this.userForm.get('username')?.value;
    const password = this.userForm.get('password')?.value;

    const user: UserAuth = {
      username,
      password,
    };

    this.authService.login(user);

    this.authService.authValidationEvent.subscribe((response) => {
      if (response.success === false) {
        this.isLoading = false;
        this.errorMessage = response.message;
        return;
      }

      if (response.userData) {
        const userData: UserDTO = JSON.parse(response.userData);
        this.userService
          .getUserProfileByUserId(userData.user.id.toString())
          .subscribe((response) => {
            this.localStorageService.setItem('id', response[0].id);
            if (response.length > 0) {
              this.router.navigate(['diet', response[0].id]);
              return;
            }

            this.router.navigate(['profile', userData.user.id]);
          });
      }
    });
  }
}
