import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Session } from '../../types/Session';
import { SessionService } from '../../services/sessions.service'
import { CommentService } from '../../services/comment.service'

@Component({
  selector: 'page-session-notes',
  templateUrl: 'session-notes.html',
  providers: [SessionService, CommentService]
})

export class SessionNotes {

  idSession: string
  session: Session
  notes: string

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private sessionService: SessionService, private commentService: CommentService) {

    this.idSession = navParams.data.id

    sessionService.getSessionById(this.idSession).then(session => {
      this.session = session
    })

    this.commentService.connect().then(
          () => {
            this.refresh();
          }, (error) => {
            console.log("ERROR: ", error);
          }
    );
  }

  refresh(): void {
    this.commentService.get(this.idSession).then(
      data => {
        console.log(data)
        this.notes = data.rows.length > 0 ? data.rows.item(0).comment : ''
      }, error => {
        console.error(error)
      })
  }

  saveNotes(): void {
    this.commentService.save(this.notes, this.idSession).then(
      data => {
        console.log("Done with", data)
      }, error => {
        console.error("ERROR while inserted", error)
      })
  }


}
