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
    ReactiveFormsModule
  ],
  templateUrl: './registro-voluntarios.component.html',
  styleUrl: './registro-voluntarios.component.css'
})
export class RegistroVoluntariosComponent implements OnInit{

  formulario_voluntario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(50)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(90)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    username: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
    fecha_nacimiento: new FormControl('', [Validators.required, this.validar_fecha_nacimiento]),
    dni_nie: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(9),Validators.pattern("^[0-9,$]*$")]),
    ubicacion: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(60)]),
    repeat_password: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(60),])
  })
  hide = true;
  paises: any
  constructor(private paises_service: PaisesService) {
  }
  ngOnInit() {
    this.paises = this.paises_service.get_paises()
      .subscribe({
        next:(res) => {
          this.paises = res.body
        }
      })
  }
  boton_registro_vol() {

  }

  /**
   * @desc https://www.digitalocean.com/community/tutorials/angular-reactive-forms-custom-validator
   * @param control
   */
  validar_fecha_nacimiento(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const system_date = new Date();
    let age = system_date.getFullYear() - date.getFullYear();
    // Asegurarse de que no solo el año, sino la fecha completa indica que el usuario tiene al menos 18 años
    if (system_date.getMonth() < date.getMonth() || (system_date.getMonth() === date.getMonth() && system_date.getDate() < date.getDate())) {
      age--;
    }

    return age >= 18 ? null : { 'validar_fecha_nacimiento': true };
  }

  validar_telefono(control: AbstractControl): ValidationErrors | null {
    const telefono = control.value
    console.log(isNaN(telefono))
    return null
  }
}
