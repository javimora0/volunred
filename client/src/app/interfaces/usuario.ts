export interface Voluntario {
  nombre: string;
  apellidos: string;
  email?: string;
  username?: string;
  fecha_nacimiento: Date;
  dni_nie?: string;
  telefono?: number;
  ubicacion: string;
}
