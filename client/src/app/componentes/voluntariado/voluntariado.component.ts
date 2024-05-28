import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatAnchor, MatButton} from "@angular/material/button";
import {VoluntariadosService} from "../../services/voluntariados.service";
import {Voluntariado, VoluntariadoUnico} from "../../interfaces/voluntariados";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {env} from "../../../environments/environment.development";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-voluntariado',
  standalone: true,
  imports: [
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatCard,
    MatCardHeader,
    MatCardContent,
    TitleCasePipe,
    DatePipe,
    MatDialogActions,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon,
    MatAnchor,
    MatCardImage
  ],
  templateUrl: './voluntariado.component.html',
  styleUrl: './voluntariado.component.css'
})
export class VoluntariadoComponent implements OnInit{
  voluntariado: Voluntariado | undefined
  image_url = env.URL + `voluntariado/imagen/${this.data.id}`
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private voluntariado_service: VoluntariadosService
  ) {}

  ngOnInit() {
    console.log(this.data.id)
    this.voluntariado_service.get_voluntariado(this.data.id).subscribe({
      next:(res) => {
        console.log(res.body?.voluntariado.titulo)
        this.voluntariado = res.body?.voluntariado
        console.log(this.voluntariado?.titulo)
      }
    })
  }

  on_inscribirse() {

  }
}
