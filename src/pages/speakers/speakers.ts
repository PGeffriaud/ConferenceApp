import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Speaker } from '../../types/Speaker'
import { SpeakerService } from '../../services/speakers.service'
import { SpeakerDetail } from '../speaker-detail/speaker-detail'

@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html',
  providers: [SpeakerService]
})
export class Speakers {

  speakers: Array<Speaker>

  constructor(public navCtrl: NavController, public navParams: NavParams, private speakerService: SpeakerService) {

    speakerService.getSpeakers().then(speakers => {
      this.speakers = speakers;
    })
  }

  lookAt(speakerId: string): void {
    this.navCtrl.push(SpeakerDetail, {id: speakerId})
  }


}
