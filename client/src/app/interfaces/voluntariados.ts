export interface Voluntariados {
  voluntariados: Voluntariado[];
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
  createdAt:         Date;
  updatedAt:         Date;
  categoria:         Categoria;
}

export interface Categoria {
  categoria:        string;
  descripcion:      string;
  nombre_imagen:    string;
  extension_imagen: string;
  activa:           boolean;
}
