import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login, RegistroOrganizacion, RegistroVoluntario, RespuestaRegistro} from "../interfaces/auth";
import {env} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registro_voluntario(body: RegistroVoluntario): Observable<HttpResponse<RespuestaRegistro>> {
    return this.http.post<RespuestaRegistro>(env.URL + 'registro/voluntario', body, {observe: 'response' as 'response'})
  }

  registro_organizacion(body: RegistroOrganizacion): Observable<HttpResponse<RespuestaRegistro>>{
    return this.http.post<RespuestaRegistro>(env.URL + 'registro/organizacion', body, {observe: 'response' as 'response'})
  }

  login(body: Login): Observable<HttpResponse<RespuestaRegistro>> {
    return this.http.post<RespuestaRegistro>(env.URL + 'login', body, {observe: 'response' as 'response'})
  }

}
