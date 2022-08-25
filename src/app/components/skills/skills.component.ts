import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Habilidad } from 'src/app/model/habilidad';
import { HabilidadService } from 'src/app/service/habilidad.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  /* Variables para el uso de la clase Habilidad*/
  habi: Habilidad[] = [];

  nombreHabilidad: string;
  progresoHabilidad: number;
  typeHabilidad: string;


  skillUser: any;
  constructor(private habilidadService: HabilidadService, private tokenService: TokenService) { }
  isLogged = false;




  /* Variables que van al modal */
  valorHabilidad?: number;
  body: string = '';
  testModal?: Modal | undefined;
  deleteModal?: Modal | undefined;
  editModal?: Modal | undefined;


  ngOnInit(): void {
    this.cargarHabilidad();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }


  }

  cargarHabilidad() {
    this.habilidadService.lista().subscribe(
      data => {
        this.habi = data;
      }
    )
  }

  open() {
    var el_testModal = document.getElementById('skillModal');
    if (el_testModal) {
      this.testModal = new Modal(el_testModal, {
        keyboard: false
      });
    }
    this.testModal?.show();
  }

  //Selecciona la habilidad en base al valor otorgado en el formulario
  seleccionado(id: string) {
    switch (id) {
      case "0":
        this.typeHabilidad = "../assets/icons/html-5.png";
        this.nombreHabilidad = "HTML";
        break;
      case "1":
        this.typeHabilidad = "../assets/icons/css-3.png";
        this.nombreHabilidad = "CSS";
        break;
      case "2":
        this.typeHabilidad = "../assets/icons/java-script.png";
        this.nombreHabilidad = "JavaScript";
        break;
      case "3":
        this.typeHabilidad = "../assets/icons/bootstrap.png";
        this.nombreHabilidad = "Bootstrap";
        break;
      case "4":
        this.typeHabilidad = "../assets/icons/angular.png";
        this.nombreHabilidad = "Angular";
        break;
      case "5":
        this.typeHabilidad = "../assets/icons/java.png";
        this.nombreHabilidad = "Java";
        break;
      case "6":
        this.typeHabilidad = "../assets/icons/spring.png";
        this.nombreHabilidad = "Spring";
        break;
      case "7":
        this.typeHabilidad = "../assets/icons/typescript.png";
        this.nombreHabilidad = "TypeScript";
        break;
      default:
        alert("Selecciona una habilidad");
        break;
    }
  }


  progreso: number;
  submit() {
    //toma el valor de la lista desplegable 
    var valorSeleccionado = (<HTMLInputElement>document.getElementById("skillOption")).value;
  
    //envia el valor a la funcion switch para setear los cambios 
    this.seleccionado(valorSeleccionado); //Muestra la id o el valor de la habilidad seleccionada
    
    //obtenemos el valor del progreso y lo convertimos a integer
    this.progresoHabilidad = parseInt((<HTMLInputElement>document.getElementById("progresoVar")).value);
  


    const nuevaHabilidad = new Habilidad(this.nombreHabilidad, this.progresoHabilidad, this.typeHabilidad);
    this.habilidadService.save(nuevaHabilidad).subscribe(
      data => {
        console.log("Se cargó correctamente");
        this.cargarHabilidad();
      }, err => {
        alert("No puede seleccionar la misma habilidad más de una vez");
      }
    )
  }

  openDelete(id?: number) {
    this.valorHabilidad = id;
    var el_testModal = document.getElementById('deleteHabModal');
    var button = document.createElement('button');
    if (el_testModal) {
      this.testModal = new Modal(el_testModal, {
        keyboard: false
      });
    }
    this.testModal?.show();
  }

  delete(id?: number) {
    if (id != undefined) {
      this.habilidadService.delete(id).subscribe(
        data => {
          this.cargarHabilidad();
        }, err => {

        });
    }
    this.cargarHabilidad();
  }

  openEdit(id?:number) {
    this.valorHabilidad=id;
    var el_testModal = document.getElementById('skillEditModal');
    var button =document.createElement('button');
    if (el_testModal ) {
      this.testModal= new Modal(el_testModal , {
        keyboard: false
      });
    }
    this.testModal?.show();
  }

  update(id?:number){
    //toma el valor de la lista desplegable 
    var valorSeleccionado = (<HTMLInputElement>document.getElementById("skillEditOption")).value;
  
    //envia el valor a la funcion switch para setear los cambios 
    this.seleccionado(valorSeleccionado); 

    //obtenemos el valor del progreso y lo convertimos a integer
    this.progresoHabilidad = parseInt((<HTMLInputElement>document.getElementById("editProgreso")).value);

    const nuevaHabilidad = new Habilidad(this.nombreHabilidad, this.progresoHabilidad, this.typeHabilidad);
    this.habilidadService.update(id, nuevaHabilidad).subscribe(
      data => {
        this.cargarHabilidad();
      }, err => {
        alert("No puedes cambiar de habilidad, sólo su progreso. Si deseas cambiar de hablidad, deberás crear una nueva.");
      }
    )
  }

}
