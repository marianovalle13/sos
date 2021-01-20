// import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
// import { Constants } from '../app.constants';
// import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseProvider {

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) {
  }


  ////////////////////////////////////////


  getSortedCriteria() {
    let ret: any = { name: 1 };
    return ret;
  }

  getApiEndPoint() {
    return '';
  }

  getServerUrl() {
    return environment.serverUrl;
  }

  // useTestData() {
  //   return Constants.DEBUG_MODE;
  // }
  //
  // getTestData(endpoint){
  //   return new Promise((res, rej) => {
  //       res(data[endpoint]);
  //       console.log("GetTestData: ");
  //   });
  // }


  create(item) {
    console.log(`create request `, item);
    const url = this.getServerUrl() + this.getApiEndPoint();

    return this.http.post(url, item, {})
      .toPromise()
      .catch(error => this.handleError(error));
  }

  update(item) {
    console.log(`update request `, item);
    const url = this.getServerUrl() + this.getApiEndPoint() + "/" + item.id;

    return this.http.put(url, item, {})
      .toPromise()
      .catch(error => this.handleError(error));
  }

  remove(item) {
    console.log(`remove`, item);
    const url = this.getServerUrl() + this.getApiEndPoint() + "/" + item.id;
    return this.http.delete(url, {})
      .toPromise()
      .catch(error => this.handleError(error));
  }

  getAll() {
    return this.getAllFilterAndSortAndPopulates({}, this.getSortedCriteria(), []);
  }

  getAllFilterAndSortAndPopulates(filters = {}, sort = {}, populates = []) {
    console.log(`getall`, { filters, sort, populates });

    const url = `${this.getServerUrl()}${this.getApiEndPoint()}/?_filters=${encodeURI(JSON.stringify(filters))}&sort=${encodeURI(JSON.stringify(sort))}&_populates=${encodeURI(JSON.stringify(populates))}`
    return this.http.get(url, {})
      .toPromise()
      .catch(error => this.handleError(error));
  }

  getById(id) {
    console.log(`getbyid `, id);

    const url = this.getServerUrl() + this.getApiEndPoint() + "/" + id;

    return this.http.get(url)
      .toPromise()
      .catch(error => this.handleError(error));
  }

  login(params) {
    const url = `${this.getServerUrl()}${this.getApiEndPoint()}`;

    console.log(`request to ${url}`);
    console.log(JSON.stringify(params));

    return this.http.post(url, params, {})
      .toPromise()
      .then((res: any) => {
        return res;
      })
      .catch(error => this.handleError(error));
  }

  logout() {
    return this.storage.clear()
  }

  createFile(file) {

    const URL = this.getServerUrl() + Constants.API_METHODS.files + '/upload'

    const fd = new FormData();
    fd.append('file', file);

    return this.http.post(URL, fd)
      .toPromise()
      .then((res: any) => {
        return res;
      })
      .catch(this.handleError);

  }

  public handleError(response): Promise<any> {
    console.log(`Handle Error `, response);
    //error = error.error
    if (response.status == 401) {
      return Promise.reject(response || `No se encuentra autorizado. Quizas deba volver a loguearse`);
    } else if (response.status == 404) {
      return Promise.reject(response || `No se encuentro lo que buscaba`);
    } else if (response.status == 400) {
      console.error('An error occurred', response);
      var error = response.message || response;
      if (response.error) if (response.error.errors) if (response.error.errors.length > 0)
        error = response.error.errors[0];
      if (response.error) if (response.error.message)
        error = response.error.message;
      if (response.error) if (response.error.error) if (response.error.error.name)
        error = response.error.error.name;
      return Promise.reject(error);
    } else {
      console.error('An error occurred', response);
      var message = response.message || response;
      if (response.error) if (response.error.errors) if (response.error.errors.length > 0)
        message = response.error.errors[0].message;
      return Promise.reject(message);
    }
  }

  // ///////////////////////////////////////
  //     const URL = environment.serverUrl + this.getApiEndPoint()
  //       + '/?_filters=' + encodeURI(JSON.stringify(filters))
  //       + '&sort=' + encodeURI(JSON.stringify(sort))
  //       + '&_populates=' + encodeURI(JSON.stringify(populates));
  //
  //     console.log(URL);
  //     return this.http.get(URL)
  //       .toPromise()
  //       .then(response =>
  //         response.json() as any[]
  //       )
  //       .catch(this.handleError);
  //   }
  //
  //   create(occurrence): Promise<any> {
  //
  //     const url = environment.serverUrl + this.getApiEndPoint();
  //
  //     return this.http.post(url, occurrence)
  //       .toPromise()
  //       .then(response =>
  //         response.json()
  //       )
  //       .catch(this.handleError.bind(this));
  //   }
  //
  //   update(model): Promise<any> {
  //
  //     const url = environment.serverUrl + this.getApiEndPoint() + '/' + model.id;
  //
  //     return this.http.put(url, model)
  //       .toPromise()
  //       .then(response =>
  //         response.json()
  //       )
  //       .catch(this.handleError.bind(this));
  //   }
  //   remove(model): Promise<any> {
  //
  //     const url = environment.serverUrl + this.getApiEndPoint() + '/' + model.id;
  //
  //     return this.http.delete(url, model)
  //       .toPromise()
  //       .then(response =>
  //         response
  //       )
  //       .catch(this.handleError.bind(this));
  //   }
  //
  //   getById(id): Promise<any> {
  //     const URL = environment.serverUrl + this.getApiEndPoint() + '/' + id;
  //     return this.http.get(URL)
  //       .toPromise()
  //       .then(response =>
  //         response.json()
  //       )
  //       .catch(this.handleError);
  //   }
  //
  //   createFile(file): Promise<any> {
  //
  //     const URL = environment.serverUrl + Constants.API_METHODS.files + '/upload'
  //
  //     const fd = new FormData();
  //     fd.append('file', file);
  //
  //     return this.http.post(URL, fd)
  //       .toPromise()
  //       .then(response =>
  //         response.json()
  //       )
  //       .catch(this.handleError);
  //   }
  //
  //
  //   deleteFiles(arr): Promise<any> {
  //     console.log('Files to delete: ', arr)
  //     const url = environment.serverUrl + Constants.API_METHODS.files + '/delete';
  //     const headers: any = {}
  //     const options = new RequestOptions({
  //       headers: headers,
  //       body: arr
  //     })
  //     return this.http.delete(url, options)
  //       .toPromise()
  //       .then(response => response)
  //       .catch(err => this.handleError.bind(err));
  //   }
  //
  //
  //   handleError(error: any): Promise<any> {
  //     console.error('An error occurred', error); // for demo purposes only
  //     return Promise.reject(error.message || error);
  //   }

}
