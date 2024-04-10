import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {RegistroVoluntario, RespuestaRegistro} from "../interfaces/auth";
import {Observable} from "rxjs";
import {env} from "../../environments/environment.development";
import {Entradas} from "../interfaces/entradas";

@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  constructor(private http: HttpClient) {
  }

  get_entrada_hazte_voluntario(): Observable<HttpResponse<Entradas>> {
    return this.http.get<Entradas>(env.URL + 'entradas/hazte_voluntario', {observe: 'response' as 'response'})
  }
}
