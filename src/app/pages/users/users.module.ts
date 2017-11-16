import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LightMaterialModule } from '../../lightmaterial.module';

import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: UsersComponent, pathMatch: 'full' },
    ]),
    CommonModule,
    LightMaterialModule
  ],
  declarations: [
    UsersComponent,
  ]
})
export class UsersModule { }
