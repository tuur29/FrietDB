import { MessagesService } from './messages.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        CommonModule,    
        MaterialModule
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