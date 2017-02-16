import {Injectable} from '@angular/core'
import {Http} from '@angular/http';
import { SQLite } from 'ionic-native';


@Injectable()

export class FavoriteService {

  database: SQLite

  constructor(private http: Http) {
    this.database = new SQLite()
  }

  connect(): Promise<any> {
    return this.database.openDatabase({name: "data.db", location: "default"})
  }

  get(sessionId: String): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.database.executeSql("SELECT * FROM FAVORITES WHERE sessionId = ?", [sessionId]).then(
        result => resolve(result.rows.length > 0)
      )
    })

  }

  // Change favorite state
  set(sessionId: String, state: Boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      if(state) {
        this.get(sessionId).then(res => {
          if(! res) {
            console.log("ADD favorite ", sessionId)
            resolve(this.database.executeSql("INSERT INTO FAVORITES (sessionId) VALUES (?)", [sessionId]))
          }
        })

      } else {
        console.log("DELETE favorite ", sessionId)
        resolve(this.database.executeSql("DELETE FROM FAVORITES WHERE sessionId = ?", [sessionId]))
      }
    })
  }

}
