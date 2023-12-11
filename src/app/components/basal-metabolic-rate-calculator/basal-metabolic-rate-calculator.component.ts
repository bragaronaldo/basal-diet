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
import { User } from 'src/app/interfaces/User';
import { FormatTextService } from 'src/app/services/format-text.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-basal-metabolic-rate-calculator',
  templateUrl: './basal-metabolic-rate-calculator.component.html',
  styleUrls: ['./basal-metabolic-rate-calculator.component.scss'],
  animations: [
    trigger('box', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('1200ms ease-in-out')),
      transition(':leave', animate('1200ms ease-in-out')),
    ]),
    trigger('btn', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('1400ms ease-in-out')),
      transition(':leave', animate('1400ms ease-in-out')),
    ]),
    trigger('errorMsg', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('350ms ease-in-out')),
      transition(':leave', animate('350ms ease-in-out')),
    ]),
  ],
})
export class BasalMetabolicRateCalculatorComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  age!: number;
  height!: number;
  weight!: number;
  selectedGenre: string = 'male';
  result: string = '';

  id!: number;

  errorMsg: string = '';
  imgUrl: string =
    'https://images.pexels.com/photos/19276436/pexels-photo-19276436/free-photo-of-elegante-sofisticado-moda-tendencia.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  constructor(
    private router: Router, private userService: UserService, private formatTextService: FormatTextService, private dataService: DataService) {}

  ngOnInit(): void {}

  calculateBasalMetabolism() {
    if (
      this.firstName == '' ||
      this.lastName == '' ||
      this.age == undefined ||
      this.height == undefined ||
      this.weight == undefined
    ) {
      this.errorMsg = 'Preencha todos os campos';

      setTimeout(() => {
        this.errorMsg = '';
      }, 2000);

      return;
    }

    if (this.selectedGenre === 'female') {
      this.result = (
        447.593 +
        9.247 * this.weight +
        3.098 * this.height -
        4.33 * this.age
      ).toFixed(2);
    } else {
      this.result = (
        1.3 *
        (66.47 + 13.75 * this.weight + 5 * this.height - 6.8 * this.age)
      ).toFixed(2);
    }

    const newUser: User = {
      id: Math.floor(Math.random() * 1000),
      name: this.formatTextService.capitalizeFirstLetter(this.firstName),
      lastName: this.formatTextService.capitalizeFirstLetter(this.lastName),
      selectedGenre: this.selectedGenre,
      age: this.age,
      height: this.height,
      weight: this.weight,
      result: parseFloat(this.result),
    };

    this.id = newUser.id;

    this.userService.createUserData(newUser).subscribe((response) => {
      console.log('Response: ', response);
    });
  }
  createDiet() {
    this.router.navigateByUrl(`refeicoes/${this.id}`);
  }

  radioButtonGender() {
    if (this.selectedGenre == 'female') {
      this.imgUrl =
        'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      return;
    }
    this.imgUrl =
      'https://images.pexels.com/photos/19276436/pexels-photo-19276436/free-photo-of-elegante-sofisticado-moda-tendencia.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  }
}
