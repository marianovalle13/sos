import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
  styleUrls: ['message.scss']
})
export class MessagePage {

  @Input() message: string;

  constructor(
    public modalCtrl: ModalController
  ) {
  }

  close() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
