import {Injectable} from '@angular/core'
import {Http} from '@angular/http';

import { Period } from '../types/Period'

import * as moment from 'moment';


@Injectable()

export class PeriodService {
  
  path: string = 'data/devfest-2015.json';

  constructor(private http: Http) {}

  getPeriods(): Promise<Period> {
    return new Promise((resolve, reject) => {
      this.http.request(this.path).subscribe(res => {
        resolve(res.json()['hours'])
      })
    })
  }

  getBeginDate(periodId: string): Promise<Date> {
    return new Promise((resolve, reject) => {
      this.getPeriods().then( data => {
        let period = data[periodId]

        if(! period) reject('Period ' + periodId + ' does not exist')

        let dateStart = data[periodId].hourStart + ':' + data[periodId].minStart
        resolve(moment(dateStart, 'HH:mm'))
      })
    })
  }

  getEndDate(periodId: string): Promise<Date> {
    return new Promise((resolve, reject) => {
      this.getPeriods().then( data => {
        let period = data[periodId]

        if(! period) reject('Period ' + periodId + ' does not exist')

        let dateEnd = data[periodId].hourEnd + ':' + data[periodId].minEnd
        resolve(moment(dateEnd, 'HH:mm'))
      })
    })
  }
}
