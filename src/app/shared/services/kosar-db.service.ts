import { Injectable } from '@angular/core';
import { Kosar } from '../models/kosar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Ekszer } from '../models/ekszer';

@Injectable({
  providedIn: 'root'
})
export class KosarDbService {

  collectionName = 'kosarak';

  constructor(private afs: AngularFirestore) { }

  getById(id: string) {
    return this.afs.collection<Kosar>(this.collectionName).doc(id).valueChanges();
  }

  create(felhasznalo: string) {
    const kosar: Kosar = {
      id: this.afs.createId(),
      ossz_ar: 0,
      ekszerIds: [],
      felhasznaloId: felhasznalo
    };

    return this.afs.collection<Kosar>(this.collectionName).doc(kosar.id).set(kosar);

  }

  getKosar(felhasznalo: string) {
    return this.afs.collection<Kosar>(this.collectionName, ref => ref.where('felhasznaloId', '==', felhasznalo)).valueChanges();
  }

  delete(kosarId: string) {
    return this.afs.collection<Kosar>(this.collectionName).doc(kosarId).delete();
  }

  update(kosar: Kosar) {
    return this.afs.collection<Kosar>(this.collectionName).doc(kosar.id).update(kosar);
  }

}
