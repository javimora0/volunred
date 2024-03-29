import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  baseURL = "https://restcountries.com/v3.1/all"
  constructor(private http: HttpClient) { }
  get_paises() :Observable<HttpResponse<any>> {
    return this.http.get<any>(this.baseURL,{observe:'response' as 'response'})
  }
}
