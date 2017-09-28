import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `

    <app-header></app-header>
    <router-outlet></router-outlet>
    <footer>Copyright ...</footer>
  
  `,
  styles: [`

    footer {
      text-align: center;
    }

  `],
})
export class AppComponent { }
