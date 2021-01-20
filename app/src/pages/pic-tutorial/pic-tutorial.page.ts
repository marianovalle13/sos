import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceBasePage } from '../service-base.page';

@Component({
  selector: 'app-pic-tutorial',
  templateUrl: './pic-tutorial.page.html',
  styleUrls: ['./pic-tutorial.page.scss'],
})
export class PicTutorialPage extends ServiceBasePage implements OnInit {

  ngOnInit() {
  }

  servicioLocalLoaded() {
    let showAdicionales = (this.global.load(this.settings.storage.adicionales,'si') ? false : true);

    if(
      this.servicio.montoAdicional &&
      this.servicio.montoAdicional > 0 &&
      showAdicionales
    ) {
      this.global.save(this.settings.storage.adicionales,'si');
      this.global.newMessage("Recuerde cobrar los adicionales antes de realizar la asistencia");
    }
  }


  goToCarImages() {
    let obl = 'obligatory';
    if(this.servicio.fotoArribo <= 0) obl = 'optional';
    this.pageService.navigate("/car-image/arribo/1/" + obl);
  }
}
