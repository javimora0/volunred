import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatAnchor, MatButton} from "@angular/material/button";
import {VoluntariadosService} from "../../services/voluntariados.service";
import {Voluntariado, VoluntariadoUnico} from "../../interfaces/voluntariados";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {env} from "../../../environments/environment.development";
import {MatIcon} from "@angular/material/icon";
import {DialogoSolicitudComponent} from "../commons/dialogo-solicitud/dialogo-solicitud.component";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {UsuarioService} from "../../services/usuario.service";
import {RespuestaRegistro} from "../../interfaces/auth";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-voluntariado',
  standalone: true,
  imports: [
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatCard,
    MatCardHeader,
    MatCardContent,
    TitleCasePipe,
    DatePipe,
    MatDialogActions,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon,
    MatAnchor,
    MatCardImage,
    ToastModule
  ],
  templateUrl: './voluntariado.component.html',
  styleUrl: './voluntariado.component.css'
})
export class VoluntariadoComponent implements OnInit {
  usuario: RespuestaRegistro | null | undefined
  voluntariado: Voluntariado | undefined
  image_url = env.URL + `voluntariado/imagen/${this.data.id}`
  esta_inscrito = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private voluntariado_service: VoluntariadosService,
    public dialog: MatDialog,
    private message_service: MessageService,
    private usuario_service: UsuarioService,
    private utils_service: UtilsService,
  ) {
  }
  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.usuario = this.utils_service.getUsuarioSession(token)
    }
    this.voluntariado_service.get_voluntariado(this.data.id).subscribe({
      next: (res) => {
        this.voluntariado = res.body?.voluntariado
      }
    })
  }
  on_inscribirse() {
    this.usuario_service.get_solicitudes(this.usuario?.usuario.id).subscribe({
      next:(res) => {
        console.log(res.body)
        if (res.body) {
          for (let i = 0; i < res.body.solicitudes.length; i++) {
            if (res.body.solicitudes[i].id_voluntariado === this.data.id) {
              this.esta_inscrito = true
            }
          }
        }
        if (!this.esta_inscrito) {
          this.open_dialog()
        }else {
          this.message_service.add({
            key: 'tc',
            severity: 'info',
            summary: 'Ops!',
            detail: 'Ya tienes una solicitud pendiente para este voluntariado!'
          });
        }
      }
    })
  }

  open_dialog() {
    const dialogRef = this.dialog.open(DialogoSolicitudComponent, {
      data: {
        id_voluntariado: this.voluntariado?.id
      },
      width: '80vw',
      maxWidth: '800px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.message_service.add({
          key: 'tc',
          severity: 'success',
          summary: 'Enhorabuena!',
          detail: 'Solicitud enviada con éxito'
        });
      } else if (result === 'nook') {
        this.message_service.add({
          key: 'tc',
          severity: 'success',
          summary: 'Error',
          detail: 'Ha ocurrido un error, contacto con un administrador.'
        });
      }
    });
  }

}
