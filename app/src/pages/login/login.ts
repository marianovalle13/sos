import { Component } from '@angular/core';
// import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { BasePage } from '../base/base';
// import { Storage } from '@ionic/storage';
// import { Events } from '@ionic/angular';
// import { Router } from '@angular/router';
// import { AngularFireMessaging } from '@angular/fire/messaging';
import { PageService } from '../../app/core/page.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['login.scss']
})
export class LoginPage {

  dni: any = '12345678';

  constructor(
    public pageService: PageService
  ) {
  }

  goToLoginPatent() {
    if (this.dni) {
      this.pageService.navigate( '/login-patent', '', { dni: this.dni } );
    } else {
      this.pageService.showError('Debe cargar el DNI')
    }
  }

}
