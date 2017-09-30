import { Component, OnInit } from '@angular/core';
import { DialogsService } from '../dialogs/dialogs.service';

@Component({
  selector: 'app-login',
  template: `

      <form class="login-form">

        <md-form-field color="accent">
          <input type="email" mdInput required placeholder="E-mailadres">
        </md-form-field>

        <md-form-field color="accent">
          <input type="password" mdInput required placeholder="Wachtwoord">
        </md-form-field>

        <button type="submit" md-raised-button color="accent">
          <md-icon>lock_outline</md-icon> Login
        </button>

        <button md-raised-button (click)="dialogsService.register()">Registreer</button>

      </form>

  `,
  styles: [`

    button md-icon {
      font-size: 22px;
      margin-right: 2px;
    }

    md-form-field, button {
      margin: 0 10px;
    }

  `]
})
export class LoginComponent implements OnInit {

  constructor(public dialogsService: DialogsService) { }

  ngOnInit() {
  }

}
