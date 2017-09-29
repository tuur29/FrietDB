import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'globals.service';

import {Router} from "@angular/router";

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  template: `

    <md-card class="small">
      <h1>{{title}}</h1>
      <p>Op deze website kan je het snackaanbod en meer informatie vinden over een aantal frituren. Daarnaast is het ook mogelijk frituren op te zoeken waar al je gewenste snacks op het menu staan.</p>
      <p>Begin je zoektocht naar de beste frituur en/of snacks door hieronder te zoeken of op de kaart een frituur te selecteren.</p>
    </md-card>

    <md-card class="small search">
      <form class="shop-form">
        <md-form-field color="accent" class="full-width">
          <input mdInput placeholder="Naam frituur" aria-label="Naam frituur" [mdAutocomplete]="auto" [formControl]="shopCtrl">
          <md-icon mdSuffix>search</md-icon>
          <md-autocomplete #auto="mdAutocomplete">
            <md-option (onSelectionChange)="openShop(shop.id)" *ngFor="let shop of filteredShops | async" [value]="shop.name">
              <span>{{ shop.name }}</span> |
              <small>{{shop.street}} {{shop.municipality}}</small>
            </md-option>
          </md-autocomplete>
        </md-form-field>
      </form>
    </md-card>

    <md-card class="full">
      <app-map [shops]="shops"></app-map>
    </md-card>

    <app-login></app-login>
    
  `,
  styles: [`


    
  `]
})
export class HomeComponent implements OnInit {

  title: string;

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

  constructor(private globals: GlobalsService, private router: Router) {
    this.title = globals.title;

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
