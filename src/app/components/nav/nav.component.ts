import { AuthService } from '../../services/auth.service';
import { MessagingService } from '../../services/messaging.service';
import { Component, OnInit } from '@angular/core';
import { SwPush } from "@angular/service-worker";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  sub: PushSubscription;
  IsEnabled:boolean;

  readonly VAPID_PUBLIC_KEY = "BA39bIgjc0bha3q0YQ_JID8PzY-c4FrIzsiGlrDiP8nSHKpKxATO363znw8-D5JyhJn418DGxt8nJO3hi7R6JFE"

  constructor(public auth: AuthService, public notif: MessagingService, public swPush: SwPush) { }

  ngOnInit() {
    this.IsEnabled = this.swPush.isEnabled;
  }

  logout() {
    this.auth.logout();
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {

        this.sub = sub;


        console.log("Notification Subscription: ", sub);

        this.notif.addPushSubscriber(sub).subscribe(
          () => console.log('Sent push subscription object to server.'),
          err => console.log('Could not send subscription object to server, reason: ', err)
        );

      })
      .catch(err => console.error("Could not subscribe to notifications", err));

  }

}
