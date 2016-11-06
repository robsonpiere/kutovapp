import { Component } from '@angular/core';
import {ProjetoService} from '../../providers/projeto-service';
import { NavController, LoadingController ,ModalController,Platform, NavParams, ViewController,AlertController} from 'ionic-angular';
import {TarefaPage} from '../tarefa-page/tarefa-page';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  projetos:any;//criar depois o tipo projeto para ser utlizado aqui e pelo observable no serviço
  constructor(public navCtrl: NavController, 
  private projservice : ProjetoService, 
  private loadingCtrl : LoadingController, 
  public modalCtrl :ModalController,
  public alertCtrl :AlertController
  ) {
    
  }

  ngOnInit() {  }

  ionViewWillEnter(){
    this.getProjetos();
  }
  

  getProjetos(){ 
    let loader = this.loadingCtrl.create({
          content: "Carregando projetos...",
      });
      loader.present();
    this.projservice.getProjetos().subscribe(
        any => {
          loader.dismiss();
          this.projetos = any;
        },
       )
  }

  atualizarProjetos(){
      this.projservice.getProjetos().subscribe(
        any => {          
          this.projetos = any;
        },
       )

  }

  atualizarProjetosSwipe(refresher){
      this.projservice.getProjetos().subscribe(
        any => {          
          this.projetos = any;
          refresher.complete();
        },
       )

  }

  visualizar(projeto){
    this.navCtrl.push(TarefaPage, {
      projeto: projeto
    });
  }

  deletar(projeto){
    let confirm = this.alertCtrl.create({
      title:'Deletar o projeto ?',
      message:'Esta ação não poderá ser desfeita.',
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
            this.apagarProjeto(projeto._id);
          }
        }
      ]
    });
    confirm.present();
    
  }

  atualizar(projeto){
    let prompt  = this.alertCtrl.create({
      title: 'Renomear Projeto',
      message: "Informe um novo nome para o projeto " + projeto.nome,
      inputs:[
        {
          name:'nomeprojeto',
          placeholder:"Nome do projeto"
        },
      ],
      buttons:[
        {
          text: "Cancelar",
          handler: data =>{
              console.log("cancelar");
          }
        },
        {
          text:"Salvar",
          handler: data=>{
            this.alterarProjeto(projeto._id,data.nomeprojeto);
          }
        }
        
      ]
    });
    prompt.present();
  }

  novoProjeto(){
    let prompt  = this.alertCtrl.create({
      title: 'Novo Projeto',
      message: "Informe um nome para o novo projeto",
      inputs:[
        {
          name:'nomeprojeto',
          placeholder:"Nome do projeto"
        },
      ],
      buttons:[
        {
          text: "Cancelar",
          handler: data =>{
              console.log("cancelar");
          }
        },
        {
          text:"Salvar",
          handler: data=>{
            this.gravarNovoProjeto(data.nomeprojeto);
          }
        }
        
      ]
    });
    prompt.present();
  }

  gravarNovoProjeto(nome:string){

    if(nome.length == 0){
        this.mensagem("Oops","O nome do projeto não pode ser vazio");
    }
    else{
      let resposta :any;
      let loader = this.loadingCtrl.create({
            content: "Salvando",
        });
        loader.present();
        this.projservice.criaProjeto(nome).subscribe(
          any =>{
                    resposta = any ;
                    loader.dismiss();
                    if(resposta.success){
                        this.mensagem("Sucesso",resposta.message);
                        this.atualizarProjetos();
                    }else{
                        this.mensagem("Erro",resposta.message);
                    }
          }
        )
    } 
  }

  apagarProjeto(id:string){
      let resposta :any;
      let loader = this.loadingCtrl.create({
          content: "Excluindo",
      });
      loader.present();
       this.projservice.apagaProjeto(id).subscribe(
         any =>{
                  resposta = any ;
                  loader.dismiss();
                  if(resposta.message){
                      this.mensagem("Mensagem",resposta.message);
                      this.atualizarProjetos();
                  }else{
                      this.mensagem("Erro","Erro ao excluir o projeto");
                  }
         }
       ) 
  }

  alterarProjeto(id:string,nome:string){
    let resposta :any;
      let loader = this.loadingCtrl.create({
          content: "Alterando",
      });
      loader.present();
      this.projservice.alterarProjeto(id,nome).subscribe(
        any =>{
          resposta = any;
          loader.dismiss();
          if(resposta.success){
                this.mensagem("Sucesso",resposta.message);
                this.atualizarProjetos();
          }else{
               this.mensagem("Erro","Erro ao atualizar o projeto");
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



//Não está sendo utlizado, fiz usando prompt
@Component({
  selector:'page-modal-novoProjeto',
  templateUrl:'novoProjeto.html'
})
export class modalNovoProjeto{
  
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ){}

}
