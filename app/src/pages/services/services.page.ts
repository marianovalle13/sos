import { Component, OnInit } from '@angular/core';
import { UserPage } from '../user.page';
import { PageService } from '../../app/core/page.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage extends UserPage { // implements OnInit {

  servicios = [];

  ionViewWillEnter() {
  // ngOnInit() {
    this.loadServicios();
  }

  loadServicios() {
    const params = {
      patente: this.user.patente,
      periodo: this.pageService.global.settings.servicios.pendientes.periodo,
      estadoSvc: this.pageService.global.settings.servicios.pendientes.estadoSvc
    };
    const endPoint = this.pageService.global.settings.endPoint('servicios',params);
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      this.servicios = response;
    })
    .catch( (reason) => {
      console.log(reason);
      if(reason.status != 404) this.pageService.showError(reason);
    });
  }

  getCodigoEstadoButtonClass(codigoEstado) {
    return this.pageService.global.settings.codigosEstado[codigoEstado].buttonClass;
  }

  goToRecord(){
    this.pageService.navigate("/record/-1");
  }

  goToReasons(){
    this.pageService.navigate("/service-reason");
  }

  goToService(servicio) {
    this.pageService.navigate("/service/" + servicio.servicio);
  }

  goToStatus(){
    this.pageService.navigate("/status");
  }

  // logOut() {
  //   this.pageService.navigate("/login");
  // }


}
