import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ekszer } from '../../shared/models/ekszer';
import { KosarDbService } from '../../shared/services/kosar-db.service';
import { Kosar } from '../../shared/models/kosar';
import { TermekDbService } from '../../shared/services/termek-db.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-kosar',
  templateUrl: './kosar.component.html',
  styleUrl: './kosar.component.scss'
})
export class KosarComponent implements OnInit, OnDestroy {

  loggedin = localStorage.getItem('user');

  kosar?: Kosar;

  ekszerek: Ekszer[] = [];


  constructor(private kosardb: KosarDbService, private termekdb: TermekDbService, private auth: AuthService, private snack: MatSnackBar) { }

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.auth.loggedIn().subscribe(user => {
        this.loggedin = user;
        this.subscriptions.add(
          this.kosardb.getKosar(this.loggedin).subscribe(data => {
            this.kosar = data[0];
            this.getekszerek();
            localStorage.setItem('kosar', this.kosar.id);
          })
        );
      }));
  }

  getekszerek() {
    if (!this.kosar || this.kosar.ekszerIds.length == 0) return;
    this.ekszerek = [];
    for (let i = 0; i < this.kosar.ekszerIds.length; i++) {
      this.subscriptions.add(
        this.termekdb.getById(this.kosar.ekszerIds[i]).subscribe(data => {
          if (!data) return;
          this.ekszerek[i] = data;
        })
      );
    }
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  removeItem(id: string) {

    if (!this.kosar) return;

    let index = this.kosar.ekszerIds.indexOf(id);
    if (index > -1) {
      this.kosar.ossz_ar -= this.ekszerek[index].ar;
      this.kosar.ekszerIds.splice(index, 1);
      this.ekszerek.splice(index, 1);
      this.kosardb.update(this.kosar).then(() => {;
      window.location.reload();  
      });
    }
  }

}
