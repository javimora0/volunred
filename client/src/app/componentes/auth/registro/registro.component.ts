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
import {RegistroVoluntariosComponent} from "./registro-voluntarios/registro-voluntarios.component";
import {RegistroOrganizacionesComponent} from "./registro-organizaciones/registro-organizaciones.component";

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
    MatAutocomplete,
    RegistroVoluntariosComponent,
    RegistroOrganizacionesComponent
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  providers: [provideNativeDateAdapter()]
})
export class RegistroComponent {
  boton_vol_pulsado = false;
  boton_org_pulsado = false;


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


