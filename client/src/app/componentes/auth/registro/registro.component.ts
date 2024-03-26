import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  boton_voluntario_pulsado = false
  boton_organizacion_pulsado = false
  formulario_voluntario: FormGroup

  constructor(private fb: FormBuilder) {
    this.formulario_voluntario = this.fb.group({
      nombre: [null, [Validators.required]]
    })
  }
  click_boton_voluntario(){
    this.boton_voluntario_pulsado = true
    this.boton_organizacion_pulsado = false
  }
  click_boton_organizacion(){
    this.boton_voluntario_pulsado = false
    this.boton_organizacion_pulsado = true
  }
}
