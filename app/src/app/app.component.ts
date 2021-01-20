import { Component, OnInit } from '@angular/core';
import { PageService } from './core/page.service';

import { AlertController, Events, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../environments/environment';
import { Constants } from './app.constants';
import { Storage } from '@ionic/storage';

import { SwUpdate } from '@angular/service-worker';
import { ModalController } from '@ionic/angular';
import { MessagePage } from '../pages/message/message';

// import { AnalyticsProvider } from '../providers/analytics/analytics';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  imageToShow: string = Constants.DEFAULT_AVATAR_NO_IMAGE;
  imagesUrl = environment.filesUrl;


  showMenu = false;
  user: any = {};

  public appPages = [];

  constructor(
    // public analyticsProvider: AnalyticsProvider,
    public modalController: ModalController,
    public pageService: PageService,
    private alertController: AlertController,
    public swUpdate: SwUpdate,
    public storage: Storage,
    public events: Events,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    moment.locale('es');

    this.initializeApp();

    // (+) Message
    this.pageService.global.getMessageAsObservable().subscribe((message) => {
      if(message && message != '') {
        console.log("************************");
        console.log(message);
        console.log("************************");
        this.presentMessage(message);
      }
    });
    // (-) Message


    events.subscribe('logout', () => {
      this.showMenu = false;
      this.user = {};
    });

    events.subscribe('changeUser', () => {
      this.storage.get(Constants.storage.user).then((user) => {
        this.user = user;
        this.showMenu = true;
        if (this.user.image && (this.user.image != ""))
          this.imageToShow = this.imagesUrl + "/small-" + this.user.image;
        else
          this.imageToShow = Constants.DEFAULT_AVATAR_NO_IMAGE;
      });
    });

    this.appPages = [
      { title: 'TITLE_SCHEDULE', url: '/home', icon: 'calendar' },
      { title: 'TITLE_NETWORKING', url: '/networking', icon: 'git-network' },
      { title: 'TITLE_NOTIFICATIONS', url: '/notifications', icon: 'notifications' },
      { title: 'TITLE_ABOUT', url: '/about', icon: 'folder-open' },
      { title: 'TITLE_SETTINGS', url: '/settings', icon: 'settings' }
      // { title: 'TITLE_LOCATIONS', url: '/locations', icon: 'pin' },
      // { title: 'TITLE_POLL', url: '/poll', icon: 'list-box' },
      // { title: 'TITLE_SOCIAL', url: '/social', icon: 'share' },
      // { title: 'TITLE_SPONSORS', url: '/sponsors', icon: 'people' },
    ];

    this.storage.get(Constants.storage.user).then((user) => {
      if (user) {
        // this.rootPage = 'HomePage';
        this.showMenu = true;
        this.user = user;
        if (this.user.image && (this.user.image != ""))
          this.imageToShow = this.imagesUrl + "/" + this.user.image;
        else
          this.imageToShow = Constants.DEFAULT_AVATAR_NO_IMAGE;
      }
    });

  }

  async presentMessage(message) {
    const modal = await this.modalController.create({
      component: MessagePage,
      cssClass: 'message-modal',
      componentProps: {
        message: message
      },
      backdropDismiss:false
    });
    return await modal.present();
  }

  ngOnInit() {
    console.log("ngOnInit - this.swUpdate.isEnabled" + this.swUpdate.isEnabled);
    if (this.swUpdate.isEnabled) {
      console.log("ngOnInit - before subscribe");
      this.swUpdate.available.subscribe(async () => {
        const alert = await this.alertController.create({
          header: `Actualización!`,
          message: `Hay una nueva version de la app para actualizar. Es una actualización rapida!`,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
            }, {
              text: 'Actualizar',
              handler: () => {
                console.log("ngOnInit - Reloadddd");
                window.location.reload();
              },
            },
          ],
        });

        await alert.present();
      });
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // this.analyticsProvider.startTrackerWithId('UA-33759313-9');
    // this.analyticsProvider.trackEvent('General', 'Inicializacion', '39');
  }
  goToTransport() {
    window.open('https://forms.gle/AZiE3QnHgdwJ4G7E8', '_blank')
  }
}
