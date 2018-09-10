import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  msgg:any;
  chat:any;
  constructor(public msg: MessagingService) { }

  ngOnInit() {
    // this.msg.messages.subscribe(msg => {
    //   console.log(msg);
    //   this.chat = msg;
    // })
  }

  sendMessage(msg) {
    this.msg.sendMsg(msg);
  }

}
