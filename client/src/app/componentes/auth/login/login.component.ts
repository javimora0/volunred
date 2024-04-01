import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSelect} from "@angular/material/select";
import {Login} from "../../../interfaces/auth";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatProgressSpinner,
    MatSelect,
    MatSuffix
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formulario_login = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  hide = true
  mensjae_error = ''
  constructor(
    private auth_service: AuthService,
    private router: Router
  ) {
  }

  boton_login() {
    let body: Login = {
      login: this.formulario_login.value.login ?? '',
      password: this.formulario_login.value.password ?? ''
    }

    this.auth_service.login(body)
      .subscribe({
        next: (res) => {
          console.log(res)
          if (res.status === 200) {
            let token = res.body?.token
            if (token) {
              sessionStorage.setItem('token', token)
              this.router.navigate(['inicio'])
            }
          }
          if (res.status == 204){
            this.mensjae_error = 'Credenciales incorrectas'
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
  }
}
