import { DialogsService } from './dialogs.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SnackInfoDialog } from './snackinfo.component';
import { EditSnackDialog } from './editsnack.component';
import { RegisterDialog } from './register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    SnackInfoDialog,
    EditSnackDialog,
    RegisterDialog
  ],
  declarations: [
    SnackInfoDialog,
    EditSnackDialog,
    RegisterDialog
  ],
  providers: [
    DialogsService,
  ],
  entryComponents: [
    SnackInfoDialog,
    EditSnackDialog,
    RegisterDialog
  ],
})
export class DialogsModule { }
