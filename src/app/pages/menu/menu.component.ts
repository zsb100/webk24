import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit{

  constructor(private auth: AuthService){
    
  }

  isOpen=false;
  user = localStorage.getItem('userid');
  admin: boolean = false;

  ngOnInit(){
    this.auth.loggedIn().subscribe(userid => {
      this.user = userid;
    });
    this.auth.adminCheck().subscribe(isAdmin => {
      this.admin = isAdmin;
    });
  }

  isLoggedIn(){
    return this.user ? true : false;
  }


  logOut(){
    this.auth.logout();
    window.location.reload();
  }
  
}
