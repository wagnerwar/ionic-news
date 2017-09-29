import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Noticia } from '../../app/noticia';
import { CriacaoNoticiaPage } from '../criacao-noticia/criacao-noticia';
import { AppService } from '../../app/app.service';
import { AlertController } from 'ionic-angular';
import { EdicaoNoticiaPage } from '../edicao-noticia/edicao-noticia';

@Component({
  selector: 'noticias',
  templateUrl: 'noticias.html'
})

export class NoticiasPage {
  noticias = new Array();

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
     this.listarNoticias();
  }

  cadastrar(){
    this.navCtrl.push(CriacaoNoticiaPage);
  }

  listarNoticias(){
    try{
      var db = new AppService();
      this.noticias = db.listarNoticias();
    }catch(err){
      console.log(err); 
    }
  }

  excluirNoticia(noticia: Noticia,  event: any){
    try{
      console.log(noticia);
      var db = new AppService();
      var retorno = db.excluirNoticia(noticia);
      this.exibeMensagem("Noticia excluida com sucesso"); 
      this.noticias = db.listarNoticias();
    }catch(err){
      this.exibeMensagem("Erro ao excluir noticia");
      console.log(err);
    }  
  }

  editarNoticia(noticia: Noticia,  event: any){
    this.navCtrl.push(EdicaoNoticiaPage,{ id: noticia.id}); 
  }

  exibeMensagem(msg: string){
    const alert = this.alertCtrl.create({
      title: 'AVISO',
      subTitle: msg,
      buttons: ['OK']
  });
    alert.present();
  }
}
