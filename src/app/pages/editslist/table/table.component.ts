import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { Database, EditsDataSource } from './data.provider'

import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort } from '@angular/material';
import { EditsService } from '../../../edits.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [`

    .header {
      display: flex;
      min-height: 64px;
      padding: 8px 24px 0 50px;
      background: #fafafa;
      font-size: 14px;
    }

    mat-table {
      border: 2px solid #fafafa;
    }

    [mat-ripple] {
      position: relative;
    }

    mat-row {
      cursor: pointer;
    }

  `]
})
export class TableComponent implements OnInit {

  @Input() data: any[];

  displayedColumns = ['itemName', 'userName', 'timestamp','buttons'];
  database: Database;
  dataSource: EditsDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(public editsService: EditsService) {
  }

  ngOnInit() {
    this.database = new Database(this.data);
    this.dataSource = new EditsDataSource(this.database, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  formatDate(timestamp: number) {
    return new Date(timestamp * 1000).toISOString().replace('T',' ').slice(0,-5);
  }

  accept(index: number, event) {
    event.stopPropagation();
    this.database.remove(index);
    this.editsService.accept(index);
  }

  remove(index: number, event) {
    event.stopPropagation();
    this.database.remove(index);
    this.editsService.remove(index);
  }

}