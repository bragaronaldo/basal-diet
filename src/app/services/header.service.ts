import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  public totalCalories: EventEmitter<string> = new EventEmitter<string>();
}

