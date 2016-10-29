import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProjetoService {

  constructor(public http: Http) {

  }

  getProjetos():Observable<any> {
    return this.http.get("http://kutovapp-api.herokuapp.com/api/projetos").map(data => data.json());
  }

}
