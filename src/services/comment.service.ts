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
          console.log('INSERTION...', comment)
          resolve(this.database.executeSql("INSERT INTO NOTES (comment, sessionId, picture, videoPath, videoType, audioPath, audioType) VALUES (?,?,?,?,?,?,?)", [comment.comment, comment.sessionId, comment.picture, comment.video.path, comment.video.type, comment.audio.path, comment.audio.type]))
        } else {
          console.log('UPDATE...', comment)
          resolve(this.database.executeSql("UPDATE NOTES SET comment = ?, picture = ?, videoPath = ?, videoType = ?, audioPath = ?, audioType = ? WHERE sessionId = ?", [comment.comment, comment.picture, comment.video.path, comment.video.type, comment.audio.path, comment.audio.type, comment.sessionId]))
        }
      })
    })
  }

  deletePic(sessionId: string): Promise<any> {
    return this.database.executeSql("UPDATE NOTES SET picture = '' WHERE sessionId = ?", [sessionId])
  }

  dbToComment(resSQL: any): Comment {
    let com = new Comment();
    com.sessionId = resSQL.sessionId
    com.comment = resSQL.comment
    com.picture = resSQL.picture
    com.video = {path: resSQL.videoPath, type: resSQL.videoType}
    com.audio = {path: resSQL.audioPath, type: resSQL.audioType}

    return com
  }

}
