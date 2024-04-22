import {Component, OnInit} from '@angular/core';
import {Categoria} from "../../interfaces/categorias";
import {CatetegoriasService} from "../../services/catetegorias.service";
import {env} from "../../../environments/environment.development";

@Component({
  selector: 'app-tipos-voluntariado',
  standalone: true,
  imports: [],
  templateUrl: './tipos-voluntariado.component.html',
  styleUrl: './tipos-voluntariado.component.css'
})
export class TiposVoluntariadoComponent implements OnInit{
  tipos_voluntariado: Categoria[] | undefined
  image_url = env.URL + 'categoria/imagen/'

  constructor(
    private categorias_service: CatetegoriasService
  ) {
  }

  ngOnInit() {
    this.categorias_service.get_categorias()
      .subscribe({
        next:(res) => {
          this.tipos_voluntariado = res.body?.categorias
          console.log(this.tipos_voluntariado)
        }
      })
  }
}
