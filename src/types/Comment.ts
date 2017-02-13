export class Comment {
  sessionId: string
  comment: string
  picture: string
  video: Media
  audio: Media

  public constructor() {
    this.comment = ''
    this.picture = ''
    this.video = {path: '', type: ''}
    this.audio = {path: '', type: ''}
  }
}

export interface Media {
  path: string,
  type: string
}
