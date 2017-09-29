import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-home',
  template: `

    <md-card class="small">
      <h1>{{title}}</h1>
      <p>Op deze website kan je het snackaanbod en meer informatie vinden over een aantal frituren. Daarnaast is het ook mogelijk frituren op te zoeken waar al je gewenste snacks op het menu staan.</p>
      <p>Begin je zoektocht naar de beste frituur en/of snacks door hieronder te zoeken of op de kaart een frituur te selecteren.</p>
    </md-card>

    <md-card class="small search">
      <app-searchshop></app-searchshop>
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

  constructor(private globals: GlobalsService) {
    this.title = globals.title;
  }

  ngOnInit() {
  }

}
