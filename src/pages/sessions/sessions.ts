import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

import { SessionService } from '../../services/sessions.service';
import { SpeakerService } from '../../services/speakers.service';

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
  providers: [SessionService, SpeakerService]
})
export class Sessions {
  selectedItem: any;
  icons: string[];
  trucs: any;
  items: Array<{id: string, title: string, room: string, desc: string, type: string, lang: string, speakerName: string, speakerPic: string}>

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private sessionService: SessionService, private speakerService: SpeakerService) {

    this.items = []
    sessionService.getSessions().then(sessions => {
      sessions.forEach(s => {
          speakerService.getSpeakerByIds(s.speakers).then(speaker => {
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
    })

  }

  lookAt(idSession: string) {
    this.navCtrl.push(SessionDetail, {id: idSession})
  }

}
