import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {VoluntariadosService} from "../../../services/voluntariados.service";
import {RespuestaRegistro} from "../../../interfaces/auth";
import {UtilsService} from "../../../services/utils.service";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-dialogo-solicitud',
  standalone: true,
  imports: [
    MatError,
    MatHint,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    MatInput,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose
  ],
  templateUrl: './dialogo-solicitud.component.html',
  styleUrl: './dialogo-solicitud.component.css'
})
export class DialogoSolicitudComponent implements OnInit{
  usuario: RespuestaRegistro | null | undefined
  formulario = new FormGroup({
    mensaje_solicitud: new FormControl('', [Validators.required, Validators.maxLength(256)])
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private voluntariado_service: VoluntariadosService,
    private utils_service: UtilsService,
    public dialogRef: MatDialogRef<DialogoSolicitudComponent>,

  ) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.usuario = this.utils_service.getUsuarioSession(token)
    }
  }

  enviar_mensaje() {
    let body = {
      mensaje_solicitud : this.formulario.value.mensaje_solicitud
    }
    this.voluntariado_service.post_solicitud(this.data.id_voluntariado, this.usuario?.usuario.id, body).subscribe({
      next:(res) => {
        if (res.status === 201) {
          this.dialogRef.close('ok')
        }
      },
      error: (err) => {
        this.dialogRef.close('nook')
      }
    })
  }
}
