import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {UsuarioService} from "../../../services/usuario.service";
import {Solicitud_Organizacion} from "../../../interfaces/solicitudes-organizacion";
import {FormControl, FormControlName, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatInput} from "@angular/material/input";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-dialogo-detalles-solicitud',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIcon,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatCardTitle,
    FormsModule,
    MatInput,
    TitleCasePipe,
    ReactiveFormsModule,
    MatError,
    MatFormField
  ],
  templateUrl: './dialogo-detalles-solicitud.component.html',
  styleUrl: './dialogo-detalles-solicitud.component.css'
})
export class DialogoDetallesSolicitudComponent implements OnInit{
  solicitudes: Solicitud_Organizacion[] | undefined
  mensaje_organizacion = new FormControl('', [Validators.maxLength(256), Validators.required])
  border: any
  constructor(
    private usuario_service: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogoDetallesSolicitudComponent>,

  ) {
  }

  ngOnInit() {
    this.usuario_service.get_solicitud(this.data.id)
      .subscribe({
        next:(res) => {
          console.log(res)
          this.solicitudes = res.body?.solicitudes
          console.log(this.solicitudes)
        }
      })
  }

  rechazar(id: number) {
    let body = {
      estado: "rechazar",
      mensaje: this.mensaje_organizacion.value
    }
    this.usuario_service.responder_solicitud(body, id)
      .subscribe({
        next: (res) => {
          console.log(res)
          if (res.status === 200) {
            this.dialogRef.close('ok')
          }
        }
      })
  }

  aceptar(id: number) {
    let body = {
      estado: "aceptar",
      mensaje: this.mensaje_organizacion.value
    }
    this.usuario_service.responder_solicitud(body, id)
      .subscribe({
        next: (res) => {
          console.log("respuesta" + res.body)
          if (res.status === 200) {
            this.dialogRef.close('ok')
          }
        }
      })
  }

  on_text_area(event: any): void {
    if (event.target.value.length > 0) {
      event.target.style.borderColor = 'green';
    } else {
      event.target.style.borderColor = 'orange';
    }
  }

}
