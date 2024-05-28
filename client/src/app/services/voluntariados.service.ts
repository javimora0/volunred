import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../environments/environment.development";
import {Voluntariados} from "../interfaces/voluntariados";

@Injectable({
  providedIn: 'root'
})
export class VoluntariadosService {

  constructor(private http: HttpClient) {}

  get_recomendaciones(id_voluntario: number | undefined): Observable<HttpResponse<Voluntariados>> {
    return this.http.get<Voluntariados>(env.URL + `voluntariado/recomendaciones/${id_voluntario} `, {
      observe: 'response' as 'response',
      params: {auth: 1}
    })
  }

  get_recomendaciones_automaticas(id_voluntario: number | undefined): Observable<HttpResponse<Voluntariados>> {
    return this.http.get<Voluntariados>(env.URL + `voluntariado/recomendaciones/automaticas/${id_voluntario} `, {
      observe: 'response' as 'response',
      params: {auth: 1}
    })
  }
}