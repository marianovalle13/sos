import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceBasePage } from '../service-base.page';
import { PageService } from '../../app/core/page.service';
import * as moment from 'moment';

@Component({
  selector: 'app-service-reason',
  templateUrl: './service-reason.page.html',
  styleUrls: ['./service-reason.page.scss'],
})
export class ServiceReasonPage extends ServiceBasePage implements OnInit {

  motivos = [];
  motivo: any;
  reason = '';
  reasons: any = {
    rechazo : {
      endPoint : 'motivosRechazo',
      fieldLabel: 'motivo',
      title: 'INDIQUE MOTIVO DE RECHAZO :'
    },
    asistencia : {
      endPoint : 'motivosAsistencia',
      fieldLabel: 'asistencia',
      title: 'INDIQUE MOTIVO DE ASISTENCIA :'
    }
  };

  constructor(
    public pageService: PageService,
    public activatedRoute: ActivatedRoute
  ) {
    super( pageService, activatedRoute );
    this.activatedRoute.params.subscribe( (params: any) => {
      this.reason = params.reason;
      this.loadMotivos();
    });
  }


  ngOnInit() {
    //this.loadAsistenciaMotivos();
  }

  loadMotivos() {
    const endPoint = this.settings.endPoint(this.reasons[this.reason].endPoint,{patente: this.user.patente});
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      this.motivos = response;
    })
    .catch( (reason) => {
      if(reason.status != 404) this.pageService.showError(reason);
    });
  }

  save() {
    if(this.reason == 'rechazo')
      this.rejectService();
    else
      this.sendMotivoAsistencia();
  }

  rejectService() {
    this.updateState( this.settings.servicioAcciones.rechazar.codigo, this.motivo )
    .then( (response: any ) => {
      this.performResponse( response );
    })
    .catch( (reason) => {
      this.pageService.showError(reason);
    });
  }

  sendMotivoAsistencia() {
    const endPoint = this.settings.endPoint('motivoAsistencia');
    const item = {
      idAsistencia: this.motivo,
      patente: this.user.patente,
      fecha: moment().format("YYYY-MM-DDTHH:mm:ss.SSS") + 'Z' //"2020-07-24T13:45:17.836Z"
    }
    this.pageService.httpPost( item, '', endPoint )
    .then( (response: any ) => {
      this.performResponse( response );
    })
    .catch( (reason) => {
      this.pageService.showError(reason);
    });
  }

  performResponse( response ) {
    if(response.codigo >= 0) {
      this.pageService.showSuccess(response.mensaje);
      this.pageService.navigate('/services');
    } else {
      this.pageService.showError(response.mensaje);
    }
  }

}
