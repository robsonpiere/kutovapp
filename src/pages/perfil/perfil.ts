import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import {LoginService } from '../../providers/login-service';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class Perfil {

  public base64Image: string;



  constructor(public navCtrl: NavController, 
  public loginserv:LoginService,
  public alertCtrl :AlertController,
  private loadingCtrl : LoadingController
  
  ) {
    this.base64Image = this.loginserv.fotoLogado;

  }

  ionViewDidLoad() {
   
  }


  tirarFoto(){

    Camera.getPicture({
            quality : 50,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.base64Image = "data:image/jpeg;base64," + imageData;
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));            
            this.mensagem("Oops", JSON.stringify(error) + " - Você está em um dispostivo móvel ?");
        });
  }

  salvarFoto(){
    let loader = this.loadingCtrl.create({
          content: "Alterando foto",
      });
      loader.present();
    let id = JSON.parse(window.localStorage.getItem("session-userid")); 
    this.loginserv.alterarFoto(this.base64Image,id).subscribe(
      any => {
        loader.dismiss();
          this.mensagem("Resposta",any.message);
          this.loginserv.usuarioLogado = any.usuario.nome;
          this.loginserv.emailUsuario = any.usuario.email;
          this.loginserv.fotoLogado = any.usuario.foto;
          this.base64Image = any.usuario.foto;
        }, 
    )
  }

  mensagem(titulo:string,subtitulo:string){
        let alert = this.alertCtrl.create({
        title: titulo,
        subTitle: subtitulo,
        buttons: ["Fechar"]
        });
        alert.present();
    }

}
