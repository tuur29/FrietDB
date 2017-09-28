import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `

    <app-header></app-header>
    <div class="container">
      <router-outlet></router-outlet>
      <footer>Copyright ...</footer>
    </div>
  
  `,
  styles: [`
  
    .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 0 15px;
    }

    footer {
      margin: 20px 0;
      text-align: center;
    }

  `],
})
export class AppComponent { }
