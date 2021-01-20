import { Component, OnInit } from '@angular/core';
import { UserPage } from '../user.page';
import * as moment from 'moment';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.page.html',
  styleUrls: ['./welcome-user.page.scss'],
})
export class WelcomeUserPage extends UserPage { // implements OnInit {

  greeting: any = {};

  ionViewWillEnter() {
  // ngOnInit() {
      let morning = moment(this.settings.greetings.morning.from,"HH:mm");
      let afternoon = moment(this.settings.greetings.afternoon.from,"HH:mm");
      let night = moment(this.settings.greetings.night.from,"HH:mm");
      let now = moment();

      if(now.isSameOrAfter(night))
        this.greeting = this.settings.greetings['night'];
      else if(now.isSameOrAfter(afternoon))
        this.greeting = this.settings.greetings['afternoon'];
      else if(now.isSameOrAfter(morning))
        this.greeting = this.settings.greetings['morning'];
      else
        this.greeting = this.settings.greetings['night'];
      console.log(this.greeting);
  }

  goToWelcomeWorkingday() {
    this.pageService.navigate("/welcome-workingday");
  }

}
