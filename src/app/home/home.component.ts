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
      <app-searchshop [shops]="shops"></app-searchshop>
    </md-card>

    <md-card class="full">
      <app-map [shops]="shops"></app-map>
    </md-card>

    <md-card>
      <app-login></app-login>
    </md-card>
    
  `,
  styles: [`


    
  `]
})
export class HomeComponent implements OnInit {

  title: string;

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

  constructor(private globals: GlobalsService) {
    this.title = globals.title;
  }

  ngOnInit() {
  }

}
