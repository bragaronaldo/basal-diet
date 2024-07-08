import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { OpacityAnimation } from 'src/app/animations/opacity.animation';
import { UserProfile } from 'src/app/interfaces/UserProfile';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderService } from 'src/app/services/header.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [OpacityAnimation]
})
export class HeaderComponent implements OnInit {
  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  userData$ = new Observable<UserProfile>();
  id = '';
  totalCalories = '';
  totalProteins = '';
  totalCarbohydrates = '';
  totalFats = '';
  weight = 0;

  showCarbohydrateAmount = false;
  showProteinAmount = false;
  showFatAmount = false;

  caloriesValue = this.headerService.totalCalories.subscribe((response) => {
    this.totalCalories = response;
  });

  proteinsValue = this.headerService.totalProteins.subscribe((response) => {
    this.totalProteins = response;
  });
  carbohydratesValue = this.headerService.totalCarbohydrates.subscribe(
    (response) => {
      this.totalCarbohydrates = response;
    }
  );
  fatsValue = this.headerService.totalFats.subscribe((response) => {
    this.totalFats = response;
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getUserData(this.id);
    });
  }
  getUserData(id: string) {
    this.userData$ = this.userService.getUserProfile(id).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((userData: any) => userData[0])
    );
  }
  calculateGramKilogram(macro: string , weight: number) {
    const macroValue = Number(macro);
    const response = macroValue / weight;
    return response.toFixed(2);
  }
  toggleNutrientValue(nutrient: 'showCarbohydrateAmount' | 'showProteinAmount' | 'showFatAmount', value: boolean) {
    this[nutrient] = value;
  }
  logout() {
    this.authService.logout();
  }
}

