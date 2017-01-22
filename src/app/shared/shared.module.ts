// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


// EXTERNAL


// OWN




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  declarations: [],
  exports: [
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
