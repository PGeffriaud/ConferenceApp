import {Injectable} from '@angular/core'
import { MediaCapture, MediaFile } from 'ionic-native';


@Injectable()

export class MediaService {

    constuctor() {}

    recordVideo(): Promise<MediaFile[]> {
      return MediaCapture.captureVideo()
    }

    recordAudio(): Promise<MediaFile[]> {
      return MediaCapture.captureAudio()
    }

}
