import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { ShopDataService } from 'app/services/shopdata.service';
import { SnackDataService } from 'app/services/snackdata.service';

import { SessionStorage, WebstorableArray } from 'ngx-store';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatOptionSelectionChange } from '@angular/material';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  // variables
  private snacks: any[];
  private snackCtrl: FormControl = new FormControl();
  private filteredSnacks: Observable<any[]>;

  @SessionStorage() private addedSnacks: WebstorableArray<any> = <any>[];

  private filteredShops: any[];

  constructor(
    public globals: GlobalsService,
    private shopDataService: ShopDataService,
    private snackDataService: SnackDataService,
    public dialogsService: DialogsService) {}

  // filter snacks on search
  filterSnacks(query: string) {
    return this.snacks.filter(snack =>
      snack.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  ngOnInit() {
    this.snackDataService.getSnacks().subscribe(snacks => {
      this.snacks = snacks;
      this.filteredSnacks = this.snackCtrl.valueChanges
        .startWith(null)
        .map(snack => snack ? this.filterSnacks(snack) : this.snacks.slice());
    });

    if (this.addedSnacks) this.refreshShops();
  }

  // click snack in search or fav grid list
  pickSnack(id: string, event?) {

    if (event === undefined || event.source.selected) {

      let alreadyAddedSnack = this.addedSnacks.find((s) => s.id === id);
      if (alreadyAddedSnack) {
        this.editSnackCount(alreadyAddedSnack.id, alreadyAddedSnack.count + 1);
      } else {
        this.snackDataService.getSnack(id).subscribe(snack => {
          let countedSnack = snack;
          countedSnack.count = 1;
          this.addedSnacks.push(countedSnack);
          this.refreshShops();
        });
      }

      setTimeout(() => {
        this.snackCtrl.reset({value: '', disabled: true});
        this.snackCtrl.enable();
      }, 1);

    }

  }

  refreshShops() {
    if (this.addedSnacks.length > 0)
      this.shopDataService.getShopsBySnacks(this.addedSnacks.map(snack => snack._id)).subscribe(shops => {
        this.filteredShops = shops;
      });
  }

  resetOrder() {
    this.addedSnacks = <any>[];
    this.snackCtrl.reset();
  }

  editSnackCount(id: string, count: number) {
    if (count <= 0) {
      this.addedSnacks.splice(
        this.addedSnacks.indexOf(
          this.addedSnacks.find( (s) => s.id === id)
        )
      , 1);
      if (this.addedSnacks) this.refreshShops();
    } else {
      this.addedSnacks.find((s) => s.id === id).count = count;
    }
    this.addedSnacks.save();
  }

  handleMoreInfo(snack: any) {
    if (snack.image != "")
      this.dialogsService.snackinfo(snack.id);
    else if (snack.link != "")
      window.open(snack.link);
  }

  // share order
  print() {
    window.print();
  }

  email() {
    let link: string = '\n\n';

    this.addedSnacks.forEach((s) => {
      link += '\t- ' + s.count + 'x ' + s.name + '\n';
    });

    window.open('mailto:?subject=Lijst%20frieten&body=' + encodeURIComponent(link + '\n'));
  }

}
