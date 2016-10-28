import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProjetoService {

  constructor(public http: Http) {

  }

  teste():Observable<any> {
    return this.http.get("https://randomuser.me/api/?nat=br").map(data => data.json());
  }

}
