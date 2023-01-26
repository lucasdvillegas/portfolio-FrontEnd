import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  Url = 'https://argprograma-backendldv.fly.dev/personas/';

  constructor(private http: HttpClient) { }

  public getPersona(): Observable<persona>{
    return this.http.get<persona>(this.Url + 'traer/perfil');
  }


  public update(id:number, pers: persona): Observable<any>{
    return this.http.put<any>(this.Url + `update/${id}`, pers);
  }
  
}
