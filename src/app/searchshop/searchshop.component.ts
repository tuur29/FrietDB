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

        <input mdInput placeholder="Zoek frituur" aria-label="Zoek frituur" [mdAutocomplete]="auto" [formControl]="shopCtrl">

        <md-icon mdSuffix>search</md-icon>

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
  shops: any[] = [
    {
      id: 1,
      name: 'Frietshop',
      street: 'Straat1',
      number: '41',
      municipality: "Gemeente",
      lat: 51.673858,
      lng: 7.815982,
    },
    {
      id: 2,
      name: 'Frietshop',
      street: 'Straat2',
      number: '334',
      municipality: "Gemeente",
      lat: 51.373858,
      lng: 7.215982,
    },
    {
      id: 3,
      name: 'Frituur Nadine',
      street: 'Straat3',
      number: '2',
      municipality: "Gemeente",
      lat: 51.723858,
      lng: 7.895982,
    },
    {
      id: 4,
      name: 'Langs de waterkant',
      street: 'Straat4',
      number: '55',
      municipality: "Gemeente",
      lat: 51.925,
      lng: 8,
    }
  ];

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
