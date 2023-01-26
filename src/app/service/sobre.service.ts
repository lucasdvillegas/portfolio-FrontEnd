import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sobre } from '../model/sobre';

@Injectable({
  providedIn: 'root'
})
export class SobreService {
  sobreUrl = "https://argprograma-backendldv.fly.dev/sobre/";
  
  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<Sobre[]>{
    return this.httpClient.get<Sobre[]>(this.sobreUrl + 'lista');
  }

  public detail(id: number): Observable<Sobre>{
    return this.httpClient.get<Sobre>(this.sobreUrl + `traer/${id}`);
  }

  public save(sobre: Sobre):Observable<any>{
    return this.httpClient.post<any>(this.sobreUrl + 'create', sobre);
  }

  public update(sobre: Sobre): Observable<any>{
    return this.httpClient.put<any>(this.sobreUrl + `update/${sobre.id}`, sobre);
  }

  

}
