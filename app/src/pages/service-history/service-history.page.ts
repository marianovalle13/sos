import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPage } from '../user.page';
import { PageService } from '../../app/core/page.service';
import * as moment from 'moment';


@Component({
  selector: 'app-service-history',
  templateUrl: './service-history.page.html',
  styleUrls: ['./service-history.page.scss'],
})
export class ServiceHistoryPage extends UserPage {
  servicio: any;
  servicioId;
  servicioCodigoEstadoNombre;
  servicioCodigoEstadoButtonClass;

  constructor(
    public pageService: PageService,
    public activatedRoute: ActivatedRoute
  ) {
    super(pageService);

    this.activatedRoute.params.subscribe( (params: any) => {
      if (params.id) {
        this.servicioId = params.id;
        this.loadServicio(params.id);
      }
    });
  }


  isArray(el) {
    return Array.isArray(el);
  }

  async loadServicio(id) {

    this.pageService.showLoading();
    const params = {
      patente: this.user.patente,
      servicio: id
    };
    const endPoint = this.pageService.global.settings.endPoint('servicioHistorial',params);
    this.pageService.httpGet( '', endPoint )
    .then( async (response) => {
      this.pageService.hideLoading();
      if(response && response.length > 0) {
        this.servicio = response[0];
        this.servicio.id = id;
        this.loadReferenciaServicio();
        this.loadReferenciaLocalizacion();
        await this.loadComentariosServicio();
        // this.populateServicio();
      }
    })
    .catch( (reason) => {
      this.pageService.hideLoading();
      if(reason.status != 404) {
        this.pageService.showError(reason);
      }
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

  // populateServicio() {
  //   if(this.servicio && this.servicio.estado) {
  //     this.servicioCodigoEstadoNombre = this.settings.codigosEstado[this.servicio.estado.numero].nombre;
  //     this.servicioCodigoEstadoButtonClass = this.settings.codigosEstado[this.servicio.estado.numero].buttonClass;
  //     this.servicio.estado.aceptado = this.settings.codigosEstado[this.servicio.estado.numero].aceptado;
  //     this.servicio.estado.procesando = this.settings.codigosEstado[this.servicio.estado.numero].procesando;
  //     this.servicio.estado.arribo = this.settings.codigosEstado[this.servicio.estado.numero].arribo;
  //     this.servicio.estado.finalizado = this.settings.codigosEstado[this.servicio.estado.numero].finalizado;
  //   }
  // }


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
