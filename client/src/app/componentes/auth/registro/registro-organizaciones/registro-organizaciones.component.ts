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
import {Router, RouterLink} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { COUNTRIES } from '../../../../../app/paises';

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
    ReactiveFormsModule,
    MatProgressSpinner,
    RouterLink
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
    sitio_web: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(60)]),
    repeat_password: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(60),])
  })
  hide = true;
  mensaje_password = ''
  paises = COUNTRIES
  error_email = ''
  mensaje_servidor = ''
  error_username = ''
  error_cif = ''
  error_nombre = ''
  constructor(private paises_service: PaisesService, private auth_service: AuthService, private router: Router) {
  }

  ngOnInit() {
    //this.paises = this.paises_service.get_paises()
    //  .subscribe({
    //    next:(res) => {
    //      this.paises = res.body
    //    }
    //  })
  }
  boton_registro_org() {
    this.loading = true
    if (this.formulario_organizacion.value.password !== this.formulario_organizacion.value.repeat_password) {
      this.loading = false
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
            this.loading = false
            if (res.status === 201 && res.body?.token) {
              sessionStorage.setItem('token', res.body.token)
              //TODO: Redirigir a pagina de inicio
              //this.router.navigate(['inicio'])
            }
          },
          error:(err) => {
            switch (err.status) {
              case 409:
                this.loading = false
                this.check_datos_repetidos(err.error.errors)
                break;
              case 400:
                this.loading = false
                this.mensaje_servidor = 'Error interno. Vuelva a intentarlo mas tarde'
                setTimeout(() => {
                  this.mensaje_servidor = '';
                }, 5000);
                break;
              default:
                this.loading = false
                this.mensaje_servidor = 'Error interno. Vuelva a intentarlo mas tarde'
                setTimeout(() => {
                  this.mensaje_servidor = '';
                }, 5000);
                break
            }
          }
        })
    }
  }

  check_datos_repetidos(errores: any) {
    if (errores.some((error: any) => error.path === 'email')) {
      let mensaje_error = errores.filter((error: any) => error.path === 'email')[0].msg
      this.error_email = mensaje_error
    }
    if (errores.some((error: any) => error.path === 'username')) {
      let mensaje_error = errores.filter((error: any) => error.path === 'username')[0].msg
      this.error_username = mensaje_error
    }
    if (errores.some((error: any) => error.path === 'cif')) {
      let mensaje_error = errores.filter((error: any) => error.path === 'cif')[0].msg
      this.error_cif = mensaje_error
    }
    if (errores.some((error: any) => error.path === 'nombre')) {
      let mensaje_error = errores.filter((error: any) => error.path === 'nombre')[0].msg
      this.error_nombre = mensaje_error
    }
  }
}
