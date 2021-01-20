import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ServiceBasePage } from '../service-base.page';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage extends ServiceBasePage implements OnInit, AfterViewInit {

  signature = '';
  isDrawing = false;

  @ViewChild(SignaturePad, {static: true}) signaturePad: SignaturePad;

  public signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 600,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  }

  // constructor(
  //   private router: Router,
  //   private route: ActivatedRoute,
  // ) { }

  ngAfterViewInit() {
    // this.signaturePad is now available
    // this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API

  }

  ngOnInit() {
    //this.signaturePad.clear()
    // this.storage.get('savedSignature').then((data) => {
    //   this.signature = data;
    //   console.log(data);
    // });
  }

  drawComplete() {
    this.isDrawing = false;
  }

  drawStart() {
    this.isDrawing = true;
  }

  savePad() {
    this.pageService.showLoading();

    this.signature = this.signaturePad.toDataURL('image/jpeg"');

    // this.storage.set('savedSignature', this.signature);
    // console.log(this.signature);
    this.global.setSignature( this.signature );
    console.log(this.signature );
    console.log(this.signature.substring(22,this.signature.length) );

    const byteCharacters = atob(this.signature.substring(22,this.signature.length));
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'application/octet-stream'});
    // const imgUrl = URL.createObjectURL( blob );

    this.pageService.httpPostFile(blob, this.servicioId + '-firma.jpg')
      .then((result) => {
        if(result.length > 0 && result[0].path) {
          this.pageService.hideLoading();
          this.reLoadServicio().then( response => {
            console.log(response);
            this.goToNextPage();
          })
          .catch( reason => {
            this.pageService.hideLoading();
            console.log(reason);
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

  goToNextPage() {
    let obligatory = 'obligatory';
    if(this.servicio.fotoFinal <= 0) obligatory = 'optional';
    this.pageService.navigate("/car-image/final/1/" + obligatory);
//    this.signaturePad.clear();
  }

  clearPad() {
    this.signaturePad.clear();
  }

  car(){
    // this.router.navigate(["/car-images4"]);
  }

}
