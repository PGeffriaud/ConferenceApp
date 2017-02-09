import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { Session } from '../../types/Session';
import { SessionDetail } from '../session-detail/session-detail';
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
  items: Array<{session: Session, speakerName: string, speakerPic: string}>

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private sessionService: SessionService, private speakerService: SpeakerService) {

    this.items = []
    sessionService.getSessions().then(sessions => {
      sessions.forEach(s => {
          speakerService.getSpeakerByIds(s.speakers).then(speakers => {
            this.items.push({
              session: s,
              speakerName: (speakers && speakers.length > 0) ? speakers[0].firstname + ' ' + speakers[0].lastname : '',
              speakerPic: (speakers && speakers.length > 0) ? speakers[0].image : 'default_avatar.jpg'
            })
          })
      })
    })

  }

  lookAt(idSession: string) {
    this.navCtrl.push(SessionDetail, {id: idSession})
  }

}
