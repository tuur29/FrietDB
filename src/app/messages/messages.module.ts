import { MessagesService } from './messages.service';
import { MatSnackBarModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,    
        MatSnackBarModule,
    ],
    exports: [

    ],
    declarations: [

    ],
    providers: [
        MessagesService,
    ],
    entryComponents: [

    ],
})
export class MessagesModule { }