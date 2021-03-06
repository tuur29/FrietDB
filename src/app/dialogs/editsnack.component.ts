import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GlobalsService } from 'app/services/globals.service';
import { EditDataService } from '../services/editdata.service';
import { SnackDataService } from '../services/snackdata.service';
import { MessagesService } from '../messages/messages.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editsnack',
  template: `

    <form [formGroup]="form" (ngSubmit)='onSubmit(form.value)'>

      <fieldset>
        <mat-form-field>
          <input [disabled]="id" type="text" required matInput formControlName="name" placeholder="Naam">
          <mat-error *ngIf="form.hasError('required', ['name']) && form.get('name').touched">
            Gelieve een naam in te vullen.
          </mat-error>
        </mat-form-field>

        <mat-form-field>
           <input type="text" matInput required formControlName="type" placeholder="Type" [matAutocomplete]="auto">
           <mat-error *ngIf="form.hasError('required', ['type']) && form.get('type').touched">
            Gelieve een type te selecteren.
          </mat-error>
        </mat-form-field>

        <mat-autocomplete #auto="matAutocomplete">
           <mat-option *ngFor="let type of types" [value]="type">
            {{ type }}
          </mat-option>
        </mat-autocomplete>

      </fieldset>

      <fieldset [disabled]="globals.auth.admin" >
        <mat-form-field class="full">
          <input type="url" formControlName="image" matInput placeholder="Foto URL">
          <mat-error *ngIf="form.hasError('pattern', ['image']) && form.get('image').touched">
            Gelieve een geldige url in te vullen.
          </mat-error>
        </mat-form-field>

        <mat-form-field class="full">
          <input type="url" formControlName="link" matInput placeholder="Meer Info URL">
          <mat-error *ngIf="form.hasError('pattern', ['link']) && form.get('link').touched">
            Gelieve een geldige url in te vullen.
          </mat-error>
        </mat-form-field>

        <mat-checkbox color="primary" formControlName="vegi">Vegetarisch</mat-checkbox>
      </fieldset>

      <div mat-dialog-actions>

        <ng-container *ngIf="globals.auth.admin; else savebtn">
            <button type="button"
              mat-button mat-raised-button color="warn"
            (click)="remove()">
              <mat-icon>delete_forever</mat-icon>Verwijderen
            </button>

            <button type="button"
              mat-button mat-raised-button color="warn"
              (click)="accept()">
              <mat-icon>check</mat-icon>Goedkeuren
            </button>
          </ng-container>

          <ng-template #savebtn>
            <button [disabled]='!form.valid || form.pristine' type="submit" mat-raised-button color="primary">
              <mat-icon>save</mat-icon>Opslaan
            </button>
          </ng-template>

        <span class="spacer"></span>
        <button type="button" mat-button mat-dialog-close color="warn">ANNULEER</button>
      </div>

    </form>

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
      min-width: 100%;
    }

    fieldset {
      margin: 10px 0;
    }

  `]
})
export class EditSnackDialog implements OnInit {

  form: FormGroup;
  types: string[] = [];
  id: string;

  constructor(
    public globals: GlobalsService,
    public editDataService: EditDataService,
    public snackDataService: SnackDataService,
    public messagesService: MessagesService,
    public dialogRef: MatDialogRef<EditSnackDialog>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      type: ["", Validators.required],
      image: ["", Validators.pattern('^https?:\/\/.+$')],
      link: ["", Validators.pattern('^https?:\/\/.+$')],
      vegi: [ false ]
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload($event) {
    return !this.form.dirty;
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      if (this.form.dirty)
        this.dialogRef.disableClose = true;
    });
  }

  setId(id: string) {
    this.id = id;

    // get snacktypes
    this.snackDataService.getSnackTypes().subscribe(types => {
      this.types = types;
    });

    // get data
    if (this.id) {
      if (this.globals.auth.admin) {
        this.editDataService.getItem(this.id).subscribe(snack => {
          this.fillForm(snack);
        });
      } else {
        this.snackDataService.getSnack(this.id).subscribe(snack => {
          this.fillForm(snack);
        });
      }
    }
  }

  fillForm(snack: any) {
    this.form.setValue({
      name: snack.name,
      type: snack.type,
      image: snack.image,
      vegi: snack.vegi,
      link: snack.link
    });
  }

  onSubmit(data: any) {
    data.id = this.id;
    if (data.name) data.name = data.name.replace(/^\s+|\s+$/g, "");
    if (data.type) data.type = data.type.replace(/^\s+|\s+$/g, "");
    this.editDataService.saveEdit('snack', data).subscribe((res) => {
      this.messagesService.send("Success! Je aanpassing moet wel eerst goedgekeurd worden.");
      this.dialogRef.close(res.item);
    });
  }

  // pressing admin buttons
  accept() {
    this.editDataService.accept(this.id).subscribe((res) => {
      this.dialogRef.close("accepted");
    });
  }

  remove() {
    this.editDataService.remove(this.id).subscribe((res) => {
      this.dialogRef.close("removed");
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
