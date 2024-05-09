import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FelhasznaloDbService } from '../../shared/services/felhasznalo-db.service';
import { Subscription } from 'rxjs';
import { KosarDbService } from '../../shared/services/kosar-db.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Felhasznalo } from '../../shared/models/felhasznalo';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  register = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordagain: new FormControl('')
  });

  constructor(
    private router: Router,
    private felhasznaloDBService: FelhasznaloDbService,
    private kosarDbSerive: KosarDbService,
    private auth: AuthService) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

  ngOnInit(): void {
  }

  addFelhasznalo() {
    if (this.register.value.name && this.register.value.email && this.register.value.password && this.register.value.passwordagain) {
      if (this.register.value.password == this.register.value.passwordagain) {
        if (this.register.value.password.length < 8) {
          alert('Túl rövid jelszó, legalább 8 karaktert kell tartalmaznia!');
          return;
        }
        var felh: Felhasznalo;
        this.auth.signup(this.register.value.email, this.register.value.password).then(cred => {
          if (cred.user) {
            const felh: Felhasznalo = {
              id: cred.user.uid as string,
              nev: this.register.value.name as string,
              email: this.register.value.email as string,
              jogosultsag: 'FELHASZNALO'
            }
            this.felhasznaloDBService.userRegister(felh).then(() => {
              this.kosarDbSerive.create(felh.id).then(() => {
                alert('Sikeres regisztráció!');
                this.router.navigate(['/login']);
              });
            });
          } else {
            alert('Sikertelen regisztráció!');
          }
        });
      }

      else {
        alert('A jelszavak nem egyeznek');
        return;
      }
    } else {
      alert('A mezők kitöltése kötelező');
      return;
    }
  }

}
