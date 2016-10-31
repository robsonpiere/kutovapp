import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {

  constructor(public http: Http) {
    
  }

  efetuarLogin(usuario : string, senha:string):Observable<any>{
    let body = {email:usuario,senha:senha};
      return this.http.post("http://kutovapp-api.herokuapp.com/api/external/login",body).map(
        data => data.json())
  }

  cadastrarUsuario(nome:string,email:string,senha :string,):Observable<any>{
    let body ={nome:nome,email:email,senha:senha};
    return this.http.post("http://kutovapp-api.herokuapp.com/api/usuarios",body).map(
      data => data.json()
    )
  }

}
