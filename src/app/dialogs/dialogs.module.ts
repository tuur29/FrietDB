import { DialogsService } from './dialogs.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

import { SnackInfoDialog } from './snackinfo.component';
import { EditSnackDialog } from './editsnack.component';
import { RegisterDialog } from './register.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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