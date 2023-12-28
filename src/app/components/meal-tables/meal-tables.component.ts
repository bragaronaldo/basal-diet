import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alimento } from 'src/app/interfaces/Alimento';
import { Table, Tables, newTable } from 'src/app/interfaces/Table';
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
  tables: Tables = [];
  newTables: newTable[] = [];

  alimento: string = '';
  peso?: number;
  carboidratos?: number;
  proteinas?: number;
  gorduras?: number;
  calorias?: number;

  visible: boolean = false;
  tableId: number = 0;
  colIndex?: number;

  userId!: number;

  newMeal: string = '';
  // showDialog(id: number) {
  //   this.tableId = id;
  //   this.visible = true;
  // }

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
    for (let i: number = 0; i < 1; i++) {
      this.addNewTable2();
    }
  }
  ngAfterContentInit() {
    this.headerService.onHeaderTextChanged.next('CCCC');
  }
  loadTables() {
    // console.log(this.userId);

    this.tableService.getTablesByUserId(this.userId).subscribe((response) => {
      this.tables = response;
      this.tables.forEach((table) => {
        this.loadFoods(table.id);
      });
    });
  }
  loadFoods(id: number) {
    this.tableService.getFoodsByTableId(id).subscribe((response) => {
      let table = this.tables.find((item) => item.id === id);
      if (table) {
        table.alimentos = response;
      }
    });
  }
  addNewTable(valueId: number) {
    const newTable: Table = {
      cols: [
        { field: 'peso', header: 'Peso (g)' },
        { field: 'alimento', header: 'Alimentos' },
        { field: 'carboidratos', header: 'Carboidratos' },
        { field: 'proteinas', header: 'Proteínas' },
        { field: 'gorduras', header: 'Gorduras' },
        { field: 'calorias', header: 'Calorias' },
      ],
      alimentos: [],
      id: Math.floor(Math.random() * 5000),
      userIndex: this.userId,
      tableIndex: valueId,
    };

    this.tables.push(newTable);

    this.tableService.createNewTable(newTable).subscribe(() => {});
  }

  addNewTable2() {
    if (this.newMeal === '') {
      this.newMeal = 'Refeição';
    }

    const newTable: newTable = {
      userIndex: this.userId,
      name: this.formatTextService.capitalizeFirstLetter(this.newMeal),
    };

    this.newTables.push(newTable);
    this.newMeal = '';
    this.visible = false;
  }

  addNewFood() {
    const newFood: Alimento = {
      tableIndex: this.tableId,
      id: Math.floor(Math.random() * 100),
      alimento: this.formatTextService.capitalizeFirstLetter(this.alimento),
      peso: this.peso,
      carboidratos: this.carboidratos,
      proteinas: this.proteinas,
      gorduras: this.gorduras,
      calorias: this.calorias,
    };
    this.visible = false;
    this.alimento = '';
    this.peso = undefined;
    this.carboidratos = undefined;
    this.proteinas = undefined;
    this.gorduras = undefined;

    this.tableService.createNewFood(newFood).subscribe(() => {
      this.loadTables();
    });
  }
  deleteFood(id: number) {
    this.tableService.deleteFood(id).subscribe(() => {
      this.loadTables();
    });
  }
  deleteTable(id: number) {
    const deleteItem = this.tables.findIndex((objeto) => objeto.id == id);
    if (deleteItem !== -1) {
      this.tables.splice(deleteItem, 1);
    }
    this.tableService.deleteTable(id).subscribe(() => {});
    this.loadTables();
  }
  showDialog() {
    this.visible = true;
  }
}
