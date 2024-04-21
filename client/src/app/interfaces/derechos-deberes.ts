export interface DerechosDeberes {
  derecho_deber: DerechoDeber[];
}

export interface DerechoDeber {
  id:                 number;
  id_tipo:            number;
  descripcion:        string;
  activo:             boolean;
  createdAt:          Date;
  updatedAt:          Date;
  tipo_derecho_deber: TipoDerechoDeber;
}

export interface TipoDerechoDeber {
  id:        number;
  nombre:    string;
  activo:    boolean;
  createdAt: Date;
  updatedAt: Date;
}
