// TODO: Add & edit shops (new page with expansion Panels, add link on shop page)
// TODO: Review edits (list) -> all inputs disabled except accept or deny
// TODO: Ask for account (+- register) form -> popup
// TODO: Loading spinner

// TODO: Better logo (puntzak) & Favicon
// TODO: Gather real testdata
// TODO: Add meta tags & Simple style loading message
// TODO: Fake homepage (menu & intro text) -> faster loading
// TODO: Load big vendor packages from CDN (package)
// TODO: Add limited API key to Github Pages (obfuscated?)

// TODO: Snack image wall -> toggle for order page (most picked or top via cookie)
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
