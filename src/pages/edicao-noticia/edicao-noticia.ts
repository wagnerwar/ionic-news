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
     var id = navParams.get('id');
     this.getNoticia(id);
   }catch(err){
     console.log(err); 
   }
  }

  getNoticia(id){
    try{
     var db = new AppService();
     this.noticia = db.consultarNoticia(id)[0];
     console.log(this.noticia);
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
}
