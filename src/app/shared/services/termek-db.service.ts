import { Injectable } from '@angular/core';
import { Ekszer } from '../models/ekszer';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class TermekDbService {

  collectionName = 'ekszerek';

  constructor(private afs: AngularFirestore, private store: AngularFireStorage) { }


  getAll() {
    return this.afs.collection<Ekszer>(this.collectionName).valueChanges();
  }

  getById(id: string){
    return this.afs.collection<Ekszer>(this.collectionName).doc(id).valueChanges();
  }

  create(ekszer: Ekszer) {
    ekszer.id = this.afs.createId();
    return this.afs.collection<Ekszer>(this.collectionName).doc(ekszer.id).set(ekszer);
  }

  update(ekszer: Ekszer) {
    return this.afs.collection<Ekszer>(this.collectionName).doc(ekszer.id).update(ekszer);
  }

  delete(id: string){
    return this.afs.collection<Ekszer>(this.collectionName).doc(id).delete();
  }

  uploadImg(file: File){
    const filePath = `products/`+file.name;
    const ref = this.store.storage.ref(filePath);
    return ref.put(file);
  }

}
