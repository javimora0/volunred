import {Routes} from '@angular/router';
import {RegistroComponent} from "./componentes/auth/registro/registro.component";
import {
  PostRegistroVoluntarioComponent
} from "./componentes/auth/registro/post-registro-voluntario/post-registro-voluntario.component";

export const routes: Routes = [
  {path: 'registro', component: RegistroComponent},
  {path: 'registro/post', component: PostRegistroVoluntarioComponent}
];
