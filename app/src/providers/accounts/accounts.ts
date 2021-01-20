import { Injectable } from '@angular/core';
import { Constants } from '../../app/app.constants';
import { BaseProvider } from '../base/base';

@Injectable({
  providedIn: 'root'
})
export class AccountsProvider extends BaseProvider {

  getApiEndPoint() {
    return Constants.API_METHODS.accounts;
  }

}
