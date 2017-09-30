import { Component, Input, OnInit } from '@angular/core';

import {Router} from "@angular/router";

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-searchshop',
  template: `
    
    <form class="shop-form">
      <md-form-field color="accent" class="full-width" [floatPlaceholder]="inline?'never':''">

        <button md-icon-button mdPrefix>
          <md-icon>search</md-icon>
        </button>

        <input mdInput placeholder="Zoek naar een frituur" aria-label="Zoek naar een frituur" [mdAutocomplete]="auto" [formControl]="shopCtrl">

        <button *ngIf="shopCtrl.value" mdSuffix md-icon-button aria-label="Reset" (click)="shopCtrl.reset()">
          <md-icon>close</md-icon>
        </button>

        <md-autocomplete #auto="mdAutocomplete">
          <md-option (onSelectionChange)="openShop(shop.id)" *ngFor="let shop of filteredShops | async" [value]="shop.name">
            <span>{{ shop.name }}</span> |
            <small>{{shop.street}} {{shop.municipality}}</small>
          </md-option>
        </md-autocomplete>

      </md-form-field>
    </form>

  `,
  styles: []
})
export class SearchShopComponent implements OnInit {

  @Input() inline: boolean = false;

  shopCtrl: FormControl;
  filteredShops: Observable<any[]>;

  @Input() shops: any[];

  constructor(private router: Router) {

    this.shopCtrl = new FormControl();
    this.filteredShops = this.shopCtrl.valueChanges
        .startWith(null)
        .map(shop => shop ? this.filterShops(shop) : this.shops.slice());
  }

  filterShops(query: string) {
    return this.shops.filter(shop =>
      shop.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      shop.street.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      shop.municipality.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  openShop(id: number) {
    this.router.navigate(['/shop',id]);
  }

  ngOnInit() {
  }

}