import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, ComponentsModule, MatDialogModule],
})
export class PagesModule {}
