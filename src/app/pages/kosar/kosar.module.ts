import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KosarRoutingModule } from './kosar-routing.module';
import { KosarComponent } from './kosar.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    KosarComponent
  ],
  imports: [
    CommonModule,
    KosarRoutingModule,
    MatButtonModule
  ]
})
export class KosarModule { }
