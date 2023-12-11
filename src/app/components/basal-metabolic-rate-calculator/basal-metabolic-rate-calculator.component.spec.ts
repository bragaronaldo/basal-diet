import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasalMetabolicRateCalculatorComponent } from './basal-metabolic-rate-calculator.component';

describe('BasalMetabolicRateCalculatorComponent', () => {
  let component: BasalMetabolicRateCalculatorComponent;
  let fixture: ComponentFixture<BasalMetabolicRateCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasalMetabolicRateCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasalMetabolicRateCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
