import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService) {

  }

  private subscriptions: Subscription = new Subscription();

  isOpen = false;
  user = localStorage.getItem('userid');
  admin: boolean = false;

  ngOnInit() {
    this.subscriptions.add(
      this.auth.loggedIn().subscribe(userid => {
        this.user = userid;
      }));
    this.subscriptions.add(
      this.auth.adminCheck().subscribe(isAdmin => {
        this.admin = isAdmin;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  isLoggedIn() {
    return this.user ? true : false;
  }


  logOut() {
    this.auth.logout();
    window.location.reload();
  }

}
