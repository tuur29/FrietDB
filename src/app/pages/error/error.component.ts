import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../../messages/messages.service';

@Component({
  selector: 'app-error',
  template: `

    <mat-card>
      <h1>Error</h1>
      <p>Het ziet er naar uit dat je geen toegang hebt tot deze pagina, gelieve je hieronder eerst in te loggen.</p>
      <p><a routerLink="/">Terug naar homepagina</a></p>
      <app-login [redirect]="redirecturl"></app-login>
    </mat-card>

  `,
  styles: [`

  `]
})
export class ErrorComponent implements OnInit, OnDestroy {

  private redirecturl: string = '/';
  private subroute: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {

  }

  ngOnInit() {

    this.subroute = this.route.params.subscribe((params) => {
      let status = +params.status; // (+) converts string 'id' to a number
      if (status !== 403) {

        let old = this.router.url;
        this.messagesService.send('Er ging iets fout.', 'OPNIEUW').subscribe(() => {
          this.router.navigate([old]);
        });
        this.router.navigate(['/']);

      } else {
        this.redirecturl = params.redirect;
      }

    });

  }

  ngOnDestroy() {
    this.subroute.unsubscribe();
  }

}
