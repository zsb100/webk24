import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KosarComponent } from './kosar.component';

const routes: Routes = [{ path: '', component: KosarComponent } ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KosarRoutingModule { }
