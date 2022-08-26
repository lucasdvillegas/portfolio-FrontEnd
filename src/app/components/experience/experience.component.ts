import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaServiceService } from 'src/app/service/experiencia-service.service';
import { TokenService, } from 'src/app/service/token.service';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  expe:Experiencia[] = [];
  

  constructor(private  experienciaService:ExperienciaServiceService, private tokenService: TokenService, public _router: Router, public _location:Location){}
  body:string = '';
  testModal?: Modal | undefined;
  deleteModal?: Modal | undefined;
  editModal?: Modal | undefined;
  isLogged = false;


  valorLista?:number;
  nombreE:string = '';
  descripcionE:string = '';
  fechaIngreso:string='';
  fechaEgreso:string='';

  //atributos para editar
  expLab:Experiencia = null;

 
  ngOnInit(): void {
    this.cargarExperiencia();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }

  }

 // ***************** Métodos para AGREGAR experiencia y su modal ***************************
  save(){
    this.testModal.toggle();
    const experiencia = new Experiencia(this.nombreE, this.descripcionE, this.fechaIngreso, this.fechaEgreso);
    this.experienciaService.save(experiencia).subscribe(
      data=>{
        this.cargarExperiencia();
        this.actualizarComponente();
      }, err =>{
        this.error();
      })
  }

  open() {
    var el_testModal = document.getElementById('testModal');
    //var button =document.createElement('button');
    if (el_testModal ) {
      this.testModal= new Modal(el_testModal , {
        keyboard: false
      });
    }
    this.testModal?.show();
  }

  //Carga y actualiza la lista de experiencia
  cargarExperiencia():void{
    this.experienciaService.lista().subscribe(data => {this.expe = data;})
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
      this.experienciaService.delete(id).subscribe(
        data=>{
          this.cargarExperiencia();
          this.actualizarComponente();
        }, err=>{
          
      });
    }
    this.cargarExperiencia();
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
    const experienciaEditar = new Experiencia(this.nombreE, this.descripcionE, this.fechaIngreso, this.fechaEgreso);
    this.experienciaService.update(id, experienciaEditar).subscribe(
      data =>{
        this.cargarExperiencia();
        this.actualizarComponente();
      }, err=>{
        this.error();
      }
    )
  }

  /* Modal para errores */
  error():void{
    var el_testModal = document.getElementById('errorModal');
    var button =document.createElement('button');
    if (el_testModal ) {
      this.testModal= new Modal(el_testModal , {
        keyboard: false
      });
    }
    this.testModal?.show();
  }

  actualizarComponente():void{
    this._router.navigateByUrl("/bannerComponent", {skipLocationChange:true}).then(()=>{
      this._router.navigate([decodeURI(this._location.path())]);
    });
  }


 
}
