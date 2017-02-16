import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Session } from '../../types/Session';
import { SessionDetail } from '../session-detail/session-detail';
import { SessionService } from '../../services/sessions.service';
import { SpeakerService } from '../../services/speakers.service';
import { PeriodService } from '../../services/period.service';
import { FavoriteService } from '../../services/favorites.service';

import * as moment from 'moment'

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
  filterByFavorites: Boolean
  overlaping: Boolean

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private http: Http,
              private sessionService: SessionService,
              private speakerService: SpeakerService,
              private periodService: PeriodService,
              private favoriteService: FavoriteService) {
    this.items = []
    this.overlaping = false
    this.favoriteService.connect().then(() => {
      sessionService.getSessions().then(sessions => {

        sessions.forEach( (s:Session, id:number) => {
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

          if(id === (sessions.length-1) && navParams.data) {
            navParams.data.dismiss()
          }
        })
      })

    })

  }

  toggleFavorite(item) {
    this.favoriteService.set(item.session.id, item.isFavorite).then(
      success => {
        this.toastCtrl.create({
          message: item.isFavorite ? 'Favorite added successfully' : 'Favorite removed successfully',
          duration: 3000
        });
        this.checkAvailability(item)
      },
      error => console.error(error)
    )
  }

//(StartA <= EndB)  and  (EndA >= StartB)
  private checkAvailability(item) {
    let samePeriods = this.items.filter(i =>
                  i.isFavorite
                  && i.session.id != item.session.id
                  && moment(i.session.dateBegin).isSameOrBefore(item.session.dateBegin)
                  && moment(i.session.dateEnd).isSameOrAfter(item.session.dateBegin))

    this.overlaping = samePeriods.length > 0
  }

  lookAt(idSession: string) {
    this.navCtrl.push(SessionDetail, {id: idSession})
  }

}
