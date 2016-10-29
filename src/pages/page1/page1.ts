import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {ProjetoService} from '../../providers/projeto-service';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  projetos:any;//criar depois o tipo projeto para ser utlizado aqui e pelo observable no serviço


  constructor(public navCtrl: NavController, private projservice : ProjetoService, private loadingCtrl : LoadingController) {
    
  }

  ngOnInit() { this.getProjetos(); }

  getProjetos(){
    let loader = this.loadingCtrl.create({
          content: "Carregando projetos",
    });  
    this.projservice.getProjetos().subscribe(
        any => {
          this.projetos = any;
          console.log(this.projetos);
          loader.dismiss();
        },
       )
  }

  visualizar(item){
    console.log(item);
  }

  deletar(item){
    console.log(item);
  }



}
