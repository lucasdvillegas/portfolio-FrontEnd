import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { persona } from 'src/app/model/persona.model';
import { Sobre } from 'src/app/model/sobre';
import { SobreService } from 'src/app/service/sobre.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  //persona:persona = new persona("", "", "");
  datosCargados:boolean = false;
  sobreItem?:Sobre;

  constructor(private  sobreService:SobreService, private tokenService: TokenService){}
  isLogged=false;

  valorSobre:number;
  body:string = '';
  testModal?: Modal | undefined;
  deleteModal?: Modal | undefined;
  editModal?: Modal | undefined;
  

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
    this.cargarSobre();
  }

  cargarSobre():void {
    this.sobreService.detail(1).subscribe(
      data=>{
        this.sobreItem = data;
        this.datosCargados = true;
      }
    ) 
  }

  open() {
    var el_testModal = document.getElementById('editSobreModal');
    if (el_testModal ) {
      this.testModal= new Modal(el_testModal , {
        keyboard: false
      });
    }
    this.testModal?.show();
  }

  update(){
    this.testModal.toggle();
    const sobreUpdate = this.sobreItem;
    this.sobreService.update(sobreUpdate).subscribe(
      data=>{
        this.cargarSobre();
      }, err =>{
  
    })
  }
}
