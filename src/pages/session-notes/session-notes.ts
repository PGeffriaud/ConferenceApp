import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Camera, FileOpener, ActionSheet } from 'ionic-native';

import { Session } from '../../types/Session';
import { Comment, Media } from '../../types/Comment'

import { SessionService } from '../../services/sessions.service'
import { CommentService } from '../../services/comment.service'
import { CameraService } from '../../services/camera.service'
import { MediaService } from '../../services/medias.service'
import { ShareService } from '../../services/share.service'

@Component({
  selector: 'page-session-notes',
  templateUrl: 'session-notes.html',
  providers: [SessionService, CommentService, CameraService, MediaService, ShareService]
})

export class SessionNotes {

  session: Session
  note: Comment
  sourceTypes: {[key:string]: number}

  video: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private sessionService: SessionService, private commentService: CommentService, private cameraService: CameraService, private mediaService: MediaService, private shareService: ShareService) {
    this.sourceTypes = {
      'camera': Camera.PictureSourceType.CAMERA,
      'library': Camera.PictureSourceType.PHOTOLIBRARY
    }

    this.note = new Comment()
    this.note.sessionId = navParams.data.id

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
          this.note = this.commentService.dbToComment(data.rows.item(0))
        }
      }, error => {
        console.error(error)
      })
  }

  saveNotes(): void {
    this.commentService.save(this.note).then(
      data => {},
      error => {
        console.error("ERROR while inserted", error)
      })
  }

  takePic(sourceType: number) : void {
    this.cameraService.takePic(sourceType).then(
      imageData => {
        console.log(imageData)
        this.note.picture = imageData
        this.saveNotes()
      }, error => {
        console.error('Picture error', error)
      })
  }

  recordMicro(): void {
    this.mediaService.recordAudio().then(
      data => {
        this.note.audio = {
          path: data[0].fullPath,
          type : data[0].type
        }
        this.saveNotes()
      }
    )
  }

  recordVideo(): void {
    this.mediaService.recordVideo().then(
      data => {
        this.note.video = {
          path: data[0].fullPath,
          type: data[0].type
        }
        this.saveNotes()
      },
      error => console.error(error)
    )
  }

  openMedia(media: Media): void {
    FileOpener.open(media.path, media.type)
  }

  openShareMenu(): void {
    let buttonLabels = ['Share'];
    
    ActionSheet.show({
      'title': 'What do you want to do ?',
      'buttonLabels': buttonLabels,
      'addCancelButtonWithLabel': 'Cancel',
      'addDestructiveButtonWithLabel' : 'Delete'
    }).then((buttonIndex: number) => {

        switch(buttonIndex) {
          case 1: { // Delete picture
            this.commentService.deletePic(this.note.sessionId).then(
              success => this.note.picture = '',
              error => console.error(error)
            )
            break;
          }
          case 2: this.shareService.shareViaSocials(this.session.title, this.note.picture); break
          default: break;
        }
    });
  }
}
