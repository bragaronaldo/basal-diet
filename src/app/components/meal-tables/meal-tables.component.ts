import { state, style, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { Food, Meal } from 'src/app/interfaces/MealTable';
import { MealTableService } from 'src/app/services/meal-table.service';
import { FormatTextService } from 'src/app/services/format-text.service';
import { HeaderService } from 'src/app/services/header.service';
@Component({
  selector: 'app-meal-tables',
  templateUrl: './meal-tables.component.html',
  styleUrls: ['./meal-tables.component.scss'],
  animations: [
    trigger('box', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      // transition(':enter', animate('300ms ease-in-out')),
      // transition(':leave', animate('30ms ease-in-out')),
    ]),
  ],
})
export class MealTablesComponent implements OnInit {
  foodTable: Meal[] = [];

  foodName?: string;
  amount?: number;
  carbohydrate?: number;
  protein?: number;
  fat?: number;

  visible: boolean = false;
  deleteFoodVisible: boolean = false;
  deleteMealVisible: boolean = false;
  editFoodVisible: boolean = false;
  visibleNewFood: boolean = false;
  editMealVisible: boolean = false;

  userId!: number;
  newFoodId: number = 0;
  foodId: number = 0;
  mealId: number = 0;

  mealTables$ = new Observable<Meal[]>();
  foods: Food[] = [];

  selectedMeal: any;
  selectedFood: any;

  newMeal: string = '';
  allMealsCalories: number = 0;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private formatTextService: FormatTextService,
    private mealService: MealTableService,
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.loadMeals();
    });
  }
  ngOnDestroy(): void {
    console.log('ngUnsubscribe being called.');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  calculateAllMealsCalories() {
    this.mealService
      .getFoodsByUserId(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.foods = response;
        response.map((data) => (this.allMealsCalories += data.calories));
        this.headerService.totalCalories.next(this.allMealsCalories.toFixed(2));
      });
  }
  calculateTotalNutrients(id: number) {
    let totalCalories = 0;
    let totalCarbohydrates = 0;
    let totalProteins = 0;
    let totalFats = 0;
    const allFoods = this.getFoodsForMeal(id);

    allFoods.forEach((data) => {
      totalCalories += data.calories;
      totalCarbohydrates += data.carbohydrates;
      totalProteins += data.proteins;
      totalFats += data.fats;
    });

    const formattedTotalCarbohydrates = totalCarbohydrates.toFixed(2);
    const formattedTotalProteins = totalProteins.toFixed(2);
    const formattedTotalCalories = totalCalories.toFixed(2);
    const formattedTotalFats = totalFats.toFixed(2);

    return {
      totalCarbohydrates: formattedTotalCarbohydrates,
      totalProteins: formattedTotalProteins,
      totalCalories: formattedTotalCalories,
      totalFats: formattedTotalFats,
    };
  }

  getFoodsForMeal(tableId: number): Food[] {
    if (!this.foods) return [];
    return this.foods.filter((food) => food.mealIndex === tableId);
  }
  loadMeals() {
    this.mealTables$ = this.mealService
      .getMeals(this.userId)
      .pipe(map((data) => data));
    this.loadFoods();
  }
  loadFoods() {
    this.allMealsCalories = 0;

    this.calculateAllMealsCalories();
  }
  addNewTable() {
    if (this.newMeal === '') {
      this.newMeal = 'Refeição';
    }

    const newTable: Meal = {
      userIndex: this.userId,
      name: this.formatTextService.capitalizeFirstLetter(this.newMeal),
    };

    this.mealService.createNewMeal(newTable).subscribe(() => {
      this.loadMeals();
    });

    this.newMeal = '';
    this.visible = false;
  }
  addNewFood() {
    const newFood: Food = {
      userIndex: this.userId,
      mealIndex: this.newFoodId,
      name: this.formatTextService.capitalizeFirstLetter(this.foodName!),
      amount: this.amount!,
      carbohydrates: this.carbohydrate!,
      proteins: this.protein!,
      fats: this.fat!,
      calories: this.calculateCalories(
        this.carbohydrate!,
        this.protein!,
        this.fat!
      ),
    };

    this.mealService.createNewFood(newFood).subscribe(() => {
      this.loadFoods();
    });

    this.foodName = undefined;
    this.amount = undefined;
    this.carbohydrate = undefined;
    this.protein = undefined;
    this.fat = undefined;

    this.visibleNewFood = false;
  }
  calculateCalories(carb: number, protein: number, fat: number) {
    const calories: Number = carb * 4 + protein * 4 + fat * 9;
    return Number(calories.toFixed(2));
  }
  editMeal() {
    const formattedMeal = this.formatTextService.capitalizeFirstLetter(
      this.selectedMeal.name
    );
    this.selectedMeal.name = formattedMeal;

    this.mealService.editMeal(this.selectedMeal).subscribe(() => {
      this.editMealVisible = false;
      this.selectedMeal = null;
      this.loadMeals();
    });
  }
  editFood() {
    this.selectedFood.calories = this.calculateCalories(
      this.selectedFood.carbohydrates,
      this.selectedFood.proteins,
      this.selectedFood.fats
    );

    const formattedFood = this.formatTextService.capitalizeFirstLetter(
      this.selectedFood.name
    );
    this.selectedFood.name = formattedFood;

    this.mealService.editFood(this.selectedFood).subscribe(() => {
      this.loadFoods();
      this.editFoodVisible = false;
      this.selectedFood = null;
    });
  }

  showNewFoodDialog(id: number) {
    this.foodName = undefined;
    this.amount = undefined;
    this.carbohydrate = undefined;
    this.protein = undefined;
    this.fat = undefined;

    this.newFoodId = id;
    this.visibleNewFood = true;
  }

  deleteFood() {
    this.mealService.deleteFood(this.foodId).subscribe(() => {
      this.deleteFoodVisible = false;
      this.loadMeals();
    });
  }
  deleteTable() {
    this.mealService.deleteMeal(this.mealId).subscribe(() => {
      this.deleteMealVisible = false;
      this.loadMeals();
    });
  }
  showDialog() {
    this.visible = true;
  }
  showEditMealModal(meal: Meal) {
    this.selectedMeal = JSON.parse(JSON.stringify(meal));
    this.editMealVisible = true;
  }
  showDeleteFoodModal(id: number) {
    this.foodId = id;
    this.deleteFoodVisible = true;
  }
  showDeleteMealModal(id: number) {
    this.mealId = id;
    this.deleteMealVisible = true;
  }
  showEditFoodModal(food: Food) {
    this.selectedFood = JSON.parse(JSON.stringify(food));
    this.editFoodVisible = true;
  }
}
