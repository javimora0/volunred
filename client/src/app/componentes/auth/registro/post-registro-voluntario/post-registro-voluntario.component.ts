import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {AmbitosProfesionales} from "../../../../interfaces/ambitos";
import {AmbitosService} from "../../../../services/ambitos.service";
import {Router} from "@angular/router";
import {RespuestaRegistro} from "../../../../interfaces/auth";
import {UtilsService} from "../../../../services/utils.service";

@Component({
  selector: 'app-post-registro-voluntario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatButton
  ],
  templateUrl: './post-registro-voluntario.component.html',
  styleUrl: './post-registro-voluntario.component.css'
})
export class PostRegistroVoluntarioComponent implements OnInit {
  usuario!: RespuestaRegistro | null
  ambitos_seleccionados = false
  ambitos_elegidos = new FormControl('')
  ambitos_profesionales!: AmbitosProfesionales | null

  constructor(
    private ambitos_service: AmbitosService,
    private router: Router,
    private utils_service: UtilsService
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
        })
      })
  }
  seleccion_ambito() {
    if (this.ambitos_elegidos.value) {
      if (this.ambitos_elegidos.value?.length > 0) {
        this.ambitos_seleccionados = true
      }else {
        this.ambitos_seleccionados = false
      }
    }
  }

  boton_saltar() {
    this.router.navigate(['/inicio'])
  }

  boton_continuar() {
    let body: any = {
      ambitos: []
    }
    if (this.ambitos_elegidos.value) {
      for (let i = 0; i < this.ambitos_elegidos.value?.length; i++) {
        body.ambitos.push(this.ambitos_elegidos.value[i])
      }
    }
    this.ambitos_service.asignar_ambito(this.usuario?.vol_org.id, body)
      .subscribe({
        next:(res) => {
          if (res.status === 200) {
            this.router.navigate(['inicio'])
          }
        }
        //TODO: Manejar errores de respuesta al asingar ambitos profesionales al voluntario
      })
  }
}
