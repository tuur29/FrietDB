import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
  	RouterModule,
    CommonModule
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule { }
