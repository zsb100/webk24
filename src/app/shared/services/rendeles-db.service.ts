import { Injectable } from '@angular/core';
import { Rendeles } from '../models/rendeles';
import { Cim } from '../models/cim';
import { Kosar } from '../models/kosar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RendelesDbService {

  collectionName = 'rendelesek';

  constructor(private afs: AngularFirestore, private auth: AuthService) { }


  create(cim: Cim, felhasznaloid: string, kosar: Kosar){

    const newRendeles: Rendeles = {
      id: this.afs.createId(),
      azonosito: '24/'+ (Math.floor(Math.random() * (9999 - 1000)) + 1000) as string,
      datum: new Date(),
      cim: cim,
      felhasznaloId: felhasznaloid,
      kosar: kosar
    };

    
    return this.afs.collection<Rendeles>(this.collectionName).doc(newRendeles.id).set(newRendeles);
  }

  getAll(){
    return this.afs.collection<Rendeles>(this.collectionName).valueChanges();
  }

  getByUser(userid: string){
    return this.afs.collection<Rendeles>(this.collectionName, ref => ref.where('felhasznaloId', '==', userid)).valueChanges();
  }

  deleteRendeles(id: string) {
    return this.afs.collection<Rendeles>(this.collectionName).doc(id).delete();
  }

}
