import { Component, OnInit } from '@angular/core';
import { ServiceBasePage } from '../service-base.page';
import * as moment from 'moment';

@Component({
  selector: 'app-service-end',
  templateUrl: './service-end.page.html',
  styleUrls: ['./service-end.page.scss'],
})
export class ServiceEndPage extends ServiceBasePage implements OnInit {

  images: any = {};
  stage = 'final';
  comment = "";

  ngOnInit() {
    this.images = JSON.parse( JSON.stringify( this.settings.carImage ) );
  }

  ionViewWillEnter() {
    this.reLoadServicio();
  }

  servicioLoaded() {
    let idx = 1;
    for(let imagen of this.servicio.imagenes) {
      if(imagen.tipo == this.settings.imageTypes.final.code) {
        if(this.images[this.stage][idx]) {
          this.images[this.stage][idx].image = imagen.thumb;
          idx++;
        }
      }
    }
  }

  createComment() {

    if(this.comment.trim() == "") {
      this.finishService();
      return;
    }

    const params = {
      patente: this.user.patente
    };
    const endPoint = this.settings.endPoint('comentariosRegistrar',params);

    const item = {
      tipo: 'GAP',
      Observacion: this.comment,
      fechaHora: moment().format("DD/MM/YYYY HH:mm"),
    };

    this.pageService.httpPost( item, '', endPoint )
    .then( (response) => {
      if(response.codigo == -1) {
        this.goToHome();
      } else {
        this.comment = "";
        this.finishService();
      }
    })
    .catch( (reason) => {
      this.pageService.showError(reason);
    });

  }

  // finishService() {
  //     this.global.clearAllServiceInfo();
  //     this.pageService.navigate("/services");
  // }

  finishService() {
    this.pageService.showLoading();
    this.updateState( this.settings.servicioAcciones.finalizado.codigo, 0 )
    .then( (response:any) => {
      this.pageService.hideLoading();
      if(response.codigo == -1) {
        this.goToHome();
      } else {
        this.global.clearAllServiceInfo();
        this.pageService.navigate("/services");
      }
    })
    .catch( (reason) => {
      this.pageService.hideLoading();
      this.pageService.showError(reason);
    });
  }

}
