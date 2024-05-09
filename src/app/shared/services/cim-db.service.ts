import { Injectable } from '@angular/core';
import { Cim } from '../models/cim';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CimDbService {

  collectionName = 'cimek';

  constructor(private afs: AngularFirestore) { }

  create(cim: Cim){
    cim.id = this.afs.createId();
    return this.afs.collection<Cim>(this.collectionName).doc(cim.id).set(cim);
  }
}
