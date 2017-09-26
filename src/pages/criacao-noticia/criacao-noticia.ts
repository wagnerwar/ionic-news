import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Noticia } from '../../app/noticia';

@Component({
  selector: 'criacao-noticia',
  templateUrl: 'criacao-noticia.html'
})

export class CriacaoNoticiaPage {
  //@Output() close = new EventEmitter();
  noticia = new Noticia();
  constructor(public navCtrl: NavController) {

  }

}
