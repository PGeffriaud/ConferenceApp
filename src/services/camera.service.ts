import {Injectable} from '@angular/core'
import { Camera } from 'ionic-native';


@Injectable()

export class CameraService {


  constructor() {}

  // Returns a promise containing base 64 encoding picture
  takePic(sourceType: number): Promise<string> {
      return Camera.getPicture({
        sourceType: sourceType,
        destinationType: Camera.DestinationType.DATA_URL,
        cameraDirection: Camera.Direction.BACK
      })
  }
}
