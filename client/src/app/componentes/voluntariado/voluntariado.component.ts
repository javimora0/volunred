import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-voluntariado',
  standalone: true,
  imports: [
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose
  ],
  templateUrl: './voluntariado.component.html',
  styleUrl: './voluntariado.component.css'
})
export class VoluntariadoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
