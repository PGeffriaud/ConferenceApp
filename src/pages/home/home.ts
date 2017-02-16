import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Sessions } from '../sessions/sessions';
import { Speakers } from '../speakers/speakers';
import { About } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
  pages: Object
  date: Date

  constructor(public navCtrl: NavController) {
    this.pages = {
      'sessions' : Sessions,
      'speakers' : Speakers,
      'about' : About
    }

    this.date = new Date()
  }

  goTo(page) {
    this.navCtrl.push(this.pages[page])
  }
}
