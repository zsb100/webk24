import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FelhasznaloDbService } from '../felhasznalo-db.service';
import { ContentObserver } from '@angular/cdk/observers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private auth: AngularFireAuth, private felhasznalodb: FelhasznaloDbService) { }

  userId = '';
  admin = false;

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  loggedIn(): Observable<string> {
    return new Observable<string>(observer => {
      this.auth.onAuthStateChanged(
        usr => {
          if (usr != null) {
            this.userId = usr.uid;
            observer.next(this.userId);
          } else {
            observer.next('');
          }
        }
      );
    });
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  adminCheck(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.loggedIn().subscribe(userid => {
        if (userid === '') {
          observer.next(false);
        } else {
          this.felhasznalodb.getById(userid).subscribe(data => {
            this.admin = (data?.jogosultsag === 'ADMIN');
            observer.next(this.admin);
          });
        }
      });
    });
  }
}
