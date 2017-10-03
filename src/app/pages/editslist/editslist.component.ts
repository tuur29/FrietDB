// TODO: Review edits (shops & snacks)
// TODO: Redirect to error when not admin

import { Component, OnInit } from '@angular/core';
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

  constructor(private globals: GlobalsService) {

    this.shopEdits = globals.editslist.filter(edit =>
      edit.type == "shop"
    );

    this.snackEdits = globals.editslist.filter(edit =>
      edit.type == "snack"
    );

  }

  ngOnInit() {
  }

}
