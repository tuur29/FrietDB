import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GlobalsService } from 'app/services/globals.service';
import { EditDataService } from '../services/editdata.service';
import { SnackDataService } from '../services/snackdata.service';

// TODO: Add validation

@Component({
  selector: 'app-editsnack',
  template: `

    <ng-container *ngIf="snack && types">

      <h1 mat-dialog-title>{{snack.name}} | <small>{{snack.type}}</small></h1>

      <form #form>

        <fieldset [disabled]="id" >
          <mat-form-field>
            <input type="text" [(ngModel)]="snack.name" name="name" required matInput placeholder="Naam">
          </mat-form-field>

          <mat-select [disabled]="id" required placeholder="Type" [(ngModel)]="snack.type" name="type">
            <mat-option *ngFor="let type of types" [value]="type">
              {{type}}
            </mat-option>
          </mat-select>
        </fieldset>

        <fieldset [disabled]="globals.auth.admin" >
          <mat-form-field class="full">
            <input type="url" [(ngModel)]="snack.image" name="image" matInput placeholder="Foto URL">
          </mat-form-field>

          <mat-form-field class="full">
            <input type="url" [(ngModel)]="snack.link" name="link" matInput placeholder="Meer Info URL">
          </mat-form-field>
        </fieldset>

      </form>

      <div mat-dialog-actions>
        <ng-container *ngIf="globals.auth.admin; else savebtn">
            <button type="submit"
              mat-button mat-raised-button color="warn"
            (click)="remove(id)">
              <mat-icon>delete_forever</mat-icon>Verwijderen
            </button>

            <button type="submit"
              mat-button mat-raised-button color="warn"
              (click)="accept(id)">
              <mat-icon>check</mat-icon>Goedkeuren
            </button>
          </ng-container>

          <ng-template #savebtn>
            <button type="submit" (click)="save()" mat-raised-button color="primary">
              <mat-icon>save</mat-icon>Opslaan
            </button>
          </ng-template>


        <span class="spacer"></span>
        <button mat-button mat-dialog-close color="warn">SLUITEN</button>
      </div>

    </ng-container>

  `,
  styles: [`

    .full {
      display: block;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    fieldset {
      border: none;
      padding: 0;
    }

    form, .full {
      min-width: 400px;
    }

    mat-select {
      margin-bottom: 15px;
    }

  `]
})
export class EditSnackDialog implements OnInit {

  private id: string;
  private snack: any = {};
  private types: string[] = [];

  @ViewChild('form') private form;

  constructor(
    public globals: GlobalsService,
    public editDataService: EditDataService,
    public snackDataService: SnackDataService,
    public dialogRef: MatDialogRef<EditSnackDialog>
  ) {}

  ngOnInit() {}

  setId(id: string) {
    this.id = id;

    if (this.id) {

      if (this.globals.auth.admin) {
        this.editDataService.getItem(this.id).subscribe(snack => {
          this.snack = snack;
        });
      } else {
        this.snackDataService.getSnack(this.id).subscribe(snack => {
          this.snack = snack;
        });
      }

    }

    this.snackDataService.getSnackTypes().subscribe(types => {
      this.types = types;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    // if (this.form.nativeElement.checkValidity()) {
      this.editDataService.saveEdit('snack',this.snack).subscribe((res) => {
        this.dialogRef.close(res.item);
      });
    // }
  }

  // pressing admin buttons
  accept(id: string) {
    this.editDataService.accept(id).subscribe((res) => {
      this.dialogRef.close();
    });
  }

  remove(id: string) {
    this.editDataService.remove(id).subscribe((res) => {
      this.dialogRef.close();
    });
  }

}
