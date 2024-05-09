import { Component, Input, OnInit } from '@angular/core';
import { Velemeny } from '../../../shared/models/velemeny';
import { MatDialog } from '@angular/material/dialog';
import { EditVelemenyComponent } from '../edit-velemeny/edit-velemeny.component';
import { FelhasznaloDbService } from '../../../shared/services/felhasznalo-db.service';
import { Subscription } from 'rxjs';
import { VelemenyDbService } from '../../../shared/services/velemeny-db.service';
import { ConfDialogComponent } from '../../../shared/conf-dialog/conf-dialog.component';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-list-velemeny',
  templateUrl: './list-velemeny.component.html',
  styleUrl: './list-velemeny.component.scss'
})
export class ListVelemenyComponent implements OnInit {

  @Input() id: string = '';

  velemenyek: Velemeny[] = [];
  felhasznalok: Map<string, string> = new Map<string, string>();

  loggedin = localStorage.getItem('user');
  admin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private felhasznalodb: FelhasznaloDbService,
    private velemenydb: VelemenyDbService,
    private auth: AuthService) { }

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(this.auth.loggedIn().subscribe(userid => {
      this.loggedin = userid;
    }));
    this.subscriptions.add(this.auth.adminCheck().subscribe(isAdmin => {
      this.admin = isAdmin;
    }));
    this.subscriptions.add(
      this.velemenydb.getByEkszerId(this.id).subscribe(velemenyek => {
        this.velemenyek = velemenyek;
        for (let velemeny of this.velemenyek) {
          this.subscriptions.add(
            this.felhasznalodb.getById(velemeny.felhasznaloId).subscribe(felhasznalo => {
              if (felhasznalo)
                this.felhasznalok.set(velemeny.id, felhasznalo.nev);
            })
          );
        }
      })
    );
  }

  getStars(score: number): number[] {
    return Array(score).fill(0).map((x, i) => i);
  }

  deleteVelemeny(id: string) {
    const dialogRef = this.dialog.open(ConfDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.velemenydb.delete(id).then(() => {
        });
      }
    });

  }

  editVelemeny(item: Velemeny) {
    const dialogRef = this.dialog.open(EditVelemenyComponent, {
      width: '95%',
      height: '95%',
      data: { velemeny: item }
    });
  }
}
