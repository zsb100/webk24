import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAboutComponent } from './home-about.component';

const routes: Routes = [{ path: '', component: HomeAboutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeAboutRoutingModule { }
