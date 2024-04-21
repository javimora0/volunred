import {Component, OnInit} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {UtilsService} from "../../services/utils.service";
import {RespuestaRegistro} from "../../interfaces/auth";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatButton,
    RouterLink,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  usuario: RespuestaRegistro | null | undefined
  is_login = false
  is_admin = false
  is_voluntario = false
  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.is_login = true
      this.usuario = this.utils_service.getUsuarioSession(token)
      if (this.usuario?.roles.some((rol) => rol.nombre === 'voluntario')) {
        this.is_voluntario = true
      }
      if (this.usuario?.roles.some((rol) => rol.nombre === 'admin')) {
        this.is_admin = true
      }
    }
  }

  constructor(private router: Router, private utils_service: UtilsService) {
  }
  navegar_registro() {
    this.router.navigate(['registro'])
  }


  cerrar_sesion() {
    sessionStorage.clear()
    window.location.reload()
    this.router.navigate([''])
  }
  navegar_login() {
    this.router.navigate(['login'])
  }
  navegar_inicio() {
    this.router.navigate(['inicio'])
  }

  navegar_derechos_deberes() {
    this.router.navigate(['inicio/legal'])
  }
}
