import { Component, OnInit } from '@angular/core';
import { UserPage } from '../user.page';


@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage extends UserPage { // implements OnInit {

  serviceNo: any;
  servicio: any = {};
  estado: any = {};
  implementos = [];
  telefono: any;

  ionViewWillEnter() {
  //   console.log("-------");
  // }
  //
  // ngOnInit() {
    this.loadServicio();
    this.loadImplementos();

    // (+) Status
    this.global.getStatusAsObservable().subscribe((result) => {
      this.loadEstado();
    });
    this.global.checkStatus();
    // (-) Status

    // (+) Servicio
    this.global.getServicioAsObservable().subscribe((result) => {
      this.loadServicio();
    });
    this.global.checkServicio();
    // (-) Servicio


    this.loadTelefono();
  }

  loadServicio() {
    this.servicio = null;
    const params = {
      patente: this.user.patente,
      periodo: this.settings.servicios.pendientes.periodo,
      estadoSvc: this.settings.servicios.pendientes.estadoSvc
    };
    const endPoint = this.settings.endPoint('servicios',params);
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      for(let serv of response) {
        if(this.settings.codigosEstado[serv.codigo_estado].procesando || this.settings.codigosEstado[serv.codigo_estado].asignado) {
          this.servicio = serv;
          this.servicio.procesando = this.settings.codigosEstado[serv.codigo_estado].procesando;
          this.servicio.asignado = this.settings.codigosEstado[serv.codigo_estado].asignado;
          break;
        }
      }
    })
    .catch( (reason) => {
      if(reason.status != 404) this.pageService.showError(reason);
    });
  }

  loadEstado() {
    const endPoint = this.pageService.global.settings.endPoint('estado',{patente:this.user.patente});
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      this.estado = response;
    })
    .catch( (reason) => {
      this.pageService.showError(reason);
    });
    this.loadImplementos();
  }

  loadTelefono() {
    const endPoint = this.pageService.global.settings.endPoint('telefono',{patente:this.user.patente});
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      console.log(response);
      this.telefono = response;
    })
    .catch( (reason) => {
      if(reason.status == 400) this.pageService.showError("No hay telefono asociado");
      else if(reason.status != 404) this.pageService.showError(reason);
    });
  }

  loadImplementos() {
    const endPoint = this.pageService.global.settings.endPoint('implementosConfirmados',{patente:this.user.patente});
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      this.implementos = response;
    })
    .catch( (reason) => {
      if(reason.status != 404) this.pageService.showError(reason);
    });
  }

  goToServices(){
    this.pageService.navigate("/services");
  }


  goToService() {
    this.pageService.navigate("/service/" + this.servicio.servicio);
  }


  goToStatusChange() {
    // this.global.newMessage("Recuerde cobrar los adicionales antes de realizar la asistencia");

    this.pageService.navigate("/status-change");
  }

  goToCall() {
  }

}
