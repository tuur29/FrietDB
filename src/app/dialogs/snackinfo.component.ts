import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SnackDataService } from 'app/services/snackdata.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-snackinfo',
  template: `

    <ng-container *ngIf="snack">

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

    </ng-container>

  `,
  styles: [`

    h1 {
      min-width: 175px;
    }

    img {
      max-width: 300px;
    }

  `]
})
export class SnackInfoDialog implements OnInit {

  private id: string;
  private snack: any;

  constructor(
    private snackDataService: SnackDataService,
    public dialogRef: MatDialogRef<SnackInfoDialog>
  ) {}

  setId(id: string) {
    this.id = id;
    this.snackDataService.getSnack(this.id).subscribe(snack => {
      this.snack = snack;
    });
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
