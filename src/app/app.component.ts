import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from './messages/messages.service';

// TODO: Gather real testdata

// TODO: Add route guards
// TODO: show alert on navigation when editshop/editsnack dirty
// TODO: Add shopIds field to snack -> on shop remove: remove snack if shopIds < 2
// TODO: Use Mongoose .pre() instead of in router + dual link between snack & shop?

@Component({
  selector: 'app',
  template: `

    <div class="mat-typography">

      <app-header></app-header>

      <div class="loader cdk-overlay-container" *ngIf="globals.loading">
        <div class="cdk-overlay-backdrop cdk-overlay-backdrop-showing">
        </div>
        <div class="cdk-global-overlay-wrapper">
          <mat-spinner></mat-spinner>
        </div>
      </div>

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
export class AppComponent implements OnInit{
  constructor(
    public globals: GlobalsService,
    public messagesService: MessagesService,
    private http: Http
  ) {}

  ngOnInit() {}
}
