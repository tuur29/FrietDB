import { DialogsService } from './dialogs.service';
import { MatDialogModule,MatInputModule,MatIconModule,MatButtonModule  } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackInfoDialog } from './snackinfo.component';
import { EditSnackDialog } from './editsnack.component';
import { RegisterDialog } from './register.component';

@NgModule({
    imports: [
        CommonModule,
        
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
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