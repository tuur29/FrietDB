import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';

@Component({
  selector: 'app-header',
  template: `

    <mat-toolbar color="accent">

      <img src="assets/logo.svg" alt="Logo" width="35" height="35">
      <a routerLink="/">{{title}}</a>

      <span class="spacer"></span>

      <app-searchshop [inheader]="true"></app-searchshop>
      <a routerLink="order">Bestelling</a>
      <a routerLink="heatmap">Heatmap</a>
      <a routerLink="edits" *ngIf="globals.auth.admin && globals.auth.token">Aanpassingen</a>
    </mat-toolbar>

  `,
  styles: [`

    @media (max-width: 550px) {
      app-searchshop {
        display: none;
      }
    }

    mat-toolbar a {
      margin: 0 5px;
      color: black;
      text-decoration: none;
    }

    mat-toolbar a:hover, mat-toolbar a:active, mat-toolbar a:focus {
      text-decoration: underline;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .spacer ~ * {
      font-size: 16px;
    }

    app-searchshop {
      width: 250px;
      margin-right: 20px;
      font-size: 14px !important;
        align-self: flex-end;
    }

`]
})
export class HeaderComponent implements OnInit {

  private title: string;

  constructor(public globals: GlobalsService) {
    this.title = window.document.title;
  }

  ngOnInit() {
  }

}
