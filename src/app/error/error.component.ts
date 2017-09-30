// TODO: Show login form & stop redirect if access denied

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-error',
  template: `
    <p>
      <a routerLink="/">Terug naar homepagina</a>
    </p>
  `,
  styles: []
})
export class ErrorComponent implements OnInit {

  constructor(
    private router: Router,
    private messagesService: MessagesService
  ) {

    let old = this.router.url;
    this.messagesService.send("Er ging iets fout.","OPNIEUW").subscribe(params => {
      this.router.navigate([old]);
    });

    this.router.navigate(['/']);

  }

  ngOnInit() {}

}
