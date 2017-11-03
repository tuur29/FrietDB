import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from './messages/messages.service';

// TODO: Gather real testdata (default add http to urls)
// TODO: Check for Observables leaking memory
// TODO: Add loading spinner
// TODO: Add unittests
// TODO: Improve typing (Method returns)

// TODO: Order page map doesn't update correctly
// TODO: Add newly created snack to editing shop list & show popup link on admin page
// TODO: Add live preview of edited Shop

// TODO: Redo forms: use ngonsubmit action instead of button onclick
// TODO: Show native html5 validationMessage 
// TODO: Use Formbuilder in ts with html5 arguments instead of ngmodel


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
export class AppComponent implements OnInit{
  constructor(
    public globals: GlobalsService,
    public messagesService: MessagesService,
    private http: Http
  ) {}

  ngOnInit() {
    this.http.get(environment.backendurl).map((response) =>
      response.json()
    ).catch((error:any) => {
      this.messagesService.send("Server is niet bereikbaar!",'Probeer opniew').subscribe(() => window.location.reload());
      return Observable.throw(error.json().error || 'Server error')
    }).subscribe();
  }
}
