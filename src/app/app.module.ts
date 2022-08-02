import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen, SplashScreenOriginal } from '@awesome-cordova-plugins/splash-screen';
import { StatusBar, StatusBarOriginal } from '@awesome-cordova-plugins/status-bar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from "@angular/fire/compat";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
    bootstrap: [AppComponent]
})
export class AppModule {}

