import { Component, OnInit } from '@angular/core';
import { ShopDataService } from 'app/services/shopdata.service';

@Component({
  selector: 'app-home',
  template: `

    <mat-card class="small">
      <h1>{{title}}</h1>
      <p>Op deze website kan je het snackaanbod en meer informatie vinden over een aantal frituren. Daarnaast is het ook mogelijk frituren op te zoeken waar al je gewenste snacks op het menu staan.</p>
      <p>Begin je zoektocht naar de beste frituur en/of snacks door hieronder te zoeken of op de kaart een frituur te selecteren.</p>
    </mat-card>

    <mat-card class="small search">
      <app-searchshop></app-searchshop>
    </mat-card>

    <mat-card class="full">
      <app-map [shops]="shops"></app-map>
    </mat-card>

    <mat-card>
      <h2>Wil je deze database helpen uitbreiden?</h2>
      <p>Helaas voeg ik momenteel enkel handmatig nieuwe gebruikers toe.<br>Stuur me een mailtje en dan bezorg ik je zo spoedig mogelijk je inloggegevens.</p>
      <app-login></app-login>
    </mat-card>

  `,
  styles: []
})
export class HomeComponent implements OnInit {

  title: string;
  shops: any[];

  constructor( private shopDataService: ShopDataService ) {}

  ngOnInit() {
    this.title = window.document.title;
    this.shopDataService.getShops().subscribe(shops => {
      this.shops = shops;
    });
  }

}
