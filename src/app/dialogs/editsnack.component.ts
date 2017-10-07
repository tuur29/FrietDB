import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GlobalsService } from 'globals.service';
import { EditsService } from '../edits.service';

@Component({
  selector: 'app-editsnack',
  template: `

    <h1 mat-dialog-title>{{snack.name}} | <small>{{snack.type}}</small></h1>
    
    <form #form>

      <fieldset [disabled]="editId" >
        <mat-form-field>
          <input type="text" [(ngModel)]="snack.name" name="name" required matInput placeholder="Naam">
        </mat-form-field>

        <mat-select [disabled]="editId" required placeholder="Type" [(ngModel)]="snack.type" name="type">
          <mat-option *ngFor="let type of globals.snacktypes" [value]="type">
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
          <button type="submit" mat-button mat-raised-button color="warn" (click)="editsService.remove(editId); dialogRef.close()"><mat-icon>delete_forever</mat-icon>Verwijderen</button>
          <button type="submit" mat-button mat-raised-button color="warn" (click)="editsService.accept(editId); dialogRef.close()"><mat-icon>check</mat-icon>Goedkeuren</button>
        </ng-container>

        <ng-template #savebtn>
          <button type="submit" (click)="save()" mat-raised-button color="primary">
            <mat-icon>save</mat-icon>Opslaan
          </button>
        </ng-template>


      <span class="spacer"></span>
      <button mat-button mat-dialog-close color="warn">SLUITEN</button>
    </div>

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

  editId: number;
  snack: any;

  @ViewChild('form') form;

  constructor(
    public globals: GlobalsService,
    public editsService: EditsService,
    public dialogRef: MatDialogRef<EditSnackDialog>
  ) {
    this.snack = globals.snacks[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.form.nativeElement.checkValidity()) {
      this.editsService.savesnack(this.snack);
      this.dialogRef.close();
    }
  }

  ngOnInit() {
  }

}