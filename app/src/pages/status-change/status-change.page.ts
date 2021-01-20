import { Component, OnInit } from '@angular/core';
import { UserPage } from '../user.page';

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.page.html',
  styleUrls: ['./status-change.page.scss'],
})
export class StatusChangePage extends UserPage { // implements OnInit {

  rechazoMotivos = [];
  estado: any = {};
  estadoNuevo:any;

  ionViewWillEnter() {
  // ngOnInit() {
    this.global.getStatusAsObservable().subscribe((result) => {
      this.loadEstado();
    });
    this.global.checkStatus();
  }

  loadEstado() {
    const endPoint = this.settings.endPoint('estado',{patente:this.user.patente});
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      this.estado = response;
      console.log(response);
      if(this.estado.id == this.settings.usuarioEstados.libre.id) {
        this.loadEstadoCambioMotivos();
      }
    })
    .catch( (reason) => {
      if(reason.status != 404) this.pageService.showError(reason);
    });
  }

  loadEstadoCambioMotivos() {
    const params = {
      patente: this.user.patente,
      nuevoEstado: this.settings.usuarioEstados.fueraDeServicio.nombre
    };
    const endPoint = this.settings.endPoint('estadoCambioMotivos',params);
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      console.log(response);
      this.rechazoMotivos = response;
    })
    .catch( (reason) => {
      if(reason.status != 404) this.pageService.showError(reason);
    });
  }

  goBack() {
    this.pageService.navigate("/status");
  }

  // logOut() {
  //   this.pageService.navigate("/login");
  // }

  changeState() {

    console.log(this.estadoNuevo);

    let item:any = {
      latitud: "-31.435650",
      longitud: "-64.229767",
      dni: this.user.dni,
      minutos: 0
    };


    if(this.estado.id == this.settings.usuarioEstados.fueraDeServicio.id) {
      item.estado = this.settings.usuarioCambioEstado.alta.estado;
      item.motivo = this.settings.usuarioCambioEstado.alta.motivo;
    } else {
      item.estado = this.settings.usuarioCambioEstado.baja.estado;
      item.motivo = this.estadoNuevo;
    }

    const endPoint = this.settings.endPoint('estadoCambio',{patente:this.user.patente});
    this.pageService.httpPatch( item, '', endPoint )
    .then( (response ) => {
      console.log( response );
      this.pageService.showError( response.mensaje );
      if(response.codigo >= 0) {
        this.global.checkStatus();
        if(response.codigo == this.settings.usuarioEstados.libre.id) {

          const endPoint = this.pageService.global.settings.endPoint('implementosConfirmados',{patente:this.user.patente});
          this.pageService.httpGet( '', endPoint )
          .then( (response) => {
            let cantidadImplementos = 0;
            if(response) {
              for(let item of response) {
                cantidadImplementos += item.cantidad;
              }
            }
            if(cantidadImplementos == 0) {
              this.pageService.navigate("/slide");
            } else {
              this.goToNextPage();
            }
          })
          .catch( (reason) => {
            if(reason.status == 404)
              this.pageService.navigate("/slide");
            else
              this.goToNextPage();
          });

        } else {
          this.goToNextPage();
        }


      }
    })
    .catch( (reason ) => {
      this.pageService.showError(reason);
    });

  }

  goToNextPage() {
    this.pageService.navigate("/status");
  }
}
