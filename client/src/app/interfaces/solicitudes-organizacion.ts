
export interface Solicitudes_Organizacion {
  solicitudes: Solicitud_Organizacion[];
}

export interface Solicitud_Organizacion {
  id:                number;
  id_usuario:        number;
  id_voluntariado:   number;
  id_estado:         number;
  mensaje_solicitud: string;
  mensaje_respuesta: string;
  createdAt:         Date;
  updatedAt:         Date;
  usuario:           Usuario;
  voluntariado:      Voluntariado;
  estado:            Estado;
}

export interface Usuario {
  id:             number;
  email:          string;
  password:       string;
  username:       string;
  ubicacion:      string;
  nombre_foto:    string;
  extension_foto: string;
  activo:         boolean;
  createdAt:      Date;
  updatedAt:      Date;
}

export interface Voluntariado {
  id:                number;
  titulo:            string;
  id_usuario:        number;
  id_categoria:      number;
  enlace:            string;
  descripcion:       string;
  ubicacion:         string;
  fecha_inicio:      Date;
  fecha_fin:         Date;
  finalizado:        boolean;
  nombre_portada:    string;
  extension_portada: string;
  modalidad:         string;
  activo:            boolean;
  createdAt:         null;
  updatedAt:         null;
}
export interface Estado {
  id:        number;
  estado:    string;
  createdAt: Date;
  updatedAt: Date;
}
