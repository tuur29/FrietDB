import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';
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
      <ng-container *ngIf="!globals.auth.token;else loggedin">
        <h2>Wil je deze database helpen uitbreiden?</h2>
        <p>Druk dan op de registreer en vul je gegevens in. Alle accounts worden eerst handmatig goedgekeurd. Helaas aanvaard ik momenteel enkel familie en kennissen. </p>
      </ng-container>
      <ng-template #loggedin>
        <h2>Help deze database uit te breiden</h2>
        <p>Met de knop hieronder kan je frituren toevoegen. Naast elke frituur of snack staat ook telkens een knopje om aanpassingen voor te stellen. Eens die aanpassingen (of toevoegingen) goedgekeurd zijn worden ze zichtbaar voor iedereen.</p>
        <p>Het toevoegen van snacks gebeurd tijdens het aanpassen van een frituur, eens beide zijn goedgekeurd worden ze ook zichtbaar op de 'Bestelling' pagina.</p>
        <p><a *ngIf="!globals.auth.admin" mat-raised-button color="accent" routerLink="edit/shop">
          <mat-icon>add</mat-icon>Nieuwe frituur
        </a></p>
      </ng-template>
      <app-login></app-login>
    </mat-card>

  `,
  styles: []
})
export class HomeComponent implements OnInit {

  title: string;
  shops: any[];

  constructor(
    public globals: GlobalsService,
    private shopDataService: ShopDataService
  ) {}

  ngOnInit() {
    this.title = window.document.title;
    this.shopDataService.getShops().subscribe(shops => {
      this.shops = shops;
    });
  }

}
