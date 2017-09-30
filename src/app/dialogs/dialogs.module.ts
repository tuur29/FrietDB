import { DialogsService } from './dialogs.service';
import { MdDialogModule,MdInputModule,MdIconModule,MdButtonModule  } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackInfoDialog } from './snackinfo.component';
import { RegisterDialog } from './register.component';

@NgModule({
    imports: [
        CommonModule,
        
        MdDialogModule,
        MdIconModule,
        MdInputModule,
        MdButtonModule,
    ],
    exports: [
        SnackInfoDialog,
        RegisterDialog,
    ],
    declarations: [
        SnackInfoDialog,
        RegisterDialog,
    ],
    providers: [
        DialogsService,
    ],
    entryComponents: [
        SnackInfoDialog,
        RegisterDialog,
    ],
})
export class DialogsModule { }