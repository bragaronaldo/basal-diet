import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  trigger,
  state,
  animate,
  transition,
  style,
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormatTextService } from 'src/app/services/format-text.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserProfile } from 'src/app/interfaces/UserProfile';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [
    trigger('box', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('250ms ease-in-out')),
      transition(':leave', animate('250ms ease-in-out')),
    ]),
    trigger('btn', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('250ms ease-in-out')),
      transition(':leave', animate('250ms ease-in-out')),
    ]),
  ],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  userData!: UserProfile;
  newUser!: UserProfile;
  userId = 0;

  result = '';
  gender = '';
  isLoading = false;
  errorMessage = '';

  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private userService: UserService,
    private formatTextService: FormatTextService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.userForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      last_name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      // userImage: new FormControl(''),
    });
  }
  ngOnDestroy(): void {
    console.log('ngUnsubscribe being called.');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  get formControls() {
    return this.userForm.controls;
  }

  calculateBasalMetabolism() {
    if (this.userForm.invalid) return;

    const age = this.userForm.get('age')?.value;
    const height = this.userForm.get('height')?.value;
    const weight = this.userForm.get('weight')?.value;

    if (this.gender === 'female') {
      this.result = (655 + 9.6 * weight + 1.8 * height - 4.7 * age).toFixed(2);
    } else {
      this.result = (66 + 13.7 * weight + 5 * height - 6.8 * age).toFixed(2);
    }

    this.newUser = {
      user_id: this.userId,
      name: this.formatTextService.capitalizeFirstLetter(
        this.userForm.get('name')?.value
      ),
      last_name: this.formatTextService.capitalizeFirstLetter(
        this.userForm.get('last_name')?.value
      ),
      gender: this.userForm.get('gender')?.value,
      age: this.userForm.get('age')?.value,
      height: this.userForm.get('height')?.value,
      weight: this.userForm.get('weight')?.value,
      basalMetabolicRate: parseFloat(this.result),
      // userImage: this.userForm.get('userImage')?.value,
    };
  }
  createDiet() {
    if (this.result === '') {
      this.errorMessage = 'Calcule o gasto basal';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    this.isLoading = true;

    this.userService
      .createUserProfile(this.newUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response.id !== undefined) {
          const id = response.id;
          this.localStorageService.setItem('id', id);
          this.router.navigateByUrl(`diet/${id}`);
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onImageSelect(event: any): void {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = (event) => {
        const newImage = event.target?.result as string;
        this.userForm.patchValue({
          userImage: newImage,
        });
      };
      reader.readAsDataURL(selectedImage);
    }
  }
}
