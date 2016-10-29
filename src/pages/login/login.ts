import { Component } from '@angular/core';
import { NavController,MenuController, LoadingController ,ModalController,Platform, NavParams, ViewController} from 'ionic-angular';
import {Sobre} from '../sobre/sobre';
import {LoginService} from '../../providers/login-service';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

 constructor(public nav: NavController, public menu : MenuController,public loadingCtrl: LoadingController,public modalCtrl: ModalController) {

   this.menu.swipeEnable(false,"menuprincipal");
    window.localStorage.removeItem("session-token");
    window.localStorage.removeItem("session-userid");
  }

    usuario:string;
    senha:string;

    login() {        
          //Navigate to home page 
          this.menu.swipeEnable(true,"menuprincipal");
          console.log(this.usuario);
          console.log(this.senha);
          this.loading();            
          this.nav.setRoot(Sobre);          
          //window.localStorage.setItem("session-token", JSON.stringify(data.token));
          //window.localStorage.setItem("session-userid", JSON.stringify(data.id));
        }

    novaConta(){
      let modal = this.modalCtrl.create(modalNovaconta);
      modal.present();
    }

    loading(){
        let loader = this.loadingCtrl.create({
          content: "Efetuando login",
          duration: 1000
        });
        loader.present();
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
    public viewCtrl: ViewController
  ){}

  fechar() {
    this.viewCtrl.dismiss();
  }
}
