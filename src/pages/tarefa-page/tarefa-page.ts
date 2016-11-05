import { Component } from '@angular/core';
import { NavController, LoadingController ,ModalController, NavParams, ViewController,AlertController} from 'ionic-angular';
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


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public tarefaserv: TarefaService,
    public alertCtrl:AlertController
    ) {
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

  atualizarTarefas(){
     this.tarefasConcluidas = [];
     this.tarefasPendentes = [];

      this.tarefaserv.getTarefas(this.projeto._id).subscribe(
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

  atualizarTarefasSwipe(refresher){
     this.tarefasConcluidas = [];
     this.tarefasPendentes = [];

    this.tarefaserv.getTarefas(this.projeto._id).subscribe(
      any => {
              any.forEach(tarefa =>  {
                if (tarefa.flgConcluida) {
                  this.tarefasConcluidas.push(tarefa);
                }else{
                  this.tarefasPendentes.push(tarefa);
                }
                refresher.complete();
              });
      }
    )

  }

  novaTarefa(){
    console.log("nova tarefa clicada");
  }

  promptConcluirTarefa(tarefa){

    let confirm = this.alertCtrl.create({
      title:'Concluir  ? ',
      message:'Deseja concluir a Tarefa '+ tarefa.descricao,
      buttons:[
        {
          text:'Cancelar',
          handler:()=>{
            console.log('cancelado');
          }
        },
        {
          text: "Sim",
          handler:()=>{
            this.concluirTarefa(tarefa._id)
          }
        }
      ]
    });
    confirm.present();    
  }

  concluirTarefa(id){
    let resposta : any;
    this.tarefaserv.completarTarefa(id).subscribe(
      any => {
          resposta = any;
          if(resposta.success){
            this.mensagem("Sucesso",resposta.message);
            this.atualizarTarefas();
          }else{
            this.mensagem("Erro", "Erro ao atualizar a tarefa");
          }
      }
    )

  }

  promptRetomarTarefa(tarefa){

    let confirm = this.alertCtrl.create({
      title:'Retomar  ? ',
      message:'Deseja retomar a Tarefa '+ tarefa.descricao,
      buttons:[
        {
          text:'Cancelar',
          handler:()=>{
            console.log('cancelado');
          }
        },
        {
          text: "Sim",
          handler:()=>{
            this.retomarTarefa(tarefa._id)
          }
        }
      ]
    });
    confirm.present();
  }

  retomarTarefa(id){
    let resposta : any;
    this.tarefaserv.retomarTarefa(id).subscribe(
      any => {
          resposta = any;
          if(resposta.success){
            this.mensagem("Sucesso",resposta.message);
            this.atualizarTarefas();
          }else{
            this.mensagem("Erro", "Erro ao atualizar a tarefa");
          }
      }
    )

  }

  mensagem(titulo:string,subtitulo:string){
        let alert = this.alertCtrl.create({
        title: titulo,
        subTitle: subtitulo,
        buttons: ["Fechar"]
        });
        alert.present();
    }

}

@Component({
  selector: 'nova-tarefa-page',
  templateUrl: 'novaTarefa.html'
})
export class NovaTarefaPage  {
  constructor() { }

}