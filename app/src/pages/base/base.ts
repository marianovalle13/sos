import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-base',
  templateUrl: './base.html',
  styleUrls: ['./base.scss'],
})
export class BasePage implements OnInit {

  loading: any;

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) {
  }

  ngOnInit() {
  }

  // (+) Loading
  async showLoading(content?) {
    // if(!content) content = '';
    // await this.loadingCtrl.create({
    // }).then(a => {
    //   a.present();
    // });
  }
  async hideLoading() {
    // await this.loadingCtrl.dismiss();
  }
  // (-) Loading


  // (+) Message
  showSuccess(message) {
    this.showMessage(message,"toast-success");
  }
  showError(message) {
    this.showMessage(message,"toast-error");
  }
  showWarning(message) {
    this.showMessage(message,"toast-warning");
  }
  showMessage(message,cssClass){
    console.log(message);
    let toast = this.toastCtrl.create({
      message: message,
      cssClass:cssClass,
      duration: 4000,
      position: 'top'
    }).then((toastData)=>{
      toastData.present();
    });

  }
  // (-) Message

}
