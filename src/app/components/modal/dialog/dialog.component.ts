import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit {
  @ViewChild('content') content!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { html: ElementRef }
  ) {}

  ngAfterViewInit(): void {
    this.content.nativeElement.appendChild(this.data.html);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
