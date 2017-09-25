import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  
    <md-toolbar color="primary">
      <span>{{title}}</span>
      <md-icon routerLink="/">home</md-icon>
    </md-toolbar>

  `,
  styles: []
})
export class HeaderComponent implements OnInit {

  title: string;

  constructor() {
    this.title = "FrietDB";
  }

  ngOnInit() {
  }

}
