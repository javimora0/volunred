import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entradas} from "../interfaces/entradas";
import {env} from "../../environments/environment.development";
import {DerechosDeberes} from "../interfaces/derechos-deberes";

@Injectable({
  providedIn: 'root'
})
export class DerechosDeberesService {

  constructor(private http: HttpClient) {
  }

  get_derechos(): Observable<HttpResponse<DerechosDeberes>> {
    return this.http.get<DerechosDeberes>(env.URL + 'derechos_deberes/derechos', {observe: 'response' as 'response'})
  }
  get_deberes(): Observable<HttpResponse<DerechosDeberes>> {
    return this.http.get<DerechosDeberes>(env.URL + 'derechos_deberes/deberes', {observe: 'response' as 'response'})
  }
}
