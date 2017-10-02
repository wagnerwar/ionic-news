import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Noticia } from '../../app/noticia';
import { AlertController } from 'ionic-angular';
import { NoticiasPage } from '../noticias/noticias';
import { AppService } from '../../app/app.service';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'edicao-noticia',
  templateUrl: 'edicao-noticia.html'
})

export class EdicaoNoticiaPage {
  //@Output() close = new EventEmitter();
  noticia = new Noticia();

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams ) {
   try{
     var noticia = navParams.get('noticia');
     this.getNoticia(noticia);
   }catch(err){
     console.log(err); 
   }
  }

  getNoticia(noticia){
    try{
     this.noticia = noticia;
   }catch(err){
     console.log(err);
   }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
    title: 'Parabéns!',
    subTitle: 'Cadastro atualizado com sucesso!',
    buttons: ['OK']
    });
    alert.present();
  }

  showAlertErro() {
    let alert = this.alertCtrl.create({
    title: 'ERROU!',
    subTitle: 'Chama o Desenvolvedor!',
    buttons: ['OK']
    });
    alert.present();
  }

  atualizar(noticia: Noticia){
    console.log(noticia); 
    try{
      var db = new AppService();
      db.editarNoticia(noticia);       
      this.showAlert(); 
      this.navCtrl.push(NoticiasPage);
    }catch(err){
      console.log(err); 
      this.showAlertErro();
    }
  }

}
