import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';


@NgModule({
  imports: [
  	RouterModule,
    CommonModule
  ],
  declarations: [PageComponent]
})
export class PageModule { }
