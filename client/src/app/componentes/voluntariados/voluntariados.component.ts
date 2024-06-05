import {Component, OnInit} from '@angular/core';
import {DatePipe, TitleCasePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {Voluntariado} from "../../interfaces/voluntariados";
import {VoluntariadosService} from "../../services/voluntariados.service";
import {env} from "../../../environments/environment.development";
import {VoluntariadoComponent} from "../voluntariado/voluntariado.component";
import {MatDialog} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PaisesService} from "../../services/paises.service";
import {COUNTRIES} from "../../paises";

@Component({
  selector: 'app-voluntariados',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    MatIcon,
    MatSuffix,
    TitleCasePipe,
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatError,
    MatLabel
  ],
  templateUrl: './voluntariados.component.html',
  styleUrl: './voluntariados.component.css'
})
export class VoluntariadosComponent implements OnInit {
  voluntariados!: Voluntariado[] | undefined
  image_url = env.URL + 'voluntariado/imagen/'
  formulario = new FormGroup({
    modalidad: new FormControl('empty'),
    ubicacion: new FormControl('empty')
  })
  paises = COUNTRIES
  mensaje = ''

  constructor(
    private voluntariado_service: VoluntariadosService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.buscar_voluntariados()
  }

  buscar_voluntariados() {
    this.voluntariado_service.get_voluntariados().subscribe({
      next: (res) => {
        this.voluntariados = res.body?.voluntariados
      }
    })
  }

  navegar_voluntariado(id: number) {
    const dialogRef = this.dialog.open(VoluntariadoComponent, {
      data: {
        id: id
      },
      width: '80vw',
      maxWidth: '800px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  busqueda() {
    if (this.formulario.value.modalidad == ''){
      this.formulario.value.modalidad = 'empty'
    }
    if (this.formulario.value.ubicacion == ''){
      this.formulario.value.ubicacion = 'empty'
    }
    this.voluntariado_service.get_voluntariados_filtrados(this.formulario.value.modalidad, this.formulario.value.ubicacion)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.voluntariados = res.body?.voluntariados
        }
      })

  }

  limpiar() {
    this.formulario.reset()
    this.formulario.value.modalidad = 'empty'
    this.formulario.value.ubicacion = 'empty'
    this.buscar_voluntariados()
  }
}
