import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anyag } from '../models/anyag';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AnyagDbService {

  constructor() { }


  getAll(): Observable<Anyag[]>{
    const dburl = environment.API_URL + '/anyag/list';

    return new Observable<Anyag[]>(observer => {
      fetch(dburl)
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }

  create(nev: string): Observable<Object> {
    const dburl = environment.API_URL + '/anyag/create';
    return new Observable<Object>(observer => {
      fetch(dburl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nev)
      })
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }
}
