import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchShopComponent } from './searchshop.component';

import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SearchShopComponent],
  declarations: [SearchShopComponent]
})
export class SearchShopModule { }
