import { Component, OnInit } from '@angular/core';
import { Ekszer } from '../../shared/models/ekszer';
import { TermekDbService } from '../../shared/services/termek-db.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  new: Ekszer[] = [];
  best: Ekszer[] = [];

  constructor(private termekdb: TermekDbService) { }

  ngOnInit(): void {
    this.termekdb.getAll().subscribe((data: Ekszer[]) => {
      if (data.length) {
        for (let i = 0; i < 4 && i < data.length; i++) {
          this.new.push(data[i]);
        }
      }
      if (data.length > 4) {
        for (let i = data.length-1; i > data.length-5; i--) {
          this.new.push(data[i]);
        }
      }
    });
  }

}
