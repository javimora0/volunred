import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {
  Solicitud_Organizacion
} from "../../../interfaces/solicitudes-organizacion";
import {RespuestaRegistro} from "../../../interfaces/auth";
import {UsuarioService} from "../../../services/usuario.service";
import {UtilsService} from "../../../services/utils.service";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogoDetallesSolicitudComponent
} from "../../commons/dialogo-detalles-solicitud/dialogo-detalles-solicitud.component";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-solicitudes-organizacion',
  standalone: true,
  imports: [
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatTable,
    TitleCasePipe,
    MatHeaderCellDef,
    MatNoDataRow,
    ToastModule,
    MatFormField,
    MatInput,
    MatButton
  ],
  templateUrl: './solicitudes-organizacion.component.html',
  styleUrl: './solicitudes-organizacion.component.css'
})
export class SolicitudesOrganizacionComponent implements OnInit {
  displayedColumns: string[] = ['estado', 'nombre_voluntariado', 'usuario', 'accion'];
  dataSource = new MatTableDataSource<Solicitud_Organizacion>([]);
  solicitudes: Solicitud_Organizacion[] | undefined
  usuario: RespuestaRegistro | null | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuario_service: UsuarioService,
    private utils_service: UtilsService,
    public dialog: MatDialog,
    private message_service: MessageService,
  ) {
  }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.usuario = this.utils_service.getUsuarioSession(token);
    }
    this.get_solicitudes()
  }

  get_solicitudes() {
    this.usuario_service.get_solicitudes_organizacion(this.usuario?.usuario.id).subscribe({
      next: (res) => {
        console.log(res);
        this.solicitudes = res.body?.solicitudes
        this.dataSource = new MatTableDataSource(this.solicitudes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  detalles_solicitud(id: number) {
    const dialog_ref = this.dialog.open(DialogoDetallesSolicitudComponent, {
      data: {
        id: id
      },
      width: '80vw',
      maxWidth: '800px',
      disableClose: false
    });
    dialog_ref.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.message_service.add({
          key: 'tc',
          severity: 'info',
          summary: 'Ok!',
          detail: 'Solicitud respondida con éxito'
        });
        this.get_solicitudes()
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
