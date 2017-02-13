import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { Session } from '../../types/Session';
import { Comment } from '../../types/Comment'

import { SessionService } from '../../services/sessions.service'
import { CommentService } from '../../services/comment.service'
import { CameraService } from '../../services/camera.service'

@Component({
  selector: 'page-session-notes',
  templateUrl: 'session-notes.html',
  providers: [SessionService, CommentService, CameraService]
})

export class SessionNotes {

  session: Session
  note: Comment
  sourceTypes: {[key:string]: number}

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private sessionService: SessionService, private commentService: CommentService, private cameraService: CameraService) {
    this.sourceTypes = {
      'camera': Camera.PictureSourceType.CAMERA,
      'library': Camera.PictureSourceType.PHOTOLIBRARY
    }

    this.note = {sessionId: navParams.data.id, comment: '', picture: ''}

    sessionService.getSessionById(this.note.sessionId).then(session => {
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
    this.commentService.get(this.note.sessionId).then(
      data => {
        if(data.rows.length > 0) {
          console.log('GET', data.rows.item(0))
          this.note = data.rows.item(0)
        }
      }, error => {
        console.error(error)
      })
  }

  saveNotes(): void {
    console.log("Saving...", this.note)
    this.commentService.save(this.note).then(
      data => {},
      error => {
        console.error("ERROR while inserted", error)
      })
  }

  takePic(sourceType: number) : void {
    this.cameraService.takePic(sourceType).then(
      imageData => {
        this.note.picture = 'data:image/jpeg;base64,' + imageData
        this.saveNotes()
      }, error => {
        console.error('Picture error', error)
      })
  }


}
