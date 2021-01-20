import { Component, OnInit } from '@angular/core';
import { ServiceBasePage } from '../service-base.page';
import * as moment from 'moment';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage extends ServiceBasePage implements OnInit {
  accepted: any;
  comment = "";
  listComments = true;
  listReferenciaServicio = true;
  listReferenciaLocalizacion = true;

  ngOnInit() {
    // console.log(this.global.isImagesArrivalEnd());
  }

  servicioLoaded() {
    if(this.servicio.estado.arribo) {
      if(this.servicio.fotoArribo > this.servicio.fotosTomadasArribo) {
        const foto = this.servicio.fotoArribo - this.servicio.fotosTomadasArribo;
        this.pageService.navigate("/car-image/arribo/" + foto + "/obligatory");
      };
    }
  }

  goToReason(reason) {
    this.pageService.navigate("/service-reason/" + reason);
  }

  acceptService() {
    this.global.clearImages();
    this.global.setServiceArrivalStart();
    this.updateState( this.settings.servicioAcciones.aceptar.codigo, 0 )
    .then( (response:any) => {
      if(response.codigo == -1) {
        //this.pageService.showError(response.mensaje);
      // } else {
      //   this.reLoadServicio();
        this.goToHome();
      }
    })
    .catch( (reason) => {
      this.pageService.showError(reason);
    });
  }

  isArray(el) {
    return Array.isArray(el);
  }

  createComment() {

    if(this.comment.trim() == "") {
      this.pageService.showError("Debe ingresar un comentario");
      return;
    }

    const params = {
      patente: this.user.patente
    };
    const endPoint = this.settings.endPoint('comentariosRegistrar',params);

    this.pageService.showLoading();

    const item = {
      tipo: 'GAP',
      Observacion: this.comment,
      fechaHora: moment().format("DD/MM/YYYY HH:mm:ss"),
    };

    this.pageService.httpPost( item, '', endPoint )
    .then( (response) => {
      this.pageService.hideLoading();
      if(response.codigo == -1) {
        this.goToHome();
      } else {
        this.comment = "";
        //this.reLoadServicio();
        this.servicio.comentarios.unshift({fecha:item.fechaHora,referencia:item.Observacion});
      }
    })
    .catch( (reason) => {
      this.pageService.showError(reason);
    });

  }


  goToSignTuto() {
    this.pageService.navigate("/sign-tutorial");
  }


  goToNewPatent() {
    this.pageService.navigate("/patent-new");
  }

  goToServiceMap() {
    this.pageService.navigate("/service-map/"+this.servicioId);
  }


}
