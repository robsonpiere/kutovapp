import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProjetoService {

  constructor(public http: Http) {

  }

  getProjetos():Observable<any> {
    let id = JSON.parse(window.localStorage.getItem("session-userid"));
    let url = "http://kutovapp-api.herokuapp.com/api/projetos/do-usuario/"+id;
    console.log(url);
    return this.http.get(url).map(data => data.json());
  }

}
