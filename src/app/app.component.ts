import { Component, OnInit } from '@angular/core';
import { MqttService } from 'ngx-mqtt';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface IMqttSubscription {
  subscription?: Subscription;
  id: number;
  payload: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private counter = 0;

  mqttSubscriptions: IMqttSubscription[] = [];

  constructor(private mqtt: MqttService) { }

  ngOnInit() {
    this.observe();
    for (let i = 0; i < 10; i++) {
      setTimeout(() => this.observe(), i*100);
    }
  }

  observe() {
    let s: IMqttSubscription = {
      id: this.counter++,
      payload: null
    };
    s.subscription = this.mqtt
      .observe("topic")
      .pipe(
        map(v => { console.log(v, s.id); return v }),
        map(v => v.payload),
      )
      .subscribe(msg => { s.payload = msg; });
    this.mqttSubscriptions.push(s);
  }

  unsubscribe(s: IMqttSubscription) {
    s.subscription.unsubscribe();
    this.mqttSubscriptions.splice(this.mqttSubscriptions.indexOf(s), 1);
  }
}
