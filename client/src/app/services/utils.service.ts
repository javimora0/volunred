import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import {RespuestaRegistro} from "../interfaces/auth";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  getUsuarioSession(token: any) : RespuestaRegistro{
    return jwtDecode(token)
  }
}