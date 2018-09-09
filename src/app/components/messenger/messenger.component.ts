import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  chat:any;
  constructor(private msg: MessagingService) { }

  ngOnInit() {
    this.msg.messages.subscribe(msg => {
      console.log(msg);
      this.chat = msg;
    })
  }

  sendMessage() {
    this.msg.sendMsg("Test Message");
  }

}
