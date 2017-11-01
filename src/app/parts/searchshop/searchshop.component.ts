import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ShopDataService } from 'app/services/shopdata.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-searchshop',
  template: `

    <form>
      <mat-form-field class="full-width" [floatPlaceholder]="inline?'never':''">

        <button mat-icon-button matPrefix>
          <mat-icon>search</mat-icon>
        </button>

        <input type="search" matInput placeholder="Zoek naar een frituur" aria-label="Zoek naar een frituur" [matAutocomplete]="autocomplete" [formControl]="shopCtrl">

        <button *ngIf="shopCtrl.value" matSuffix mat-icon-button aria-label="Reset" (click)="shopCtrl.reset()">
          <mat-icon>close</mat-icon>
        </button>

        <mat-autocomplete #autocomplete="matAutocomplete">
          <mat-option (onSelectionChange)="openShop(shop.id,$event)" *ngFor="let shop of filteredShops | async" [value]="shop.name">
            <span>{{shop.name}}</span> |
            <small>{{shop.street}} {{shop.municipality}}</small>
          </mat-option>
        </mat-autocomplete>

      </mat-form-field>
    </form>

  `,
  styles: []
})
export class SearchShopComponent implements OnInit {

  @Input() inline: boolean = false;

  shopCtrl: FormControl = new FormControl();
  filteredShops: Observable<any[]>;

  shops: any[];

  constructor(
    private router: Router,
    private shopDataservice: ShopDataService,
  ) {}

  ngOnInit() {
    this.shopDataservice.getShops().subscribe(shops => {
      this.shops = shops;
      this.filteredShops = this.shopCtrl.valueChanges
        .startWith(null)
        .map((shop) => shop ? this.filterShops(shop) : this.shops.slice());
    });
  }

  filterShops(query: string) {
    return this.shops.filter(shop =>
      shop.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      shop.street.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      shop.municipality.toLowerCase().indexOf(query.toLowerCase()) > -1
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
