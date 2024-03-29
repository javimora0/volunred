export interface RegistroOrganizacion {
  email: string;
  password: string;
  username: string;
  nombre: string;
  sitio_web: string;
  cif: string;
  ubicacion: string;
}

export interface RegistroVoluntario {
  nombre: string;
  apellidos: string;
  email: string;
  username: string;
  fecha_nacimiento: Date | null;
  dni_nie: string;
  telefono: number;
  ubicacion: string
  password: string;
}

export interface RespuestaRegistro {
  usuario: Usuario;
  vol_org: VolOrg;
  roles: Roles[];
  token: string;
}

export interface Roles {
  id: number;
  nombre: string;
}

export interface Usuario {
  id: number;
  email: string;
  username: string;
  ubicacion: string;
  password: string;
  activo: boolean;
  nombre_foto: string;
  extension_foto: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface VolOrg {
  id: number;
  nombre: string;
  apellidos?: string;
  fecha_nacimiento?: Date;
  dni_nie?: string;
  cif?: string
  telefono?: number;
  id_usuario: number;
  sitio_web?:string;
  media_calificaciones?: number;
  updatedAt: Date;
  createdAt: Date;
}
