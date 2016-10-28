import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { Login ,modalNovaconta} from '../pages/login/login';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {Sobre} from '../pages/sobre/sobre';

import{ProjetoService} from '../providers/projeto-service';

@NgModule({
  declarations: [
    MyApp,
    Login,
    modalNovaconta,
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
    Login,
    modalNovaconta,
    Page1,
    Page2,
    Sobre
    
  ],
  providers: [ProjetoService]
})
export class AppModule {}
