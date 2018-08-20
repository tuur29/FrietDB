import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from './messages/messages.service';

@Component({
  selector: 'app',
  template: `

    <div class="mat-typography">

      <app-header></app-header>

      <div class="loader cdk-overlay-container" *ngIf="globals.loading && !globals.failed">
        <div class="cdk-overlay-backdrop cdk-overlay-backdrop-showing">
        </div>
        <div class="cdk-global-overlay-wrapper">
          <mat-spinner *ngIf="!globals.failed"></mat-spinner>
        </div>
      </div>

      <div class="container">
        <router-outlet></router-outlet>
        <footer>Made by <a class="color-primary" href="https://www.tuurlievens.net/">Tuur Lievens</a>.<br> Source code is hosted on <a class="color-primary" href="https://github.com/tuur29/FrietDB">Github</a>.</footer>
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
