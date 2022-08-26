import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';
import { Modal } from 'bootstrap';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educa: Educacion[] = [];

  constructor(private educacionService: EducacionService, private tokenService: TokenService, public _router: Router, public _location: Location) { }

  isLogged = false;

  /* Variables para el uso de la clase Educacion*/
  nombreEducacion: string = '';
  descripcionEducacion: string = '';
  fechaIngreso: string = '';
  fechaEgreso: string = '';

  /* Comunicación entre componentes  */



  /* Variables que van al modal */
  valorEducacion?: number;
  body: string = '';
  testModal?: Modal | undefined;
  deleteModal?: Modal | undefined;
  editModal?: Modal | undefined;

  //atributos para editar
  edu: Educacion = null;

  ngOnInit(): void {
    this.cargarEducacion();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }


  /* Trae la lista de educaciones */

  cargarEducacion(): void {
    this.educacionService.lista().subscribe(
      data => {
        this.educa = data;
      }
    )
  }

  /*Abrir modal*/

  open() {
    var el_testModal = document.getElementById('eduModal');
    if (el_testModal) {
      this.testModal = new Modal(el_testModal, {
        keyboard: false
      });
    }
    this.testModal?.show();
  }

  /* Guardar datos contenidos en el modal */
  nombreEducacionString: string;
  save() {
    this.testModal.toggle();
    const educacion = new Educacion(this.nombreEducacion, this.descripcionEducacion, this.fechaIngreso, this.fechaEgreso);
    this.nombreEducacionString = this.nombreEducacion;
    this.educacionService.save(educacion).subscribe(
      data => {
        this.cargarEducacion();
        this.actualizarComponente();
      }, err => {
        this.error();
      });
  }

  // ************************ Abre modal para consultar la eliminación **************
  openDelete(id?: number) {
    this.valorEducacion = id;
    var el_testModal = document.getElementById('deleteEduModal');
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
      this.educacionService.delete(id).subscribe(
        data => {
          this.cargarEducacion();
          this.actualizarComponente();
        }, err => {

        });
    }
    this.cargarEducacion();
  }

  //**********************Métodos para EDITAR con el modal y su botón respectivo ***********************
  openEdit(id?: number) {
    this.valorEducacion = id;
    var el_testModal = document.getElementById('editEduModal');
    var button = document.createElement('button');
    if (el_testModal) {
      this.testModal = new Modal(el_testModal, {
        keyboard: false
      });
    }
    this.testModal?.show();

  }

  update(id?: number) {
    const educacionEditar = new Educacion(this.nombreEducacion, this.descripcionEducacion, this.fechaIngreso, this.fechaEgreso);
    this.educacionService.update(id, educacionEditar).subscribe(
      data => {
        this.cargarEducacion();
        this.actualizarComponente();
      }, err => {
        this.error();
      });
  }

  /* Modal para errores */
  error(): void {
    var el_testModal = document.getElementById('errorEduModal');
    var button = document.createElement('button');
    if (el_testModal) {
      this.testModal = new Modal(el_testModal, {
        keyboard: false
      });
    }
    this.testModal?.show();
  }

  actualizarComponente(): void {
    this._router.navigateByUrl("/bannerComponent", { skipLocationChange: true }).then(() => {
      this._router.navigate([decodeURI(this._location.path())]);
    });
  }

}
