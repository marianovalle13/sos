import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-images4',
  templateUrl: './car-images4.page.html',
  styleUrls: ['./car-images4.page.scss'],
})
export class CarImages4Page implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }


  goToServiceEnd() {
    this.router.navigate(["/service-end"]);
  }
  
}
