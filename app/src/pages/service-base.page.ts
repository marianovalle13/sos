import { Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPage } from './user.page';
import { PageService } from '../app/core/page.service';
import * as moment from 'moment';


@Directive({
  selector: '[]'
})
export class ServiceBasePage extends UserPage {
  servicio: any;
  servicioId;
  servicioCodigoEstadoNombre;
  servicioCodigoEstadoButtonClass;

  constructor(
    public pageService: PageService,
    public activatedRoute: ActivatedRoute
  ) {
    super(pageService);

    // (+) Servicio
    this.global.getServicioAsObservable().subscribe((result) => {
      if(result) {
        this.servicio = this.global.getServicio();
        this.servicioLocalLoaded();
        if(result) {
          this.servicioId = this.servicio.id;
        } else {
          // TODO ver que hacer
          // this.pageService.navigateRoute("/home");
        }
      } else {
        this.servicio = undefined;
        this.servicioId = undefined;
        this.servicioCodigoEstadoNombre = undefined;
        this.servicioCodigoEstadoButtonClass = undefined;

      }
    });
    this.servicio = this.global.checkServicio();
    // (-) Servicio

    this.activatedRoute.params.subscribe( (params: any) => {
      if (params.id) {
        this.servicioId = params.id;
        this.loadServicio(params.id);
      }
    });
  }

  reLoadServicio() {
    return this.loadServicio(this.servicioId);
  }

  loadServicio(id) {
    return new Promise( (resolve, reject) => {

      this.populateServicio();

      if(!this.canLoadServicio()) {
        resolve({});
        return;
      }

      this.pageService.showLoading();
      const params = {
        servicio: id,
        patente: this.user.patente
      };
      const endPoint = this.settings.endPoint('servicio',params);
      this.pageService.httpGet( '', endPoint )
      .then( async (response) => {
        this.pageService.hideLoading();
        if(response && response.length > 0) {
          if(!this.settings.codigosEstado[response[0].estado.numero].finalizado) {
            this.servicio = response[0];
            this.servicio.id = id;
            this.loadReferenciaLocalizacion();
            this.loadReferenciaServicio();
            await this.loadComentariosServicio();
            this.populateServicio();
            this.servicioLoaded();
            this.global.saveServicio(this.servicio);
          }
        }
        resolve(response);
      })
      .catch( (reason) => {
        this.pageService.hideLoading();
        if(reason.status != 404) {
          this.pageService.showError(reason);
          reject(reason);
        } else {
          reject(reason);
        }
      });
    });
  }

  canLoadServicio() {
    if(this.servicio && this.servicio.estado && this.servicio.estado.aceptado && !this.global.isServiceArrivalEnd())
      return false;

    return true;
  }

  servicioLocalLoaded() {
  }

  servicioLoaded() {
  }

  loadReferenciaServicio() {
    const params = {
      servicio: this.servicioId,
      filtro: 'servicio'
    };
    const endPoint = this.settings.endPoint('referencias',params);
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      if(response && response.length > 0) {
        this.servicio.referenciaServicio = response;
      }
    })
    .catch( (reason) => {
      console.log(reason);
      if(reason.status != 404) this.pageService.showError(reason);
    });
  }

  loadReferenciaLocalizacion() {
    const params = {
      servicio: this.servicioId,
      filtro: 'localizacion'
    };
    const endPoint = this.settings.endPoint('referencias',params);
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      if(response && response.length > 0) {
        this.servicio.referenciaLocalizacion = response;
      }
    })
    .catch( (reason) => {
      console.log(reason);
      if(reason.status != 404) this.pageService.showError(reason);
    });
  }

  async loadComentariosServicio() {
    const params = {
      servicio: this.servicioId,
      filtro: 'GAP'
    };
    const endPoint = this.settings.endPoint('referencias',params);
    try{
      let response = await this.pageService.httpGet( '', endPoint );
      this.servicio.comentarios = response;
    } catch(err) {
      this.servicio.comentarios = [];
    }
  }

  populateServicio() {
    if(this.servicio && this.servicio.estado) {
      this.servicioCodigoEstadoNombre = this.settings.codigosEstado[this.servicio.estado.numero].nombre;
      this.servicioCodigoEstadoButtonClass = this.settings.codigosEstado[this.servicio.estado.numero].buttonClass;
      this.servicio.estado.aceptado = this.settings.codigosEstado[this.servicio.estado.numero].aceptado;
      this.servicio.estado.procesando = this.settings.codigosEstado[this.servicio.estado.numero].procesando;
      this.servicio.estado.arribo = this.settings.codigosEstado[this.servicio.estado.numero].arribo;
      this.servicio.estado.finalizado = this.settings.codigosEstado[this.servicio.estado.numero].finalizado;
    }
  }

  // goToReason() {
  //   this.pageService.navigate("/service-reason");
  // }

  updateState( state, reason ) {
    return new Promise( (resolve, reject) => {
      const params = {
        patente: this.user.patente
      };
      const endPoint = this.settings.endPoint('servicioAccion',params);

      const item = {
        operacion: state,
        motivo: reason,
        servicio: this.servicioId,
        FechaHora: moment().format("DD/MM/YYYY HH:mm"),
      };

      this.pageService.httpPatch( item, '', endPoint )
      .then( (response) => {
        console.log(response);
        if(response.codigo >= 0) this.reLoadServicio();
        resolve(response);
      })
      .catch( (reason) => {
        console.log(reason);
        reject(reason);
      });
    });
  }

  getCodigoEstadoButtonClass(codigoEstado) {
    if(codigoEstado)
      return this.settings.codigosEstado[codigoEstado].buttonClass;
    return "";
  }

  getCodigoEstadoNombre(codigoEstado) {
    if(codigoEstado)
      return this.settings.codigosEstado[codigoEstado].nombre;
    return "";
  }


}
