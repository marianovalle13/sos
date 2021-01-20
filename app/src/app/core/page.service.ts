import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

import { HttpService } from './http.service';
import { GlobalService } from './global.service';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class PageService {

  moduleName = '';
  loading;

  constructor(
    public loadingController: LoadingController,
    public global: GlobalService,
    public httpService: HttpService,
    public location: Location,
    public router: Router,
    public toastCtrl: ToastController,
    public activatedRoute: ActivatedRoute
  ) {
  }


  // (+) Navigation

  navigate(endPoint = '/' + this.getModuleName(), action = '', params = {}, navigationExtras = {}) {
    this.router.navigate([endPoint + action, params], navigationExtras);
  }

  // (-) Navigation


  // (+) Module name

  getModuleName() {
    return this.location.path().split('/')[1];
  }

  // (-) Module name


  // (+) Http

  getHttpEndPoint() {
    return '/' + this.getModuleName();
  }

  httpGetAll( filters, sort, populates, page ) {
    return this.httpService.getAll( filters, sort, populates, page, this.getHttpEndPoint() );
  }

  httpRemove( item, endPoint = this.getHttpEndPoint() ) {
    return this.httpService.remove( item, endPoint );
  }

  httpCreate( item, endPoint = this.getHttpEndPoint() ) {
    return this.httpService.create( item, endPoint );
  }

  httpUpdate( item, endPoint = this.getHttpEndPoint() ) {
    return this.httpService.update( item, endPoint );
  }

  httpGetById( id, endPoint = this.getHttpEndPoint() ) {
    return this.httpService.getById( id, endPoint );
  }

  httpPut( values, method, endPoint = this.getHttpEndPoint() ) {
    return this.httpService.put( values, method, endPoint );
  }

  httpPost( values, method, endPoint = this.getHttpEndPoint() ) {
    return this.httpService.post( values, method, endPoint );
  }

  httpPostFile( values, fileName ) {
    return this.httpService.postFile( values, fileName );
  }

  httpPatch( values, method, endPoint = this.getHttpEndPoint() ) {
    return this.httpService.patch( values, method, endPoint );
  }

  httpGet( method, endPoint = this.getHttpEndPoint() ) {
    return this.httpService.get( method, endPoint );
  }

  // httpDelete( values, method ) {
  //   return this.httpService.delete( values, method, this.getModuleName() );
  // }

  // (-) Http

  getMessage(message) {
    let msg = message;
    if(message.message) msg = message.message;
    return msg;
  }


  // (+) Show messages

  showSuccess(message) {
    this.showMessage(message,"toast-success");
  }
  showError(message) {
    this.showMessage(message,"toast-error");
  }
  showWarning(message) {
    this.showMessage(message,"toast-warning");
  }
  showMessage(message,cssClass){
    console.log(message);

    // if(message.error && message.error == 404) return;

    let msg = message.message || message;
    let toast = this.toastCtrl.create({
      message: msg,
      cssClass:cssClass,
      duration: 4000,
      position: 'top'
    }).then((toastData)=>{
      toastData.present();
    });

  }

  async showLoading(content = 'Procesando...'){
    this.loading = await this.loadingController.create({
      message: content
    });
    await this.loading.present();
  }
  async hideLoading(){
    if(this.loading) await this.loading.dismiss();;
  }
  // (-) Show messages


  // (+) Picture
  takePicture() {
    return new Promise( (resolve, reject) => {
      let element:any = document.createElement('input');
      element.type = 'file';
      element.accept = 'image/*';
      element.capture= 'camera';
      element.onchange = () => {
        // let body = new FormData();
        // body.append('file', element.files[0]);
        // console.log(element.files[0]);

        // var reader = new FileReader();
        // reader.onload = ( (res) => {
        //   console.log("----------res");
        //   console.log(res);
        // });
        // reader.readAsDataURL(element.files[0]);


        /*
        let reader = new FileReader();
        reader.onload = ( (res) => {
            var blob, url;
            blob = new Blob([res.target.result], {
              type: 'application/octet-stream'
            });
            url = window.URL.createObjectURL(blob);

            var a;
            a = document.createElement('a');
            a.href = url;
            a.download = 'some-file.jpg';
            document.body.appendChild(a);
            a.style = 'display: none';
            a.click();
            a.remove();

            setTimeout(function() {
              return window.URL.revokeObjectURL(url);
            }, 1000);

        });
        reader.readAsArrayBuffer(element.files[0]);
        // reader.readAsDataURL(element.files[0]);
        */


        /*
        let fileName = "20200717301682-a1.jpg";
        window.webkitRequestFileSystem(window.PERSISTENT , 1024*1024, (localstorage) => {
          localstorage.root.getFile(fileName, {create: true}, (datFile) => {
            console.log("1- Si");
            datFile.createWriter((datContent) => {
              console.log("1- Si si");
              var blob = new Blob(["Lorem Ipsum"], {type: "application/octet-stream"});
              datContent.write(blob);
              console.log("1- Si si si");
            });
          });
        });
        */

        let reader = new FileReader();
        reader.onload = ( (res:any) => {

          let blob = new Blob([res.target.result], {
            type: 'application/octet-stream'
          });

          resolve(blob);

        });
        reader.readAsArrayBuffer(element.files[0]);





        // resolve(element.files[0]);
      };
      element.click();
    });
  }

}
