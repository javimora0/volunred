export interface AmbitosProfesionales {
  ambitos_profesionales: AmbitoProfesional[]
}

export interface AmbitoProfesional {
  id: number;
  ambito: string;
  createdAt: Date;
  updatedAt: Date;
}

