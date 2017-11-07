import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditShopComponent } from './editshop.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
  	RouterModule.forChild([
      { path: ':id', component: EditShopComponent },
      { path: '', component: EditShopComponent, pathMatch: 'full' },
    ]),
    CommonModule,
    ReactiveFormsModule,
    NgPipesModule,
    MaterialModule,
  ],
  declarations: [EditShopComponent]
})
export class EditShopModule { }
