import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Experiencia } from 'src/app/model/experiencia';
import { persona } from 'src/app/model/persona.model';
import { ExperienciaServiceService } from 'src/app/service/experiencia-service.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import { ExperienceComponent } from '../experience/experience.component';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  persona:persona = new persona("", "", "");
  experiencia:Experiencia;
  

  
  constructor(private personaService:PersonaService, private tokenService: TokenService) { }
  isLogged=false;
  
   /* Variables para el uso de la clase Persona*/ 
  nombre:string = '';
  apellido:string= '';
  img:string= '';

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data =>{ this.persona = data;
    })
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  /* Variables que van al modal */
  body:string = '';
  testModal?: Modal | undefined;
  deleteModal?: Modal | undefined;
  editModal?: Modal | undefined;

  openEdit() {
    var el_testModal = document.getElementById('editPersModal');
    var button =document.createElement('button');
    if (el_testModal ) {
      this.testModal= new Modal(el_testModal , {
        keyboard: false
      });
    }
    this.testModal?.show();
     
  }

  update(){
    let id = 1;
    const personaActualizada = new persona(this.nombre, this.apellido, this.img);
    console.log(personaActualizada);
    this.personaService.update(id, personaActualizada).subscribe(
      data =>{
        this.personaService.getPersona().subscribe(data =>{ this.persona = data;
        });
      }, err=>{
          alert("No se pudo guardar los datos");
      });
  }
}
