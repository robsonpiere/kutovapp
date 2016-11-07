import { Component} from '@angular/core';
import { NavController, LoadingController, NavParams,AlertController} from 'ionic-angular';
import{TarefaService} from '../../providers/tarefa-service';
import {Funcoes} from '../../providers/funcoes-service';

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
    public alertCtrl:AlertController,
    public loadCtlr :LoadingController,
    public funcoes: Funcoes,
    ) {
        this.projeto = navParams.get('projeto');
    }


  ionViewWillEnter(){
    this.atualizarTarefas();
  }

  formatar(stringData){
    let data = new Date(stringData);
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();
    return dia + "/" + mes + "/"+ ano;
  }

  atualizarTarefas(){
     this.tarefasConcluidas = [];
     this.tarefasPendentes = [];
     let loader =  this.loadCtlr.create({
           content: "Atualizando",
    });

      this.tarefaserv.getTarefas(this.projeto._id).subscribe(
        any => {          
                any.forEach(tarefa =>  {
                  if (tarefa.flgConcluida) {
                    this.tarefasConcluidas.push(tarefa);
                  }else{
                    this.tarefasPendentes.push(tarefa);
                  }
                });
                loader.dismiss();
        }
      )

  }

  atualizarTarefasSwipe(refresher){
     this.tarefasConcluidas = [];
     this.tarefasPendentes = [];
     let loader =  this.loadCtlr.create({
           content: "Atualizando",
    });

    this.tarefaserv.getTarefas(this.projeto._id).subscribe(
      any => {
        loader.dismiss();
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

//exibe a tela de nova tarefa
  novaTarefa(){
      this.navCtrl.push(NovaTarefaPage,
          {projeto:this.projeto}
      );
  }

  editarTarefa(tarefa){
    this.navCtrl.push(EditarTarefa,
          {tarefa:tarefa}
      );
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
    let loader =  this.loadCtlr.create({
           content: "Salvando",
    });
    let resposta : any;
    this.tarefaserv.completarTarefa(id).subscribe(
      any => {
          resposta = any;
          loader.dismiss();
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
    let loader =  this.loadCtlr.create({
           content: "Salvando",
    });
    let resposta : any;
    this.tarefaserv.retomarTarefa(id).subscribe(
      any => {
          resposta = any;
          loader.dismiss();
          if(resposta.success){
            this.mensagem("Sucesso",resposta.message);
            this.atualizarTarefas();
          }else{
            this.mensagem("Erro", "Erro ao atualizar a tarefa");
          }
      }
    )

  }

  promptDeletarTarefa(tarefa){

    let confirm = this.alertCtrl.create({
      title:'Excluir  ? ',
      message:'Deseja remover a Tarefa '+ tarefa.descricao + ' ?',
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
            this.removerTarefa(tarefa._id);
          }
        }
      ]
    });
    confirm.present();    
  }

  removerTarefa(id){
    let loader =  this.loadCtlr.create({
           content: "Removendo",
    });
    let resposta : any;
    this.tarefaserv.removerTarefa(id).subscribe(
      any => {
          resposta = any;
          loader.dismiss();
            this.mensagem("Mensagem",resposta.message);
            this.atualizarTarefas();

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

  projetoPai : any;
  descricao: string;
  projeto: string;
  dataLimite: string;
  prioridade:number = 1;
  flgConcluida: boolean;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public tarefaserv : TarefaService,
      public alertCtrl:AlertController,
      public loadCtlr:LoadingController,
      public funcoes: Funcoes
  ){
      this.projetoPai = this.navParams.get("projeto");
      this.projeto = this.projetoPai._id;
      this.dataLimite = new Date().toISOString();;
   }

   sair(){
     this.navCtrl.pop();
   }

   novaTarefa(){
     let loader =  this.loadCtlr.create({
           content: "Salvando",
    });
     let tarefa = {
      flgConcluida:this.flgConcluida,
      descricao:this.descricao,
      dataLimite:  this.dataLimite,
      prioridade :this.prioridade,
      projeto:this.projeto

     };
     let resposta:any;
     this.tarefaserv.novaTarefa(tarefa).subscribe(
        any =>{
            resposta = any;
            loader.dismiss();
            if(resposta.success){
              this.mensagem("Sucesso",resposta.message);
              this.sair();
            }
            else{
              this.mensagem("Erro",resposta.message);
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
  selector: 'editar-tarefa-page',
  templateUrl: 'editarTarefa.html'
})
export class EditarTarefa{


  tarefa :any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public tarefaserv : TarefaService,
      public alertCtrl:AlertController,
      public loadCtlr:LoadingController,
      public funcoes: Funcoes
  ){
      this.tarefa = this.navParams.get("tarefa");
   }

   sair(){
     this.navCtrl.pop();
   }

   alterar(){
     
     let loader =  this.loadCtlr.create({
           content: "Salvando",
    });
     let resposta:any;
     this.tarefaserv.atualizarTarefa(this.tarefa).subscribe(
        any =>{
            resposta = any;
            loader.dismiss();
            if(resposta.success){
              this.mensagem("Sucesso",resposta.message);
              this.sair();
            }
            else{
              this.mensagem("Erro",resposta.message);
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

     promptDeletarTarefa(){

    let confirm = this.alertCtrl.create({
      title:'Excluir  ? ',
      message:'Deseja remover a Tarefa '+ this.tarefa.descricao + ' ?',
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
            this.removerTarefa(this.tarefa._id);
          }
        }
      ]
    });
    confirm.present();    
  }

  removerTarefa(id){
    let loader =  this.loadCtlr.create({
           content: "Removendo",
    });
    let resposta : any;
    this.tarefaserv.removerTarefa(id).subscribe(
      any => {
          resposta = any;
          loader.dismiss();
            this.mensagem("Mensagem",resposta.message);
            this.sair();

      }
    )

  }
    

}