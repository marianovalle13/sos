import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    public storage: Storage
  ) {
  }

  canActivate(
   next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

   return this.storage.get(Constants.storage.user)
     .then((user) => {
       let userAuthenticated = false;
       if(user){
         userAuthenticated = true;
       }
       return Promise.resolve(userAuthenticated);
     });


   // let userAuthenticated = false; // Get the current authentication state from a Service!

   // if (userAuthenticated) {
   //   return true;
   // } else {
   //   return false;
   // }

   // return Promise.resolve(userAuthenticated);

 }

}
