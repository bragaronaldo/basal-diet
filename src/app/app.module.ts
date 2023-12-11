import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasalMetabolicRateCalculatorComponent } from './components/basal-metabolic-rate-calculator/basal-metabolic-rate-calculator.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {provideAnimations} from '@angular/platform-browser/animations';
import { MealTablesComponent } from './components/meal-tables/meal-tables.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    BasalMetabolicRateCalculatorComponent,
    MealTablesComponent,
    HeaderComponent
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
    HttpClientModule
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }