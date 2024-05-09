import { Injectable } from '@angular/core';
import { Felhasznalo } from '../models/felhasznalo';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FelhasznaloDbService {

  collectionName = 'felhasznalok';

  constructor(private router: Router, private afs: AngularFirestore) { }

  getAll() {
    return this.afs.collection<Felhasznalo>(this.collectionName).valueChanges();
  }

  userRegister(user: Felhasznalo) {
    return this.afs.collection<Felhasznalo>(this.collectionName).doc(user.id).set(user);
  }

  getById(id: string) {
    return this.afs.collection<Felhasznalo>(this.collectionName).doc(id).valueChanges();
  }

  delete(id: string) {
    return this.afs.collection<Felhasznalo>(this.collectionName).doc(id).delete();
  }

  update(user: Felhasznalo) {
    return this.afs.collection<Felhasznalo>(this.collectionName).doc(user.id).update(user);
  }

  getByName(name: string) {
    return this.afs.collection<Felhasznalo>(this.collectionName, ref => ref.where('nev', '==', name)).valueChanges();
  }

}
