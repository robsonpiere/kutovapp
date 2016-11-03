import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the TarefaService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TarefaService {

  constructor(public http: Http) {
    
  }

  getTarefas(id:string):Observable<any> {
    let url = "http://kutovapp-api.herokuapp.com/api/tarefas/do-projeto/"+id;
    return this.http.get(url).map(data => data.json());
  }

  novaTarefa(tarefa:any):Observable<any>{
    let body = {
        projeto:tarefa.projeto,
        descricao:tarefa.descricao,
        dataLimite:tarefa.dataLimite,
        prioridade:tarefa.prioridade,
        flgConcluida:tarefa.flgConcluida,
    }
    let url = "http://kutovapp-api.herokuapp.com/api/tarefas";
    return this.http.post(url,body).map(data => data.json());
  }

  atualizarTarefa(){

  }

  removerTarefa(){
    
  }

}
