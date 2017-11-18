import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../../messages/messages.service';

@Component({
  selector: 'app-error',
  template: `

    <mat-card>
      <h1>Error</h1>
      <p>Het ziet er naar uit dat je geen toegang hebt tot deze pagina of deze niet bestaat, je kan proberen om je hieronder eerst in te loggen.</p>
      <p><a routerLink="/">Terug naar homepagina</a></p>
      <app-login [redirect]="redirecturl"></app-login>
    </mat-card>

  `,
  styles: [`

  `]
})
export class ErrorComponent implements OnInit, OnDestroy {

  redirecturl: string = '/';
  subroute: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {

  }

  ngOnInit() {

    this.subroute = this.route.params.subscribe((params) => {
      let status = +params.status; // (+) converts string 'id' to a number
      if (status == 403) {
        // add redirect link for after login
        this.redirecturl = params.redirect;

      } else if (status == 302) {
        // redirect to page
        this.router.navigate([''+params.redirect]);

      // } else {
      //   // general error with retry
      //   let old = this.router.url;
      //   this.messagesService.send('Er ging iets fout.', 'OPNIEUW').subscribe(() => {
      //     this.router.navigate([old]);
      //   });
      //   this.router.navigate(['/']);
        
      }
    });

  }

  ngOnDestroy() {
    this.subroute.unsubscribe();
  }

}
