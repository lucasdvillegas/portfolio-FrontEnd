import { Component, OnInit } from '@angular/core';
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
  
  nombre:string;

  
  constructor(private personaService:PersonaService, private tokenService: TokenService) { }
  isLogged=false;
  

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data =>{ this.persona = data;
    })
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

}
