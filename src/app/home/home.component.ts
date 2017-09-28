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

    <md-card class="small">
      <form class="shop-form">
        <md-form-field color="accent" class="full-width">
          <input mdInput placeholder="Naam frituur" aria-label="Naam frituur" [mdAutocomplete]="auto" [formControl]="shopCtrl">
          <md-icon mdSuffix>search</md-icon>
          <md-autocomplete #auto="mdAutocomplete">
            <md-option (onSelectionChange)="openShop(shop.id)" *ngFor="let shop of filteredShops | async" [value]="shop.name">
              <span>{{ shop.name }}</span> |
              <small>Locatie: {{shop.location}}</small>
            </md-option>
          </md-autocomplete>
        </md-form-field>
      </form>
    </md-card>

    <app-map></app-map>
    <app-login></app-login>
    
  `,
  styles: [`

    .full-width {
      width: 100%;
    }
    
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
      location: 'Straat, Gemeente',
    },
    {
      id: 2,
      name: 'Frietshop',
      location: 'Straat1, Gemeente',
    },
    {
      id: 3,
      name: 'Frituur Nadine',
      location: 'Straat2, Gemeente',
    },
    {
      id: 4,
      name: 'Langs de waterkant',
      location: 'Straat, Gemeente',
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
      shop.location.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  openShop(id: number) {
    this.router.navigate(['/shop',id]);
  }

  ngOnInit() {
  }

}
