import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignPage } from './sign.page';

import { SignaturePadModule } from 'angular2-signaturepad';

const routes: Routes = [
  {
    path: '',
    component: SignPage
  }
];

@NgModule({
  imports: [
    SignaturePadModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SignPage]
})
export class SignPageModule {}
