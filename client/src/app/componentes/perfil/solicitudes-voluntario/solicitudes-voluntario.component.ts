import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Solicitud} from "../../../interfaces/solicitudes";
import {UsuarioService} from "../../../services/usuario.service";
import {RespuestaRegistro} from "../../../interfaces/auth";
import {UtilsService} from "../../../services/utils.service";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatIcon} from "@angular/material/icon";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-solicitudes-voluntario',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSort,
    MatIcon,
    ToastModule
  ],
  templateUrl: './solicitudes-voluntario.component.html',
  styleUrls: ['./solicitudes-voluntario.component.css']
})
export class SolicitudesVoluntarioComponent implements OnInit {
  displayedColumns: string[] = ['nombre_voluntariado' ,'mensaje_solicitud', 'respuesta_solicitud','fecha_inicio', 'fecha_fin','estado'];
  dataSource = new MatTableDataSource<Solicitud>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  usuario: RespuestaRegistro | null | undefined;
  solicitudes: Solicitud[] | undefined
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
        this.solicitudes = res.body?.solicitudes
        this.dataSource = new MatTableDataSource(this.solicitudes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
