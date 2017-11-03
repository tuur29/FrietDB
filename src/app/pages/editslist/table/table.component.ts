import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { Database, EditsDataSource } from './data.provider';

import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort } from '@angular/material';
import { EditDataService } from '../../../services/editdata.service';

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

    .mat-paginator[hidden] {
      display: none;
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

  @Input() private data: any[];
  @Input() private type: string;

  private displayedColumns = ['itemName', 'userName', 'timestamp', 'buttons'];
  private database: Database;
  private dataSource: EditsDataSource | null;

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;
  @ViewChild('filter') private filter: ElementRef;

  constructor(public editDataService: EditDataService) {}

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
    return new Date(timestamp * 1000).toISOString().replace('T', ' ').slice(0, -5);
  }

  accept(id: string, index: number, event) {
    event.stopPropagation();
    this.editDataService.accept(id).subscribe((res) => {
      this.database.remove(index);
    });
  }

  remove(id: string, index: number, event) {
    event.stopPropagation();
    this.editDataService.remove(id).subscribe((res) => {
      this.database.remove(index);
    });
  }

}
