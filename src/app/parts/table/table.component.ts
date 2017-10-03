// TODO: Add filter & sort to table. See: https://stackoverflow.com/questions/45327703/angular-2-material-implementing-sort-filter-and-pagination
// TODO: Checking or removing item from list should update list

import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Database, EditsDataSource } from './data.provider';

import {MdPaginator} from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [`

    [md-ripple] {
      position: relative;
    }

    md-row {
      cursor: pointer;
    }

  `]
})
export class TableComponent implements OnInit {

  @Input() data: any[];

  displayedColumns = ['itemName', 'userName', 'timestamp','buttons'];
  database: Database;
  dataSource: EditsDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor() {
  }

  ngOnInit() {
    this.database = new Database(this.data);
    this.dataSource = new EditsDataSource(this.database, this.paginator);
  }

  formatDate(timestamp: number) {
    return new Date(timestamp * 1000).toISOString().replace('T',' ').slice(0,-5);
  }

  accept(index: number, event) {
    event.stopPropagation();
    this.database.remove(index);
  }

  remove(index: number, event) {
    event.stopPropagation();
    this.database.remove(index);
  }

}