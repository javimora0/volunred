import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../environments/environment.development";
import {Voluntario} from "../interfaces/usuario";
import {Form} from "@angular/forms";
import {Solicitudes} from "../interfaces/solicitudes";
import {Solicitud_Organizacion, Solicitudes_Organizacion} from "../interfaces/solicitudes-organizacion";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  put_usuario(id_usuario: number, body: Voluntario): Observable<HttpResponse<any>> {
    return this.http.put<any>(env.URL + `usuario/${id_usuario}`, body, {
      observe: 'response' as 'response',
      params: {auth: 1}
    })
  }

  put_password(id_usuario: number, body: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(env.URL + `usuario/change_password/${id_usuario}`, body, {
      observe: 'response' as 'response',
      params: {auth: 1}
    })
  }

  put_imagen(id_usuario: number, body: FormData): Observable<HttpResponse<any>> {
    return this.http.put<any>(env.URL + `usuario/imagen/${id_usuario}`, body, {
      observe: 'response' as 'response',
      params: {auth: 1, image: 1}
    })
  }

  post_preferencias(body: any, id_voluntario: number | undefined): Observable<HttpResponse<any>> {
    return this.http.post<any>(env.URL + `usuario/preferencias/${id_voluntario}`, body, {
      observe: 'response' as 'response',
      params: {auth: 1}
    })
  }

  get_solicitudes(id_usuario: number | undefined): Observable<HttpResponse<Solicitudes>> {
    return this.http.get<Solicitudes>(env.URL + `usuario/solicitudes/${id_usuario}`, {
      observe: 'response' as 'response',
      params: {auth: 1}
    })
  }
  get_solicitudes_organizacion(id_usuario: number | undefined): Observable<HttpResponse<Solicitudes_Organizacion>> {
    return this.http.get<Solicitudes_Organizacion>(env.URL + `usuario/organizacion/solicitudes/${id_usuario}`, {
      observe: 'response' as 'response',
      params: {auth: 1}
    })
  }
  get_solicitud(id_solicitud: number | undefined): Observable<HttpResponse<Solicitudes_Organizacion>> {
    return this.http.get<Solicitudes_Organizacion>(env.URL + `usuario/organizacion/solicitud/${id_solicitud}`, {
      observe: 'response' as 'response',
      params: {auth: 1}
    })
  }
  responder_solicitud(body: any,id_solicitud: number | undefined): Observable<HttpResponse<any>> {
    return this.http.post<any>(env.URL + `usuario/organizacion/solicitud/respuesta/${id_solicitud}`, body,{
      observe: 'response' as 'response',
      params: {auth: 1}
    })
  }
}
