import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { MessagesService } from '../../messages/messages.service';

@Component({
  selector: 'app-error',
  template: `

    <md-card>
      <h1>Error</h1>
      <p>Het ziet er naar uit dat je geen toegang hebt tot deze pagina, gelieve je hieronder eerst in te loggen. </p>
      <p><a routerLink="/">Terug naar homepagina</a></p>
      <app-login></app-login>
    </md-card>

    
  `,
  styles: [`

  `]
})
export class ErrorComponent implements OnInit {
  
  private status: number = 404;

  constructor(
    private router: Router,
    private messagesService: MessagesService
  ) {

    if (this.status != 403) {

      let old = this.router.url;
      this.messagesService.send("Er ging iets fout.","OPNIEUW").subscribe(params => {
        this.router.navigate([old]);
      });

      this.router.navigate(['/']);

    }

  }

  ngOnInit() {}

}
