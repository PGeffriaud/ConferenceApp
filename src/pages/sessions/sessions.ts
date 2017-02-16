import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Session } from '../../types/Session';
import { SessionDetail } from '../session-detail/session-detail';
import { SessionService } from '../../services/sessions.service';
import { SpeakerService } from '../../services/speakers.service';
import { PeriodService } from '../../services/period.service';
import { FavoriteService } from '../../services/favorites.service';

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
  providers: [SessionService, SpeakerService, PeriodService, FavoriteService],
})
export class Sessions {
  selectedItem: any;
  icons: string[];
  trucs: any;
  items: Array<{session: Session, speakerName: string, speakerPic: string, isFavorite: Boolean}>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private http: Http,
              private sessionService: SessionService,
              private speakerService: SpeakerService,
              private periodService: PeriodService,
              private favoriteService: FavoriteService) {

    this.items = []
    this.favoriteService.connect().then(() => {
      sessionService.getSessions().then(sessions => {

        sessions.forEach( (s:Session) => {
            this.periodService.getBeginDate(s.hour).then(date => s.dateBegin = date)
            this.periodService.getEndDate(s.hour).then(date => s.dateEnd = date)

            speakerService.getSpeakerByIds(s.speakers).then(speakers => {

                this.favoriteService.get(s.id).then(isFav => {
                  this.items.push({
                    session: s,
                    speakerName: (speakers && speakers.length > 0) ? speakers[0].firstname + ' ' + speakers[0].lastname : '',
                    speakerPic: (speakers && speakers.length > 0) ? speakers[0].image : 'default_avatar.jpg',
                    isFavorite: isFav,
                  })
                })
          })
        })
      })

    })

  }

  toggleFavorite(item) {
    this.favoriteService.set(item.session.id, item.isFavorite).then(
      success => {
          this.toastCtrl.create({
          message: 'The session has been added to your favorite',
          position: 'top',
          duration: 3000
        }).present();
      },
      error => console.error(error)
    )
  }

  lookAt(idSession: string) {
    this.navCtrl.push(SessionDetail, {id: idSession})
  }

}
