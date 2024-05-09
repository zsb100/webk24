import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ekszer } from '../../shared/models/ekszer';
import { TermekDbService } from '../../shared/services/termek-db.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddEkszerComponent } from './add-ekszer/add-ekszer.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-termekek',
  templateUrl: './termekek.component.html',
  styleUrl: './termekek.component.scss'
})
export class TermekekComponent implements OnInit, OnDestroy {

  products: Ekszer[] = [];
  admin: boolean = false;
  rowcount: number = 1;

  constructor(private termekdb: TermekDbService, private dialog: MatDialog, private auth: AuthService) { }

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.termekdb.getAll().subscribe(data => {
        this.products = data;
        this.rowcount = Math.ceil(this.products.length / 4);
      })
    );
    this.subscriptions.add(
      this.auth.adminCheck().subscribe(data => {
        this.admin = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  newEkszer() {
    const dialogRef = this.dialog.open(AddEkszerComponent, {
      width: '95%',
      height: '95%'
    });
  }

  adminE(): boolean{
    return this.admin;
  }

}
