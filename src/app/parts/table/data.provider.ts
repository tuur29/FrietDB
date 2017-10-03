
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {MatPaginator} from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

export class Database {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor(data: any[]) {

    // put data into system
    let that = this;
    data.forEach(function(d){
      const copiedData = that.data.slice();

      // temporary use same test data
      for (let i=0;i<50;i++)
        copiedData.push(d);
      that.dataChange.next(copiedData);
    });
  }

  public remove(index: number) {
    // this.dataChange.splice(index,1);
  }
}

// handles pagination, sorting & filtering
export class EditsDataSource extends DataSource<any> {
  constructor(private _database: Database, private _paginator: MatPaginator) {
    super();
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._database.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._database.data.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}
