import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RendelesComponent } from './rendeles.component';

const routes: Routes = [{path: '', component: RendelesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RendelesRoutingModule { }
