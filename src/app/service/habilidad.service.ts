import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../model/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  urlHabilidad = 'https://argprograma-backendldv.fly.dev/habilidad/';

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<Habilidad[]>{
    return this.httpClient.get<Habilidad[]>(this.urlHabilidad + 'lista');
  }

  public detail(id: number): Observable<Habilidad>{
    return this.httpClient.get<Habilidad>(this.urlHabilidad + `detail/${id}`);
  }

  public save(habilidad: Habilidad):Observable<any>{
    return this.httpClient.post<any>(this.urlHabilidad + 'create', habilidad);
  }

  public update(id:number, habilidad: Habilidad): Observable<any>{
    return this.httpClient.put<any>(this.urlHabilidad + `update/${id}`, habilidad);
  }

  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.urlHabilidad + `delete/${id}`);
  }
}

