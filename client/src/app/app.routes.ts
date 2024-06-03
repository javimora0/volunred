import {Routes} from '@angular/router';
import {RegistroComponent} from "./componentes/auth/registro/registro.component";
import {
  PostRegistroVoluntarioComponent
} from "./componentes/auth/registro/post-registro-voluntario/post-registro-voluntario.component";
import {InicioComponent} from "./componentes/inicio/inicio.component";
import {LoginComponent} from "./componentes/auth/login/login.component";
import {DerechosComponent} from "./componentes/derechos/derechos.component";
import {TiposVoluntariadoComponent} from "./componentes/tipos-voluntariado/tipos-voluntariado.component";
import {MainProfileComponent} from "./componentes/perfil/main-profile/main-profile.component";
import {RecomendacionesComponent} from "./componentes/recomendaciones/recomendaciones.component";
import {VoluntariadosComponent} from "./componentes/voluntariados/voluntariados.component";

export const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'registro', component: RegistroComponent},
  {path: 'registro/post', component: PostRegistroVoluntarioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'inicio/legal', component: DerechosComponent},
  {path: 'inicio/tipos-voluntariado', component: TiposVoluntariadoComponent},
  {path: 'perfil', component: MainProfileComponent},
  {path: 'inicio/recomendaciones', component: RecomendacionesComponent},
  {path: 'inicio/voluntariados', component: VoluntariadosComponent}
]
