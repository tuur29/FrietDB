import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';

import { GlobalsService } from 'app/services/globals.service';
import { DialogsService } from '../../dialogs/dialogs.service';

// TODO: Show error when email field incorrectly formatted

@Component({
  selector: 'app-login',
  template: `

      <!-- Login form -->
      <form #form *ngIf="!globals.auth.token">
        <mat-form-field>
          <input type="email" [(ngModel)]="email" name="email" matInput required placeholder="E-mailadres">
        </mat-form-field>

        <mat-form-field>
          <input type="password" [(ngModel)]="password" name="password" matInput required placeholder="Wachtwoord">
        </mat-form-field>

        <button type="submit" mat-raised-button color="primary" (click)="login()">
          <mat-icon>lock_outline</mat-icon> Login
        </button>

        <button mat-raised-button (click)="dialogsService.register()">Registreer</button>

      </form>


      <!-- Edit buttons -->
      <div *ngIf="globals.auth.token">
        <a *ngIf="!globals.auth.admin" mat-raised-button color="accent" routerLink="edit/shop"><mat-icon>add</mat-icon>Nieuwe frituur</a>
        <button mat-raised-button color="warn" (click)="logout()">Log uit</button>

        <button mat-raised-button color="primary" (click)="toggleAdmin()"><mat-icon *ngIf="globals.auth.admin">check</mat-icon> Admin</button>
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

  @Input() redirect: string;
  @ViewChild('form') form;

  email: string;
  password: string;

  constructor(
    private localStorageService: LocalStorageService,
    public globals: GlobalsService,
    public dialogsService: DialogsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.form.nativeElement.checkValidity()) {
      this.globals.auth.token = this.email + this.password;
      this.saveAuth();
      if (this.redirect)
        this.router.navigate([this.redirect]);
    }
  }

  logout() {
    this.globals.auth.token = '';
    this.router.navigate(['']);
    this.saveAuth();
  }

  toggleAdmin() {
    this.globals.auth.admin = !this.globals.auth.admin;
    this.saveAuth();
  }

  saveAuth() {
    this.localStorageService.set('auth', this.globals.auth);
  }

}
