import { Component, OnInit } from '@angular/core';
import { ServiceBasePage } from '../service-base.page';

@Component({
  selector: 'app-patent-new',
  templateUrl: './patent-new.page.html',
  styleUrls: ['./patent-new.page.scss'],
})
export class PatentNewPage extends ServiceBasePage implements OnInit {

  patente:any;

  ngOnInit() {
  }

  goToPic(){
    let dominio = this.servicio.socio.vehiculo.dominio;
    let dominioLength = dominio.length;
    if(this.patente.toLowerCase() == dominio.substring(dominioLength - 3, dominioLength).toLowerCase()) {
      this.arrivalService();
    } else {
      this.pageService.showError('La patente no coincide');
    }
  }

  arrivalService() {
    this.pageService.showLoading();
    this.updateState( this.settings.servicioAcciones.arribo.codigo, 0 )
    .then( (response:any) => {
      this.pageService.hideLoading();
      if(response.codigo == -1) {
        this.pageService.showError(response.mensaje);
      } else {
        this.global.setServiceArrivalEnd();
        this.pageService.navigate("/pic-tutorial");
      }
    })
    .catch( (reason) => {
      this.pageService.hideLoading();
      this.pageService.showError(reason);
    });
  }

}
