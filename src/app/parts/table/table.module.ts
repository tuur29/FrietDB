import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MaterialModule,
  ],
  exports: [TableComponent],
  declarations: [TableComponent],
})
export class TableModule { }


