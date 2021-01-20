import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../app/core/page.service';

@Component({
  selector: 'app-login-patent',
  templateUrl: './login-patent.page.html',
  styleUrls: ['./login-patent.page.scss'],
})
export class LoginPatentPage { // implements OnInit  {

  patente: any = 'XXX997';
  dni: any;

  constructor(
    public pageService: PageService,
    public activatedRoute: ActivatedRoute
  ) {
  }

  ionViewWillEnter() {
  // ngOnInit() {
    this.dni = this.activatedRoute.snapshot.paramMap.get('dni');
  }

  login( ) {

    if (this.patente) {

      this.pageService.showLoading();
      let item = {
        dni: this.dni,
        patente: this.patente,
        imei: this.pageService.global.settings.imei
      }
      this.pageService.httpPost( item, '', this.pageService.global.settings.endPoint('login') )
      .then( (response) => {
        response.dni = this.dni;
        response.patente = this.patente;
        this.pageService.global.saveUser(response);
        this.pageService.hideLoading()
        .then( () => {
          this.pageService.navigate( '/welcome-user' );
        });
      })
      .catch( (reason) => {
        this.pageService.hideLoading();
        this.pageService.showError(reason);
      });

    } else {
      this.pageService.showError('Debe cargar la patente')
    }

  }

}
