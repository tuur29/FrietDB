import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditShopComponent } from './editshop.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgPipesModule,
    MaterialModule,
  ],
  declarations: [EditShopComponent]
})
export class EditShopModule { }
