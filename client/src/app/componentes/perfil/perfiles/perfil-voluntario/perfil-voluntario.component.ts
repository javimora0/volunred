import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {RespuestaRegistro} from "../../../../interfaces/auth";
import {UtilsService} from "../../../../services/utils.service";
import {env} from "../../../../../environments/environment.development";
import {PaisesService} from "../../../../services/paises.service";
import {Voluntario} from "../../../../interfaces/usuario";
import {UsuarioService} from "../../../../services/usuario.service";
import {NgForOf} from "@angular/common";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {RouterOutlet} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogoComponent} from "../../../commons/dialogo/dialogo.component";

@Component({
  selector: 'app-perfil-voluntario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSuffix,
    MatIcon,
    MatLabel,
    MatDatepicker,
    MatDatepickerInput,
    MatError,
    MatButton,
    MatIconButton,
    MatOption,
    MatSelect,
    NgForOf,
    ButtonModule,
    RippleModule,
    ToastModule,
    RouterOutlet
  ],
  templateUrl: './perfil-voluntario.component.html',
  styleUrl: './perfil-voluntario.component.css',
  providers: [MessageService]
})
export class PerfilVoluntarioComponent implements OnInit {
  datos_usuario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(90)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    fecha_nacimiento: new FormControl(new Date, [Validators.required, this.validar_fecha_nacimiento]),
    dni_nie: new FormControl('', [Validators.required]),
    telefono: new FormControl(0, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9,$]*$")]),
    ubicacion: new FormControl('', [Validators.required]),
  })
  password = new FormGroup({
    old_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]),
    new_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(60),])
  })
  usuario!: RespuestaRegistro
  image_url = env.URL + 'usuario/imagen/'
  hide = true
  paises: any
  selected_file: File | null = null;

  constructor(
    private util_service: UtilsService,
    private paises_service: PaisesService,
    private usuario_service: UsuarioService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.paises = this.paises_service.get_paises()
      .subscribe({
        next: (res) => {
          this.paises = res.body
        }
      })
    this.usuario = this.util_service.getUsuarioSession(sessionStorage.getItem('token'))
    this.initForm()
  }

  initForm() {
    this.datos_usuario.controls['nombre'].setValue(this.usuario.vol_org.nombre)
    this.datos_usuario.controls['apellidos'].setValue(this.usuario.vol_org.apellidos ?? null)
    this.datos_usuario.controls['email'].setValue(this.usuario.usuario.email)
    this.datos_usuario.controls['username'].setValue(this.usuario.usuario.username)
    this.datos_usuario.controls['fecha_nacimiento'].setValue(this.usuario.vol_org.fecha_nacimiento ?? null)
    this.datos_usuario.controls['dni_nie'].setValue(this.usuario.vol_org.dni_nie ?? null)
    this.datos_usuario.controls['telefono'].setValue(this.usuario.vol_org.telefono ?? null)
    this.datos_usuario.controls['ubicacion'].setValue(this.usuario.usuario.ubicacion)
  }

  //TODO: Meter funcion en utlils para llamarla desde ahi y no repetir codigo
  validar_fecha_nacimiento(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const system_date = new Date();
    let edad = system_date.getFullYear() - date.getFullYear();
    if (system_date.getMonth() < date.getMonth() || (system_date.getMonth() === date.getMonth() && system_date.getDate() < date.getDate())) {
      edad--;
    }

    return edad >= 18 ? null : {'validar_fecha_nacimiento': true};
  }

  open_dialog_datos() {
    const dialogRef = this.dialog.open(DialogoComponent, {
      data: {
        mensaje: "Vas a modificar tus datos"
      },
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.modificar_datos()
      }else {
        window.location.reload()
      }
    });
  }

  modificar_datos() {
    let body: Voluntario = {
      nombre: this.datos_usuario.value.nombre ?? '',
      apellidos: this.datos_usuario.value.apellidos ?? '',
      fecha_nacimiento: this.datos_usuario.value.fecha_nacimiento ?? new Date,
      ubicacion: this.datos_usuario.value.ubicacion ?? '',
    }
    if (this.datos_usuario.value.email !== this.usuario.usuario.email) {
      body.email = this.datos_usuario.value.email ?? ''
    }
    if (this.datos_usuario.value.username !== this.usuario.usuario.username) {
      body.username = this.datos_usuario.value.username ?? ''
    }
    if (this.datos_usuario.value.telefono !== this.usuario.vol_org.telefono) {
      body.telefono = this.datos_usuario.value.telefono ?? 0
    }
    if (this.datos_usuario.value.dni_nie !== this.usuario.vol_org.dni_nie) {
      body.dni_nie = this.datos_usuario.value.dni_nie ?? ''
    }
    this.usuario_service.put_usuario(this.usuario.usuario.id, body)
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            sessionStorage.setItem('token', res.body.token)
            this.messageService.add({
              key: 'tc',
              severity: 'success',
              summary: 'OK!',
              detail: 'Tus datos han sido modificados.'
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            key: 'tc',
            severity: 'error',
            summary: 'OPS!',
            detail: 'Ha occurrido un error al modificar tus datos. Contacta con un administrador'
          });
        }
      })
  }

  open_dialog_password() {
    const dialogRef = this.dialog.open(DialogoComponent, {
      data: {
        mensaje: "Vas a modificar tu constraseña"
      },
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.modificar_password()
      }else {
        window.location.reload()
      }
    });
  }

  modificar_password() {
    let body = {
      new_password: this.password.value.new_password,
      old_password: this.password.value.old_password
    }
    this.usuario_service.put_password(this.usuario.usuario.id, body)
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.messageService.add({
              key: 'tc',
              severity: 'success',
              summary: 'OK!',
              detail: 'Tu contraseña ha sido modificada con éxito.'
            });
            this.password.reset()
          }
        },
        error: (err) => {
          if (err.status === 400) {
            this.messageService.add({
              key: 'tc',
              severity: 'error',
              summary: 'OPS!',
              detail: 'Tu contraseña actual no es correcta.'
            });
          }
          this.password.reset()
        }
      })
  }

  generar_estrellas(rating: number | undefined): number[] {
    return Array(Math.round(<number>rating)).fill(0);
  }

  seleccionar_imagen(): void {
    const file_input = document.getElementById('file_input') as HTMLInputElement;
    file_input.click();
  }

  on_file_selected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selected_file = input.files[0];
      this.upload_image();
    }
  }

  upload_image(): void {
    if (this.selected_file) {
      const form_data = new FormData();
      form_data.append('archivo', this.selected_file, this.selected_file.name);
      this.usuario_service.put_imagen(this.usuario.usuario.id, form_data).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 200) {
            let x = 5;

            const interval = setInterval(() => {
              this.messageService.clear('tc')
              this.messageService.add({
                key: 'tc',
                severity: 'success',
                summary: '¡OK!',
                detail: `Tu foto de perfil ha sido modificada con éxito. Espere ${x} segundos...`,
              });
              x -= 1;
              if (x < 0) {
                clearInterval(interval);
                window.location.reload();
              }
            }, 1000);
          }
        },
        error: (err) => {
          this.messageService.add({
            key: 'tc',
            severity: 'error',
            summary: '¡OPS!',
            detail: 'Ha ocurrido un error al modificar tu foto de perfil. Contacta con un administrador.',
          });
        },
      });
    }
  }
  navegar_perfil() {
    //TODO: Navegar a perfil, pasando username por url
  }
}
