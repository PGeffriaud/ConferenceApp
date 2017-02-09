import {Injectable} from '@angular/core'
import {Http} from '@angular/http';

import {Speaker} from '../types/Speaker'

@Injectable()

export class SpeakerService {

  path: string = 'data/devfest-2015.json';

  constructor(private http: Http) {

  }

  getSpeakers(): Promise<Array<Speaker>> {
    return new Promise((resolve, reject) => {
      this.http.request(this.path).subscribe(res => {
        resolve(res.json()['speakers'])
      })
    })
  }

  /*
    Return the first speaker of the ids array
  */
  getSpeakerByIds(ids: Array<string> ): Promise<Array<Speaker>> {
    return new Promise((resolve, reject) => {
      if(ids && ids.length > 0) {
        this.http.request(this.path).subscribe(res => {
          resolve(res.json()['speakers'].filter(speaker => ids.indexOf(speaker.id) >= 0))
        })
      } else {
        resolve(undefined)
      }

    })
  }


}
