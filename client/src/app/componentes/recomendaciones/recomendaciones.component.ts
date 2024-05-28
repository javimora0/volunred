import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {VoluntariadosService} from "../../services/voluntariados.service";
import {RespuestaRegistro} from "../../interfaces/auth";
import {UtilsService} from "../../services/utils.service";
import {Voluntariado} from "../../interfaces/voluntariados";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {env} from "../../../environments/environment.development";
import {MatIcon} from "@angular/material/icon";
import {MatSuffix} from "@angular/material/form-field";
import {DialogoComponent} from "../commons/dialogo/dialogo.component";
import {MatDialog} from "@angular/material/dialog";
import {VoluntariadoComponent} from "../voluntariado/voluntariado.component";

@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  imports: [
    MatButton,
    DatePipe,
    TitleCasePipe,
    MatIcon,
    MatSuffix
  ],
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.css'
})
export class RecomendacionesComponent implements OnInit{
  usuario: RespuestaRegistro | null | undefined
  voluntariados!: Voluntariado[] | undefined
  image_url = env.URL + 'voluntariado/imagen/'

  constructor(
    private voluntariado_service: VoluntariadosService,
    private utils_service: UtilsService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.usuario = this.utils_service.getUsuarioSession(token)
    }
  }

  segun_tus_preferencias() {
    this.voluntariado_service.get_recomendaciones(this.usuario?.vol_org.id).subscribe({
      next:(res) => {
        this.voluntariados = res.body?.voluntariados
      }
    })
  }

  nuestras_recomendaciones() {
    this.voluntariado_service.get_recomendaciones_automaticas(this.usuario?.vol_org.id).subscribe({
      next:(res) => {
        this.voluntariados = res.body?.voluntariados
      }
    })
  }

  navegar_voluntariado(id: number) {
    const dialogRef = this.dialog.open(VoluntariadoComponent, {
      data: {
        id: id
      },
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }
}
