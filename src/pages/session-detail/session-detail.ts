import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Session } from '../../types/Session'
import { Speaker } from '../../types/Speaker'
import { SessionService } from '../../services/sessions.service'
import { SpeakerService } from '../../services/speakers.service'
import { PeriodService } from '../../services/period.service'

import { SpeakerDetail } from '../speaker-detail/speaker-detail'
import { SessionNotes } from '../session-notes/session-notes'


@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html',
  providers: [SessionService, SpeakerService, PeriodService]
})

export class SessionDetail {

  session: Session
  speakers: Array<Speaker>


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private sessionService: SessionService,
              private speakerService: SpeakerService,
              private periodService: PeriodService) {

    this.sessionService.getSessionById(this.navParams.data.id).then(s => {
      this.session = s

      this.periodService.getBeginDate(s.hour).then(date => this.session.dateBegin = date)
      this.periodService.getEndDate(s.hour).then(date => this.session.dateEnd = date)
      
      this.speakerService.getSpeakerByIds(s.speakers).then(s => {
        this.speakers = s
      })

    })
  }

  lookAt(speakerId: string): void {
    this.navCtrl.push(SpeakerDetail, {id: speakerId})
  }

  goToNotes(sessionId: string): void {
    this.navCtrl.push(SessionNotes, {id: sessionId})
  }
}
