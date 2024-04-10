import {Component, OnInit} from '@angular/core';
import {EntradasService} from "../../services/entradas.service";
import {Entrada} from "../../interfaces/entradas";
import {env} from "../../../environments/environment.development";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  entradas!: Entrada[] | undefined
  image_url = env.URL + 'entradas/imagen/'
  constructor(
    private entradas_service: EntradasService
  ) {
  }
  ngOnInit() {
    this.entradas_service.get_entrada_hazte_voluntario()
      .subscribe({
        next:(res) => {
          this.entradas = res.body?.entradas
          console.log(this.entradas)
        }
    })
  }
}
