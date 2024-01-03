import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasalMetabolicRateCalculatorComponent } from './components/basal-metabolic-rate-calculator/basal-metabolic-rate-calculator.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {provideAnimations} from '@angular/platform-browser/animations';
import { MealTablesComponent } from './components/meal-tables/meal-tables.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FormsTestComponent } from './components/forms-test/forms-test.component';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { InputTestComponent } from './components/input-test/input-test.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    BasalMetabolicRateCalculatorComponent,
    MealTablesComponent,
    HeaderComponent,
    FormsTestComponent,
    InputTestComponent,
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
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
