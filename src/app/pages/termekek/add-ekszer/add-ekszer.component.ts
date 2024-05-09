import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TermekDbService } from '../../../shared/services/termek-db.service';
import { Ekszer } from '../../../shared/models/ekszer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-ekszer',
  templateUrl: './add-ekszer.component.html',
  styleUrl: './add-ekszer.component.scss'
})
export class AddEkszerComponent {

  ekszerForm: FormGroup = new FormGroup({
    nev: new FormControl(''),
    ar: new FormControl(''),
    anyag1: new FormControl(''),
    anyag2: new FormControl(''),
    anyag3: new FormControl('')
  });

  selectedFile: File | null = null;

  imgurl = '';


  constructor(private termekdb: TermekDbService, private snack: MatSnackBar) { }

  addEkszer(): void {

    const ekszer: Ekszer = {
      id: '',
      nev: this.ekszerForm.value.nev,
      ar: this.ekszerForm.value.ar,
      imgLink: '',
      anyag: []
    }

    if (this.ekszerForm.value.anyag1) {
      ekszer.anyag.push(this.ekszerForm.value.anyag1);
    }
    if (this.ekszerForm.value.anyag2) {
      ekszer.anyag.push(this.ekszerForm.value.anyag2);
    }
    if (this.ekszerForm.value.anyag3) {
      ekszer.anyag.push(this.ekszerForm.value.anyag3);
    }

    if (this.imgurl) {
      ekszer.imgLink = this.imgurl;
    }

    this.termekdb.create(ekszer).then(_ => {
      alert('Sikeres hozzáadás!');
      window.location.reload();
    });

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      this.snack.open('Feltöltés folyamatban...');
      this.termekdb.uploadImg(this.selectedFile).then((res) => {
        res.ref.getDownloadURL().then((url) => {
          this.imgurl = url;
          this.snack.open('Feltöltés sikeres!', 'Ok', { duration: 2000 });
        })
      });
    }
  }

}
