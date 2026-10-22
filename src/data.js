// Contenido tomado de la guía periodística (Excel) y del texto informativo (PDF).

export const proyecto = {
  titulo: 'Los sueños que no llegaron a jugar',
  slogan: 'Detrás de cada cifra existe una infancia que merecía seguir soñando',
  problematica:
    'Mientras Bogotá avanza en múltiples indicadores sociales, miles de niños y adolescentes continúan siendo víctimas de violencia física, sexual, psicológica y familiar. Los datos muestran que muchos de estos delitos ocurren en espacios que deberían ser seguros: hogares, escuelas y entornos cercanos. Aunque existen mecanismos de protección, muchos casos no son denunciados, lo que dificulta la prevención y el acceso a la justicia.',
}

export const medios = [
  {
    id: 'podcast',
    formato: 'Podcast',
    icono: 'microfono',
    titulo: 'La experiencia cuenta historias que también pueden salvar vidas',
    youtube: 'TgIz4TAAAMw',
    w: {
      '¿Qué es?':
        'Un podcast basado en una entrevista a un policía pensionado de la Policía Nacional que trabajó durante 15 años en el área de Infancia y Adolescencia. A través de su experiencia profesional comparte conocimientos, relatos de casos y reflexiones sobre los delitos que afectan a niños, niñas y adolescentes.',
      '¿Por qué?':
        'Para brindar una perspectiva profesional sobre la atención de estos casos, sensibilizar a la audiencia y orientar a las víctimas y sus familias sobre los canales de apoyo y las rutas de atención disponibles.',
      '¿Cuándo?':
        'Se desarrolla a partir de la experiencia acumulada por el entrevistado durante sus 15 años de servicio, en contacto directo con casos que marcaron su trayectoria.',
      '¿Dónde?':
        'En formato sonoro: un espacio de conversación en el que el entrevistado comparte experiencias, relatos y recomendaciones para proteger a la niñez y la adolescencia.',
    },
    preguntas: [
      '¿Qué es lo más difícil que ha visto en su trabajo protegiendo a niños, niñas y adolescentes en Bogotá?',
      '¿Cuáles son hoy los delitos que más están afectando a nuestros niños y adolescentes, tanto en las calles como en internet?',
      'Cuando un menor es víctima de un delito, ¿cómo cambia su vida y la de su familia?',
      '¿Qué señales nunca debemos ignorar y que podrían indicar que un niño está siendo víctima de violencia, abuso o explotación?',
      'Muchas personas sospechan que algo está pasando, pero no denuncian. ¿Por qué es tan importante actuar a tiempo y cómo puede hacerlo cualquier ciudadano?',
      'Si pudiera dejar un solo mensaje a los padres, docentes y ciudadanos de Bogotá para proteger a nuestros niños, ¿cuál sería?',
    ],
  },
  {
    id: 'entrevista',
    formato: 'Entrevista',
    icono: 'camara',
    titulo: 'Detrás de cada cifra existe una voz que merece ser escuchada',
    youtube: 'WWGLA6vL2yg',
    w: {
      '¿Qué es?':
        'Una entrevista audiovisual a una mujer víctima del conflicto y del maltrato durante su vida, que comparte su historia personal para visibilizar las experiencias de muchas víctimas y generar conciencia.',
      '¿Por qué?':
        'Para dar a conocer una historia real de violencia y maltrato, sensibilizar sobre sus consecuencias en la vida de las víctimas y promover la reflexión sobre la protección de la niñez y la adolescencia.',
      '¿Cuándo?':
        'La historia inicia cuando la entrevistada tenía 6 años, en 2007. La entrevista se realiza en la actualidad para reconstruir y comunicar los hechos vividos.',
      '¿Dónde?':
        'En un parque: un entorno tranquilo que genera confianza para que la entrevistada relate su historia de manera abierta y segura.',
    },
    preguntas: [
      '¿Quién eras antes de vivir esta situación y cuáles eran tus sueños para el futuro?',
      '¿Cuándo entendiste que lo que estabas viviendo era violencia y qué fue lo más difícil de afrontar?',
      '¿Cómo afectó esa experiencia tu autoestima, tu salud mental y la forma en que veías la vida?',
      '¿Qué te llevó a buscar ayuda y quién estuvo a tu lado cuando más lo necesitabas?',
      '¿Cómo lograste transformar el dolor en fortaleza y qué aprendizaje te dejó este proceso?',
      '¿Qué le dirías a una persona que está viviendo violencia intrafamiliar y siente que no tiene salida?',
    ],
  },
  {
    id: 'interactivo',
    formato: 'Interactivo',
    icono: 'conversacion',
    titulo: '¿Qué ves cuando miras esta realidad?',
    youtube: 'tNsknlz5oP8',
    w: {
      '¿Qué es?':
        'Una actividad basada en la entrega de volantes con la imagen del proyecto. A partir de esa imagen se pregunta a los ciudadanos qué interpretación hacen de ella y qué mensaje les transmite.',
      '¿Por qué?':
        'Para generar conciencia y reflexión sobre la situación de muchos niños, niñas y adolescentes en Bogotá, y que las personas expresen sus opiniones, sentimientos y nivel de conocimiento frente a la problemática.',
      '¿Cuándo?':
        'Durante la ejecución del proyecto transmedia, tomando como punto de partida las cifras y hallazgos de la base de datos.',
      '¿Dónde?':
        'En espacios públicos de Bogotá, conversando directamente con las personas en la calle sobre la protección de la infancia y la adolescencia.',
    },
  },
]

export const cifrasClave = [
  { valor: 13228, etiqueta: 'casos registrados en Bogotá entre enero y junio de 2026' },
  { valor: 12031, etiqueta: 'ocurrieron en vías públicas' },
  { valor: 1156, etiqueta: 'casos de inasistencia alimentaria' },
  { valor: 763, etiqueta: 'amenazas contra niños, niñas y adolescentes' },
]

export const infografia = {
  titulo: 'La infancia también es Bogotá',
  descripcion:
    'Una infografía que presenta de manera visual las principales estadísticas sobre los delitos contra niños, niñas y adolescentes en Bogotá: tipos de delito, grupos de edad, distribución por sexo y las localidades con más casos (Kennedy, Bosa, Ciudad Bolívar, Suba y Engativá).',
}

// Cada párrafo puede llevar una ilustración y una cifra destacada.
export const texto = {
  titulo: 'Bogotá en cifras: la realidad detrás de la infancia vulnerada',
  entradilla:
    'Con base en los 13.228 casos registrados en Bogotá, se identifican otros hallazgos relevantes que ayudan a comprender mejor la situación de los delitos que afectan a niños, niñas y adolescentes.',
  bloques: [
    {
      cifra: 12031,
      etiqueta: 'casos en vías públicas',
      parrafos: [
        'Según la base de datos Delitos Contra Niños y Adolescentes, la mayoría de los casos fueron reportados en vías públicas, donde se concentraron 12.031 registros, lo que evidencia que gran parte de los hechos ocurre en espacios abiertos y de circulación cotidiana.',
        'Entre esas cifras podría encontrarse la historia de Mateo, un niño de 11 años que caminaba solo hacia su casa después de salir del colegio. Una tarde fue abordado por varios jóvenes que lo intimidaron y le quitaron sus pertenencias. Desde entonces dejó de recorrer el mismo camino y comenzó a sentir inseguridad cada vez que salía solo a la calle.',
      ],
    },
    {
      cifra: 354,
      etiqueta: 'casos en establecimientos educativos',
      imagen: { src: '/img/valentina.jpg', alt: 'Ilustración de una niña que sufre burlas de sus compañeros en el colegio' },
      parrafos: [
        'Los establecimientos educativos aparecen como el segundo tipo de lugar con mayor número de reportes, con 354 casos, seguidos por las casas de habitación, con 184 registros.',
        'Es el caso de Valentina, una niña de 10 años que comenzó a recibir constantes burlas y agresiones por parte de algunos compañeros. Lo que alguna vez fue un lugar de aprendizaje se convirtió en un espacio que le generaba temor y ansiedad cada mañana antes de asistir a clases.',
      ],
    },
    {
      cifra: 1156,
      etiqueta: 'casos de inasistencia alimentaria',
      imagen: { src: '/img/samuel.jpg', alt: 'Ilustración de un niño que desayuna solo mientras su madre trabaja' },
      parrafos: [
        'Al revisar los delitos registrados, además de los principales hechos destacados en la infografía, sobresalen 1.156 casos de inasistencia alimentaria.',
        'Detrás de esta cifra podría estar la historia de Samuel, de 8 años, cuya madre trabajaba largas jornadas para sostener el hogar porque el responsable de su manutención dejó de aportar económicamente. En muchas ocasiones Samuel tuvo que asistir al colegio sin haber desayunado y dependía del refrigerio escolar para alimentarse durante el día.',
      ],
    },
    {
      cifra: 1136,
      etiqueta: 'casos de hurto a personas',
      imagen: { src: '/img/laura.jpg', foco: '50% 25%', alt: 'Ilustración de una adolescente usando su celular' },
      parrafos: [
        'También se reportaron 1.136 casos de hurto a personas. Entre ellos podría encontrarse Laura, una adolescente de 14 años que fue víctima del robo de su celular cuando regresaba a casa. Aunque el objeto pudo reemplazarse, la sensación de vulnerabilidad permaneció durante mucho tiempo y cambió la forma en que se desplazaba por su barrio.',
      ],
    },
    {
      cifra: 763,
      etiqueta: 'amenazas registradas',
      imagen: { src: '/img/andres.jpg', alt: 'Ilustración de un niño preocupado con siluetas amenazantes detrás' },
      parrafos: [
        'Las 763 amenazas registradas reflejan situaciones que generan miedo y afectan el desarrollo emocional de las víctimas.',
        'Un ejemplo podría ser Andrés, de 13 años, quien recibió mensajes intimidantes después de denunciar actos de violencia en su entorno. Durante semanas evitó salir a jugar con sus amigos y comenzó a limitar sus actividades por temor a que las amenazas se hicieran realidad.',
      ],
    },
    {
      cifra: 228,
      etiqueta: 'casos de ejercicio arbitrario de la custodia',
      parrafos: [
        'Otro dato relevante corresponde a los 228 casos relacionados con el ejercicio arbitrario de la custodia de menores de edad. Detrás de esta cifra podría estar Sofía, una niña de 9 años que, tras la separación de sus padres, fue alejada de uno de ellos sin una decisión legal que lo justificara. Durante meses no pudo ver ni comunicarse con esa persona, situación que afectó su estabilidad emocional y sus relaciones familiares.',
        'La base de datos también registra delitos como acoso sexual, pornografía con menores, acto sexual violento y acceso carnal abusivo con menores de 14 años, situaciones que representan graves vulneraciones de los derechos de la infancia. Entre estas cifras podría encontrarse Camila, una adolescente cuya confianza y bienestar fueron afectados después de que una persona aprovechara su vulnerabilidad. Con el acompañamiento de profesionales y el apoyo de su familia, logró iniciar un proceso de recuperación y reconstrucción de su proyecto de vida.',
      ],
    },
  ],
  cierre: {
    imagen: { src: '/img/cierre.jpg', alt: 'Ilustración de una familia campesina desplazada con sus hijos' },
    parrafos: [
      'En cuanto a la nacionalidad de las víctimas, la gran mayoría de los registros no especifica este dato. Sin embargo, dentro de los casos donde sí existe información, predominan víctimas de nacionalidad colombiana, seguidas por reportes de nacionalidad venezolana.',
      'Estas cifras permiten entender que la problemática va mucho más allá de un único tipo de delito. Los registros evidencian situaciones de violencia, vulneración de derechos, abandono, amenazas y diversos riesgos que afectan el desarrollo integral de la infancia y la adolescencia. Las historias de Mateo, Valentina, Samuel, Laura, Andrés, Sofía y Camila son ficticias, pero representan situaciones que podrían estar ocurriendo detrás de cada una de las cifras registradas en Bogotá.',
    ],
    remate:
      'Porque detrás de cada número no hay un dato estadístico: hay una infancia que merece crecer segura, protegida y con la oportunidad de seguir soñando.',
  },
}

export const glosario = [
  ['Niñez y adolescencia', 'Etapa de vida de los menores de 18 años que requiere protección especial por parte de la familia, la sociedad y el Estado.'],
  ['Delitos contra menores', 'Conductas que vulneran los derechos de niños, niñas y adolescentes, como el abuso, la explotación, el maltrato o la violencia.'],
  ['Factores de riesgo', 'Situaciones que aumentan la probabilidad de que un menor sea víctima de un delito, como la violencia familiar, la falta de supervisión o la pobreza.'],
  ['Factores de protección', 'Recursos, personas o instituciones que ayudan a prevenir o reducir los riesgos de violencia.'],
  ['Impacto emocional', 'Consecuencias psicológicas y sociales que sufren las víctimas y sus familias tras un hecho delictivo.'],
  ['Señales de alerta', 'Cambios en el comportamiento, miedo, aislamiento o bajo rendimiento escolar que pueden indicar una situación de riesgo.'],
  ['Denuncia ciudadana', 'Acción de informar a las autoridades sobre posibles delitos para proteger a los menores y facilitar la investigación.'],
  ['Violencia intrafamiliar', 'Cualquier acción de maltrato físico, psicológico, verbal, económico o sexual que ocurre dentro del entorno familiar.'],
  ['Víctima', 'Persona que sufre daños o afectaciones como consecuencia de la violencia.'],
  ['Autoestima', 'Valoración y percepción que una persona tiene de sí misma.'],
  ['Salud mental', 'Estado de bienestar emocional, psicológico y social que influye en la forma de pensar, sentir y actuar.'],
  ['Recuperación', 'Proceso mediante el cual una persona supera los efectos de la violencia y reconstruye su proyecto de vida.'],
]

export const lineas = [
  ['141', 'ICBF — Línea gratuita de protección a niños, niñas y adolescentes'],
  ['123', 'Línea única de emergencias (Policía)'],
  ['106', 'Línea de escucha para niños, niñas y adolescentes en Bogotá'],
  ['122', 'Fiscalía General de la Nación — denuncias'],
]
