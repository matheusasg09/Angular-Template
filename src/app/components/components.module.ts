import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { LoaderComponent } from './loader/loader.component';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { DialogComponent } from './modal/dialog/dialog.component';

const COMPONENTS = [LoaderComponent, ButtonComponent, ModalComponent];

@NgModule({
  declarations: [...COMPONENTS, DialogComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatButtonModule,
  ],
  exports: [...COMPONENTS],
  entryComponents: [DialogComponent],
})
export class ComponentsModule {}
