import { MessagingService } from './services/messaging.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { PublicAdComponent } from './components/public-ad/public-ad.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchAdComponent } from './components/search-ad/search-ad.component';
import { CreateAdComponent } from './components/create-ad/create-ad.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AdsService } from './services/ads.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AdDetailComponent } from './components/ad-detail/ad-detail.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MessengerComponent } from './components/messenger/messenger.component';
import { WebsocketService } from './services/websocket.service';

export const firebaseConfig = {
  apiKey: "AIzaSyD4jMROPDW8zm7yg1vR5_Ql7tu0znKsZ1E",
  authDomain: "practisefirebase-48a7b.firebaseapp.com",
  databaseURL: "https://practisefirebase-48a7b.firebaseio.com",
  projectId: "practisefirebase-48a7b",
  storageBucket: "practisefirebase-48a7b.appspot.com",
  messagingSenderId: "320062807685"
};

@NgModule({
  declarations: [
    AppComponent,
    PublicAdComponent,
    LoginComponent,
    SignupComponent,
    NavComponent,
    SearchAdComponent,
    CreateAdComponent,
    ProfileComponent,
    AdDetailComponent,
    MessengerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot([
      { path: '', component: PublicAdComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'search', component: SearchAdComponent },
      { path: 'create-ad', component: CreateAdComponent },
      { path: 'ad-detail/:id', component: AdDetailComponent },
      { path: 'messenger', component: MessengerComponent},
      { path: '**', redirectTo: '' }
    ]),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService, AdsService,MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
