// TODO: Review edits (shops & snacks)

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-editslist',
  template: `
    
    <mat-card>
      <h1>Goed te keuren aanpassingen aan Frituren</h1>
      <app-table [data]="shopEdits"></app-table>
    </mat-card>

    <mat-card>
      <h1>Goed te keuren aanpassingen aan Snacks</h1>
      <app-table [data]="snackEdits"></app-table>
    </mat-card>

  `,
  styles: []
})
export class EditsListComponent implements OnInit {

  shopEdits: any[] = [];
  snackEdits: any[] = [];

  constructor(
    private globals: GlobalsService,
    private router: Router,
  ) {

    this.shopEdits = globals.editslist.filter(edit =>
      edit.type == "shop"
    );

    this.snackEdits = globals.editslist.filter(edit =>
      edit.type == "snack"
    );

  }

  ngOnInit() {
    if (!this.globals.auth.token || !this.globals.auth.admin)
      this.router.navigate(['error', 403, "edits"]);
  }

}
