import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ekszer } from '../../../shared/models/ekszer';
import { TermekDbService } from '../../../shared/services/termek-db.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-termek',
  templateUrl: './edit-termek.component.html',
  styleUrl: './edit-termek.component.scss'
})
export class EditTermekComponent implements OnInit, OnDestroy {


  ar: FormControl = new FormControl('');
  nev: FormControl = new FormControl('');
  termek: Ekszer | null = null;
  anyag1: FormControl = new FormControl('');
  anyag2: FormControl = new FormControl('');
  anyag3: FormControl = new FormControl('');

  anyagok: string[] = ['', '', ''];

  selectedFile: File | null = null;

  imgurl = '';



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private termekdb: TermekDbService, private snack: MatSnackBar) { }


  ngOnInit(): void {
    if (this.data.termek !== '') {
      this.termek = this.data.termek;
      this.ar.setValue(this.termek?.ar);
      this.nev.setValue(this.termek?.nev);
      if (this.termek) {
        this.termek.anyag.forEach((anyag) => {
          this.anyagok.push(anyag);
        });
      }
    }
  }

  ngOnDestroy(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  save() {
    if (!this.termek) {
      return;
    }

    this.termek.ar = this.ar.value;
    this.termek.nev = this.nev.value;

    if (this.anyag1.value) {
      this.termek.anyag.push(this.anyag1.value);
    }
    if (this.anyag2.value) {
      this.termek.anyag.push(this.anyag2.value);
    }
    if (this.anyag3.value) {
      this.termek.anyag.push(this.anyag3.value);
    }

    if (this.imgurl) {
      this.termek.imgLink = this.imgurl;
    }

    this.termekdb.update(this.termek).then(_ => {
      alert('Sikeres módosítás!');
      window.location.reload();
    });

  }

  uploadFile() {
    if (this.selectedFile) {
      this.snack.open('Feltöltés folyamatban...');
      this.termekdb.uploadImg(this.selectedFile).then((res) => {
        res.ref.getDownloadURL().then((url) => {
          this.imgurl = url;
          this.snack.open('Feltöltés sikeres!', 'Ok', { duration: 2000});
        })
      });
    }
  }
}
