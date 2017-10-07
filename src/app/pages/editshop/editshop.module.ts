import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditShopComponent } from './editshop.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgPipesModule } from 'ngx-pipes';
import { MarkdownModule } from 'angular2-markdown';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgPipesModule,
    ReactiveFormsModule,
	MaterialModule,
	MarkdownModule,
  ],
  declarations: [EditShopComponent]
})
export class EditShopModule { }
