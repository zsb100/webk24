import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Velemeny } from '../../../shared/models/velemeny';
import { FormControl, FormGroup } from '@angular/forms';
import { VelemenyDbService } from '../../../shared/services/velemeny-db.service';
@Component({
  selector: 'app-edit-velemeny',
  templateUrl: './edit-velemeny.component.html',
  styleUrl: './edit-velemeny.component.scss'
})
export class EditVelemenyComponent implements OnInit, OnDestroy {

  velemeny: Velemeny = {
    id: '',
    szoveg: '',
    pont: 0,
    letrehozva: new Date(),
    szerkesztve: new Date(),
    felhasznaloId: '',
    ekszerId: '',
  }

  loading: boolean = false;

  score: number = 0;

  editVelemenyForm = new FormGroup(
    {
      szoveg: new FormControl(),
      pont: new FormControl()
    }
  );

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private velemenydb: VelemenyDbService) { }

  ngOnInit(): void {
    this.loading = true;
    if (this.data.velemeny !== '') {
      this.velemeny = this.data.velemeny;
      this.score = this.velemeny.pont;
      this.editVelemenyForm.get('szoveg')?.setValue(this.velemeny.szoveg);
      this.editVelemenyForm.get('pont')?.setValue(this.velemeny.pont);
    }
    this.loading = false;
  }

  ngOnDestroy(): void {
  }

  setRating(val: number) {
    this.editVelemenyForm.get('pont')?.setValue(val);
    this.score = val;
  }

  save() {
    if (this.editVelemenyForm.invalid) {
      return;
    }
    if (this.editVelemenyForm.value.szoveg) {
      this.velemeny.szoveg = this.editVelemenyForm.value.szoveg;
    }
    if (this.editVelemenyForm.value.pont) {
      this.velemeny.pont = this.editVelemenyForm.value.pont;
    }

    this.velemenydb.update(this.velemeny).then(() => {
      window.location.reload();
    });

  }





}
