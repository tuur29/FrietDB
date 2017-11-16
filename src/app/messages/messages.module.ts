import { MessagesService } from './messages.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LightMaterialModule } from '../lightmaterial.module';

@NgModule({
    imports: [
        CommonModule,
        LightMaterialModule
    ],
    providers: [MessagesService]
})
export class MessagesModule { }
