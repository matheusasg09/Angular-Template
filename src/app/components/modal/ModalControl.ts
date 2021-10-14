import { BehaviorSubject } from 'rxjs';

export class ModalControl {
  isOpen$ = new BehaviorSubject(false);

  get isOpened(): boolean {
    return this.isOpen$.getValue();
  }

  constructor(isOpen?: boolean) {
    if (isOpen) {
      this.open();
    }
  }

  close(): void {
    this.isOpen$.next(false);
  }

  open(): void {
    this.isOpen$.next(true);
  }

  toggle(): void {
    this.isOpen$.next(!this.isOpen$.getValue());
  }
}
