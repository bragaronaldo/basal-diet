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
import { Table, Tables } from 'src/app/interfaces/Table';
import { FoodTableService } from 'src/app/services/food-table.service';
import { FormatTextService } from 'src/app/services/format-text.service';
@Component({
  selector: 'app-meal-tables',
  templateUrl: './meal-tables.component.html',
  styleUrls: ['./meal-tables.component.scss'],
  animations: [
    trigger('box', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('300ms ease-in-out')),
      transition(':leave', animate('300ms ease-in-out')),
    ]),
  ],
})
export class MealTablesComponent implements OnInit {
  tables: Tables = [];

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

  showDialog(id: number) {
    this.tableId = id;
    this.visible = true;
  }

  constructor(
    private formatTextService: FormatTextService,
    private tableService: FoodTableService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.loadTables();
    });
  }

  loadTables() {
    console.log(this.userId);

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

    this.tableService.createNewTable(newTable).subscribe(() => {
    });
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
}
