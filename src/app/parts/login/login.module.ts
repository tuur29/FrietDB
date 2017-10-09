import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent]
})
export class LoginModule { }
