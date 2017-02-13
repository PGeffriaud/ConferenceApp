import {Injectable} from '@angular/core'
import {Http} from '@angular/http';
import { SQLite } from 'ionic-native';

import { Comment } from '../types/Comment'


@Injectable()

export class CommentService {

  database: SQLite

  constructor(private http: Http) {
    this.database = new SQLite()
  }

  connect(): Promise<any> {
    return this.database.openDatabase({name: "data.db", location: "default"})
  }

  get(sessionId: string): Promise<any> {
    return this.database.executeSql("SELECT * FROM NOTES WHERE sessionId = ?", [sessionId])
  }

  // Save or Insert if no comment already exist for this session
  save(comment: Comment): Promise<any> {
    return new Promise((resolve, reject) => {
      this.get(comment.sessionId).then(result => {
        if(result.rows.length === 0 ) {
          console.log('INSERTION...')
          resolve(this.database.executeSql("INSERT INTO NOTES (comment, sessionId, picture) VALUES (?,?,?)", [comment.comment, comment.sessionId, comment.picture]))
        } else {
          console.log('UPDATE...')
          resolve(this.database.executeSql("UPDATE NOTES SET comment = ?, picture = ? WHERE sessionId = ?", [comment.comment, comment.picture, comment.sessionId]))
        }
      })
    })

  }


}
