import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  Url = 'http://localhost:8080/educacion';

  constructor(private httpClient: HttpClient) { }

  public lista():Observable<Educacion[]>{
    return this.httpClient.get<Educacion[]>(this.Url + 'lista');
  }

  public detail(id:number):Observable<Educacion>{
    return this.httpClient.get<Educacion>(this.Url + `details/${id}`);
  }

  public save(educacion: Educacion):Observable<any>{
    return this.httpClient.post<any>(this.Url + 'create', educacion);
  }

  public update(id: number, educacion:Educacion):Observable<any>{
    return this.httpClient.put<any>(this.Url + `update/${id}`, educacion);
  }

  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.Url + `delete/${id}`);
  }

}
