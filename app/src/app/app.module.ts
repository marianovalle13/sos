import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

import { ServiceBasePage } from '../pages/service-base.page';
import { UserPage } from '../pages/user.page';
import { MessagePage } from '../pages/message/message';


@NgModule({
  declarations: [
    MessagePage,
    ServiceBasePage,
    UserPage,
    AppComponent
  ],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule
  ],
  entryComponents: [MessagePage],
  providers: [
    // AnalyticsProvider,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
