import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{

  constructor(private auth:AuthService,private router:Router){}

  user = localStorage.getItem('user');

  canActivate(){
   if(this.user){
    return true;
   }
   this.router.navigate(['login'])
   return false;
  }

}
