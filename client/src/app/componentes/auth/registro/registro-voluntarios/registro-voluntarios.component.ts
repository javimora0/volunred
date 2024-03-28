import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
    nombre: new FormControl('', [Validators.required, Validators.min(2),Validators.max(50)]),
    apellidos: new FormControl('', [Validators.required, Validators.min(4),Validators.max(90)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.min(3),Validators.max(30)]),
    fecha_nacimiento: new FormControl('', [Validators.required]),
    dni_nie: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9,$]*$")]),
    ubicacion: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.min(6),Validators.max(60)]),
    repeat_password: new FormControl('', [Validators.required, Validators.min(6),Validators.max(60)])
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
          console.log(this.paises[0].name)
        }
      })
  }
  boton_registro_vol() {

  }
}
