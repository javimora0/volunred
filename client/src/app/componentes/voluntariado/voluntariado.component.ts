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
  voluntariado: Voluntariado | undefined
  image_url = env.URL + `voluntariado/imagen/${this.data.id}`

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private voluntariado_service: VoluntariadosService,
    public dialog: MatDialog,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.voluntariado_service.get_voluntariado(this.data.id).subscribe({
      next: (res) => {
        this.voluntariado = res.body?.voluntariado
      }
    })
  }

  on_inscribirse() {
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
        this.messageService.add({
          key: 'mensaje',
          severity: 'success',
          summary: 'Enhorabuena!',
          detail: 'Pulse para ver sus solicitudes!'
        });
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Enhorabuena!',
          detail: 'Solicitud enviada con éxito'
        });
      } else if (result === 'nook') {
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Error',
          detail: 'Ha ocurrido un error, contacto con un administrador.'
        });
      }
    });
  }
  ver_solicitudes() {
    console.log("ver")
  }
}
