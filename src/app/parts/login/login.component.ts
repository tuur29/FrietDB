import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalsService } from 'globals.service';
import { DialogsService } from '../../dialogs/dialogs.service';

@Component({
  selector: 'app-login',
  template: `

      <!-- Login form -->
      <form class="login-form" *ngIf="!globals.auth.token">
        <mat-form-field color="accent">
          <input type="email" matInput required placeholder="E-mailadres">
        </mat-form-field>

        <mat-form-field color="accent">
          <input type="password" matInput required placeholder="Wachtwoord">
        </mat-form-field>

        <button type="submit" mat-raised-button color="accent" (click)="login()">
          <mat-icon>lock_outline</mat-icon> Login
        </button>

        <button mat-raised-button (click)="dialogsService.register()">Registreer</button>
      </form>

      <!-- Edit buttons -->
      <div *ngIf="globals.auth.token">
        <a mat-raised-button routerLink="edit/shop">Nieuwe frituur</a>
        <button mat-raised-button color="warn" (click)="logout()">Log uit</button>
        
        <button mat-raised-button color="primary" (click)="globals.auth.admin=!globals.auth.admin">Toggle Admin (Temp)</button>
      </div>

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

  constructor(
    public globals: GlobalsService,
    public dialogsService: DialogsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.globals.auth.token = "temp";
  }

  logout() {
    this.globals.auth.token = "";
    this.router.navigate(['']);
  }

}
