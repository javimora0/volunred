import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {PaisesService} from "../../../../services/paises.service";
import {AuthService} from "../../../../services/auth.service";
import {RegistroVoluntario} from "../../../../interfaces/auth";
import {Router} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-registro-voluntarios',
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
    MatProgressSpinner
  ],
  templateUrl: './registro-voluntarios.component.html',
  styleUrl: './registro-voluntarios.component.css'
})
export class RegistroVoluntariosComponent implements OnInit {
  loading: boolean = false
  formulario_voluntario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(90)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    fecha_nacimiento: new FormControl(null, [Validators.required, this.validar_fecha_nacimiento]),
    dni_nie: new FormControl('', [Validators.required]),
    telefono: new FormControl(0, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9,$]*$")]),
    ubicacion: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]),
    repeat_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(60),])
  })
  mensaje_password = ''
  hide = true;
  paises: any
  error_email = ''
  error_username = ''
  error_telefono = ''
  error_dni_nie = ''
  mensaje_servidor = ''
  constructor(private paises_service: PaisesService, private auth_service: AuthService, private router: Router
  ) {
  }

  ngOnInit() {
    this.paises = this.paises_service.get_paises()
      .subscribe({
        next: (res) => {
          this.paises = res.body
        }
      })
  }

  /**
   * @desc https://www.digitalocean.com/community/tutorials/angular-reactive-forms-custom-validator
   * @param control
   */
  validar_fecha_nacimiento(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const system_date = new Date();
    let edad = system_date.getFullYear() - date.getFullYear();
    if (system_date.getMonth() < date.getMonth() || (system_date.getMonth() === date.getMonth() && system_date.getDate() < date.getDate())) {
      edad--;
    }

    return edad >= 18 ? null : {'validar_fecha_nacimiento': true};
  }

  boton_registro_vol() {
    this.loading = true
    if (this.formulario_voluntario.value.password !== this.formulario_voluntario.value.repeat_password) {
      this.mensaje_password = 'Las contraseñas no coincide'
      this.loading = false
    } else {
      this.mensaje_password = ''
      let body: RegistroVoluntario = {
        nombre: this.formulario_voluntario.value.nombre ?? '',
        apellidos: this.formulario_voluntario.value.apellidos ?? '',
        email: this.formulario_voluntario.value.email ?? '',
        username: this.formulario_voluntario.value.username ?? '',
        fecha_nacimiento: this.formulario_voluntario.value.fecha_nacimiento ?? null,
        dni_nie: this.formulario_voluntario.value.dni_nie ?? '',
        telefono: this.formulario_voluntario.value.telefono ?? 0,
        ubicacion: this.formulario_voluntario.value.ubicacion ?? '',
        password: this.formulario_voluntario.value.password ?? ''
      }
      this.auth_service.registro_voluntario(body)
        .subscribe({
          next: (res) => {
            this.loading = false
            if (res.status === 201 && res.body?.token) {
              sessionStorage.setItem('token', res.body.token)
              this.router.navigate(['registro/post'])
            }
          },
          error: (err) => {
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
    if (errores.some((error: any) => error.path === 'dni_nie')) {
      let mensaje_error = errores.filter((error: any) => error.path === 'dni_nie')[0].msg
      this.error_dni_nie = mensaje_error
    }
    if (errores.some((error: any) => error.path === 'telefono')) {
      let mensaje_error = errores.filter((error: any) => error.path === 'telefono')[0].msg
      this.error_telefono = mensaje_error
    }
  }
}
