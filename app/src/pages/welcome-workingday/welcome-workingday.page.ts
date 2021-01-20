import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { PageService } from '../../app/core/page.service';
import { UserPage } from '../user.page';

@Component({
  selector: 'app-welcome-workingday',
  templateUrl: './welcome-workingday.page.html',
  styleUrls: ['./welcome-workingday.page.scss'],
})
export class WelcomeWorkingdayPage extends UserPage implements OnInit {

  // benefit;
  //
  // constructor(
  //   private router: Router,
  //   public pageService: PageService
  // ) {
  //   super(pageService);
  // }

  ngOnInit() {

  }

  goToSlide() {
    let item = {
      estado: this.settings.usuarioCambioEstado.alta.estado,
      motivo: this.settings.usuarioCambioEstado.alta.motivo,
      latitud: "-31.435650",
      longitud: "-64.229767",
      dni: this.user.dni,
      minutos: 0
    };

    const endPoint = this.settings.endPoint('estadoCambio',{patente:this.user.patente});
    this.pageService.httpPatch( item, '', endPoint )
    .then( (response ) => {
      if(response.codigo >= 0)
        this.pageService.navigate("/slide");
      else
        this.pageService.showError( response.mensaje );
    })
    .catch( (reason ) => {
      this.pageService.showError(reason);
    });
  }


  goToStatusNo() {
    let item = {
      estado: this.settings.usuarioCambioEstado.baja.estado,
      motivo: this.settings.usuarioCambioEstado.baja.motivo,
      latitud: "-31.435650",
      longitud: "-64.229767",
      dni: this.user.dni,
      minutos: 0
    };
    const endPoint = this.settings.endPoint('estadoCambio',{patente:this.user.patente});
    this.pageService.httpPatch( item, '', endPoint )
    .then( (response) => {
      if(response.codigo >= 0) {
        this.global.checkStatus();
        this.pageService.navigate("/status");
      } else {
        this.pageService.showError( response.mensaje );
      }
    })
    .catch( (reason) => {
      if(reason.status == 400) {
        this.global.checkStatus();
        this.pageService.navigate("/status");
      } else {
        this.pageService.showError(reason);
      }
    });
  }

}
