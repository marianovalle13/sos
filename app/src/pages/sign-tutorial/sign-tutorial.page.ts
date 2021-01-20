import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceBasePage } from '../service-base.page';

@Component({
  selector: 'app-sign-tutorial',
  templateUrl: './sign-tutorial.page.html',
  styleUrls: ['./sign-tutorial.page.scss'],
})
export class SignTutorialPage extends ServiceBasePage {


  goToSign() {

    if(this.servicio.tieneFirma) {
      if(this.servicio.fotosTomadasFinal < 1){
        let obligatory = 'obligatory';
        if(this.servicio.fotoFinal <= 0) obligatory = 'optional';
        this.pageService.navigate("/car-image/final/1/" + obligatory);
      } else {
        this.pageService.navigate("/service-end");
      }
    } else {
      this.pageService.navigate("/sign");
    }
  }
}
