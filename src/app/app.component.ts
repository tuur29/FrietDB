// TODO: Gather real testdata (default add http to urls)
// TODO: Check for Observables leaking memory
// TODO: Add loading spinner
// TODO: Add unittests
// TODO: Improve typing (Method returns)
// TODO: Cache data (simple shop list, simple all snacks)

// TODO: Order page map doesn't update correctly
// TODO: Show special error message if server offline
// TODO: Make all component properties private
// TODO: Add newly created snack to editing shop list & show popup link on admin page

// TODO: Redo forms: use ngonsubmit action instead of button onclick
// TODO: Show native html5 validationMessage 
// TODO: Use Formbuilder in ts with html5 arguments instead of ngmodel

// TODO: Add live preview of edited Shop
// TODO: Remove starting newlines from files

import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { GlobalsService } from 'app/services/globals.service';

@Component({
  selector: 'app',
  template: `

    <div class="mat-typography">

      <app-header></app-header>

      <mat-spinner *ngIf="globals.loading"></mat-spinner>

      <div class="container" *ngIf="!globals.loading">
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
  constructor(public globals: GlobalsService) {}
}
