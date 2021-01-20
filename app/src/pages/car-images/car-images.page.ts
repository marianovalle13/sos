import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceBasePage } from '../service-base.page';

@Component({
  selector: 'app-car-images',
  templateUrl: './car-images.page.html',
  styleUrls: ['./car-images.page.scss'],
})
export class CarImagesPage extends ServiceBasePage implements OnInit {

  newImage;
  newImageB64;
  image = 'assets/imgs/car1.svg';

  ngOnInit() {
  }

  takePicture() {

    this.pageService.takePicture()
      .then((result) => {
        this.newImage = result;
        // this.image = btoa(String.fromCharCode(...new Uint8Array(this.newImage)));
        this.image = URL.createObjectURL(result);
      })
      .catch((error) => {
        console.error(error);
        this.pageService.showError('no se puede tomar la imagen');
      });

  }

  goToCheckImages(){

    // const file = await this.pageService.();
    //
    // console.log(file);
    //
    // this.pageService.httpPostFile(file, '20200824301080-arribo1.jpg')
    //   .then((result) => {
    //     console.log("---------result");
    //     console.log(result);
    //     if(result.length > 0 && result[0].path)
    //       this.image = result[0].path
    //     else
    //       this.pageService.showError('No se puede agregar la imagen');
    //
    //   })
    //   .catch((error) => {
    //     console.log("---------errror");
    //     console.error(error);
    //     this.pageService.showError(error)
    //   });

console.log(this.servicioId);
    this.pageService.httpPostFile(this.newImage, this.servicioId + '-arribo1.jpg')
      .then((result) => {
        console.log("---------result");
        console.log(result);
        if(result.length > 0 && result[0].path)
          this.pageService.navigate("/check-images");
          //this.image = result[0].path
        else
          this.pageService.showError('No se puede agregar la imagen');

      })
      .catch((error) => {
        console.log("---------errror");
        console.error(error);
        this.pageService.showError(error)
      });

    // this.pageService.navigate("/check-images");
    // this.pageService.httpPostFile();
  }
}
