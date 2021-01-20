import { Component, OnInit } from '@angular/core';
import { UserPage } from '../user.page';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage extends UserPage { // implements OnInit {

  implementos = [];
  showEndButton = false;
  slideOptions:any = {
    allowTouchMove: false,
    on: {
      slideChange: function() {
        if(this.isEnd) this.allowTouchMove = true;
      },
    },
  };

  ionViewWillEnter() {
  // ngOnInit() {
    this.loadImplementosDisponibles();
  }

  loadImplementosDisponibles() {
    const endPoint = this.pageService.global.settings.endPoint('implementosDisponibles',{patente:this.user.patente});
    this.pageService.httpGet( '', endPoint )
    .then( (response) => {
      this.implementos = response;
    })
    .catch( (reason) => {
      this.pageService.showError(reason);
    });
  }

  select( slides, item, event ) {
    if(!event.detail.value) return;

    this.pageService.showLoading();
    const value = {
      codigo: item.codigo,
      cantidad: parseInt(event.detail.value)
    }
    const endPoint = this.pageService.global.settings.endPoint('implementosRegistrar',{patente:this.user.patente});
    this.pageService.httpPost( value, '', endPoint )
    .then( (response) => {
      this.pageService.hideLoading()
      slides.slideNext();
      this.checkShowEndButton();
    })
    .catch( (reason) => {
      this.pageService.hideLoading()
      this.pageService.showError(reason);
    });
  }

  goToStatus(){
    this.global.checkStatus();
    this.pageService.navigate('/status');
  }

  checkShowEndButton() {
    let selectedItems = 0;
    for(let item of this.implementos) {
      if(item.checked == 0 || item.checked == 1) selectedItems++;
    }
    if( selectedItems == this.implementos.length) this.showEndButton = true;
  }
}
