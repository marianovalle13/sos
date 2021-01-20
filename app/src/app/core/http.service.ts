import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  serviceName = "";

  constructor(
    public http: HttpClient,
    public global: GlobalService
  ) {
    this.initialize();
  }

  initialize() {
    this.buildServiceName();
  }

  buildServiceName() {
    this.serviceName = this.constructor.name.replace("Service","").toLowerCase();
  }


  // (+) Items

  getAll(filters , sort , populates, page, endPoint = '/' + this.getServiceName()) {
    const action = '/?_filters=' + encodeURI(JSON.stringify(filters))
                 + '&_sort=' + encodeURI(JSON.stringify(sort))
                 + '&_populates=' + encodeURI(JSON.stringify(populates))
                 + '&_page=' + encodeURI(page);
    return this.get(action, endPoint);
  }


  getById(id, endPoint = '/' + this.serviceName) {
    return this.get('/' + id, endPoint);
  }

  create(value, endPoint = '/' + this.getServiceName()) {
    return this.post(value, '', endPoint);
  }

  update(value, endPoint = '/' + this.getServiceName()) {
    return this.put(value, '/' + value.id, endPoint);
  }

  remove(value, endPoint = '/' + this.getServiceName()) {
    return this.delete('/' + value.id, endPoint);
  }

  // (-) Items



  // (+) Basic

  delete(action, endPoint = '/' + this.getServiceName()) {
    const url = environment.serverUrl + endPoint + action;
    return this.http.delete(url, this.getHeaders())
      .toPromise()
      .then( (response:any) =>
        response
      )
      .catch(this.handleError.bind(this));
  }

  put(value, action, endPoint = '/' + this.getServiceName()) {
    const url = environment.serverUrl + endPoint + action;
    return this.http.put(url, value, this.getHeaders())
      .toPromise()
      .then( (response:any) =>
        response
      )
      .catch(this.handleError.bind(this));
  }

  patch(value, action, endPoint = '/' + this.getServiceName()) {
    const url = environment.serverUrl + endPoint + action;
    return this.http.patch(url, value, this.getHeaders())
      .toPromise()
      .then( (response:any) =>
        response
      )
      .catch(this.handleError.bind(this));
  }

  post(value, action, endPoint = '/' + this.getServiceName()) {
    const url = environment.serverUrl + endPoint + action;
    return this.http.post(url, value, this.getHeaders())
      .toPromise()
      .then( (response:any) =>
        response
      )
      .catch(this.handleError.bind(this));
  }

  get(action, endPoint = '/' + this.getServiceName()) {
    const url = environment.serverUrl + endPoint + action;
    return this.http.get(url, this.getHeaders())
      .toPromise()
      .then( (response:any) =>
        response
      )
      .catch(this.handleError.bind(this));
  }

  // (-) Basic



  postFile(value, fileName) {

    const url = environment.serverFileUrl;

    console.log(url);
    const fd = new FormData();
    fd.append('foto', value, fileName);

    return this.http.post(url, fd)
    .toPromise()
    .then( (response:any) =>
      response
    )
    .catch(this.handleError.bind(this));
  }

  getHeaders() {
    if(this.global.getUser()) {
      return {
        headers: new HttpHeaders({
          'x-access-token':  this.global.getUser().token
        })
      };
    } else {
      return {};
    }
  }

  // deleteFiles(arr) {
  //   const url = environment.serverUrl + this.global.settings.endPoints.files + '/delete';
  //   const headers: any = {}
  //   const options = new RequestOptions({
  //     headers: headers,
  //     body: arr
  //   })
  //   return this.http.delete(url, options)
  //     .toPromise()
  //     .then(response => response)
  //     .catch(err => this.handleError.bind(err));
  // }


  handleError(error: any) {

    // console.log("=======================");
    // console.log(error);
    // console.log("=======================");

    let message = 'Ha ocurrido un error';
    if(error.error && error.error.codigo) message = error.error.mensaje;
    else if(error.message) message = error.message;
    else if(error.error) message = error.error;

    let status = 500;
    if(error.status) status = error.status;

    const httpError = {status:status,message:message};
    // const httpError = message;

    return Promise.reject(httpError);
  }

  getServiceName() {
    return this.serviceName;
  }

}
