import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-store';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { GlobalsService } from 'app/services/globals.service';
import { DialogsService } from '../../dialogs/dialogs.service';

@Component({
  selector: 'app-login',
  template: `

      <!-- Login form -->
      <form [formGroup]="form" (ngSubmit)='onSubmit(form.value)' *ngIf="!globals.auth.token">

        <mat-form-field>
          <input type="email" matInput placeholder="E-mailadres" required formControlName="email">
          <mat-error *ngIf="form.hasError('email', 'email') && form.get('email').touched">
            Gelieve een geldig e-mailadres in te vullen.
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <input type="password" matInput placeholder="Wachtwoord" required formControlName="password">
          <mat-error *ngIf="form.hasError('required', 'password') && form.get('password').touched">
            Gelieve een wachtwoord in te vullen.
          </mat-error>
        </mat-form-field>

        <button type="submit" [disabled]='!form.valid' mat-raised-button color="primary">
          <mat-icon>lock_outline</mat-icon> Login
        </button>
        <button type="button" mat-raised-button (click)="dialogsService.register()">Registreer</button>
      </form>

      <!-- Edit buttons -->
      <div *ngIf="globals.auth.token">
        <a *ngIf="!globals.auth.admin" mat-raised-button color="accent" routerLink="edit/shop">
          <mat-icon>add</mat-icon>Nieuwe frituur
        </a>
        <button mat-raised-button color="warn" (click)="logout()">Log uit</button>
        <button mat-raised-button color="primary" (click)="toggleAdmin()">
          <mat-icon *ngIf="globals.auth.admin">check</mat-icon> Admin
        </button>
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

  @Input() private redirect: string;

  private form: FormGroup;
  private emailCtrl: FormControl;
  private passwordCtrl: FormControl;

  constructor(
    private localStorageService: LocalStorageService,
    public globals: GlobalsService,
    public dialogsService: DialogsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
}

  ngOnInit() {
  }

  onSubmit(data: any) {
    this.globals.auth.token = data.email + data.password;
    this.saveAuth();
    if (this.redirect)
      this.router.navigate([this.redirect]);
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
