import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ServiceBasePage } from '../service-base.page';
import { PageService } from '../../app/core/page.service';

declare var google;

@Component({
  selector: 'app-service-map',
  templateUrl: './service-map.page.html',
  styleUrls: ['./service-map.page.scss'],
})
export class ServiceMapPage extends ServiceBasePage implements OnInit {

  // @ViewChild('map',{stand}) mapElement: ElementRef;
  map: any;
  marker: any;
  marker2: any;
  mapChange: any;
  constructor(
    public pageService: PageService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(pageService,activatedRoute);
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.mapChange = this.router.getCurrentNavigation().extras.state.mapChange;
      }
    });
   }

  // ionViewWillEnter() {
  ngOnInit() {
    console.log("ionViewDidLoad");

    this.loadMap();
  }

  loadMap() {
    console.log("ionViewDidLoad");

    let latLng = new google.maps.LatLng("-31.344732399999998", "-64.27778909999999");

    //let latLng = new google.maps.LatLng(this.commerce.latitude, this.commerce.longitude);
    // location = latLng;
    // this.lastLocation = latLng;

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      fullscreenControl: false,
      markers: 1,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      streetViewControl: false,
      mapTypeControl: false
    }
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -31.4134998, lng: -64.1810532},
      zoom: 8
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: { lat: -31.346424, lng: -64.281097 },
      icon: {
        url: "assets/imgs/icon-mapa-sos.svg"
      }
      //position: this.latlng,
    });

    this.marker2 = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: { lat: -31.352313, lng: -64.248186 },
      icon: {
        url: "assets/imgs/icon-mapa-car.svg"
      }
      //position: this.latlng,
    });



  }

  goToReason(reason) {
    this.pageService.navigate("/service-reason/" + reason);
  }

  acceptService() {
    this.updateState( this.settings.servicioAcciones.aceptar.codigo, 0 )
    .then( (response:any) => {
      console.log(response);
      if(response.codigo == -1) {
        this.pageService.showError(response.mensaje);
      } else {
        this.loadServicio(this.servicioId);
        this.pageService.navigate('/service/' + this.servicioId);
      }
    })
    .catch( (reason) => {
      this.pageService.showError(reason);
    });
  }



  back() {
    this.pageService.navigate('/service/' + this.servicioId);
  }

  goToCall(call) {
    let navigationExtras: NavigationExtras = {
      state: {
        call: "call"
      }
    };
    this.router.navigate(["/service-reason"], navigationExtras);
  }

  goToNewPatent() {
    this.router.navigate(["/patent-new"]);
  }

  goToSignTuto() {
    this.pageService.navigate("/sign-tutorial");
  }
}
