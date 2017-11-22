import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SnacksComponent } from './snacks.component';

import { LightMaterialModule } from '../../lightmaterial.module';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: SnacksComponent, pathMatch: 'full' },
    ]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LightMaterialModule,
    NgPipesModule,
  ],
  declarations: [
    SnacksComponent,
  ],
  providers: []
})
export class SnacksModule { }
