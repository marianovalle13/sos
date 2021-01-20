import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-images',
  templateUrl: './check-images.page.html',
  styleUrls: ['./check-images.page.scss'],
})
export class CheckImagesPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  goToCarImage() {
    this.router.navigate(["/car-image/arribo/2/optional"])
  }

  goToTakenImages(){
    this.router.navigate(["/taken-images"])
  }
}
