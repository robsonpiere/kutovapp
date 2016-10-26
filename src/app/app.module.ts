import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {Sobre} from '../pages/sobre/sobre';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Sobre
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    Sobre
  ],
  providers: []
})
export class AppModule {}
