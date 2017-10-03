import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditShopComponent } from './editshop.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
	MaterialModule
  ],
  declarations: [EditShopComponent]
})
export class EditShopModule { }
