import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Velemeny } from '../models/velemeny';
import { environment } from '../../../environments/environment.development';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class VelemenyDbService {

  collectionName = 'velemenyek';

  constructor(private afs: AngularFirestore) { }

  getByEkszerId(id: string){
    return this.afs.collection<Velemeny>(this.collectionName, ref => ref.where('ekszerId', '==', id)).valueChanges();
  }

  create(velemeny: Velemeny){
    velemeny.id = this.afs.createId();
    return this.afs.collection<Velemeny>(this.collectionName).doc(velemeny.id).set(velemeny);
  }

  delete(id: string){
    return this.afs.collection<Velemeny>(this.collectionName).doc(id).delete();
  }

  update(velemeny: Velemeny){
    return this.afs.collection<Velemeny>(this.collectionName).doc(velemeny.id).update(velemeny);
  }

  getAll() {
    return this.afs.collection<Velemeny>(this.collectionName).valueChanges();
  }

}
