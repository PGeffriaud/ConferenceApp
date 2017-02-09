import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Sessions } from '../sessions/sessions';
import { Speakers } from '../speakers/speakers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
  pages: Object;

  constructor(public navCtrl: NavController) {
    this.pages = {
      'sessions' : Sessions,
      'speakers' : Speakers
    }
  }

  goTo(page) {
    this.navCtrl.push(this.pages[page])
  }
}
