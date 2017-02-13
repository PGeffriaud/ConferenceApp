import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Device } from 'ionic-native';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {

  info: any
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.info = {
      uuid: Device.uuid,
      platform: Device.platform,
      model: Device.model,
      version: Device.version,
      manufacturer: Device.manufacturer
    }
  }



}
