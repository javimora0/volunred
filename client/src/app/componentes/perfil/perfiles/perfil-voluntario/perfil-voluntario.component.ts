import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {RespuestaRegistro} from "../../../../interfaces/auth";
import {UtilsService} from "../../../../services/utils.service";
import {env} from "../../../../../environments/environment.development";

@Component({
  selector: 'app-perfil-voluntario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSuffix,
    MatIcon,
    MatLabel,
    MatDatepicker,
    MatDatepickerInput,
    MatError,
    MatButton,
    MatIconButton,
    MatOption,
    MatSelect,
  ],
  templateUrl: './perfil-voluntario.component.html',
  styleUrl: './perfil-voluntario.component.css'
})
export class PerfilVoluntarioComponent implements OnInit {
  datos_usuario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(90)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    fecha_nacimiento: new FormControl(new Date, [Validators.required, this.validar_fecha_nacimiento]),
    dni_nie: new FormControl('', [Validators.required]),
    telefono: new FormControl(0, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9,$]*$")]),
    ubicacion: new FormControl('', [Validators.required]),
  })
  usuario!: RespuestaRegistro
  image_url = env.URL + 'usuario/imagen/'

  constructor(
    private util_service: UtilsService
  ) {
  }

  ngOnInit() {
    this.usuario = this.util_service.getUsuarioSession(sessionStorage.getItem('token'))
    this.initForm()
  }

  initForm() {
    this.datos_usuario.controls['nombre'].setValue(this.usuario.vol_org.nombre)
    this.datos_usuario.controls['apellidos'].setValue(this.usuario.vol_org.apellidos ?? null)
    this.datos_usuario.controls['email'].setValue(this.usuario.usuario.email)
    this.datos_usuario.controls['username'].setValue(this.usuario.usuario.username)
    this.datos_usuario.controls['fecha_nacimiento'].setValue(this.usuario.vol_org.fecha_nacimiento ?? null)
    this.datos_usuario.controls['dni_nie'].setValue(this.usuario.vol_org.dni_nie ?? null)
    this.datos_usuario.controls['telefono'].setValue(this.usuario.vol_org.telefono ?? null)
    this.datos_usuario.controls['ubicacion'].setValue(this.usuario.usuario.ubicacion)
  }

  validar_fecha_nacimiento(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const system_date = new Date();
    let edad = system_date.getFullYear() - date.getFullYear();
    if (system_date.getMonth() < date.getMonth() || (system_date.getMonth() === date.getMonth() && system_date.getDate() < date.getDate())) {
      edad--;
    }

    return edad >= 18 ? null : {'validar_fecha_nacimiento': true};
  }
}
