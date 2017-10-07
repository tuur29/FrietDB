import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditsListComponent } from './editslist.component';

import { MaterialModule } from '../../material.module';

import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [
  	EditsListComponent,
  	TableComponent,
  ]
})
export class EditsListModule { }
