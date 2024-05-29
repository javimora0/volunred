export interface Solicitudes {
  solicitudes: Solicitud[];
}

export interface Solicitud {
  id:                number;
  id_usuario:        number;
  id_voluntariado:   number;
  id_estado:         number;
  mensaje_solicitud: string;
  mensaje_respuesta: string;
  createdAt:         Date;
  updatedAt:         Date;
  voluntariado:      Voluntariado;
  estado:            Estado;
}

export interface Estado {
  id:        number;
  estado:    string;
  createdAt: Date;
  updatedAt: Date;
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
  categoria:         Categoria;
}

export interface Categoria {
  categoria:        string;
  descripcion:      string;
  nombre_imagen:    string;
  extension_imagen: string;
  activa:           boolean;
}
