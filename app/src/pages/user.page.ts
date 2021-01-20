import { Directive } from '@angular/core';
import { PageService } from '../app/core/page.service';

@Directive({
  selector: '[]'
})
export class UserPage {

  user: any = {};
  global: any;
  settings: any;

  constructor(
    public pageService: PageService
  ) {
    this.global = this.pageService.global;
    this.settings = this.pageService.global.settings;

    // (+) User
    this.global.getUserAsObservable().subscribe((result) => {
      this.user = this.global.getUser();
    });
    this.user = this.global.checkUser();
    // (-) User

    this.initialize();
  }

  initialize() {}

  goToHome() {
    this.global.checkServicio();
    this.global.checkStatus();
    this.pageService.navigate("/status");
  }

  logOut(){
    const endPoint = this.pageService.global.settings.endPoint('estado',{patente:this.user.patente});
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      if(response.id == this.settings.usuarioEstados.fueraDeServicio.id) {
        this.global.removeUser();
        this.pageService.navigate("/login");
      } else {
        this.pageService.showError('Para salir de GAP debes estar en "No Disponible"');
      }
    })
    .catch( (reason) => {
      this.pageService.showError(reason);
    });

  }


}
