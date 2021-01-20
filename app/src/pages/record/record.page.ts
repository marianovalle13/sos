import { Component, OnInit } from '@angular/core';
import { UserPage } from '../user.page';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService } from '../../app/core/page.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage extends UserPage { // implements OnInit {

  servicios = [];
  period = this.settings.servicios.finalizados.periodo;

  constructor(
    public pageService: PageService,
    public activatedRoute: ActivatedRoute
  ) {
    super( pageService );
    this.activatedRoute.params.subscribe( (params: any) => {
      this.period = params.period;
    });
  }

  ionViewWillEnter() {
    this.loadServicios();
  }

  loadServicios() {
    if(this.period == -1) {
      this.servicios = [];
      return;
    }
    this.pageService.showLoading();
    const params = {
      patente: this.user.patente,
      periodo: this.period,
      estadoSvc: this.pageService.global.settings.servicios.finalizados.estadoSvc
    };
    const endPoint = this.pageService.global.settings.endPoint('servicios',params);
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      this.pageService.hideLoading();
      this.servicios = response;
    })
    .catch( (reason) => {
      this.pageService.hideLoading();
      this.pageService.showError(reason);
    });
  }

  getCodigoEstadoButtonClass(codigoEstado) {
    return this.pageService.global.settings.codigosEstado[codigoEstado].buttonClass;
  }

  goToFilter() {
    this.pageService.navigate("/record-filter");
  }

  loadServicio(id) {
    this.pageService.navigate("/service-history/" + id);
    // this.pageService.showLoading();
    // const params = {
    //   patente: this.user.patente,
    //   servicio: id
    // };
    // const endPoint = this.pageService.global.settings.endPoint('servicioHistorial',params);
    // this.pageService.httpGet( '', endPoint )
    // .then( (response) => {
    //   this.pageService.hideLoading();
    //   console.log(response);
    // })
    // .catch( (reason) => {
    //   this.pageService.hideLoading();
    //   this.pageService.showError(reason);
    // });
  }

}
