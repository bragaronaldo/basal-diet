import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public totalCalories: EventEmitter<string> = new EventEmitter<string>();
  public totalProteins: EventEmitter<string> = new EventEmitter<string>();
  public totalCarbohydrates: EventEmitter<string> = new EventEmitter<string>();
  public totalFats: EventEmitter<string> = new EventEmitter<string>();
}

