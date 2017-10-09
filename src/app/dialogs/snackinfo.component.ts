import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-snackinfo',
  template: `

    <img [src]="snack.image" *ngIf="snack.image">
    <h1 mat-dialog-title>{{snack.name}} | <small>{{snack.type}}</small></h1>

    <div mat-dialog-actions>

      <a mat-icon-button *ngIf="snack.link" [href]="snack.link">
        <mat-icon>open_in_new</mat-icon>
        Meer Info
      </a>

      <span class="spacer"></span>
      <button mat-button mat-dialog-close color="warn">SLUITEN</button>
    </div>

  `,
  styles: [`

    img {
      max-width: 300px;
    }

  `]
})
export class SnackInfoDialog implements OnInit {

  reqId: number;
  snack: any;

  constructor(
    private globals: GlobalsService,
    public dialogRef: MatDialogRef<SnackInfoDialog>
  ) {
    this.snack = globals.snacks[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
