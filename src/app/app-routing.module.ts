import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermekDetailsComponent } from './pages/termekek/termek-details/termek-details.component';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { orderGuard } from './shared/services/auth/order.guard';

const routes: Routes = [
  { path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),canActivate:[AuthGuard] },
  { path: 'home-page', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'about', loadChildren: () => import('./pages/home-about/home-about.module').then(m => m.HomeAboutModule) },
  { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
  { path: 'jewelrys', loadChildren: () => import('./pages/termekek/termekek.module').then(m => m.TermekekModule) },
  { path: 'cart', loadChildren: () => import('./pages/kosar/kosar.module').then(m => m.KosarModule) },
  { path: 'order', loadChildren: () => import('./pages/rendeles/rendeles.module').then(m => m.RendelesModule), canActivate: [orderGuard]},
  { path: 'jewelrys/:id', component: TermekDetailsComponent},
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
