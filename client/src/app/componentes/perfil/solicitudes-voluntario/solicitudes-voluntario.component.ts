import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Solicitud} from "../../../interfaces/solicitudes";
import {UsuarioService} from "../../../services/usuario.service";
import {RespuestaRegistro} from "../../../interfaces/auth";
import {UtilsService} from "../../../services/utils.service";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-solicitudes-voluntario',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './solicitudes-voluntario.component.html',
  styleUrls: ['./solicitudes-voluntario.component.css']
})
export class SolicitudesVoluntarioComponent implements OnInit {
  displayedColumns: string[] = ['nombre_voluntariado', 'mensaje_solicitud', 'mensaje_respuesta', 'categoria', 'estado'];
  dataSource = new MatTableDataSource<Solicitud>([]);
  usuario: RespuestaRegistro | null | undefined;

  constructor(
    private usuario_service: UsuarioService,
    private utils_service: UtilsService
  ) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.usuario = this.utils_service.getUsuarioSession(token);
    }
    this.usuario_service.get_solicitudes(this.usuario?.usuario.id).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource.data = res.body?.solicitudes || [];
        console.log(this.dataSource.data);
      }
    })
  }
}
