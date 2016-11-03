import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.projeto = navParams.get('projeto');
  }

  ionViewDidLoad() {
    console.log('Hello TarefaPage Page');
  }

}
