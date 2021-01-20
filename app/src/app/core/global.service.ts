import { Injectable } from '@angular/core';
import { Settings } from '../app.settings';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public settings = Settings;

  public messageBehaviorSubject: BehaviorSubject<String> = new BehaviorSubject("");

  public userBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public user: any;

  public servicioBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public servicio: any;

  public statusBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);


  public objects = {};
  public objectsBehaviorSubject = {};


  constructor() { }


    // // (+) Status
    //
    // /**
    //  * Get user observable
    //  */
    // getStatusAsObservable(): Observable<any> {
    //   return this.statusBehaviorSubject.asObservable();
    // }
    //
    // /**
    //  * Check user
    //  */
    // checkStatus() {
    //   this.statusBehaviorSubject.next( true );
    // }
    // // (-) Status


  // (+) Message

  /**
   * New message
   */
  newMessage(message) {
    this.messageBehaviorSubject.next( message );
  }

  /**
   * Get message observable
   */
  getMessageAsObservable(): Observable<any> {
    return this.messageBehaviorSubject.asObservable();
  }

  // (-) Message



  // (+) Status

  /**
   * Get user observable
   */
  getStatusAsObservable(): Observable<any> {
    return this.statusBehaviorSubject.asObservable();
  }

  /**
   * Check user
   */
  checkStatus() {
    this.statusBehaviorSubject.next( true );
  }
  // (-) Status


  // (+) User

  /**
   * Save user
   */
  saveUser(user: any) {
    localStorage.setItem( this.settings.storage.user, JSON.stringify( user ) );
    this.user = user;
    this.userBehaviorSubject.next( true );
  }

  /**
   * Get user
   */
  getUser() {
    return this.user;
  }

  /**
   * Get user
   */
  isUserLogged() {
    return this.user ? true : false;
  }

  /**
   * Remove user
   */
  removeUser() {
    localStorage.removeItem( this.settings.storage.user );
    this.user = null;
    this.userBehaviorSubject.next(false);
  }

  /**
   * Get user observable
   */
  getUserAsObservable(): Observable<any> {
    return this.userBehaviorSubject.asObservable();
  }

  /**
   * Check user
   */
  checkUser() {
    const u = localStorage.getItem( this.settings.storage.user );
    if( u ) {
      this.user = JSON.parse(u);
      this.userBehaviorSubject.next( true );
    } else {
      this.user = null;
      this.userBehaviorSubject.next(false);
    }
    return this.user;
  }
  // (-) User


  // (+) Servicio

  /**
   * Save servicio
   */
  saveServicio(servicio: any) {
    localStorage.setItem( this.settings.storage.servicio, JSON.stringify( servicio ) );
    this.servicio = servicio;
    this.servicioBehaviorSubject.next( true );
  }

  /**
   * Get servicio
   */
  getServicio() {
    return this.servicio;
  }

  /**
   * Get servicio
   */
  existServicio() {
    return this.servicio ? true : false;
  }

  clearServicio() {
    localStorage.removeItem( this.settings.storage.servicio );
  }

  /**
   * Remove servicio
   */
  removeServicio() {
    localStorage.removeItem( this.settings.storage.servicio );
    this.servicio = undefined;
    this.servicioBehaviorSubject.next(false);
  }

  /**
   * Get servicio observable
   */
  getServicioAsObservable(): Observable<any> {
    return this.servicioBehaviorSubject.asObservable();
  }

  /**
   * Check servicio
   */
  checkServicio() {
    const s = localStorage.getItem( this.settings.storage.servicio );
    if( s ) {
      this.servicio = JSON.parse(s);
      this.servicioBehaviorSubject.next( true );
    } else {
      this.servicio = null;
      this.servicioBehaviorSubject.next(false);
    }
    return this.servicio;
  }

  clearServiceArrival() {
    localStorage.removeItem( this.settings.storage.serviceArrival );
  }

  setServiceArrivalEnd() {
    localStorage.setItem( this.settings.storage.serviceArrival, 'true' );
  }

  setServiceArrivalStart() {
    localStorage.setItem( this.settings.storage.serviceArrival, 'false' );
  }

  isServiceArrivalEnd() {
    let end = localStorage.getItem( this.settings.storage.serviceArrival );
    console.log('=================');
    console.log(end);
    console.log('=================');
    if(end && end == 'true') return true;
    return false;
  }
  // (-) Servicio

  // (+) Images

  clearImages(  ) {
    localStorage.setItem( this.settings.storage.images, JSON.stringify( [] ) );
  }

  addImage( stage, imageNumber, image ) {
    let images:any = localStorage.getItem( this.settings.storage.images );

    if (!images) images = {};
    else images = JSON.parse( images );

    if(!images[stage]) images[stage] = {};

    images[stage][imageNumber] = image;

    localStorage.setItem( this.settings.storage.images, JSON.stringify( images ) );
  }

  getImagenes() {
    let images:any = localStorage.getItem( this.settings.storage.images );
    if (!images) images = [];
    else images = JSON.parse( images );
    return images;
  }

  clearImagenes() {
    localStorage.removeItem( this.settings.storage.images );
  }

  setImagesArrivalEnd() {
    localStorage.setItem( this.settings.storage.imagesArrivalEnd, 'true' );
  }

  clearImagesArrivalEnd() {
    localStorage.removeItem( this.settings.storage.imagesArrivalEnd );
  }

  setImagesArrivalStart() {
    localStorage.setItem( this.settings.storage.imagesArrivalEnd, 'false' );
  }

  isImagesArrivalEnd() {
    let end = localStorage.getItem( this.settings.storage.imagesArrivalEnd );
    console.log('=================');
    console.log(end);
    console.log('=================');
    if(end && end == 'true') return true;
    return false;
  }

  // (-) Images


  // (+) Signature

  setSignature( signature ) {
    localStorage.setItem( this.settings.storage.signature, signature );
  }

  clearSignature() {
    localStorage.removeItem( this.settings.storage.signature );
  }

  getSignature() {
    return localStorage.getItem( this.settings.storage.signature );
  }

  // (-) Signature



  // (+) Generic objects

  /**
   * Save object
   */
  save(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
    this.objects[key] = object;
    if (!this.objectsBehaviorSubject[key])
      this.objectsBehaviorSubject[key] = new BehaviorSubject(true);
    else
      this.objectsBehaviorSubject[key].next(true);
  }


  /**
   * Get object
   */
  get(key) {
    return this.objects[key];
  }

  /**
   * Get object
   */
  exists(key) {
    return this.objects[key] ? true : false;
  }

  /**
   * Remove object
   */
  remove(key) {
    localStorage.removeItem(key);
    delete this.objects[key];
    if(this.objectsBehaviorSubject[key]) this.objectsBehaviorSubject[key].next(false);
  }

  /**
   * Get object as observable
   */
  getAsObservable(key): Observable<any> {
    if (!this.objectsBehaviorSubject[key]) this.objectsBehaviorSubject[key] = new BehaviorSubject(true);
    return this.objectsBehaviorSubject[key].asObservable();
  }

  /**
   * Check object
   */
  check(key) {
    const u = this.load(key);
    if (u)
      this.objectsBehaviorSubject[key].next(true);
    else
      this.objectsBehaviorSubject[key].next(false);
    return this.objects[key];
  }

  /**
   * Load object
   */
  load(key) {
    const o = localStorage.getItem(key);
    if (o)
      this.objects[key] = JSON.parse(o);
    else
      delete this.objects[key];
    return this.objects[key];
  }
  // (-) Generic objects


  clearAllServiceInfo() {
    this.clearServiceArrival();
    this.clearImagenes();
    this.clearImagesArrivalEnd();
    this.clearSignature();
    this.remove(this.settings.storage.adicionales);
    this.removeServicio();
  }

}
