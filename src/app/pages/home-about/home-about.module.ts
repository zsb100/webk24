import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeAboutRoutingModule } from './home-about-routing.module';
import { HomeAboutComponent } from './home-about.component';
import { MatButton } from '@angular/material/button';


@NgModule({
  declarations: [
    HomeAboutComponent
  ],
  imports: [
    CommonModule,
    HomeAboutRoutingModule,
    MatButton
  ]
})
export class HomeAboutModule { }
