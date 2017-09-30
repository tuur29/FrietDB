// TODO: Try AOT compiling faster loading
// TODO: Gather real testdata
// TODO: Loading spinner

// TODO: Add & edit shops (new page with expansion Panels, add link on shop page)
// TODO: Review edits (list) -> all inputs disabled except accept or deny

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
