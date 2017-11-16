import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CanDeactivateGuard } from 'app/services/candeactivate-guard.service';
import { EditShopComponent } from './editshop.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
  	RouterModule.forChild([
      { path: ':id', canDeactivate: [CanDeactivateGuard], component: EditShopComponent },
      { path: '', canDeactivate: [CanDeactivateGuard], component: EditShopComponent, pathMatch: 'full' },
    ]),
    CommonModule,
    ReactiveFormsModule,
    NgPipesModule,
    MaterialModule,
  ],
  declarations: [EditShopComponent]
})
export class EditShopModule { }
