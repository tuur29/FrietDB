import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-header',
  template: `
  
    <md-toolbar color="primary">

      <md-icon>restaurant_menu</md-icon>
      <a routerLink="/">{{title}}</a>

      <span class="spacer"></span>

      <app-searchshop [inline]="true"></app-searchshop>
      <a routerLink="order">Order</a>
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

  constructor(private globals: GlobalsService) {
    this.title = globals.title;
  }

  ngOnInit() {
  }

}
