import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditsListComponent } from './editslist.component';

import { MatCardModule } from '@angular/material';
import { TableModule } from '../../parts/table/table.module';
import { TableComponent } from '../../parts/table/table.component';

@NgModule({
  imports: [
    CommonModule,

    TableModule,
    MatCardModule
  ],
  declarations: [EditsListComponent]
})
export class EditsListModule { }
