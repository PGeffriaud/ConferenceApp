import {Injectable} from '@angular/core'
import { SocialSharing } from 'ionic-native';


@Injectable()

export class ShareService {


  constructor() {}

  shareViaSocials(title: string, fileURI: string): void {
    SocialSharing.shareWithOptions({
      message: 'Hey, I want to share this pic with you from session ' + title,
      subject: 'Hey, I want to share this pic with you from session ' + title,
      files: [fileURI],
      chooserTitle: 'Pick an app'
    }).then(
      success => console.log('Sharing success', success),
      error => console.error('Sharing error', error)
    )
  }
}
