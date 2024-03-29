import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {PaisesService} from "../../../../services/paises.service";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {AuthService} from "../../../../services/auth.service";
import {RegistroOrganizacion} from "../../../../interfaces/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro-organizaciones',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatError,
    MatFormField,
    MatHint,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule
  ],
  templateUrl: './registro-organizaciones.component.html',
  styleUrl: './registro-organizaciones.component.css'
})
export class RegistroOrganizacionesComponent implements OnInit{
  loading: boolean = false
  formulario_organizacion = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(50)]),
    cif: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    ubicacion: new FormControl('', [Validators.required]),
    sitio_web: new FormControl('', [Validators.required, Validators.pattern('https?://(www\\.)?[a-zA-Z0-9]{2,}(\\.[a-zA-Z0-9]{2,})(\\.[a-zA-Z0-9]{2,})?')]),
    password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(60)]),
    repeat_password: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(60),])
  })
  hide = true;
  mensaje_password = ''
  paises: any

  constructor(private paises_service: PaisesService, private auth_service: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.paises = this.paises_service.get_paises()
      .subscribe({
        next:(res) => {
          this.paises = res.body
        }
      })
  }
  boton_registro_org() {
    this.loading = true
    if (this.formulario_organizacion.value.password !== this.formulario_organizacion.value.repeat_password) {
      this.mensaje_password = 'Las contraseñas no coincide'
    } else {
      this.mensaje_password = ''
      let body: RegistroOrganizacion = {
        email: this.formulario_organizacion.value.email ?? '',
        nombre: this.formulario_organizacion.value.nombre ?? '',
        cif: this.formulario_organizacion.value.cif ?? '',
        ubicacion: this.formulario_organizacion.value.ubicacion ?? '',
        sitio_web: this.formulario_organizacion.value.sitio_web ?? '',
        password: this.formulario_organizacion.value.password ?? '',
        username: this.formulario_organizacion.value.username ?? ''
      }
      this.auth_service.registro_organizacion(body)
        .subscribe({
          next:(res) => {
            console.log(res)
            if (res.status === 201 && res.body?.token) {
              sessionStorage.setItem('token', res.body.token)
              //TODO: Redirigir a pagina de inicio
              //this.router.navigate(['inicio'])
            }
          },
          error:(err) => {
            //TODO: Manejar todos los casos de error 409 400 default
            console.log(err)
          }
        })
    }
  }
}
