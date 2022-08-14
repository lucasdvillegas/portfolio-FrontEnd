import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  proyec: Proyecto[] = [];

  constructor(private proyectoService: ProyectoService, private tokenService: TokenService) { }

  isLogged = false;

  /* Variables para el uso de la clase Educacion*/
  public nombreProyecto: string = '';
  descripcionProyecto: string = '';
  imagenProyecto: string = '';
  linkProyecto: string = '';

  /* Variables que van al modal */
  valorProyecto?: number;
  body: string = '';
  testModal?: Modal | undefined;
  deleteModal?: Modal | undefined;
  editModal?: Modal | undefined;

  ngOnInit(): void {
    this.cargarProyecto();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  cargarProyecto():void{
    this.proyectoService.lista().subscribe(
      data=>{
        this.proyec = data;
      }
    )
  }

  open() {
    var el_testModal = document.getElementById('proyModal');
    if (el_testModal ) {
      this.testModal= new Modal(el_testModal , {
        keyboard: false
      });
    }
    this.testModal?.show();
  }

  save(){
    this.testModal.toggle();
    const proyecto = new Proyecto(this.nombreProyecto, this.descripcionProyecto, this.imagenProyecto, this.linkProyecto);
    this.proyectoService.save(proyecto).subscribe(
      data=>{
        this.cargarProyecto();
      }, err =>{
        alert("No se pudo añadir");
      })
  }

}
