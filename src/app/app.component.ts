// TODO: Try AOT compiling faster loading
// TODO: Gather real testdata (default add http to urls)
// TODO: Loading spinner
// TODO: Add tests
// TODO: Implement ngx-router AuthGuard instead of manual auth check
// TODO: Lint
// TODO: Improve typing (Returns, HTMLInputElement, Models / data interfaces...)
// TODO: Cache certain global data? (simple shop list, simple all snacks, auth, snacktypes)
// TODO: Use @Output?

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
