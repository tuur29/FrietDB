import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';


@NgModule({
  imports: [
  	RouterModule,
    CommonModule
  ],
  declarations: [OrderComponent]
})
export class OrderModule { }
