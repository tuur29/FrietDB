import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { Database, EditsDataSource } from './data.provider';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort } from '@angular/material';
import { DialogsService } from '../../../dialogs/dialogs.service';
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

    mat-icon {
      vertical-align: middle;
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
  @Input() type: string;

  displayedColumns = ['itemName', 'userName', 'timestamp', 'buttons'];
  database: Database;
  dataSource: EditsDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private router: Router,
    public editDataService: EditDataService,
    public dialogsService: DialogsService
  ) {}

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

  handleClick(index: number, id: string) {
    if (this.type == "snack") {
      this.dialogsService.editsnack(id).subscribe((data) => {
        if (data)
          this.database.remove(index);
      });
    } else {
      this.router.navigate(["/edit/"+id]);
    }
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
      if (this.type == "shop") this.router.navigate(['/error/302/edits']); // reload this page
      this.database.remove(index);
    });
  }

}
