import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfDialogComponent } from './conf-dialog.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ConfDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ConfDialogModule { }
