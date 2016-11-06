import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { Login ,modalNovaconta} from '../pages/login/login';
import { Page1, modalNovoProjeto } from '../pages/page1/page1';
import {Sobre} from '../pages/sobre/sobre';
import {TarefaPage,NovaTarefaPage,EditarTarefa} from '../pages/tarefa-page/tarefa-page';
import {Perfil} from '../pages/perfil/perfil';

import{ProjetoService} from '../providers/projeto-service';
import{LoginService} from '../providers/login-service';
import{TarefaService} from '../providers/tarefa-service';


@NgModule({
  declarations: [
    MyApp,
    Login,
    modalNovaconta,
    Page1,
    Sobre,
    modalNovoProjeto,
    TarefaPage,
    NovaTarefaPage,
    Perfil,
    EditarTarefa
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar',
    }, {}
  )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    modalNovaconta,
    Page1,
    Sobre,
    modalNovoProjeto ,
    TarefaPage,
    NovaTarefaPage,
    Perfil,
    EditarTarefa
  ],
  providers: [ProjetoService,LoginService,TarefaService]
})
export class AppModule {}
