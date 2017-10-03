import { Component, OnInit } from '@angular/core';
import { DialogsService } from '../../dialogs/dialogs.service';

@Component({
  selector: 'app-login',
  template: `

      <form class="login-form">

        <mat-form-field color="accent">
          <input type="email" matInput required placeholder="E-mailadres">
        </mat-form-field>

        <mat-form-field color="accent">
          <input type="password" matInput required placeholder="Wachtwoord">
        </mat-form-field>

        <button type="submit" mat-raised-button color="accent">
          <mat-icon>lock_outline</mat-icon> Login
        </button>

        <button mat-raised-button (click)="dialogsService.register()">Registreer</button>

      </form>

  `,
  styles: [`

    button mat-icon {
      font-size: 22px;
      margin-right: 2px;
    }

    mat-form-field, button {
      margin: 0 10px;
    }

  `]
})
export class LoginComponent implements OnInit {

  constructor(public dialogsService: DialogsService) { }

  ngOnInit() {
  }

}
