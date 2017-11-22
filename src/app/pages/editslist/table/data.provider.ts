import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort } from '@angular/material';

import { removeDiacritics } from 'removeDiacritics';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

export class Database {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor(data: any[]) {
    // put data into system
    this.dataChange.next(data);
  }

  public remove(index) {
    const copiedData = this.data.slice();
    copiedData.splice(index, 1);
    this.dataChange.next(copiedData);
  }
}

// handles pagination, sorting & filtering
export class EditsDataSource extends DataSource<any> {

  private _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: any[] = [];
  renderedData: any[] = [];

  constructor(private _database: Database,
              private _paginator: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._database.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._database.data.slice().filter((row: any) => {
        let searchStr = (removeDiacritics(row.user.name + row.item.name)).toLowerCase();
        return searchStr.indexOf(removeDiacritics(this.filter).toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  disconnect() {
    this._filterChange.unsubscribe();
  }

  sortData(data: any[]): any[] {
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'itemName': [propertyA, propertyB] = [a.item.name, b.item.name]; break;
        case 'userName': [propertyA, propertyB] = [a.user.name, b.user.name]; break;
        case 'timestamp': [propertyA, propertyB] = [a.timestamp, b.timestamp]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
