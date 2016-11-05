import { Component } from '@angular/core';
import { NavController, LoadingController ,ModalController,Platform, NavParams, ViewController,AlertController} from 'ionic-angular';
import{TarefaService} from '../../providers/tarefa-service';

/*
  Generated class for the TarefaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tarefa-page',
  templateUrl: 'tarefa-page.html'
})
export class TarefaPage {

  projeto:any;
  tipoTarefa : string = "pendentes";
  tarefasPendentes:any = [];
  tarefasConcluidas:any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public tarefaserv: TarefaService) {
    this.projeto = navParams.get('projeto');
  }

  ionViewDidLoad() {
   this.getTarefas(this.projeto._id);
  }

  getTarefas(idprojeto:string){
    this.tarefaserv.getTarefas(idprojeto).subscribe(
      any => {
              any.forEach(tarefa =>  {
                if (tarefa.flgConcluida) {
                  this.tarefasConcluidas.push(tarefa);
                }else{
                  this.tarefasPendentes.push(tarefa);
                }
              });

      }
    )


  }

}

@Component({
  selector: 'nova-tarefa-page',
  templateUrl: 'novaTarefa.html'
})
export class NovaTarefaPage  {
  constructor() { }

}