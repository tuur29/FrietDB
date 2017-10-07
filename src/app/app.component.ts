// TODO: Try AOT compiling faster loading
// TODO: Gather real testdata & Make data interfaces (default add http to urls)
// TODO: Loading spinner
// TODO: Change {Wrong} import backets to { Nice } ones
// TODO: Switch material theme primary & accent colors -> remove accent definitions
// TODO: Move table part to editslist folder

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
