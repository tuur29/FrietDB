import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';

import { SearchShopModule } from '../searchshop/searchshop.module';

import { LightMaterialModule } from '../../lightmaterial.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LightMaterialModule,

    SearchShopModule,
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
