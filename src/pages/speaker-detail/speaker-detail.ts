import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Speaker } from '../../types/Speaker'
import { Session } from '../../types/Session'
import { SpeakerService } from '../../services/speakers.service'
import { ContactService } from '../../services/contacts.service'
import { SessionService } from '../../services/sessions.service'
import { SessionDetail } from '../session-detail/session-detail'

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html',
  providers: [SpeakerService, SessionService, ContactService]
})
export class SpeakerDetail {

  speaker: Speaker
  sessions: Array<Session>
  socialPic: {[key: string] : string}
  toggleContact: boolean
  contactFound: boolean

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private speakerService: SpeakerService, private sessionService: SessionService, private contactService: ContactService) {

        speakerService.getSpeakerById(navParams.data.id).then(speaker => {
        this.speaker = speaker

        this.contactService.findInContacts(this.speaker).then(
          result => {
            console.log('Contacts found ? ', result)
            let found: boolean = result.length > 0
            this.contactFound = found
            this.toggleContact = found
          },
          error => console.error('Error while finding', error)
        )
      })

      sessionService.getSessionsBySpeakerId(navParams.data.id).then(sessions => {
        this.sessions = sessions
      })

      this.socialPic = {
        "twitter": "logo-twitter",
        "google-plus": "logo-googleplus",
        "github": "logo-github",
        "linkedin": "logo-linkedin",
        "link": "md-link"
      }
  }

  lookAtSession(sessionId: string): void {
    this.navCtrl.push(SessionDetail, {id: sessionId})
  }

  openExternalLink(link: string): void {
    window.open(link, '_blank', 'location=yes');
  }

  // Triggered when toggleContact value change
  changeToggle(isToggled): void {
    if(this.toggleContact) {
      if(!this.contactFound) {
        // Save the speaker only if the toggle is true and the speaker is not already in the contacts
        this.saveContact()
      }
    } else {
      if(this.contactFound) {
        // Delete contacts only if the toggle is false and the speaker exist in the contacts
        this.deleteContact()
      }
    }
  }

  // Save the speaker as a phone contact
  private saveContact(): void {
    this.contactService.saveContact(this.speaker).then(
      data => {
        this.contactFound = true
        this.toastCtrl
          .create({message: 'Contact succesfully added', duration: 3000, position: 'top' })
          .present()
      },
      error => console.error('Error while adding contact', error)
    )
  }

  // Delete phone contacts corresponding to the speaker
  private deleteContact(): void {
    this.contactService.removeContactIfExist(this.speaker).then(
      success => {
        this.contactFound = false
        this.toggleContact = false
        this.toastCtrl
          .create({message: 'Contact succesfully deleted', duration: 3000, position: 'top' })
          .present()
      },
      error => console.error('Error while deleting contacts', error)
    )

  }
}
