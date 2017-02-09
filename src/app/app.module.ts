import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Sessions } from '../pages/sessions/sessions';
import { Speakers } from '../pages/speakers/speakers';

@NgModule({
  declarations: [
    MyApp,
    Home,
    Sessions,
    Speakers
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
    Speakers
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
