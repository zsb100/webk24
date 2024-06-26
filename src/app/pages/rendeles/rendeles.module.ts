import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RendelesRoutingModule } from './rendeles-routing.module';
import { RendelesComponent } from './rendeles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    RendelesComponent
  ],
  imports: [
    CommonModule,
    RendelesRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class RendelesModule { }
