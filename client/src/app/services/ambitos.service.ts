import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../environments/environment.development";
import {AmbitosProfesionales} from "../interfaces/ambitos";

@Injectable({
  providedIn: 'root'
})
export class AmbitosService {

  constructor(private http: HttpClient) { }
  get_ambitos(): Observable<HttpResponse<AmbitosProfesionales>> {
    return this.http.get<AmbitosProfesionales>(env.URL + 'ambitos', {observe: 'response' as 'response'})
  }

  asignar_ambito(id_usuario: number | undefined, body:any): Observable<HttpResponse<any>> {
    return this.http.post<any>(env.URL + `ambitos/${id_usuario}`, body,{observe: 'response' as 'response'})
  }
}
