import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaServiceService } from 'src/app/service/experiencia-service.service';
import { TokenService, } from 'src/app/service/token.service';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  expe:Experiencia[] = [];
  

  constructor(private  experienciaService:ExperienciaServiceService, private tokenService: TokenService){}
  body:string = 'hola mundo'
  testModal?: Modal | undefined;
  isLogger = false;

  valorLista?:number;
  nombreE:string = '';
  descripcionE:string = '';

 
  ngOnInit(): void {
    this.cargarExperiencia();
    if(this.tokenService.getToken()){
      this.isLogger = true;
    }else{
      this.isLogger = false;
    }

    
  }

 //agregar experiencia
  save(){
    this.testModal?.toggle();
    const experiencia = new Experiencia(this.nombreE, this.descripcionE);
    this.experienciaService.save(experiencia).subscribe(
      data=>{

        this.cargarExperiencia();
      }, err =>{
        alert("No se pudo añadir");
      })
  }

  //Abrir modal
  open() {
    var el_testModal = document.getElementById('testModal');
    var button =document.createElement('button');
    if (el_testModal ) {
      this.testModal= new Modal(el_testModal , {
        keyboard: false
      });
    }
    this.testModal?.show();
  }

  cargarExperiencia():void{
    this.experienciaService.lista().subscribe(data => {this.expe = data;})
  }


  //Lo que va al modal

  /*onCreate(){
    const experiencia = new Experiencia(this.nombreE, this.posicion);
    this.experienciaService.save(experiencia).subscribe(
      data=>{
        alert("Experiencia añadida");
        this.cargarExperiencia();
      }, err =>{
        alert("No se pudo añadir");
      })
  }**/





  mostrarId(id?:number){
    let objetoExperiencia;
    this.experienciaService.detail(id!).subscribe(data => {
      objetoExperiencia = data;
    });
  }

  openDelete(id?:number) {
    var el_testModal = document.getElementById('deleteModal');
    var button =document.createElement('button');
    if (el_testModal ) {
      this.testModal= new Modal(el_testModal , {
        keyboard: false
      });
    }
    this.testModal?.show();
    this.valorLista=id;
  }

  delete(id?:number){
    if(id != undefined){
      this.experienciaService.delete(id).subscribe(
        data=>{
          this.cargarExperiencia();
        }, err=>{
          
        }
      )
    }
    this.cargarExperiencia();
  }

}
