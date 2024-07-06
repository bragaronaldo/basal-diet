import { FoodDTO } from './../../interfaces/foodDTO';
import { state, style, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Food, Meal } from 'src/app/interfaces/MealTable';
import { MealTableService } from 'src/app/services/meal-table.service';
import { FormatTextService } from 'src/app/services/format-text.service';
import { HeaderService } from 'src/app/services/header.service';
import { FoodQuery } from 'src/app/interfaces/foodQuery';
import { NutritionixService } from 'src/app/nutritionix.service';
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
export class MealTablesComponent implements OnInit, OnDestroy {
  foodTable: Meal[] = [];

  foodName?: string;
  amount?: number;
  carbohydrate?: number;
  protein?: number;
  fat?: number;

  visible = false;
  deleteFoodVisible = false;
  deleteMealVisible = false;
  editFoodVisible = false;
  visibleNewFood = false;
  editMealVisible = false;

  userId!: number;
  newFoodId = 0;
  foodId = 0;
  mealId = 0;

  mealTables$ = new Observable<Meal[]>();
  foods: Food[] = [];

  selectedMeal?: Meal | null;
  selectedFood?: Food | null;

  newMeal = '';

  allMealsCalories = 0;
  allMealsProteins = 0;
  allMealsCarbohydrates = 0;
  allMealsFats = 0;

  isLoading = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private formatTextService: FormatTextService,
    private mealService: MealTableService,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private nutritionixService: NutritionixService
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
    this.allMealsCarbohydrates = 0;
    this.allMealsProteins = 0;
    this.allMealsFats = 0;

    this.mealService
      .getFoodsByUserId(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.foods = response;
        response.map(
          (data) => (
            (this.allMealsCalories += data.calories),
            (this.allMealsProteins += data.proteins),
            (this.allMealsCarbohydrates += data.carbohydrates),
            (this.allMealsFats += data.fats)
          )
        );

        this.headerService.totalCalories.next(this.allMealsCalories.toFixed(2));
        this.headerService.totalProteins.next(this.allMealsProteins.toFixed(2));
        this.headerService.totalCarbohydrates.next(
          this.allMealsCarbohydrates.toFixed(2)
        );
        this.headerService.totalFats.next(this.allMealsFats.toFixed(2));
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
    return this.foods.filter((food) => food.meal_id === tableId);
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
    this.isLoading = true;
    if (this.newMeal === '') {
      this.newMeal = 'Refeição';
    }

    const newTable: Meal = {
      user_id: this.userId,
      name: this.formatTextService.capitalizeFirstLetter(this.newMeal),
    };

    this.mealService.createNewMeal(newTable).subscribe(() => {
      this.loadMeals();
      this.newMeal = '';
      this.visible = false;
    });
  }

  addNewFood() {
    this.isLoading = true;
    const newFood: Food = {
      user_id: this.userId,
      meal_id: this.newFoodId,
      name: this.formatTextService.capitalizeFirstLetter(this.foodName ?? ''),
      amount: this.amount ?? 0,
      carbohydrates: this.carbohydrate ?? 0,
      proteins: this.protein ?? 0,
      fats: this.fat ?? 0,
      calories: this.calculateCalories(
        this.carbohydrate ?? 0,
        this.protein ?? 0,
        this.fat ?? 0
      ),
    };

    this.mealService.createNewFood(newFood).subscribe(() => {
      this.loadFoods();
      this.foodName = undefined;
      this.amount = undefined;
      this.carbohydrate = undefined;
      this.protein = undefined;
      this.fat = undefined;

      this.visibleNewFood = false;
    });
  }
  calculateCalories(carb: number, protein: number, fat: number) {
    const calories: number = carb * 4 + protein * 4 + fat * 9;
    return Number(calories.toFixed(2));
  }

  editMeal() {
    this.isLoading = true;
    if (this.selectedMeal) {
      const formattedMeal = this.formatTextService.capitalizeFirstLetter(
        this.selectedMeal.name
      );
      this.selectedMeal.name = formattedMeal;

      this.mealService.editMeal(this.selectedMeal).subscribe(() => {
        this.editMealVisible = false;
        delete this.selectedMeal;
        this.selectedMeal = null;
        this.loadMeals();
      });
    }
  }
  editFood() {
    this.isLoading = true;
    if (this.selectedFood) {
      this.selectedFood.carbohydrates = this.carbohydrate ?? 0;
      this.selectedFood.proteins = this.protein ?? 0;
      this.selectedFood.fats = this.fat ?? 0;
      this.selectedFood.name = this.foodName ?? '';

      const formattedFood = this.formatTextService.capitalizeFirstLetter(
        this.selectedFood.name
      );

      const calories = this.calculateCalories(
        this.selectedFood.carbohydrates,
        this.selectedFood.proteins,
        this.selectedFood.fats
      );

      this.selectedFood.name = formattedFood;
      this.selectedFood.amount = this.amount ?? 0;
      this.selectedFood.calories = calories;

      this.mealService.editFood(this.selectedFood).subscribe(() => {
        this.loadFoods();
        this.editFoodVisible = false;
        this.selectedFood = null;
      });
    }
  }

  showNewFoodDialog(id: number) {
    this.isLoading = false;
    this.foodName = undefined;
    this.amount = undefined;
    this.carbohydrate = undefined;
    this.protein = undefined;
    this.fat = undefined;

    this.originalCarbohydrateAmount = null;
    this.originalProteinAmount = null;
    this.originalFatAmount = null;

    this.newFoodId = id;
    this.visibleNewFood = true;
  }

  deleteFood() {
    this.isLoading = true;
    this.mealService.deleteFood(this.foodId).subscribe(() => {
      this.deleteFoodVisible = false;
      this.loadMeals();
    });
  }
  deleteMeal() {
    this.isLoading = true;
    this.mealService.deleteMeal(this.mealId).subscribe(() => {
      this.deleteMealVisible = false;
      this.loadMeals();
    });
  }
  showNewMealDialog() {
    this.isLoading = false;
    this.newMeal = '';
    this.visible = true;
  }
  showEditMealModal(meal: Meal) {
    this.isLoading = false;
    this.selectedMeal = JSON.parse(JSON.stringify(meal));
    this.editMealVisible = true;
  }
  showDeleteFoodModal(id: number) {
    this.isLoading = false;
    this.foodId = id;
    this.deleteFoodVisible = true;
  }
  showDeleteMealModal(id: number) {
    this.isLoading = false;
    this.mealId = id;
    this.deleteMealVisible = true;
  }
  showEditFoodModal(food: Food) {
    this.isLoading = false;
    this.selectedFood = JSON.parse(JSON.stringify(food));

    if (this.selectedFood) {
      this.foodName = this.selectedFood.name;
      this.amount = this.selectedFood.amount;
      this.carbohydrate = this.selectedFood.carbohydrates;
      this.protein = this.selectedFood.proteins;
      this.fat = this.selectedFood.fats;

      this.originalWeight = this.selectedFood.amount;
      this.originalProteinAmount = this.selectedFood.proteins;
      this.originalCarbohydrateAmount = this.selectedFood.carbohydrates;
      this.originalFatAmount = this.selectedFood.fats;

      this.editFoodVisible = true;
    }
  }

  updateDefaultMacronutrientValuesOnEdit() {
    this.originalWeight = this.amount ?? 0;
    this.originalProteinAmount = this.protein ?? 0;
    this.originalCarbohydrateAmount = this.carbohydrate ?? 0;
    this.originalFatAmount = this.fat ?? 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  suggestions: any[] = [];
  foodPhoto = '';
  foodPreviewName = '';
  foundedFood!: FoodDTO;

  responseMockUp: FoodDTO = {
    foods: [
      {
        food_name: 'banana',
        nf_protein: 2.3,
        nf_total_carbohydrate: 18,
        nf_total_fat: 0.4,
        serving_weight_grams: 120,
        photo: {
          highres: '',
          is_user_uploaded: false,
          thumb:
            'https://static1.minhavida.com.br/ingredients/7d/a0/ab/c5/banana-cortada-em-rodelas-em-cima-de-mesa-de-madeira-orig-1.jpg',
        },
      },
    ],
  };

  fillNutrient() {
    // this.protein = this.responseMockUp.foods[0].nf_protein;
    // this.carbohydrate = this.responseMockUp.foods[0].nf_total_carbohydrate;
    // this.fat = this.responseMockUp.foods[0].nf_total_fat;
    // this.amount = this.responseMockUp.foods[0].serving_weight_grams;

    // this.originalWeight =
    //   this.responseMockUp.foods[0].serving_weight_grams ?? 0;
    // this.originalProteinAmount = this.responseMockUp.foods[0].nf_protein ?? 0;
    // this.originalCarbohydrateAmount =
    //   this.responseMockUp.foods[0].nf_total_carbohydrate ?? 0;
    // this.originalFatAmount = this.responseMockUp.foods[0].nf_total_fat ?? 0;

    this.protein = this.foundedFood.foods[0].nf_protein;
    this.carbohydrate = this.foundedFood.foods[0].nf_total_carbohydrate;
    this.fat = this.foundedFood.foods[0].nf_total_fat;
    this.amount = this.foundedFood.foods[0].serving_weight_grams;

    this.originalWeight = this.foundedFood.foods[0].serving_weight_grams ?? 0;
    this.originalProteinAmount = this.foundedFood.foods[0].nf_protein ?? 0;
    this.originalCarbohydrateAmount =
      this.foundedFood.foods[0].nf_total_carbohydrate ?? 0;
    this.originalFatAmount = this.foundedFood.foods[0].nf_total_fat ?? 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  search(event: any) {
    const foodQuery: FoodQuery = {
      query: event.query,
    };

    this.foodPhoto = this.responseMockUp.foods[0].photo.thumb;
    this.foodPreviewName = this.responseMockUp.foods[0].food_name;

    // this.suggestions = this.responseMockUp.foods
    //   .map((food) => {
    //     return foodQuery.query === food.food_name ? food.food_name : null;
    //   })
    //   .filter((name) => name !== null);

    this.nutritionixService.getFoodDetails(foodQuery).subscribe((response) => {
      this.foundedFood = response;

      this.foodPhoto = response.foods[0].photo.thumb;
      this.foodPreviewName = response.foods[0].food_name;
      this.suggestions = response.foods
        .map((food) => {
          return foodQuery.query === food.food_name ? food.food_name : null;
        })
        .filter((name) => name !== null);
    });
  }

  originalWeight: number | null = 0;
  originalProteinAmount: number | null = 0;
  originalCarbohydrateAmount: number | null = 0;
  originalFatAmount: number | null = 0;

  changeMacronutriensValue() {
    const newCarbohydrateAmount = this.calculateMacronutrientsByWeight(
      this.originalWeight ?? 0,
      this.originalCarbohydrateAmount ?? 0,
      this.amount ?? 0
    );
    const newProteinAmount = this.calculateMacronutrientsByWeight(
      this.originalWeight ?? 0,
      this.originalProteinAmount ?? 0,
      this.amount ?? 0
    );
    const newFatAmount = this.calculateMacronutrientsByWeight(
      this.originalWeight ?? 0,
      this.originalFatAmount ?? 0,
      this.amount ?? 0
    );

    this.carbohydrate = newCarbohydrateAmount;
    this.protein = newProteinAmount;
    this.fat = newFatAmount;
  }

  calculateMacronutrientsByWeight(
    originalWeight: number,
    currentValue: number,
    newWeight: number
  ) {
    const result = (newWeight * currentValue) / originalWeight;
    return parseFloat(result.toFixed(2));
  }
}
