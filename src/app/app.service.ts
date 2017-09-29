import { Injectable } from '@angular/core';
import { Noticia } from './noticia';

@Injectable()
export class  AppService{
  nome: string;
  version: number;  
  store: string;

  construct(){
    this.nome = "db"; 
    this.version = 2;
    this.store = "noticias";
  }

  listarNoticias(){
    var noticias = new Array(); 
    try{
      if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        return;
      }
      var conn = window.indexedDB.open("db", 2);
      conn.onerror = function(event) {
        console.log("Database error: " + event.target);
      };

      conn.onsuccess = function(event) {
        var db =  conn.result;
        console.log(db);
        var transaction = db.transaction(["noticias"], "readonly");
        var objectStore = transaction.objectStore("noticias");
        var request = objectStore.openCursor(); 

        request.onsuccess = function(evt){
          var cursor = request.result; 
          if(cursor){
            var registro = cursor.value;
            console.log(registro);
            noticias.push(registro);
            cursor.continue(); 
          }
        }

      }
    }catch(err){
      console.log(err);    
    } 
    return noticias;
  }

  cadastrar(noticia: Noticia){
    console.log(noticia);

   try{
    if (!window.indexedDB) {
      console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
      return;
    }
    var conn = window.indexedDB.open("db", 2);
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
    };

    conn.onsuccess = function(event) {
       var db =  conn.result;
       console.log(db);
       var transaction = db.transaction(["noticias"], "readwrite");
       var objectStore = transaction.objectStore("noticias"); 
       console.log(objectStore);
       console.log(noticia);

       transaction.oncomplete = function(evt){
         console.log("Transação preparada com sucesso"); 
       } 

       transaction.onerror = function(evt){
        
       } 

       if(!noticia.hasOwnProperty("id")){
         var inc = objectStore.add(noticia);
         inc.onsuccess = function(evt){
           console.log("Noticia incluida com sucesso");  
         }
       }else{
        
       }
    };
   }catch(err){console.log(err);}
  }

  excluirNoticia(noticia: Noticia){
   try{
     if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        return false;
     }

     var conn = window.indexedDB.open("db", 2);

     conn.onerror = function(event) {
       console.log("Database error: " + event.target);
     };

     conn.onsuccess = function(event) {
      var db =  conn.result;
      console.log(db);
      var transaction = db.transaction(["noticias"], "readwrite");
      var objectStore = transaction.objectStore("noticias");
      var request = objectStore.delete(noticia.id);
      return true; 
    }

   }catch(err){
     return false; 
   }
  }

  consultarNoticia(id: string){
   var saida = new Array();
   try{
     
     if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        return; 
     }

     var conn = window.indexedDB.open("db", 2);

     conn.onerror = function(event) {
       console.log("Database error: " + event.target);
     };

     conn.onsuccess = function(event) {
      var db =  conn.result;
      console.log(db);
      var transaction = db.transaction(["noticias"], "readonly");
      var objectStore = transaction.objectStore("noticias");


      var request = objectStore.get(id);

      request.onsuccess = function(evt){
        console.log(request.result);
        saida.push(request.result); 
        console.log(saida);
      }

    }
   }catch(err){
     console.log(err);
   }
   console.log(saida);
   return saida;
  }

}
