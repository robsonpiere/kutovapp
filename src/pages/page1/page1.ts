import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProjetoService} from '../../providers/projeto-service';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  vetor:any;

  constructor(public navCtrl: NavController, private projservice : ProjetoService) {
    
  }

  ngOnInit() { this.getTeste(); }

  getTeste(){
      this.projservice.teste().subscribe(
        any => {
          this.vetor = any.results;
          console.log(this.vetor)
        },
       )
  }

}
