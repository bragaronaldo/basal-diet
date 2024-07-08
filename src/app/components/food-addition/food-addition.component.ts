import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FoodDB } from 'src/app/interfaces/foodDB';
import { Food } from 'src/app/interfaces/MealTable';
import { DietService } from 'src/app/services/diet.service';

@Component({
  selector: 'app-food-addition',
  templateUrl: './food-addition.component.html',
  styleUrls: ['./food-addition.component.scss'],
})
export class FoodAdditionComponent implements OnInit {
  foodForm!: FormGroup;
  foodData!: FoodDB;

  visible = false;

  constructor(private formBuilder: FormBuilder, private dietService: DietService) {}
  ngOnInit(): void {
    this.foodForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      weight: new FormControl(
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ),
      carbohydrates: new FormControl(
        Validators.required,
        Validators.pattern('^[0-9]+(.[0-9]+)?$')
      ),
      proteins: new FormControl(
        Validators.required,
        Validators.pattern('^[0-9]+(.[0-9]+)?$')
      ),
      fats: new FormControl(
        Validators.required,
        Validators.pattern('^[0-9]+(.[0-9]+)?$')
      ),
    });
    this.getFood();
  }

  get formControls() {
    return this.foodForm.controls;
  }

  addFood() {
    if (this.foodForm.invalid) return;

    const name = this.foodForm.get('name')?.value;
    const weight = this.foodForm.get('weight')?.value;
    const carbohydrates = this.foodForm.get('carbohydrates')?.value;
    const proteins = this.foodForm.get('proteins')?.value;
    const fats = this.foodForm.get('fats')?.value;
  }

  foods: Food[] = []

  getFood() {
    this.dietService.getFoodsByUserId(1).subscribe((response) => {
      this.foods = response;
      console.log("FOODS!: ", this.foods);

    });
  }
  openFoodModal() {
    this.visible = true;
  }

}
