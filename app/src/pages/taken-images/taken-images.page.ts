import { Component, OnInit } from '@angular/core';
import { ServiceBasePage } from '../service-base.page';

@Component({
  selector: 'app-taken-images',
  templateUrl: './taken-images.page.html',
  styleUrls: ['./taken-images.page.scss'],
})
export class TakenImagesPage extends ServiceBasePage implements OnInit {

  images: any = {};
  stage = 'arribo';

  ngOnInit() {
    this.images = JSON.parse( JSON.stringify( this.settings.carImage ) );
  }

  ionViewWillEnter() {
  // ngOnInit() {
    // this.images = JSON.parse( JSON.stringify( this.settings.carImage ) );
    this.reLoadServicio();
  }

  servicioLoaded() {
    let idx = 1;
    for(let imagen of this.servicio.imagenes) {
      if(imagen.tipo == this.settings.imageTypes.arribo.code) {
        this.images[this.stage][idx].image = imagen.thumb;
        idx++;
      }
    }
  }

  finishService() {
    this.global.setImagesArrivalEnd();
    this.pageService.navigate("/service/" + this.servicioId);
  }

}
