import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WelcomeWorkingdayPage } from './welcome-workingday.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeWorkingdayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomeWorkingdayPage]
})
export class WelcomeWorkingdayPageModule {}
