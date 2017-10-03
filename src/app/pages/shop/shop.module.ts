import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ShopComponent } from './shop.component';
import { MapModule } from '../../parts/map/map.module';

import { MarkdownModule } from 'angular2-markdown';
import { NgPipesModule } from 'ngx-pipes';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
  	RouterModule,
    CommonModule,
    NgPipesModule,
    MarkdownModule,
    MaterialModule,

    MapModule,
  ],
  exports: [MarkdownModule],
  declarations: [ShopComponent],
})
export class ShopModule { }
