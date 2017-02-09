import {Injectable} from '@angular/core'
import {Http} from '@angular/http';

import {Session} from '../types/Session'

@Injectable()

export class SessionService {

  path: string = 'data/devfest-2015.json';

  constructor(private http: Http) {

  }

  getSessions(): Promise<Array<Session>> {
    return new Promise((resolve, reject) => {
      this.http.request(this.path).subscribe(res => {
        resolve(res.json()['sessions'])
      })
    })
  }

  getSessionById(id: string): Promise<Session> {
    return new Promise((resolve, reject) => {
      this.http.request(this.path).subscribe(res => {
        resolve(res.json()['sessions'].find(s => s.id === id))
      })
    })
  }

  getSessionsBySpeakerId(speakerId: string): Promise<Array<Session>> {
    return new Promise((resolve, reject) => {
      this.http.request(this.path).subscribe(res => {
        resolve(res.json()['sessions'].filter(s => s.speakers && s.speakers.indexOf(speakerId) >= 0))
      })
    })
  }


}
