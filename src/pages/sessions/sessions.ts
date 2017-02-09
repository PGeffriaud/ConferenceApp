import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html'
})
export class Sessions {
  selectedItem: any;
  icons: string[];
  items: Array<{id: string, title: string, room: string, desc: string, type: string, lang: string, speakerName: string, speakerPic: string}>

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {

    this.items = []

    this.http.request('data/devfest-2015.json').subscribe(res => {
      var results = res.json()

      results['sessions'].forEach(s => {
        var speaker
        if(s.speakers){
            speaker = results['speakers'].find(speaker => speaker.id === s.speakers[0])
        }
        this.items.push({
          id: s.id,
          title: s.title,
          room: s.confRoom,
          desc: s.desc,
          type: s.type,
          lang: s.lang,
          speakerName: speaker ? speaker.firstname + ' ' + speaker.lastname : '',
          speakerPic: speaker ? speaker.image : 'default_avatar.jpg'
        })
      })
    })
  }

  lookAt(item) {
    console.log(item)
  }

}
