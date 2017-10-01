import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatTooltipModule,MatRippleModule  } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule
  ],
  exports: [TableComponent],
  declarations: [TableComponent],
})
export class TableModule { }


