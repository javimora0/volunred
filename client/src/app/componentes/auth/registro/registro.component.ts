import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatCalendar, MatDatepicker, MatDatepickerInput, MatDatepickerModule} from "@angular/material/datepicker";
import {MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {PaisesService} from "../../../services/paises.service";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    MatLabel,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCalendar,
    MatDatepickerInput,
    MatDatepicker,
    MatDatepickerModule,
    MatOption,
    MatSelect,
    MatIconButton,
    MatAutocompleteTrigger,
    MatAutocomplete
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  providers: [provideNativeDateAdapter()]
})
export class RegistroComponent implements OnInit {
  formulario_registro = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    fecha_nacimiento: new FormControl('', [Validators.required]),
    dni_nie: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeat_password: new FormControl('', [Validators.required])
  })
  hide = true;
  boton_vol_pulsado = false;
  boton_org_pulsado = false;
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

  pulsar_boton(boton: string) {
    if (boton === 'vol') {
      this.boton_vol_pulsado = true
      this.boton_org_pulsado = false
    } else {
      this.boton_vol_pulsado = false
      this.boton_org_pulsado = true
    }
  }
}
