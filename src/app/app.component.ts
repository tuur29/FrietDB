import { Component } from '@angular/core';

@Component({
  selector: 'app',
  styles: [],
  template: `

  <app-header></app-header>
  <router-outlet></router-outlet>
  <footer>Copyright ...</footer>
  
  `
})
export class AppComponent {
  title = 'FrietDB';
}
