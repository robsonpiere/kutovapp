import { Component } from '@angular/core';
import { NavController,MenuController, LoadingController ,ModalController,Platform, NavParams, ViewController} from 'ionic-angular';
import {Sobre} from '../sobre/sobre';


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
  }

    username:string;
    password:string;

    login() {        
          //Navigate to home page 
          this.menu.swipeEnable(true,"menuprincipal");
          this.loading();            
          this.nav.setRoot(Sobre);
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
