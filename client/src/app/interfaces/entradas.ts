export interface Entradas {
  entradas: Entrada[];
}

export interface Entrada {
  id:              number;
  titulo:          string;
  texto:           string;
  nombre_foto:     string;
  extension_foto:  string;
  id_tipo_entrada: number;
  activa:          boolean;
  createdAt:       Date;
  updatedAt:       Date;
}
