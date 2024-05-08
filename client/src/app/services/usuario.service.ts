import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../environments/environment.development";
import {Voluntario} from "../interfaces/usuario";

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
}
