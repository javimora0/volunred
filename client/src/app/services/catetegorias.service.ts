import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../environments/environment.development";
import {Categorias} from "../interfaces/categorias";

@Injectable({
  providedIn: 'root'
})
export class CatetegoriasService {

  constructor(private http: HttpClient) { }

  get_categorias(): Observable<HttpResponse<Categorias>> {
    return this.http.get<Categorias>(env.URL + 'categoria', {observe: 'response' as 'response'})
  }
}
