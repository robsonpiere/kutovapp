import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Login } from '../pages/login/login';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {Sobre} from '../pages/sobre/sobre';
import {LoginService} from '../providers/login-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;
  usuarioLogado: string = "";
  emailLogado: string = "";

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public loginserv : LoginService) {
    this.initializeApp();

    let token = JSON.parse(window.localStorage.getItem("session-token"));
    let id = JSON.parse(window.localStorage.getItem("session-userid"));

    if(token && id){
        this.rootPage = Sobre;
    }
     
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Projetos', component: Page1 },
      { title: 'Sobre', component: Sobre }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.getinfo();
  }

  //ngOnInit() { this.getinfo(); }

  getinfo(){
    this.loginserv.memberinfo().subscribe(
      any => {
          this.loginserv.usuarioLogado = any.nome;
          this.loginserv.emailUsuario = any.email;
        }, 
    )
  }
  

  logoff(){
    window.localStorage.removeItem("session-token");
    window.localStorage.removeItem("session-userid");
    this.nav.setRoot(Login);
  }
}
