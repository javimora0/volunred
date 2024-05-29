import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {AmbitosProfesionales} from "../../../../interfaces/ambitos";
import {AmbitosService} from "../../../../services/ambitos.service";
import {Router} from "@angular/router";
import {RespuestaRegistro} from "../../../../interfaces/auth";
import {UtilsService} from "../../../../services/utils.service";
import {TitleCasePipe} from "@angular/common";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatCheckbox} from "@angular/material/checkbox";
import {UsuarioService} from "../../../../services/usuario.service";

@Component({
  selector: 'app-post-registro-voluntario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatButton,
    TitleCasePipe,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    MatCheckbox
  ],
  templateUrl: './post-registro-voluntario.component.html',
  styleUrl: './post-registro-voluntario.component.css'
})
export class PostRegistroVoluntarioComponent implements OnInit {
  //TODO: Control de errores tanto del formulario como respuesta de los servicios
  usuario!: RespuestaRegistro | null
  ambitos_seleccionados = false
  formulario = new FormGroup({
    sexo: new FormControl('', [Validators.required]),
    ambitos_elegidos: new FormControl(''),
    participacion_voluntariado: new FormControl(''),
    disponibilidad: new FormControl('')
  })
  ambitos_profesionales!: AmbitosProfesionales | null

  constructor(
    private ambitos_service: AmbitosService,
    private router: Router,
    private utils_service: UtilsService,
    private usuario_service: UsuarioService
  ) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      this.usuario = this.utils_service.getUsuarioSession(sessionStorage.getItem('token'))
    }
    this.ambitos_service.get_ambitos()
      .subscribe({
        next: (res => {
          this.ambitos_profesionales = res.body
        }),
        error: (err) => {
        }
      })
  }

  seleccion_ambito() {
    if (this.formulario.value.ambitos_elegidos) {
      if (this.formulario.value.ambitos_elegidos.length > 0) {
        this.ambitos_seleccionados = true
      } else {
        this.ambitos_seleccionados = false
      }
    }
  }

  boton_saltar() {
    this.router.navigate(['/inicio'])
  }

  boton_continuar() {
    this.asignar_ambitos()
    this.asignar_preferencias()
  }

  asignar_ambitos() {
    let body: any = {
      ambitos: []
    }
    if (this.formulario.value.ambitos_elegidos) {
      for (let i = 0; i < this.formulario.value.ambitos_elegidos.length; i++) {
        body.ambitos.push(this.formulario.value.ambitos_elegidos[i])
      }
    }
    this.ambitos_service.asignar_ambito(this.usuario?.vol_org.id, body)
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.router.navigate(['inicio'])
          }
        }
        //TODO: Manejar errores de respuesta al asingar ambitos profesionales al voluntario
      })
  }

  asignar_preferencias() {
    let body = {
      sexo: this.formulario.value.sexo,
      experiencia: this.formulario.value.participacion_voluntariado,
      disponibilidad: this.formulario.value.disponibilidad,
    }

    this.usuario_service.post_preferencias(body, this.usuario?.vol_org.id)
      .subscribe({
        next: (res) => {
        }
      })
  }
}
