import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginService} from '../../providers/login-service';

/*
  Generated class for the Sobre page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html'
})
export class Sobre {

  constructor(public navCtrl: NavController,public loginserv : LoginService) {}

  ionViewDidLoad() {
    console.log('Hello Sobre Page');
  }

  ngOnInit(){
    this.getinfo();
  };

  getinfo(){
    this.loginserv.getUsuariologado().subscribe(
      any => {
          this.loginserv.usuarioLogado = any.nome;
          this.loginserv.emailUsuario = any.email;
          this.loginserv.fotoLogado = any.foto;
        }, 
    )
  }

}
