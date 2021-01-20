import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PicTutorialPage } from './pic-tutorial.page';

const routes: Routes = [
  {
    path: '',
    component: PicTutorialPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PicTutorialPage]
})
export class PicTutorialPageModule {}
