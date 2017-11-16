import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchShopComponent } from './searchshop.component';

import { LightMaterialModule } from '../../lightmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,

    LightMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SearchShopComponent],
  declarations: [SearchShopComponent]
})
export class SearchShopModule { }
