import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DialogComponent } from './dialog/dialog.component';
import { ModalControl } from './ModalControl';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'auto';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('content') content!: ElementRef;
  @Input() size: ModalSize = 'xl';
  @Input() height: string = 'auto';
  @Input() control!: ModalControl;
  @Input() disableClose = false;

  modalRef!: MatDialogRef<DialogComponent>;

  constructor(public dialog: MatDialog) {}
  ngAfterViewInit(): void {
    this.control.isOpen$.subscribe((isOpen) => {
      if (isOpen) {
        this.openDialog();
      } else {
        this.closeDialog();
      }
    });
  }

  private getSize(): string {
    if (this.size === 'auto') {
      return 'auto';
    }

    const sizes = {
      sm: '250',
      md: '400',
      lg: '700',
      xl: '1100',
    };

    const size = sizes[this.size];

    if (!size) {
      throw Error(
        "O parâmetro size está incorreto. Insira um valor compatível com o tipo 'ModalSize'"
      );
    }

    return `${size}px`;
  }

  private openDialog(): void {
    this.modalRef = this.dialog.open(DialogComponent, {
      width: this.getSize(),
      height: this.height ?? '800px',
      maxHeight: '100vh',
      panelClass: 'dialog-class',
      autoFocus: false,
      disableClose: this.disableClose,
      data: {
        html: this.content.nativeElement,
      },
    });

    this.modalRef.afterClosed().subscribe(() => {
      this.control.close();
    });
  }

  private closeDialog(): void {
    this.modalRef?.close();
  }
}
