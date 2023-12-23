import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTestComponent } from './forms-test.component';

describe('FormsTestComponent', () => {
  let component: FormsTestComponent;
  let fixture: ComponentFixture<FormsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
