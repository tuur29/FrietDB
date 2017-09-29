// TODO: Logged in -> Add & edit shops  (Expansion Panels)
// TODO: Ask for account (+- register) form
// TODO: Loading spinner

// TODO: Better logo (puntzak) & Favicon
// TODO: Gather real testdata
// TODO: First release & Github Pages (remove from gitignore)

// TODO: Snackbar everywhere accessible for showing errors
// TODO: Snack image wall -> toggle for order page ("graphic search")
// TODO: Heatmap card with most frituren in de buurt

import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `

    <div class="mat-typography">

      <app-header></app-header>
      
      <div class="container">
        <router-outlet></router-outlet>
        <footer>Copyright © 2017 Tuur Lievens.</footer>
      </div>

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
