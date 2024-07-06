import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  trigger,
  state,
  animate,
  transition,
  style,
} from '@angular/animations';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormatTextService } from 'src/app/services/format-text.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/interfaces/User';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-basal-metabolic-rate-calculator',
  templateUrl: './basal-metabolic-rate-calculator.component.html',
  styleUrls: ['./basal-metabolic-rate-calculator.component.scss'],
  animations: [
    trigger('box', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('500ms ease-in-out')),
      transition(':leave', animate('500ms ease-in-out')),
    ]),
    trigger('btn', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('500ms ease-in-out')),
      transition(':leave', animate('500ms ease-in-out')),
    ]),
  ],
})
export class BasalMetabolicRateCalculatorComponent
  implements OnInit, OnDestroy
{
  userForm!: FormGroup;
  userData!: User;

  result = '';
  id!: number;
  gender = '';

  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private userService: UserService,
    private formatTextService: FormatTextService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      last_name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl(Validators.required, Validators.pattern('^[0-9]*$')),
      height: new FormControl(
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ),
      weight: new FormControl(
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ),
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

    const newUser: User = {
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

    this.userService
      .createUserData(newUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response.id !== undefined) {
          this.id = response.id;
        }
      });
  }
  createDiet() {
    this.router.navigateByUrl(`refeicoes/${this.id}`);
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
