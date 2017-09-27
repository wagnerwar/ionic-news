import { Injectable } from '@angular/core';
import { Noticia } from './noticia';

@Injectable()
export class  AppService{
  nome: string;
  version: number;  
  store: string;
  construct(){
    this.nome = "db1"; 
    this.version = 2;
    this.store = "noticias";
  }

  conexao(){
    if (!window.indexedDB) {
      console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
      return;
    }
    var request = window.indexedDB.open(this.nome, this.version);
    return request;
  } 

  cadastrar(noticia: Noticia){
    console.log(noticia);

   try{
    if (!window.indexedDB) {
      console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
      return;
    }
    var conn = window.indexedDB.open("db1", 1);
    conn.onerror = function(event) {
       console.log("Database error: " + event.target);
    };

    conn.onupgradeneeded = function(event) {
      var db = conn.result;
      console.log(db);
      var objectStore = db.createObjectStore("noticias", { keyPath: "id", autoIncrement: true });
      objectStore.createIndex("nome", "name", { unique: false });
      objectStore.createIndex("descricao", "descricao", { unique: false });
      console.log("Criação da estrutura feita com sucesso");
      var transaction = db.transaction(["noticias"], "readwrite");
      var objectStore = transaction.objectStore("noticias");
      console.log(noticia);
      console.log(objectStore);
    };

    conn.onsuccess = function(event) {
       var db =  conn.result;
       console.log(db);
       var transaction = db.transaction(["noticias"], "readwrite");
       var objectStore = transaction.objectStore("noticias"); 
       console.log(objectStore);
 
        /*if(noticia.id == null){
            var inc = objectStore.Add(noticia);
            inc.onsuccess = function(evt){
               console.log("Noticia incluida com sucesso");  
            }
         }else{
        
         }
         */
    };
   }catch(err){console.log(err);}
  }
}
