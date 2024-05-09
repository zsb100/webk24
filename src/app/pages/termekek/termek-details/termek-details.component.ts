import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ekszer } from '../../../shared/models/ekszer';
import { FormControl } from '@angular/forms';
import { Velemeny } from '../../../shared/models/velemeny';
import { MatDialog } from '@angular/material/dialog';
import { ConfDialogComponent } from '../../../shared/conf-dialog/conf-dialog.component';
import { TermekDbService } from '../../../shared/services/termek-db.service';
import { Subscription } from 'rxjs';
import { EditTermekComponent } from '../edit-termek/edit-termek.component';
import { VelemenyDbService } from '../../../shared/services/velemeny-db.service';
import { KosarDbService } from '../../../shared/services/kosar-db.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Kosar } from '../../../shared/models/kosar';

@Component({
  selector: 'app-termek-details',
  templateUrl: './termek-details.component.html',
  styleUrl: './termek-details.component.scss'
})
export class TermekDetailsComponent implements OnInit, OnDestroy {

  termekId: string = '';
  termek: Ekszer = {
    id: '',
    nev: '',
    imgLink: '',
    ar: 0,
    anyag: []
  }

  loggedin = localStorage.getItem('userid');
  admin: boolean = false;
  kosar?: Kosar;

  score: number = 0;

  leiras = new FormControl('');

  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private termekdb: TermekDbService,
    private velemenydb: VelemenyDbService,
    private kosardb: KosarDbService,
    private snack: MatSnackBar,
    private auth: AuthService
  ) { }


  ngOnInit(): void {
    this.subscription.add(this.auth.loggedIn().subscribe(userid => {
      this.loggedin = userid;
      this.subscription.add(this.kosardb.getKosar(userid).subscribe(kosar => {
        if (kosar.length > 0) {
          this.kosar = kosar[0];
        }
      }));
    }));
    this.subscription.add(this.auth.adminCheck().subscribe(isAdmin => {
      this.admin = isAdmin;
    }));
    this.subscription.add(
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.termekId = params['id'];
        }
      }));
    this.subscription.add(
      this.termekdb.getById(this.termekId).subscribe(ekszer => {
        if (ekszer) {
          this.termek = ekszer;
        }
      }));
  }


  addToCart() {
    if (!this.loggedin) {
      alert('Kosárba helyezéshez be kell jelentkezni');
      return;
    }

    if(this.kosar){
      this.kosar.ekszerIds.push(this.termekId);
      this.kosar.ossz_ar += this.termek.ar;
      this.kosardb.update(this.kosar).then(() => {
        this.snack.open('Sikeres kosárba helyezés', 'OK', { duration: 2000 });
      });
    }
  }

  setRating(val: number) {
    this.score = val;
  }

  addVelemeny() {
    if (this.leiras.value && this.score > 0 && this.loggedin) {
      var velemeny: Velemeny = {
        id: '',
        szoveg: this.leiras.value,
        pont: this.score,
        letrehozva: new Date(),
        szerkesztve: new Date(),
        felhasznaloId: this.loggedin,
        ekszerId: this.termekId
      }
    } else {
      alert('Hibás értékelés!');
      return;
    }

    this.velemenydb.create(velemeny).then(() => {
      alert('Sikeres értékelés!');
      window.location.reload();
    });

  }

  edit() {
    const dialogRef = this.dialog.open(EditTermekComponent, {
      width: '95%',
      height: '95%',
      data: { termek: this.termek }
    });
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.termekdb.delete(id).then(() => {
          alert('Sikeres törlés!');
          this.router.navigate(['/jewelrys']);
        });
      }
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}