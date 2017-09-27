import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Noticia } from '../../app/noticia';
import { AlertController } from 'ionic-angular';
import { NoticiasPage } from '../noticias/noticias';
import { AppService } from '../../app/app.service';



@Component({
  selector: 'criacao-noticia',
  templateUrl: 'criacao-noticia.html'
})

export class CriacaoNoticiaPage {
  //@Output() close = new EventEmitter();
  noticia: Noticia;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
   this.noticia = new Noticia();
  }

  cadastrar(noticia: Noticia,  event: any){
    try{
      var db = new AppService();       
      db.cadastrar(noticia);
    }catch(err){
      console.log(err); 
    }
    this.showAlert(); 
    this.navCtrl.pop(); 
  }

  showAlert() {
    let alert = this.alertCtrl.create({
    title: 'Parabéns!',
    subTitle: 'Cadastro realizado com sucesso!',
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
