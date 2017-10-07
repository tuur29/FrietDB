import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'globals.service';
import { DialogsService } from '../../dialogs/dialogs.service';

import { LocalStorage, WebstorableArray } from 'ngx-store';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatOptionSelectionChange } from '@angular/material';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss',]
})
export class OrderComponent implements OnInit {

  // variables
  snacks: any[];
  snackCtrl: FormControl = new FormControl();
  filteredSnacks: Observable<any[]>;

  @LocalStorage() addedSnacks: WebstorableArray<any> = <any>[];

  filteredShops: any[];

  constructor(
    public globals: GlobalsService,
    public dialogsService: DialogsService) {

    // get globals
    this.filteredShops = globals.shops;
    this.snacks = globals.snacks;
  }

  // filter snacks on search
  filterSnacks(query: string) {
    return this.snacks.filter(snack =>
      snack.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  ngOnInit() {
    this.filteredSnacks = this.snackCtrl.valueChanges
      .startWith(null)
      .map(snack => snack ? this.filterSnacks(snack) : this.snacks.slice());
  }

  // click snack in search or fav grid list
  pickSnack(id: number, event?) {

    if (event === undefined || event.source.selected) {

      let alreadyAddedSnack = this.addedSnacks.find(s=>s.id===id);
      if (alreadyAddedSnack) {
        this.editSnackCount(alreadyAddedSnack.id, alreadyAddedSnack.count+1);
      } else {
        let countedSnack = this.snacks.find(s=>s.id===id);
        countedSnack.count = 1;
        this.addedSnacks.push(countedSnack);
      }

      setTimeout(() => {
        this.snackCtrl.reset({value:"",disabled:true});
        this.snackCtrl.enable();
      },1);
    }

    // todo request and reload filtered shops

  }

  resetOrder() {
    this.addedSnacks = <any>[];
    this.snackCtrl.reset();
  }

  editSnackCount(id:number, count: number) {
    if (count <= 0) {
      this.addedSnacks.splice(
        this.addedSnacks.indexOf(
          this.addedSnacks.find(s=>s.id===id)
        )
      , 1);
    } else {
      this.addedSnacks.find(s=>s.id===id).count = count;
    }
    this.addedSnacks.save();
  }

  // share order
  print() {
    window.print();
  }

  email() {
    let link: string = '\n\n';

    this.addedSnacks.forEach((s) => {
      link += '\t- '+s.count+'x '+s.name+'\n';
    });

    window.open('mailto:?subject=Lijst%20frieten&body='+encodeURIComponent(link+'\n'));
  }

}
