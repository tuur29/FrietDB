import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from './messages/messages.service';

// TODO: Gather real testdata

// TODO: Check when making new snack if snack name already exists
// TODO: Lazy load modules! & prefetch public modules
// TODO: Show snackbar error if http requests failed
// TODO: Add shopIds field to snack -> on shop remove: remove snack if shopIds < 2
// TODO: Use Mongoose .pre() instead of in router + dual link between snack & shop ?
// TODO: Hide _id field from frontend (now used in editshop & editsnack components)

@Component({
  selector: 'app',
  template: `

    <div class="mat-typography">

      <app-header></app-header>

      <div class="loader" *ngIf="globals.loading">
        <mat-spinner></mat-spinner>
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

  ngOnInit() {
    this.http.get(environment.backendurl).map((response) =>
      response.json()
    ).catch((error:any) => {
      this.messagesService.send("Server is niet bereikbaar!",'Probeer opniew').subscribe(() => window.location.reload());
      return Observable.throw(error.json().error || 'Server error')
    }).subscribe();
  }
}
