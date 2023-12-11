import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealTablesComponent } from './components/meal-tables/meal-tables.component';
import { BasalMetabolicRateCalculatorComponent } from './components/basal-metabolic-rate-calculator/basal-metabolic-rate-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: BasalMetabolicRateCalculatorComponent },
  { path: 'refeicoes/:id', component: MealTablesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
