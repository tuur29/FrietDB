// TODO: Better name for Order page

import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-header',
  template: `
  
    <md-toolbar color="primary">

      <md-icon>restaurant_menu</md-icon>
      <a routerLink="/">{{title}}</a>

      <span class="spacer"></span>

      <app-searchshop [shops]="shops" [inline]="true"></app-searchshop>
      <a routerLink="order">Bestelling</a>
    </md-toolbar>

  `,
  styles: [`

    md-toolbar a {
      margin: 0 5px;
      color: black;
      text-decoration: none;
    }

    md-toolbar a:hover, md-toolbar a:active, md-toolbar a:focus {
      text-decoration: underline;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .spacer ~ * {
      font-size: 16px;
    }

    app-searchshop {
      margin-right: 20px;
      font-size: 14px !important;
        align-self: flex-end;
    }
    
`]
})
export class HeaderComponent implements OnInit {

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
