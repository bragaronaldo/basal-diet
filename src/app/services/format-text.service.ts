import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatTextService {

  constructor() { }

  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
}
