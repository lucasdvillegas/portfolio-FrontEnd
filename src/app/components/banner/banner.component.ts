import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Observable } from 'rxjs';
import { Educacion } from 'src/app/model/educacion';
import { Experiencia } from 'src/app/model/experiencia';
import { persona } from 'src/app/model/persona.model';
import { EducacionService } from 'src/app/service/educacion.service';
import { ExperienciaServiceService } from 'src/app/service/experiencia-service.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';




@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  persona: persona = new persona("", "", "", "", "", "", "", "");
  experiencia: Experiencia;


  dataEdu$: Observable<string>;

  constructor(private personaService: PersonaService,
    private tokenService: TokenService,
    private experienciaService: ExperienciaServiceService,
    private educacionService: EducacionService
  ) { }


  isLogged = false;

  /* Variables para el uso de la clase Persona*/
  nombre: string = '';
  apellido: string = '';
  img: string = '';
  imgBack: string = '';
  titulo: string = '';
  ubicacion: string = '';
  gitLink: string = '';
  linLink: string = '';

  ngOnInit(): void {
    this.cargarExperiencia();
    this.cargarEducacion();
    this.personaService.getPersona().subscribe(data => {
      this.persona = data;
    })
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  /* Llamada a la educacion */
  edu: Educacion[] = [];
  nombreEducacion: string;
  cargarEducacion(): void {
    this.educacionService.lista().subscribe(
      data => {
        this.edu = data;
      })
  }

  /* Llamada a la experiencia laboral */
  expe: Experiencia[] = [];
  nombreE: string;
  cargarExperiencia(): void {
    this.experienciaService.lista().subscribe(
      data => {
        this.expe = data;
      })
  }

  /* Llamada a la educación */


  /* Función para recargar los datos traídos de los componentes edu y exp */



  /* Variables que van al modal */
  body: string = '';
  testModal?: Modal | undefined;
  deleteModal?: Modal | undefined;
  editModal?: Modal | undefined;

  openEdit() {
    var el_testModal = document.getElementById('editPersModal');
    var button = document.createElement('button');
    if (el_testModal) {
      this.testModal = new Modal(el_testModal, {
        keyboard: false
      });
    }
    this.testModal?.show();

  }

  update() {
    let id = 1;
    const personaActualizada = new persona(this.nombre, this.apellido, this.img, this.imgBack, this.titulo, this.ubicacion, this.gitLink, this.linLink);
    console.log(personaActualizada);
    this.personaService.update(id, personaActualizada).subscribe(
      data => {
        this.personaService.getPersona().subscribe(data => {
          this.persona = data;
        });
      }, err => {
        this.error();
      });
  }

   /* Modal para errores */
   error():void{
    var el_testModal = document.getElementById('errorBannerModal');
    var button =document.createElement('button');
    if (el_testModal ) {
      this.testModal= new Modal(el_testModal , {
        keyboard: false
      });
    }
    this.testModal?.show();
  }

}
