import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';

import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  messages: Subject<any>;

  constructor(private http: HttpClient, private ws: WebsocketService) {
    this.messages = <Subject<any>>ws
      .connect()
      .map((response: any): any => {
        return response;
      })
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }

  addPushSubscriber(sub: any) {
    return this.http.post('https://olx-back.herokuapp.com/api/notifications', sub);
  }



}
