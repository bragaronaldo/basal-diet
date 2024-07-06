import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealTablesComponent } from './components/meal-tables/meal-tables.component';
import { BasalMetabolicRateCalculatorComponent } from './components/basal-metabolic-rate-calculator/basal-metabolic-rate-calculator.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FoodAdditionComponent } from './components/food-addition/food-addition.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: BasalMetabolicRateCalculatorComponent },
  { path: 'refeicoes/:id', component: MealTablesComponent },
  { path: 'adicionar-alimento', component: FoodAdditionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
