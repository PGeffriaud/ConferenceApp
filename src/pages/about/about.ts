import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Device, AppVersion, InAppBrowser } from 'ionic-native';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {

  info: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    AppVersion.getAppName().then(res => {
      this.info.appName = res
    })

    AppVersion.getVersionNumber().then(res => {
      this.info.appVersion = res
    })

    this.info = {
      platform: Device.platform,
      model: Device.model,
      version: Device.version,
      manufacturer: Device.manufacturer
    }
  }

  open(link: string): void {
    var url: string

    switch(link) {
      case 'github': url = 'https://github.com/PGeffriaud/ConferenceApp'; break;
      case 'linkedin': url = 'https://www.linkedin.com/in/pierre-geffriaud-b0915bb9'; break;
      case 'mygithub': url = 'https://github.com/PGeffriaud/'; break;
    }
    new InAppBrowser(url, '_blank', 'location=no');

  }



}
