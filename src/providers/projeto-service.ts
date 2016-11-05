import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProjetoService {

  constructor(public http: Http) {

  }

  getProjetos():Observable<any> {
    let id = JSON.parse(window.localStorage.getItem("session-userid"));
    let url = "http://kutovapp-api.herokuapp.com/api/projetos/do-usuario/"+id;
    return this.http.get(url).map(data => data.json());
  }

  criaProjeto(nome:string):Observable<any>{
    let body = {
      nome:nome,
      usuario:JSON.parse(window.localStorage.getItem("session-userid"))
    };
    return this.http.post("http://kutovapp-api.herokuapp.com/api/projetos/",body).map(
      data => data.json()
      );
  }

  apagaProjeto(id:string):Observable<any>{
   return this.http.delete("http://kutovapp-api.herokuapp.com/api/projetos/"+id).map(
      data => data.json()
      );
  }

  alterarProjeto(id:string,nome:string):Observable<any>{
    let body = {
      nome:nome
    }
     return this.http.put("http://kutovapp-api.herokuapp.com/api/projetos/"+id,body).map(
      data => data.json()
      );

  }

}
