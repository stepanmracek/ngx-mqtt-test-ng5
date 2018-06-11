import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MqttModule, MqttService } from 'ngx-mqtt';

import { AppComponent } from './app.component';

export function mqttServiceFactory() {
  return new MqttService({
    connectOnCreate: true,
    hostname: 'localhost',
    port: 1884
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
