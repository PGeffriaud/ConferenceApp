import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Sessions } from '../pages/sessions/sessions';
import { Speakers } from '../pages/speakers/speakers';
import { SessionDetail } from '../pages/session-detail/session-detail';
import { SpeakerDetail } from '../pages/speaker-detail/speaker-detail';

@NgModule({
  declarations: [
    MyApp,
    Home,
    Sessions,
    Speakers,
    SessionDetail,
    SpeakerDetail
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Sessions,
    Speakers,
    SessionDetail,
    SpeakerDetail
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
