import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ShopDataService } from 'app/services/shopdata.service';

import { removeDiacritics } from 'removeDiacritics';


import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-searchshop',
  template: `

    <form>
      <mat-form-field class="full-width" [floatPlaceholder]="inheader?'never':''">

        <button mat-icon-button matPrefix>
          <mat-icon>search</mat-icon>
        </button>

        <input type="search" matInput placeholder="Zoek naar een frituur" aria-label="Zoek naar een frituur" [matAutocomplete]="autocomplete" [formControl]="shopCtrl">

        <button *ngIf="shopCtrl.value" matSuffix mat-icon-button aria-label="Reset" (click)="shopCtrl.reset()">
          <mat-icon>close</mat-icon>
        </button>

        <mat-autocomplete #autocomplete="matAutocomplete">
          <mat-option (onSelectionChange)="openShop(shop.id,$event)" *ngFor="let shop of filteredShops | async" [value]="shop.name">
            <span>{{shop.name}} <mat-icon class="color-green" *ngIf="shop.vegi">check_circle</mat-icon></span> |
            <small>{{shop.street}} {{shop.municipality}}</small>
          </mat-option>
        </mat-autocomplete>

      </mat-form-field>
    </form>

  `,
  styles: [`

    mat-option mat-icon {
      margin: 0;
      font-size: 1em;
      vertical-align: sub;
    }

  `]
})
export class SearchShopComponent implements OnInit {

  @Input() inheader: boolean = false;

  shopCtrl: FormControl = new FormControl();
  filteredShops: Observable<any[]>;

  shops: any[];

  constructor(
    private router: Router,
    private shopDataservice: ShopDataService,
  ) {}

  ngOnInit() {
    if (this.inheader)
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd)
          this.getShops();
      });
    else
      this.getShops();
  }

  getShops() {
    this.shopDataservice.getShops().subscribe(shops => {
      this.shops = shops;
      this.filteredShops = this.shopCtrl.valueChanges
        .startWith(null)
        .map((shop) => shop ? this.filterShops(shop) : this.shops.slice());
    });
  }

  filterShops(query: string) {
    if (query.length < 3) return this.shops;

    let start = '(?=.*';
    let end = ')';
    let parts = query.split(' ');
    parts = parts.map((e) => removeDiacritics(e));
    let regex = new RegExp( start+parts.join(end+start)+end ,"ig" );

    return this.shops.filter(shop => {
        let str = shop.name+' '+shop.street+' '+shop.municipality;
        if ( removeDiacritics(str).match(regex) )
          return true;
      }
    );
  }

  openShop(id: string, event?) {
    if (event === undefined || event.source.selected) {
      this.router.navigate(['/shop', id]);
      
      setTimeout(() => {
        this.shopCtrl.reset({value: '', disabled: true});
        this.shopCtrl.enable();
      }, 1);
    }
  }

}
