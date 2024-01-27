import { Component, OnInit } from '@angular/core';
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
export class BasalMetabolicRateCalculatorComponent implements OnInit {
  selectedGenre: string = 'male';
  result: string = '';

  id!: number;

  userForm!: FormGroup;
  userData!: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private formatTextService: FormatTextService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl(Validators.required),
      height: new FormControl(Validators.required),
      weight: new FormControl(Validators.required),
      userImage: new FormControl(''),
    });
  }
  get formControls() {
    return this.userForm.controls;
  }

  // loadUser() {
  //   this.userService.getUserData('1').subscribe((response) => {
  //     console.log("RESPONSE!", response.lastName);

  //   })
  // }

  calculateBasalMetabolism() {
    if (this.userForm.invalid) {
      return;
    }

    const age = this.userForm.get('age')?.value;
    const height = this.userForm.get('height')?.value;
    const weight = this.userForm.get('weight')?.value;

    if (this.selectedGenre === 'female') {
      this.result = (
        447.593 +
        9.247 * weight +
        3.098 * height -
        4.33 * age
      ).toFixed(2);
    } else {
      this.result = (
        1.3 *
        (66.47 + 13.75 * weight + 5 * height - 6.8 * age)
      ).toFixed(2);
    }

    const newUser: User = {
      name: this.formatTextService.capitalizeFirstLetter(
        this.userForm.get('name')?.value
      ),
      lastName: this.formatTextService.capitalizeFirstLetter(
        this.userForm.get('lastName')?.value
      ),
      selectedGenre: this.selectedGenre,
      age: this.userForm.get('age')?.value,
      height: this.userForm.get('height')?.value,
      weight: this.userForm.get('weight')?.value,
      basalMetabolicRate: parseFloat(this.result),
      userImage: this.userForm.get('userImage')?.value
    };

    this.userService.createUserData(newUser).subscribe((response) => {
      if (response.id !== undefined) {
        this.id = response.id;
      }
    });
  }
  createDiet() {
    this.router.navigateByUrl(`refeicoes/${this.id}`);
  }

  radioButtonGender() {
    if (this.selectedGenre == 'female') {
      return;
    }
  }

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
