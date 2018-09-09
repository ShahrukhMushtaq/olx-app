import { Component, OnInit } from '@angular/core';
import { SwUpdate, SwPush } from "@angular/service-worker";
import { MessagingService } from "./services/messaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  message;

  constructor(private updates: SwUpdate, private msgService: MessagingService) {
    updates.available.subscribe(ev => {
      updates.activateUpdate().then(() => document.location.reload())
    })
  }

  ngOnInit() {
    this.updates.available.subscribe((ev) => {
      window.location.reload();
    });
    // this.msgService.getPermission()
    // this.msgService.receiveMessage()
    // this.message = this.msgService.currentMessage
    // console.log(this.message);
  }
}
