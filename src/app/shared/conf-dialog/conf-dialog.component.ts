import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-conf-dialog',
  templateUrl: './conf-dialog.component.html',
  styleUrl: './conf-dialog.component.scss'
})


export class ConfDialogComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<ConfDialogComponent>) {}

  confirm() {
    this.dialogRef.close();
    this.confirmed.emit(true);
  }

  cancel() {
    this.dialogRef.close();
  }
}