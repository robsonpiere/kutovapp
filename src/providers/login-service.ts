import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {

  public usuarioLogado : string;
  public emailUsuario : string;
  public fotoLogado: string;

  constructor(public http: Http) {
    this.usuarioLogado = "";
    this.emailUsuario = "";
  }

  efetuarLogin(usuario : string, senha:string):Observable<any>{
    let body = {email:usuario,senha:senha};
      return this.http.post("http://kutovapp-api.herokuapp.com/api/external/login",body).map(
        data => data.json())
  }

  cadastrarUsuario(nome:string,email:string,senha :string,foto:string):Observable<any>{
    let body ={nome:nome,email:email,senha:senha,foto:foto};
    return this.http.post("http://kutovapp-api.herokuapp.com/api/usuarios",body).map(
      data => data.json()
    )
  }

  getUsuariologado():Observable<any>{
    let id = JSON.parse(window.localStorage.getItem("session-userid"));
        return this.http.get("http://kutovapp-api.herokuapp.com/api/usuarios/"+id).map(
          data => data.json()
        )
  }

  alterarFoto(foto:string,id:string):Observable<any>{
      let body = {foto:foto};
      return this.http.put("http://kutovapp-api.herokuapp.com/api/usuarios/"+id,body).map(
        data => data.json()
      )
  }

  memberinfo():Observable<any>{
    let token = JSON.parse(window.localStorage.getItem("session-token"));
    let headers = new Headers({ 'Authorization': token});
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://kutovapp-api.herokuapp.com/api/auth/memberinfo",{},options).map(
      data => data.json()
    )
  }

}
