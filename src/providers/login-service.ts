import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {

  public usuarioLogado : string;

  constructor(public http: Http) {
    this.usuarioLogado = "";
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

  memberinfo():Observable<any>{
    let token = JSON.parse(window.localStorage.getItem("session-token"));
    let headers = new Headers({ 'Authorization': token});
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://kutovapp-api.herokuapp.com/api/auth/memberinfo",options).map(
      data => data.json()
    )
  }

}
