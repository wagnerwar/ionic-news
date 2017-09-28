import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Noticia } from '../../app/noticia';
import { CriacaoNoticiaPage } from '../criacao-noticia/criacao-noticia';
import { AppService } from '../../app/app.service';

@Component({
  selector: 'noticias',
  templateUrl: 'noticias.html'
})

export class NoticiasPage {
  noticias = new Array<Noticia>[];
  constructor(public navCtrl: NavController) {
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
}
