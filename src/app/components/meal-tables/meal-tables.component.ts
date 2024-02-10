import { FoodDTO } from './../../interfaces/foodDTO';
import { NutritionixService } from './../../nutritionix.service';
import { state, style, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { Food, Meal } from 'src/app/interfaces/MealTable';
import { MealTableService } from 'src/app/services/meal-table.service';
import { FormatTextService } from 'src/app/services/format-text.service';
import { HeaderService } from 'src/app/services/header.service';
import { FoodQuery } from 'src/app/interfaces/foodQuery';
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
    this.selectedFood.carbohydrates = this.carbohydrate;
    this.selectedFood.proteins = this.protein;
    this.selectedFood.fats = this.fat;
    this.selectedFood.name = this.foodName;

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

    this.dialogHeaderName = 'Novo Alimento';
    this.dialogButtonName = 'Adicionar';

    this.newFoodId = id;
    this.visibleNewFood = true;
  }

  deleteFood() {
    this.mealService.deleteFood(this.foodId).subscribe(() => {
      this.deleteFoodVisible = false;
      this.loadMeals();
    });
  }
  deleteMeal() {
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
    // console.log('SELECTED FOOD: ', this.selectedFood);

    //
    this.foodName = this.selectedFood.name;
    this.amount = this.selectedFood.amount;
    this.carbohydrate = this.selectedFood.carbohydrates;
    this.protein = this.selectedFood.proteins;
    this.fat = this.selectedFood.fats;
    // console.log("THIS: ", this.carbohydrate);

    //

    this.dialogHeaderName = 'Editar Alimento';
    this.dialogButtonName = 'Salvar';

    this.originalWeight = this.selectedFood.amount;
    // this.originalProteinAmount = this.selectedFood.proteins;
    this.originalCarbohydrateAmount = this.selectedFood.carbohydrates;
    this.originalFatAmount = this.selectedFood.fats;

    this.editFoodVisible = true;
  }

  updateDefaultMacronutrientValuesOnEdit() {
    this.originalProteinAmount = this.protein!;
    this.originalCarbohydrateAmount = this.carbohydrate!;
    this.originalFatAmount = this.fat!;
  }

  suggestions: any[] = [];
  foodPhoto: string = '';
  foodPreviewName: string = '';
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
    this.protein = this.responseMockUp.foods[0].nf_protein;
    this.carbohydrate = this.responseMockUp.foods[0].nf_total_carbohydrate;
    this.fat = this.responseMockUp.foods[0].nf_total_fat;
    this.amount = this.responseMockUp.foods[0].serving_weight_grams;

    this.originalWeight = this.responseMockUp.foods[0].serving_weight_grams!;
    this.originalProteinAmount = this.responseMockUp.foods[0].nf_protein!;
    this.originalCarbohydrateAmount =
      this.responseMockUp.foods[0].nf_total_carbohydrate!;
    this.originalFatAmount = this.responseMockUp.foods[0].nf_total_fat!;

    // this.protein = this.foundedFood.foods[0].nf_protein;
    // this.carbohydrate = this.foundedFood.foods[0].nf_total_carbohydrate;
    // this.fat = this.foundedFood.foods[0].nf_total_fat;
    // this.amount = this.foundedFood.foods[0].serving_weight_grams;
  }

  response: any;

  search(event: any) {
    const foodQuery: FoodQuery = {
      query: event.query,
    };

    this.foodPhoto = this.responseMockUp.foods[0].photo.thumb;
    this.foodPreviewName = this.responseMockUp.foods[0].food_name;

    this.suggestions = this.responseMockUp.foods
      .map((food) => {
        return foodQuery.query === food.food_name ? food.food_name : null;
      })
      .filter((name) => name !== null);

    // this.response = this.nutritionixService
    //   .getFoodDetails(foodQuery)
    //   .subscribe((response) => {
    //     this.foundedFood = response;

    //     this.foodPhoto = response.foods[0].photo.thumb;
    //     this.foodPreviewName = response.foods[0].food_name;
    //     this.suggestions = response.foods
    //       .map((food) => {
    //         return foodQuery.query === food.food_name ? food.food_name : null;
    //       })
    //       .filter((name) => name !== null);
    //   });
  }

  originalWeight: number = 0;
  originalProteinAmount: number = 0;
  originalCarbohydrateAmount: number = 0;
  originalFatAmount: number = 0;

  changeMacronutriensValue() {
    console.log('MUDAR');

    const newCarbohydrateAmount = this.calculateMacronutrientsByWeight(
      this.originalWeight,
      this.originalCarbohydrateAmount!,
      this.amount!
    );
    const newProteinAmount = this.calculateMacronutrientsByWeight(
      this.originalWeight,
      this.originalProteinAmount!,
      this.amount!
    );
    const newFatAmount = this.calculateMacronutrientsByWeight(
      this.originalWeight,
      this.originalFatAmount!,
      this.amount!
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

  dialogHeaderName: string = '';
  dialogButtonName: string = '';

  // saveFood(): void {
  //   this.editFoodVisible = false;

  //   if (this.isCreateMode) {
  //     this.addNewFood();
  //     return;
  //   }

  //   this.editFood();
  // }
}
