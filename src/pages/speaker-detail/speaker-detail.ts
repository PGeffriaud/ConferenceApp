import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Speaker } from '../../types/Speaker'
import { Session } from '../../types/Session'
import { SpeakerService } from '../../services/speakers.service'
import { SessionService } from '../../services/sessions.service'
import { SessionDetail } from '../session-detail/session-detail'

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html',
  providers: [SpeakerService, SessionService]
})
export class SpeakerDetail {

  speaker: Speaker
  sessions: Array<Session>
  socialPic: {[key: string] : string}

  constructor(public navCtrl: NavController, public navParams: NavParams, private speakerService: SpeakerService, private sessionService: SessionService) {

      speakerService.getSpeakerById(navParams.data.id).then(speaker => {
        this.speaker = speaker
      })

      sessionService.getSessionsBySpeakerId(navParams.data.id).then(sessions => {
        this.sessions = sessions
      })

      this.socialPic = {
        "twitter": "logo-twitter",
        "google-plus": "logo-googleplus",
        "github": "logo-github",
        "link": "md-link"
      }
  }

  lookAtSession(sessionId: string): void {
    this.navCtrl.push(SessionDetail, {id: sessionId})
  }

  openExternalLink(link: string): void {
    window.open(link, '_blank', 'location=yes');
  }
}
