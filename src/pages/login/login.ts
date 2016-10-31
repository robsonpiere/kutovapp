import { Component } from '@angular/core';
import { NavController,MenuController, LoadingController ,ModalController,Platform, NavParams, ViewController,AlertController} from 'ionic-angular';
import {Sobre} from '../sobre/sobre';
import {LoginService} from '../../providers/login-service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

 constructor(public nav: NavController, public menu : MenuController,public loadingCtrl: LoadingController,public modalCtrl: ModalController, private loginserv :LoginService, private alertCtrl: AlertController) {

   this.menu.swipeEnable(false,"menuprincipal");
    window.localStorage.removeItem("session-token");
    window.localStorage.removeItem("session-userid");
  }

    usuario:string;
    senha:string;
    resposta:any;

    login() {
        let loader = this.loadingCtrl.create({
            content: "Efetuando login",
          });
          loader.present();        
          //Navigate to home page
          this.loginserv.efetuarLogin(this.usuario,this.senha).subscribe(
            any => {
                  this.resposta = any;
                  loader.dismiss();          
                  console.log(this.resposta);
                  if(this.resposta.success){
                    window.localStorage.setItem("session-token", JSON.stringify(this.resposta.token));
                    window.localStorage.setItem("session-userid", JSON.stringify(this.resposta.id));
                      this.goHome();
                  }else{
                      this.mensagem("Erro",this.resposta.msg);
                  }          
            },
          )        
          
        }

    goHome(){
        this.menu.swipeEnable(true,"menuprincipal");            
        this.nav.setRoot(Sobre);
    }

    novaConta(){
      let modal = this.modalCtrl.create(modalNovaconta);
      modal.present();
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
  templateUrl:'novaConta.html',
  selector:'page-modal'
})
export class modalNovaconta {
 
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private loginserv :LoginService,
    private alertCtrl: AlertController
  ){}

  nome : string;
  email: string;
  pass :string;
  resposta :any;

  fechar() {
    this.viewCtrl.dismiss();
  }

  cadastrar(){
    let loader = this.loadingCtrl.create({
          content: "Efetuando cadastro",
    }); 
    this.loginserv.cadastrarUsuario(this.nome,this.email,this.pass).subscribe(
      any => {
          this.resposta = any;
          loader.dismiss();
          console.log(this.resposta);
          if(this.resposta.success){
              this.mensagem("Sucesso",this.resposta.message);
              this.viewCtrl.dismiss();
          }else{
              this.mensagem("Erro",this.resposta.message);
          }          
        },
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
