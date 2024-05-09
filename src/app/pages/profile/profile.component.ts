import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Felhasznalo } from '../../shared/models/felhasznalo';
import { FelhasznaloDbService } from '../../shared/services/felhasznalo-db.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  user?: Felhasznalo;
  szerkesztheto: boolean = false;
  rendeles: boolean = false;

  edit = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    passwordagain: new FormControl('')
  });

  constructor(private felhasznaloDBService: FelhasznaloDbService, private auth: AuthService, private fauth: AngularFireAuth) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

  ngOnInit(): void {
    this.subscriptions.add(
      this.auth.loggedIn().subscribe(user => {
        this.subscriptions.add(
          this.felhasznaloDBService.getById(user).subscribe(data => {
            this.user = data;
            if(this.user){
              this.edit.controls['name'].setValue(this.user.nev);
            }
          })
        );
      })
    );
  }

  editUser() {
    if (this.edit.value.password && this.edit.value.passwordagain) {
      if (this.edit.value.password == this.edit.value.passwordagain) {
        if (this.edit.value.password.length < 8) {
          alert('Túl rövid jelszó! Legalább 8 karakter hosszúnak kell lennie!');
          return;
        } else {
          this.fauth.currentUser.then(user => {
            if (user) {
              user.updatePassword(this.edit.value.password as string).then(() => {
                alert('Jelszó sikeresen módosítva!');
              }).catch(() => {
                alert('Hiba a jelszó módosítása közben!');
              });
            }
          });
        }
      } else {
        alert('A két jelszó nem egyezik meg!');
        return;
      }
    }

  let nev = this.edit.value.name as string;

  if ( nev != this.user?.nev) {
    this.user!.nev = nev;
    this.felhasznaloDBService.update(this.user!).then(() => {
      alert('Sikeres módosítás!');
    }).catch(() => {
      alert('Hiba a módosítás közben!');
      return;
    });
  }

    this.szerkesztheto = false;
  }
}