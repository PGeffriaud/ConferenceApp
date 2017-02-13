import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { Home } from '../pages/home/home';
import { Sessions } from '../pages/sessions/sessions';
import { Speakers } from '../pages/speakers/speakers';
import { About } from '../pages/about/about';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;

  pages: Array<{title: string, component: any}>;
  db: SQLite

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Home },
      { title: 'Sessions', component: Sessions },
      { title: 'Speakers', component: Speakers },
      { title: 'About', component: About }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

        this.db = new SQLite()
        this.db.openDatabase({name: "data.db", location: "default"}).then(() => {
          this.db.executeSql('CREATE TABLE IF NOT EXISTS NOTES (id integer primary key, comment text, sessionId text, picture text)', {}).then(data => {
            console.log('Table notes created')
          }, error => {
            console.error('Unable to execute sql', error)
          })
        }, error => {
          console.error('Unable to open database', error)
        })
      })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
