import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodAdditionComponent } from './food-addition.component';

describe('FoodAdditionComponent', () => {
  let component: FoodAdditionComponent;
  let fixture: ComponentFixture<FoodAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodAdditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
