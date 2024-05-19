import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../environments/environment.development";
import {Voluntario} from "../interfaces/usuario";
import {Form} from "@angular/forms";

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
}
