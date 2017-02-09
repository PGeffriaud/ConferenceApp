import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Session } from '../../types/Session'
import { Speaker } from '../../types/Speaker'
import { SessionService } from '../../services/sessions.service'
import { SpeakerService } from '../../services/speakers.service'
import { SpeakerDetail } from '../speaker-detail/speaker-detail'

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html',
  providers: [SessionService, SpeakerService]
})

export class SessionDetail {

  session: Session
  speakers: Array<Speaker>

  constructor(public navCtrl: NavController, public navParams: NavParams, private sessionService: SessionService, private speakerService: SpeakerService) {

    this.sessionService.getSessionById(this.navParams.data.id).then(s => {
      this.session = s

      this.speakerService.getSpeakerByIds(s.speakers).then(s => {
        this.speakers = s
      })

    })
  }

  lookAt(speakerId: string) {
    this.navCtrl.push(SpeakerDetail, {id: speakerId})
  }
}
