import { DialogsService } from './dialogs.service';
import { MdDialogModule,MdIconModule,MdButtonModule  } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackInfoDialog } from './snackinfo.component';

@NgModule({
    imports: [
        CommonModule,
        
        MdDialogModule,
        MdIconModule,
        MdButtonModule,
    ],
    exports: [
        SnackInfoDialog,
    ],
    declarations: [
        SnackInfoDialog,
    ],
    providers: [
        DialogsService,
    ],
    entryComponents: [
        SnackInfoDialog,
    ],
})
export class DialogsModule { }