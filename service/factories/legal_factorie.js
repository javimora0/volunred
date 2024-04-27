const crear_tipos = async() => {
    let tipos = [
        {
            nombre:'derecho',
            activo: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre:'deber',
            activo:true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]
    return tipos
}

const crear_derechos_deberes = async () => {
    let derechos =  [
        'Recibir, tanto con carácter inicial como permanente, la información, formación, orientación, apoyo y, en su caso, medios materiales necesarios para el ejercicio de las funciones que se te asignen.',
        'Ser tratada sin discriminación, respetando tu libertad, dignidad, intimidad y creencias.',
        'Participar activamente en la organización en que te insertes, colaborando en la elaboración, diseño, ejecución y evaluación de los programas, de acuerdo con sus estatutos o normas de aplicación.',
        'Ser asegurada contra los riesgos de accidente y enfermedad derivados directamente del ejercicio de la actividad voluntaria, con las características y por los capitales asegurados que se establezcan reglamentariamente.',
        'Ser reembolsada por los gastos realizados en el desempeño de tus actividades.',
        'Disponer de una acreditación identificativa de tu condición de persona voluntaria.',
        'Realizar tu actividad en las debidas condiciones de seguridad e higiene en función de la naturaleza y características de aquélla.',
        'Obtener el respeto y reconocimiento por el valor social de tu contribución.',
        'Recibir una certificación por parte de la organización que acredite el desarrollo de tu acción voluntaria.'
    ]
    let deberes = [
        'Cumplir los compromisos adquiridos con las organizaciones en las que se integren, respetando los fines y la normativa de las mismas.',
        'Guardar, cuando proceda, confidencialidad de la información recibida y conocida en el desarrollo de su actividad voluntaria.',
        'Rechazar cualquier contraprestación material que pudieran recibir bien del beneficiario/a o de otras personas relacionadas con su acción.',
        'Respetar los derechos de los beneficiarios/as de su actividad voluntaria.',
        'Actuar de forma diligente y solidaria.',
        'Participar en las tareas formativas previstas por la organización de modo concreto para las actividades y funciones confiadas, así como las que con carácter permanente se precisen para mantener la calidad de los servicios que presten.',
        'Seguir las instrucciones adecuadas a los fines que se impartan en el desarrollo de las actividades encomendadas.',
        'Utilizar debidamente la acreditación y distintivos de la organización.',
        'Respetar y cuidar los recursos materiales que pongan a su disposición las organizaciones.',
        'En el caso de las personas que participen en actividades de voluntariado que impliquen contacto habitual con menores, deberán acreditar no haber sido condenadas definitivamente por delitos contra la libertad, indemnidad sexual, trata y explotación de menores. Para ello deberán aportar una certificación negativa del Registro Central de delitos sexuales.'
    ]
    let deberes_deberes = []
    for (let i = 0; i < deberes.length; i++) {
        let d = {
            id_tipo: 2,
            descripcion: deberes[i],
            activo: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        deberes_deberes.push(d)
    }
    for (let i = 0; i < derechos.length; i++) {
        let d = {
            id_tipo: 1,
            descripcion: derechos[i],
            activo: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        deberes_deberes.push(d)
    }
    return deberes_deberes
}

module.exports = {
    crear_tipos,
    crear_derechos_deberes
}