// TODO: Show edit snacks popups when logged in

import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalsService } from 'globals.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { GreaterThanPipe } from './filter-snacks.pipe';

import {Router,NavigationStart} from '@angular/router';
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
  private confirmText: string = "Je bestelling wordt niet opgeslagen, ben je zeker dat je naar een andere pagina wilt gaan?";

  snacksAdded: boolean = false;
  router: Router;

  snackCtrl: FormControl;
  filteredSnacks: Observable<any[]>;
  snacks: any[];

  filteredShops: any[];

  constructor(
    private r: Router,
    private globals: GlobalsService,
    private greaterThanPipe: GreaterThanPipe,
    private dialogsService: DialogsService) {

    // get globals
    this.filteredShops = globals.shops;
    this.snacks = globals.snacks;

    // add count property
    this.snacks.forEach(function(s) { s.count = 0 });

    // filter snacks on search
    this.snackCtrl = new FormControl();
    this.filteredSnacks = this.snackCtrl.valueChanges
      .startWith(null)
      .map(snack => snack ? this.filterSnacks(snack) : this.snacks.slice());

    // prompt when navigating away when snacks added
    this.router = r;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart)
        if (event.url != "/order" && this.router.url == "/order")
          if (this.snacksAdded)
            if (!confirm(this.confirmText))
              this.router.navigate(['/order']);
    });

  }

  filterSnacks(query: string) {
    return this.snacks.filter(snack =>
      snack.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  // prompt when navigating away when snacks added
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    if (this.snacksAdded)
      return false;
  }

  // click snack in search or fav grid list
  pickSnack(id: number, event?) {

    if (event === undefined || event.source.selected) {
      this.snacksAdded = true;
      this.snacks.find(s=>s.id===id).count++;

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
    this.snacks.forEach(function(s) { s.count = 0 });
    this.snacksAdded = false;
    this.snackCtrl.reset();
  }

  editSnackCount(id:number, count: number) {
    if (count < 0) count = 0;
    this.snacks.find(s=>s.id===id).count = count;

    if (this.greaterThanPipe.transform(this.snacks,"count",0).length < 1 )
      this.snacksAdded = false;
  }

  // share order
  print() {
    window.print();
  }

  email() {
    let link: string = '\n\n';

    this.greaterThanPipe.transform(this.snacks,"count",0).forEach(function(s){

      link += '\t- '+s.count+'x '+s.name+'\n';
    });

    window.open('mailto:?subject=Lijst%20frieten&body='+encodeURIComponent(link+'\n'));
  }

  ngOnInit() {
  }

}
