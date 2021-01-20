import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ServiceBasePage } from '../service-base.page';

@Component({
  selector: 'app-service-accepted',
  templateUrl: './service-accepted.page.html',
  styleUrls: ['./service-accepted.page.scss'],
})
export class ServiceAcceptedPage  extends ServiceBasePage implements OnInit {
  accepted: any;
  call:any;
  finish: any;

  // constructor(
  //   private router: Router,
  //   private route: ActivatedRoute,
  // ) {
  //   this.route.queryParams.subscribe(params => {
  //     if (this.router.getCurrentNavigation().extras.state) {
  //       this.finish = this.router.getCurrentNavigation().extras.state.finish;
  //     }
  //   });
  //  }

  ngOnInit() {
  }


  goToCall(call) {
    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     call: "call"
    //   }
    // };
    // this.router.navigate(["/service-reason"], navigationExtras);
  }

  goToNewPatent() {
    this.pageService.navigate("/patent-new");
  }

  goToSignTuto() {
    this.pageService.navigate("/sign-tutorial");
  }

  goToMapChange() {
    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     mapChange: "mapChange"
    //   }
    // };
    // this.router.navigate(["/service-map"], navigationExtras);
  }
}
