import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
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
  visibleNewFood: boolean = false;

  userId!: number;
  newFoodId: number = 0;

  foodTables$ = new Observable<FoodTable[]>();
  foods: Food[] = [];

  newMeal: string = '';

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

  loadTables() {
    this.foodTables$ = this.tableService.getTables(this.userId);
    this.loadFoods();
  }
  loadFoods() {
    this.tableService.getFoodsByUserId(this.userId).subscribe((response) => {
      this.foods = response;
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

    this.tableService.createNewTable(newTable).subscribe((response) => {
      // console.log('Response: ', response);
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
      calories: 0,
    };

    this.tableService.createNewFood(newFood).subscribe((response) => {
      console.log('Response: ', response);
      this.loadFoods();
    });

    this.foodName = undefined;
    this.amount = undefined;
    this.carbohydrate = undefined;
    this.protein = undefined;
    this.fat = undefined;

    this.visibleNewFood = false;
  }


  showNewFoodDialog(id: number) {
    this.newFoodId = id;
    this.visibleNewFood = true;
  }

  deleteFood(id: number) {
    this.tableService.deleteFood(id).subscribe(() => {
      // this.loadTables();
    });
  }
  // deleteTable(id: number) {
  //   const deleteItem = this.tables.findIndex((objeto) => objeto.id == id);
  //   if (deleteItem !== -1) {
  //     this.tables.splice(deleteItem, 1);
  //   }
  //   this.tableService.deleteTable(id).subscribe(() => {});
  //   this.loadTables();
  // }
  showDialog() {
    this.visible = true;
  }
}
