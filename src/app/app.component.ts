// TODO: Gather real testdata (default add http to urls)
// TODO: Check for Observables leaking memory
// TODO: Add loading spinner
// TODO: Add unittests
// TODO: Improve typing (Returns, HTMLInputElement, Models / data interfaces...)
// TODO: Cache data (simple shop list, simple all snacks, snacktypes)
// TODO: Redo forms: use ngonsubmit action instead of button onclick
// TODO: Show native html5 validationMessage 
// TODO: Use Formbuilder in ts with html5 arguments instead of ngmodel

import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

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
export class AppComponent {
  constructor(private http: Http) {
    this.http.get("http://localhost:4200/api/items").map(res => res.json()).subscribe(data => console.log(data) );
  }
}
