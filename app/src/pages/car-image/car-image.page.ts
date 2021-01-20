import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceBasePage } from '../service-base.page';
import { PageService } from '../../app/core/page.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.page.html',
  styleUrls: ['./car-image.page.scss'],
})
export class CarImagePage extends ServiceBasePage implements OnInit {

  newImage;
  image = 'assets/imgs/car1.svg';
  stage;
  imageNumber;
  imageText = "Parte delantera y costado derecho SE DEBE VER LA PATENTE";
  obligatory = false;

  constructor(
    public pageService: PageService,
    public activatedRoute: ActivatedRoute
  ) {
    super( pageService, activatedRoute );
    this.activatedRoute.params.subscribe( (params: any) => {
      this.populateCarImage(params);
    });
  }

  populateCarImage(params) {
    this.stage = params.stage;
    this.imageNumber = params.imageNumber;
    this.obligatory = params.conditional == 'obligatory' ? true : false;
    this.image = this.pageService.global.settings.carImage[this.stage][this.imageNumber].image;
    this.imageText = this.pageService.global.settings.carImage[this.stage][this.imageNumber].text;
  }

  ngOnInit() {
  }

  takePicture() {
    this.pageService.takePicture()
      .then((result) => {
        console.log(result);
        this.newImage = result;
        const imgUrl = URL.createObjectURL( result );
        this.image = imgUrl;
      })
      .catch((error) => {
        console.error(error);
        this.pageService.showError('no se puede tomar la imagen');
      });
  }

  goToCheckImages(){
    this.pageService.showLoading();
    this.pageService.global.addImage( this.stage, this.imageNumber, this.image );
    this.pageService.httpPostFile(this.newImage, this.servicioId + '-' + this.stage + this.imageNumber + '.jpg')
      .then((result) => {
        if(result.length > 0 && result[0].path) {
          this.pageService.hideLoading();
          this.reLoadServicio().then( response => {
            this.goToNextPage();
          })
          .catch( reason => {
            this.pageService.hideLoading();
            this.goToHome();
          });
        } else {
          this.pageService.hideLoading();
          this.pageService.showError('No se puede agregar la imagen');
        }
      })
      .catch((error) => {
        this.pageService.hideLoading();
        this.pageService.showError(error)
      });
  }

  goToTakenImages() {
    if(this.stage == 'arribo') {
      this.pageService.navigate("/taken-images");
    } else {
      this.pageService.navigate("/service-end");
    }
  }

  goToNextPage() {
    if(this.stage == 'arribo') {
      if(this.imageNumber < 5) {
        let obl = 'obligatory';
        if(this.servicio.fotoArribo <= this.imageNumber) obl = 'optional';
        this.pageService.navigate("/car-image/" + this.stage + "/" + (parseInt(this.imageNumber) + 1) + "/" + obl);
      } else {
        this.pageService.navigate("/taken-images");
      }
    } else {
      this.pageService.navigate("/service-end");
    }

  }
}
