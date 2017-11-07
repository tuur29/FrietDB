import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditsListComponent } from './editslist.component';

import { MaterialModule } from '../../material.module';

import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: EditsListComponent, pathMatch: 'full' },
    ]),
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    EditsListComponent,
    TableComponent,
  ]
})
export class EditsListModule { }
