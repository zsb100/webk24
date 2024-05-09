import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermekekRoutingModule } from './termekek-routing.module';
import { TermekekComponent } from './termekek.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { TermekDetailsComponent } from './termek-details/termek-details.component';
import { ListVelemenyComponent } from './list-velemeny/list-velemeny.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { EditVelemenyComponent } from './edit-velemeny/edit-velemeny.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddEkszerComponent } from './add-ekszer/add-ekszer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfDialogModule } from '../../shared/conf-dialog/conf-dialog.module';
import { EditTermekComponent } from './edit-termek/edit-termek.component';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    TermekekComponent,
    TermekDetailsComponent,
    ListVelemenyComponent,
    EditVelemenyComponent,
    AddEkszerComponent,
    EditTermekComponent
  ],
  imports: [
    CommonModule,
    TermekekRoutingModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    ConfDialogModule,
    MatFormFieldModule
  ]
})
export class TermekekModule { }
