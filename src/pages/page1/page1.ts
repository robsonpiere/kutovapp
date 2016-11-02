import { Component } from '@angular/core';
import {ProjetoService} from '../../providers/projeto-service';
import { NavController,MenuController, LoadingController ,ModalController,Platform, NavParams, ViewController,AlertController} from 'ionic-angular';

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

  ngOnInit() { this.getProjetos(); }
  

  getProjetos(){ 
    this.projservice.getProjetos().subscribe(
        any => {
          this.projetos = any;
        },
       )
  }

  visualizar(item){
    console.log(item);
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
                      this.getProjetos();
                  }else{
                      this.mensagem("Erro",resposta.message);
                  }
         }
       ) 
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
                      this.getProjetos();
                  }else{
                      this.mensagem("Erro","Erro ao excluir o projeto");
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
