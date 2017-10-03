import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditsListComponent } from './editslist.component';

import { MaterialModule } from '../../material.module';

import { TableModule } from '../../parts/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TableModule
  ],
  declarations: [EditsListComponent]
})
export class EditsListModule { }
