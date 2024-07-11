import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FoodAdditionComponent } from './components/food-addition/food-addition.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CookieService } from 'ngx-cookie-service';
import { InterceptorService } from './interceptor/interceptor.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DietComponent } from './components/diet/diet.component';
import { KeyFilterModule } from 'primeng/keyfilter';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FoodAdditionComponent,
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
    DietComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RadioButtonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MessageModule,
    InputTextModule,
    FontAwesomeModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
    KeyFilterModule,
  ],
  providers: [
    provideAnimations(),
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
