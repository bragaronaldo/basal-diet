import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FoodAdditionComponent } from './components/food-addition/food-addition.component';
import { AuthGuard } from './guards/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DietComponent } from './components/diet/diet.component';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, canActivate: [LoggedGuard], data: { animation: 'signup' } },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard], data: { animation: 'login' } },
  { path: 'profile/:id', component: UserProfileComponent, canActivate: [AuthGuard], data: {animation: 'profile'} },
  { path: 'diet/:id', component: DietComponent, canActivate: [AuthGuard], data: {animation: 'diet'} },
  { path: 'adicionar-alimento', component: FoodAdditionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
