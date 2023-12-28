import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  public onHeaderTextChanged: EventEmitter<string> = new EventEmitter<string>();
}

