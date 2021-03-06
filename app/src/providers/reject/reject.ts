import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Constants } from '../../app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class RejectProvider extends BaseProvider {

  getApiEndPoint() {
    return Constants.API_METHODS.reject;
  }

}
