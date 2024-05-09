import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermekekComponent } from './termekek.component';

const routes: Routes = [{ path: '', component: TermekekComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermekekRoutingModule { }
