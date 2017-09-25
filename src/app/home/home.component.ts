import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `

    <h1>{{title}} is under construction!</h1>
    <button md-raised-button color="accent" routerLink="/page">Ok!</button>

  `,
  styles: [`

  h1 {
    text-align: center;
  }

  `]
})
export class HomeComponent implements OnInit {

  title: string;

  constructor() {
    this.title = "FrietDB";
  }

  ngOnInit() {
  }

}
