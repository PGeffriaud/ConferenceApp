import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.pages = {
      'sessions' : Sessions,
      'speakers' : Speakers,
      'about' : About
    }

    this.date = new Date()
  }

  goTo(page) {
    if(page === 'sessions') {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      })
      loading.present();
      this.navCtrl.push(this.pages[page], loading)
    } else {
      this.navCtrl.push(this.pages[page])
    }
  }
}
