// TODO: Better name for Order page
// TODO: Add links for new shop (loggedin) & editslist (admin)

import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-header',
  template: `
  
    <md-toolbar color="primary">

      <img src="assets/logo.svg" alt="Logo" width="35" height="35">
      <a routerLink="/">{{title}}</a>

      <span class="spacer"></span>

      <app-searchshop [shops]="shops" [inline]="true"></app-searchshop>
      <a routerLink="order">Bestelling</a>
      <a routerLink="heatmap">Heatmap</a>
      <a routerLink="edits" *ngIf="globals.auth.admin && globals.auth.token">Aanpassingen</a>
    </md-toolbar>

  `,
  styles: [`

    @media (max-width: 550px) {
      app-searchshop {
        display: none;
      }
    }

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
  shops: any[];

  constructor(public globals: GlobalsService) {
    this.title = globals.title;
    this.shops = globals.shops;
  }

  ngOnInit() {
  }

}
