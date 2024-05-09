import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { KosarDbService } from '../../shared/services/kosar-db.service';
import { TermekDbService } from '../../shared/services/termek-db.service';
import { Kosar } from '../../shared/models/kosar';
import { Router } from '@angular/router';
import { Ekszer } from '../../shared/models/ekszer';
import { CimDbService } from '../../shared/services/cim-db.service';
import { Cim } from '../../shared/models/cim';
import { RendelesDbService } from '../../shared/services/rendeles-db.service';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-rendeles',
  templateUrl: './rendeles.component.html',
  styleUrl: './rendeles.component.scss'
})
export class RendelesComponent implements OnInit, OnDestroy {

  cim: FormGroup = new FormGroup({
    irsz: new FormControl(''),
    varos: new FormControl(''),
    utca: new FormControl(''),
    hazszam: new FormControl(''),
    orszag: new FormControl('Magyarország')
  });

  loggedin: string = '';

  kosar: Kosar = {
    id: '',
    ossz_ar: 0,
    felhasznaloId: '',
    ekszerIds: []

  };

  ekszerek: Ekszer[] = [];

  constructor(
    private auth: AuthService,
    private kosardb: KosarDbService,
    private termekdb: TermekDbService,
    private router: Router,
    private cimdb: CimDbService,
    private rendelesdb: RendelesDbService
  ) { }

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(this.auth.loggedIn().subscribe(userid => {
      if (userid) {
        this.loggedin = userid;
        this.subscriptions.add(this.kosardb.getKosar(this.loggedin).subscribe(
          kosarak => {
            this.kosar = kosarak[0];
            this.getekszerek();
          }
        ))
      } else {
        alert('Rendeléshez be kell jelentekzni!')
      }
    }));
  }

  getekszerek() {
    if (!this.kosar) return;
    for (let ekszer of this.kosar.ekszerIds) {
      this.subscriptions.add(
        this.termekdb.getById(ekszer).subscribe(data => {
          if (data) {
            this.ekszerek.push(data);
          }
        })
      );

    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  placeOrder() {
    if (!this.cim.value.irsz || !this.cim.value.utca || !this.cim.value.hazszam || !this.cim.value.varos) {
      alert('Hibás vagy hiányos cím!');
      return;
    }

    if (!this.kosar) {
      alert('Nincs termék a kosárban!');
      return;
    }

    const cim: Cim = {
      id: '',
      iranyitoszam: this.cim.value.irsz,
      varos: this.cim.value.varos,
      utca: this.cim.value.utca,
      hazszam: this.cim.value.hazszam,
      orszag: this.cim.value.orszag,
      felhasznaloId: this.loggedin
    };

    if (this.loggedin) {
      this.cimdb.create(cim).then(res => {
        this.rendelesdb.create(cim, this.loggedin, this.kosar).then(_ => {
          this.kosardb.delete(this.kosar.id).then(_ => {
            this.kosardb.create(this.loggedin).then(_ => {
              alert('Rendelés sikeres!');
              this.router.navigate(['/rendeles']);
            });
          })
        })
      });
    }
    else {
      alert('Hiba a rendelés során')
    }
  }

}
