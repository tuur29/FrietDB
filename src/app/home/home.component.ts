import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-home',
  styles: [`

    h1 {
      text-align: center;
    }
    
  `],
  template: `

    <h1>{{title}} is under construction!</h1>
    
  `
})
export class HomeComponent implements OnInit {

  title: string;

  constructor(private globals: GlobalsService) {
    this.title = globals.title;
  }

  ngOnInit() {
  }

}
