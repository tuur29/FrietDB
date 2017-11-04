import { DialogsService } from './dialogs.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
// TODO: Remove FormsModule
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { SnackInfoDialog } from './snackinfo.component';
import { EditSnackDialog } from './editsnack.component';
import { RegisterDialog } from './register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    SnackInfoDialog,
    EditSnackDialog,
    RegisterDialog,
  ],
  declarations: [
    SnackInfoDialog,
    EditSnackDialog,
    RegisterDialog,
  ],
  providers: [
    DialogsService,
  ],
  entryComponents: [
    SnackInfoDialog,
    EditSnackDialog,
    RegisterDialog,
  ],
})
export class DialogsModule { }
