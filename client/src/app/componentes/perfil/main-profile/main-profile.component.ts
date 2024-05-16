import {Component, OnInit} from '@angular/core';
import {RespuestaRegistro} from "../../../interfaces/auth";
import {UtilsService} from "../../../services/utils.service";
import {PerfilOrganizacionComponent} from "../perfiles/perfil-organizacion/perfil-organizacion.component";
import {PerfilVoluntarioComponent} from "../perfiles/perfil-voluntario/perfil-voluntario.component";

@Component({
  selector: 'app-main-profile',
  standalone: true,
  imports: [
    PerfilOrganizacionComponent,
    PerfilVoluntarioComponent
  ],
  templateUrl: './main-profile.component.html',
  styleUrl: './main-profile.component.css'
})
export class MainProfileComponent implements OnInit{
  usuario!: RespuestaRegistro
  menu_seleccionado = 'datos'

  constructor(
    private util_service: UtilsService
  ) {
  }

  ngOnInit() {
    this.usuario = this.util_service.getUsuarioSession(sessionStorage.getItem('token'))
    console.log(this.usuario.roles[0].nombre)
  }

  seleccionar(target: string) {
    this.menu_seleccionado = target
    //switch (target) {
    //  case 'datos':
    //    this.menu_seleccionado = 'datos_personales'
    //    break;
    //  case 'voluntariados':
    //    this.menu_seleccionado = 'voluntariados'
    //    break;
    //  case 'crear_voluntariado':
    //    this.menu_seleccionado = 'crear_voluntariado'
    //      break;
    //  case 'solicitudes_voluntariado':
    //    this.menu_seleccionado = 'solicitudes_voluntariado'
    //    break;
    //  case 'mis_solicitudes':
    //    this.menu_seleccionado = 'mis_solicitudes'
    //    break;
    //  default:
    //    this.menu_seleccionado = 'datos_personales';
    //    break;
    //}
  }
}
