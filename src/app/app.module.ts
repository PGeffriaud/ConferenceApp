import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Sessions } from '../pages/sessions/sessions';
import { Speakers } from '../pages/speakers/speakers';
import { SessionDetail } from '../pages/session-detail/session-detail';
import { SessionNotes } from '../pages/session-notes/session-notes';
import { SpeakerDetail } from '../pages/speaker-detail/speaker-detail';
import { About } from '../pages/about/about';

@NgModule({
  declarations: [
    MyApp,
    Home,
    Sessions,
    Speakers,
    SessionDetail,
    SessionNotes,
    SpeakerDetail,
    About
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
    SessionNotes,
    SpeakerDetail,
    About
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
