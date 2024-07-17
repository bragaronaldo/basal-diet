import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserProfile } from 'src/app/interfaces/UserProfile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeaderService } from 'src/app/services/header.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private renderer: Renderer2, private el: ElementRef
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

  carousel_pages = [1, 2]

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
  show = false;
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
  editProfile() {
    const user_id = this.localStorageService.getItem('user_id');
    this.router.navigate(['profile', user_id]);
  }
}

