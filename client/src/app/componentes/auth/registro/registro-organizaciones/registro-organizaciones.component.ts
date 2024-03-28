import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {PaisesService} from "../../../../services/paises.service";

@Component({
  selector: 'app-registro-organizaciones',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatFormField,
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
    nombre: new FormControl('', [Validators.required]),
    cif: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    sitio_web: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeat_password: new FormControl('', [Validators.required]),
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
  boton_registro_org() {

  }
}
