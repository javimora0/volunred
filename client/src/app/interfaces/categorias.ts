export interface Categorias {
  categorias: Categoria[];
}

export interface Categoria {
  id:               number;
  categoria:        string;
  descripcion:      string;
  nombre_imagen:    string;
  extension_imagen: string;
  activa:           boolean;
  createdAt:        Date;
  updatedAt:        Date;
}
