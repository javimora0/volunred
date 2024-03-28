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
  boton_registro_org() {

  }
}
