import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educa:Educacion[] = [];

  constructor(private  educacionService:EducacionService, private tokenService: TokenService){}

  isLogged=false;

  /* Variables para el uso de la clase Educacion*/ 
  valorLista?:number;
  nombreEducacion:string = '';
  descripcionEducacion:string = '';
  fechaIngreso:string='';
  fechaEgreso:string='';

  /* Variables que van al modal */
  body:string = '';
  testModal?: Modal | undefined;
  deleteModal?: Modal | undefined;
  editModal?: Modal | undefined;

  //atributos para editar
  edu:Educacion = null;

  ngOnInit(): void {
    this.cargarEducacion();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  cargarEducacion():void {
    this.educacionService.lista().subscribe(
      data=>{
        this.educa = data;
      }
    )
  }

  /*Abrir modal*/ 

  open() {
    var el_testModal = document.getElementById('eduModal');
    //var button =document.createElement('button');
    if (el_testModal ) {
      this.testModal= new Modal(el_testModal , {
        keyboard: false
      });
    }
    this.testModal?.show();
  }

  /* Guardar datos contenidos en el modal */
  save(){
    this.testModal.toggle();
    const educacion = new Educacion(this.nombreEducacion, this.descripcionEducacion, this.fechaIngreso, this.fechaEgreso);
    this.educacionService.save(educacion).subscribe(
      data=>{
        this.cargarEducacion();
      }, err =>{
        alert("No se pudo añadir");
      })
  }

    // ************************ Modal para BORRAR con el modal y su respectivo botón **************
    openDelete(id?:number) {
      this.valorLista=id;
      var el_testModal = document.getElementById('deleteModal');
      var button =document.createElement('button');
      if (el_testModal ) {
        this.testModal= new Modal(el_testModal , {
          keyboard: false
        });
      }
      this.testModal?.show();
    }
  
    delete(id?:number){
      if(id != undefined){
        this.educacionService.delete(id).subscribe(
          data=>{
            this.cargarEducacion();
          }, err=>{
            
        });
      }
      this.cargarEducacion();
    }
  
    //**********************Métodos para EDITAR con el modal y su botón respectivo ***********************
    openEdit(id?:number) {
      this.valorLista=id;
      var el_testModal = document.getElementById('editModal');
      var button =document.createElement('button');
      if (el_testModal ) {
        this.testModal= new Modal(el_testModal , {
          keyboard: false
        });
      }
      this.testModal?.show();
      // console.log(this.valorLista); Muestra el valor del ID que reciben los modals
    }
  
    update(id?:number){
      const educacionEditar = new Educacion(this.nombreEducacion, this.descripcionEducacion, this.fechaIngreso, this.fechaEgreso);
      this.educacionService.update(id, educacionEditar).subscribe(
        data =>{
          this.cargarEducacion();
        }, err=>{
            alert("La educacion que desea cargar/editar ya existe.");
        }
      )
    }

}
