import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditsListComponent } from './editslist.component';

import { MatCardModule } from '@angular/material';
import { TableModule } from '../table/table.module';
import { TableComponent } from '../table/table.component';

@NgModule({
  imports: [
    CommonModule,

    TableModule,
    MatCardModule
  ],
  declarations: [EditsListComponent]
})
export class EditsListModule { }
