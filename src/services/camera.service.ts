import {Injectable} from '@angular/core'
import { Camera } from 'ionic-native';


@Injectable()

export class CameraService {


  constructor() {}

  // Returns a promise containing picture URI
  takePic(sourceType: number): Promise<string> {
      return Camera.getPicture({
        sourceType: sourceType,
        destinationType: Camera.DestinationType.FILE_URI,
        cameraDirection: Camera.Direction.BACK
      })
  }
}
