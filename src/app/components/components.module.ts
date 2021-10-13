import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { LoaderComponent } from './loader/loader.component';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [LoaderComponent, ButtonComponent];

@NgModule({
  declarations: [...COMPONENTS, ButtonComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatButtonModule,
  ],
  exports: [...COMPONENTS],
})
export class ComponentsModule {}
