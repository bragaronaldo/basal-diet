import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealTablesComponent } from './meal-tables.component';

describe('MealTablesComponent', () => {
  let component: MealTablesComponent;
  let fixture: ComponentFixture<MealTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
