import {Component, OnInit} from '@angular/core';
import {DerechoDeber} from "../../interfaces/derechos-deberes";
import {DerechosDeberesService} from "../../services/derechos-deberes.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";

@Component({
  selector: 'app-derechos',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './derechos.component.html',
  styleUrl: './derechos.component.css'
})
export class DerechosComponent implements OnInit {
  derechos: DerechoDeber[] | undefined
  deberes: DerechoDeber[] | undefined

  constructor(
    private legal_service: DerechosDeberesService
  ) {
  }

  ngOnInit() {
    this.legal_service.get_derechos()
      .subscribe({
        next: (res) => {
          this.derechos = res.body?.derecho_deber
        }
      })

    this.legal_service.get_deberes()
      .subscribe({
        next: (res) => {
          this.deberes = res.body?.derecho_deber
        }
      })


  }

}
