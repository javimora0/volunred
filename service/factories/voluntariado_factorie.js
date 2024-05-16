const crear_tipos_voluntariado = async () => {
    let tipos_voluntariado = ['ambiental', 'comunitario', 'cultural', 'deportivo', 'educativo', 'internacional', 'ocio y tiempo libre', 'protección civil', 'socio-sanitario', 'social']
    let descripciones = [
        '¿Te interesa la protección y recuperación de especies o espacios naturales? ¿El cuidado de los animales? ¿El desarrollo de una conciencia medioambiental? Con el voluntariado ambiental puedes implicarte directamente en la conservación del medio ambiente y la sensibilización de la población respecto a la naturaleza, la sostenibilidad y el equilibrio ecológico del planeta. En este campo hay proyectos de acción local y proyectos globales de ámbito internacional.',
        'Mediante el voluntariado comunitario se promueven y se participa en movimientos cívicos, vecinales, colectivos y de participación ciudadana para el desarrollo y la cohesión de la comunidad. Participando en proyectos de voluntariado comunitario puedes incidir en tu propia comunidad mediante actividades educativas, de ocio y tiempo libre, recreativas, deportivas, culturales…',
        'En le marco del voluntariado cultural puedes participar en proyectos muy diversos relacionados con trabajos de recuperación, conservación o difusión de la identidad cultural e histórica, la promoción de la creatividad y la difusión de los bienes culturales y el patrimonio histórico. En este contexto, puedes ser voluntario/a en un museo, en actos festivos de la comunidad, en una excavación arqueológica, en una biblioteca, en un monumento histórico…',
        '¿Te gustaría participar en la organización de eventos deportivos? ¿O colaborar en un club deportivo en sus actividades periódicas? El voluntariado deportivo favorece la integración social de las personas de una comunidad y te ofrece, como voluntario/a, la posibilidad de vincularte con el deporte mediante tu acción altruista. ¿Te animas?',
        'Si te gusta la educación, embárcate en la aventura del voluntariado educativo. Puedes participar en la educación de niños y niñas, jóvenes y adultos mediante programas de apoyo a la lectura, apoyo escolar, alfabetización, educación inclusiva, educación en el tiempo libre, actividades de la comunidad escolar, asociaciones de padres y madres de alumnos…. ¿Te atreves?',
        'Una manera de hacer voluntariado internacional es la cooperación al desarrollo, que favorece la promoción socioeconómica o desarrollo comunitario para luchar contra la pobreza y mejorar las condiciones de vida de una comunidad o un sector social concreto. Como voluntario/a o cooperante puedes trabajar en la sede de la organización o te puedes plantear una estancia corta o de larga duración sobre el terreno. Las organizaciones que desarrollan programas de voluntariado internacional o cooperación al desarrollo tienen cursos y formaciones específicas.',
        '¿Te gustaría acompañar a los niños y niños de colonias? ¿Promover actividades de ocio para la integración social de personas con riesgo de exclusión? Las entidades que desarrollan programas de voluntariado en el ocio y el tiempo libre promueven actividades socio-educativas, culturales, deportivas e incluso actividades relacionadas con el medio ambiente con el fin de potenciar la educación y el desarrollo comunitario.',
        'El voluntariado de protección civil y ayuda humanitaria da respuesta y socorro en situaciones de emergencia como son catástrofes naturales, guerras, atentados, accidentes,… Las tareas que pueden realizarse en un contexto de emergencia son muy variadas; desde asistencia y apoyo básico inmediato hasta actuaciones médicas, apoyo psicológico, reparto de alimentos, reconstrucción de viviendas...',
        'Hay muchas organizaciones de voluntariado que trabajan para mejorar la calidad de vida de las personas afectadas por una enfermedad, ya sea aguda o crónica, así como para dar apoyo a los familiares de enfermos, promover la donación y trasplantes de sangre y de órganos, participar en la asistencia domiciliaria y hospitalaria, ejecutar programas de sensibilización, promoción de la salud y hábitos de vida saludables… ¿Te animas a probar esta experiencia?',
        'El voluntariado social es uno de los más desarrollados en nuestra sociedad. Es un tipo de voluntariado muy cercano a las personas destinatarias de los proyectos: personas con adicciones, personas discapacitadas, niños y niñas, jóvenes, familias, inmigrantes y refugiados/as, reclusos/as y ex-reclusos/as, personas sin hogar, personas mayores…'
    ]
    let retornar = []
    for (let i = 0; i < tipos_voluntariado.length - 1; i++) {
        let tv = {
            categoria: tipos_voluntariado[i],
            descripcion: descripciones[i],
            nombre_imagen: 'tipo_voluntariado',
            extension_imagen: '.jpg',
            activa: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        retornar.push(tv)
    }
    return retornar
}

module.exports = {
    crear_tipos_voluntariado
}