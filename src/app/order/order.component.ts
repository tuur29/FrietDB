// TODO: Show edit snacks popups when logged in
// TODO: Fix tooltips not showing because in md-list-item

import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalsService } from 'globals.service';
import { DialogsService } from '../dialogs/dialogs.service';

import { LocalStorage, WebstorableArray } from 'ngx-store';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {MdOptionSelectionChange} from '@angular/material';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss',]
})
export class OrderComponent implements OnInit {

  // variables
  snacks: any[];
  snackCtrl: FormControl;
  filteredSnacks: Observable<any[]>;

  @LocalStorage() addedSnacks: WebstorableArray<any> = <any>[];

  filteredShops: any[];

  constructor(
    private globals: GlobalsService,
    private dialogsService: DialogsService) {

    // get globals
    this.filteredShops = globals.shops;
    this.snacks = globals.snacks;

    // filter snacks on search
    this.snackCtrl = new FormControl();
    this.filteredSnacks = this.snackCtrl.valueChanges
      .startWith(null)
      .map(snack => snack ? this.filterSnacks(snack) : this.snacks.slice());

  }

  filterSnacks(query: string) {
    return this.snacks.filter(snack =>
      snack.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
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

      let ctrl = this.snackCtrl;
      setTimeout(function() {
        ctrl.reset({value:"",disabled:true});
        ctrl.enable();
      },1);
    }

    // todo request and reload filtered shops

  }

  openDialog(snack) {
    if (snack.image || snack.link)
      this.dialogsService.snackinfo(snack.id);
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

    this.addedSnacks.forEach(function(s){
      link += '\t- '+s.count+'x '+s.name+'\n';
    });

    window.open('mailto:?subject=Lijst%20frieten&body='+encodeURIComponent(link+'\n'));
  }

  ngOnInit() {
  }

}
