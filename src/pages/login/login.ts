import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

 constructor(public nav: NavController) { }

    username:string;
    password:string;

 login() {
        
        //Navigate to home page              
        this.nav.setRoot(Sobre);

       }

}
