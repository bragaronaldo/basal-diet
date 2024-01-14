import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { Food, FoodTable } from 'src/app/interfaces/FoodTable';
import { FoodTableService } from 'src/app/services/food-table.service';
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
  foodTable: FoodTable[] = [];

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

  foodTables$ = new Observable<FoodTable[]>();
  foods: Food[] = [];

  selectedMeal: any;
  selectedFood: any;

  newMeal: string = '';
  totalCalories: number = 0;

  constructor(
    private formatTextService: FormatTextService,
    private tableService: FoodTableService,
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.loadTables();
    });
  }

  calculateTotalCalories(id: number) {
    let totalCalories = 0;
    const allFoods = this.getFoodsForTable(id);
    allFoods.map((data)=> totalCalories += data.calories);
    return totalCalories
  }

  loadTables() {
    this.foodTables$ = this.tableService.getTables(this.userId);
    this.loadFoods();
  }
  loadFoods() {
    this.tableService.getFoodsByUserId(this.userId).subscribe((response) => {
      this.foods = response;
      // this.calculateTotalCalories();
    });
  }
  getFoodsForTable(tableId: number): Food[] {
    if (!this.foods) return [];

    return this.foods.filter((food) => food.tableIndex === tableId);
  }

  addNewTable() {
    if (this.newMeal === '') {
      this.newMeal = 'Refeição';
    }

    const newTable: FoodTable = {
      userIndex: this.userId,
      name: this.formatTextService.capitalizeFirstLetter(this.newMeal),
    };

    this.tableService.createNewTable(newTable).subscribe(() => {
      this.loadTables();
    });

    this.newMeal = '';
    this.visible = false;
  }
  addNewFood() {
    const newFood: Food = {
      userIndex: this.userId,
      tableIndex: this.newFoodId,
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

    this.tableService.createNewFood(newFood).subscribe(() => {
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
    return carb * 4 + protein * 4 + fat * 9;
  }
  editMeal() {
    this.tableService.edirMeal(this.selectedMeal).subscribe(() => {
      this.editMealVisible = false;
      this.selectedMeal = null;
      this.loadTables();
    });
  }
  editFood() {
    this.selectedFood.calories = this.calculateCalories(
      this.selectedFood.carbohydrates,
      this.selectedFood.proteins,
      this.selectedFood.fats
    );

    this.tableService.editFood(this.selectedFood).subscribe(() => {
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
    this.tableService.deleteFood(this.foodId).subscribe(() => {
      this.deleteFoodVisible = false;
      this.loadTables();
    });
  }
  deleteTable() {
    this.tableService.deleteTable(this.mealId).subscribe(() => {
      this.deleteMealVisible = false;
      this.loadTables();
    });
  }
  showDialog() {
    this.visible = true;
  }
  showEditMealModal(meal: FoodTable) {
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
