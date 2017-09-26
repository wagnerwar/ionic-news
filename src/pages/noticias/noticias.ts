import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Noticia } from '../../app/noticia';
import { CriacaoNoticiaPage } from '../criacao-noticia/criacao-noticia';

@Component({
  selector: 'noticias',
  templateUrl: 'noticias.html'
})
export class NoticiasPage {

  constructor(public navCtrl: NavController) {

  }

  cadastrar(){
    this.navCtrl.push(CriacaoNoticiaPage);
  
  }
}
