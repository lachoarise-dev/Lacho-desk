export type PathId = "ebook" | "vet" | "code";

export type DayMission = {
  day: number;
  week: number;
  month: number;
  weekday: string;
  rank: "S" | "A" | "C";
  arc: string;
  focus: string;
  vet: string;
  ebook: string;
  code: string;
  recall: string;
  review: string[];
  deliverables: string[];
};

export const pathMeta: Record<PathId, { icon: string; title: string; hex: string; label: string }> = {
  ebook: { icon: "📕", title: "Ebook Solo System", hex: "#22d3ee", label: "Lanzamiento" },
  vet: { icon: "🩺", title: "Veterinaria", hex: "#10b981", label: "Dominio clinico" },
  code: { icon: "💻", title: "Programacion", hex: "#8b5cf6", label: "Construccion" },
};

export const learningProtocols: Record<
  PathId,
  {
    title: string;
    objective: string;
    phases: { name: string; minutes: number; action: string; proof: string }[];
    definitionOfDone: string[];
    exitTest: string;
  }
> = {
  vet: {
    title: "Veterinaria: de leer a dominar",
    objective: "Convertir cada tema del curso IPS en habilidad explicable y aplicable en clinica.",
    phases: [
      { name: "Entrada", minutes: 35, action: "Lee 8-12 paginas o mira una clase IPS", proof: "Subraya solo 5 ideas clave" },
      { name: "Procesamiento", minutes: 20, action: "Haz un resumen de 1 pagina o mapa mental", proof: "Incluye definiciones, signos, materiales y pasos" },
      { name: "Recuperacion", minutes: 20, action: "Cierra todo y explica el tema en voz alta", proof: "Graba audio de 2 min o dilo frente al espejo" },
      { name: "Evaluacion", minutes: 15, action: "Responde preguntas y crea flashcards", proof: "10 tarjetas Anki + 5 preguntas sin mirar" },
    ],
    definitionOfDone: [
      "Leiste el bloque asignado del libro actual.",
      "Creaste minimo 10 flashcards nuevas o repasaste 30 antiguas.",
      "Explicaste el tema sin apuntes durante 2 minutos.",
      "Respondiste 5 preguntas de control con 80% de acierto.",
      "Relacionaste el tema con una situacion de clinica real.",
    ],
    exitTest: "Si no puedes explicarlo a un tutor de mascota con palabras simples, aun no esta aprendido.",
  },
  ebook: {
    title: "Ebook: publicar, medir y aprender",
    objective: "Usar cada pieza de contenido como experimento para atraer comunidad y vender el ebook.",
    phases: [
      { name: "Hipotesis", minutes: 10, action: "Define que hook o formato vas a probar", proof: "Una frase: creo que X generara Y" },
      { name: "Produccion", minutes: 50, action: "Crea el Reel, carrusel o story", proof: "Archivo listo en Canva/CapCut" },
      { name: "Publicacion", minutes: 20, action: "Publica o programa el contenido", proof: "Link, captura o borrador programado" },
      { name: "Lectura", minutes: 15, action: "Revisa guardados, comentarios, DMs y retencion", proof: "Una leccion anotada" },
    ],
    definitionOfDone: [
      "La pieza tiene un hook claro en los primeros 2 segundos o primera linea.",
      "Incluye una idea util, una historia o una transformacion concreta.",
      "Tiene CTA simple: comentar, guardar, entrar a waitlist o comprar.",
      "Fue publicada/programada o quedo lista para publicar mañana.",
      "Registraste una metrica y una leccion del experimento.",
    ],
    exitTest: "Si el contenido no tiene funcion (atraer, educar, conectar, convertir o retener), no se publica aun.",
  },
  code: {
    title: "Programacion: aprender construyendo",
    objective: "Estudiar solo lo necesario para crear features reales de la app Solo System.",
    phases: [
      { name: "Concepto", minutes: 25, action: "Aprende un concepto puntual", proof: "Apunte de 5 lineas con ejemplo" },
      { name: "Aplicacion", minutes: 45, action: "Usalo en una mini feature", proof: "Algo visible en pantalla" },
      { name: "Debug", minutes: 25, action: "Rompe, prueba y corrige", proof: "Error documentado si aparece" },
      { name: "Consolidacion", minutes: 15, action: "Pide revision a Claude/Gemini/DeepSeek", proof: "1 mejora aplicada o anotada" },
    ],
    definitionOfDone: [
      "La feature corre sin errores visibles.",
      "Puedes explicar que hace cada parte importante del codigo.",
      "Guardaste el aprendizaje en tu bitacora.",
      "Si hubo error, anotaste causa y solucion.",
      "Hiciste commit o copia de seguridad del avance.",
    ],
    exitTest: "Si solo viste tutorial y no construiste nada, fue consumo; si funciona en pantalla, fue aprendizaje.",
  },
};

export const spacedRepetition = [
  { offset: 0, label: "Dia 0", action: "Tema nuevo + flashcards base" },
  { offset: 1, label: "Dia 1", action: "Repaso rapido de 10 min" },
  { offset: 3, label: "Dia 3", action: "Flashcards + explicacion sin mirar" },
  { offset: 7, label: "Dia 7", action: "Test corto y correccion" },
  { offset: 14, label: "Dia 14", action: "Caso practico o mini proyecto" },
  { offset: 30, label: "Dia 30", action: "Repaso global + mapa mental" },
];

export const energyDays = [
  {
    rank: "Completo",
    when: "Alta energia y dia libre completo",
    rule: "Plan completo: sesion enfocada de 3h + complementos + review.",
    minimum: "Completa al menos 1 prueba de salida y 3 microtareas.",
  },
  {
    rank: "Normal",
    when: "Energia normal o algun imprevisto",
    rule: "70% del plan: sesion principal de 2h + 1 complemento.",
    minimum: "1 prueba de salida + 1 microtarea.",
  },
  {
    rank: "Minimo",
    when: "Cansancio, tramite, mal dia o saturacion",
    rule: "Cadena minima: 30 min de estudio enfocado + 10 min review.",
    minimum: "No dejar el dia en cero. Mantener la cadena.",
  },
];

const cc = (n:number, t:string, l:string, s:string, q:string[], ch:string[]) => ({num:n,title:t,level:l,scenario:s,questions:q,checklist:ch});
export const clinicalCases = [
  cc(1,"Perro con vomitos y diarrea","Base","Perro adulto con vomitos, diarrea y decaimiento desde ayer. Tutor nervioso.",["Preguntas al tutor?","Signos sin diagnosticar?","Material para consulta?","Datos para historia?"],["Vacunas","Frecuencia","Apetito","Temperatura","Peso"]),
  cc(2,"Gato para esterilizacion","Cirugia","Gato en ayunas para cirugia programada.",["Confirmar con tutor?","Material quirofano?","Vigilar recuperacion?","Indicaciones postop?"],["Ayuno","Consentimiento","Peso","Calor","Esteril","Jaula"]),
  cc(3,"Cachorro sin vacunas","Prevencion","Cachorro para primera revision. Tutor no sabe calendario vacunal.",["Datos basicos?","Limites del asistente?","Material prevencion?","Educar sin diagnosticar?"],["Edad","Peso","Cartilla","Desparasitacion","Alimentacion"]),
  cc(4,"Herida superficial","Asistente","Perro con herida superficial tras paseo. Vet pide preparacion.",["Preparar antes de manipular?","Sujecion segura?","Signos de alerta?","Residuos y limpieza?"],["Guantes","Gasas","Suero","Bozal","Contenedor"]),
  cc(5,"Intoxicacion por chocolate","Urgencia","Cachorro comio chocolate hace 2h. Tutor llama desde casa.",["Preguntas urgentes?","Cantidad y tipo chocolate?","Signos a vigilar?","Protocolo urgencia?"],["Peso","Hora ingesta","Tipo chocolate","FC","Temperatura"]),
  cc(6,"Gato con dificultad respiratoria","Urgencia","Gato con respiracion agitada y boca abierta. Llega en transportin.",["Observar sin manipular?","Material oxigeno?","Posicion del animal?","Comunicar al vet?"],["Frecuencia resp","Mucosas","Postura","Oxigeno","Jaula calma"]),
  cc(7,"Perro con convulsiones","Urgencia","Perro convulsiona en sala de espera. Tutores asustados.",["Seguridad inmediata?","Que NO hacer?","Cronometrar?","Material post-crisis?"],["No sujetar boca","Cronometro","Apartar objetos","Oscuridad","Vena"]),
  cc(8,"Perra gestante con distocia","Cirugia","Perra con contracciones 3h sin expulsar cachorro.",["Preguntas al tutor?","Preparar cesarea?","Material neonatal?","Registrar tiempos?"],["Quirofano","Material neonatal","Calor","Aspirador","Hilo"]),
  cc(9,"Perro geriatrico decaido","Consulta","Perro de 14 años que no come hace 3 dias. Pierde peso.",["Anamnesis geriatrica?","Signos vitales prioritarios?","Muestras a preparar?","Apoyo emocional tutor?"],["Peso comparativo","Mucosas","Hidratacion","Tubos analitica","Orina"]),
  cc(10,"Gato con obstruccion urinaria","Urgencia","Gato macho que no orina hace 24h. Maulla en el arenero.",["Signos de obstruccion?","Palpacion vejiga?","Material sondaje?","Registros?"],["FC","Vejiga","Sonda","Suero","Sedacion"]),
  cc(11,"Otitis en perro","Consulta","Perro se rasca oreja constantemente. Olor fuerte.",["Observar antes de tocar?","Material otoscopia?","Toma de muestra otica?","Limpieza preparar?"],["Otoscopio","Hisopo","Portaobjetos","Limpiador otico","Sujecion"]),
  cc(12,"Perro atropellado","Urgencia","Perro atropellado traido en brazos. Consciente pero no se levanta.",["Prioridades ABC?","Inmovilizacion?","Material urgencia?","Registrar para vet?"],["Tablilla","Vendas","Via venosa","Analgesico","Radiografia"]),
  cc(13,"Gato con vomitos cronicos","Consulta","Gato vomita 3-4 veces/semana desde hace 1 mes.",["Frecuencia y tipo vomito?","Dieta actual?","Cambios recientes?","Muestras?"],["Peso","Palpacion","Analitica","Dieta","Ecografia"]),
  cc(14,"Cachorro con parvovirosis","Aislamiento","Cachorro con diarrea hemorragica. Sin vacunas.",["Protocolo aislamiento?","Bioseguridad?","Fluidoterapia?","Desinfeccion?"],["Guantes dobles","Bata","Lejia","Gotero","Aislamiento"]),
  cc(15,"Perro con cuerpo extraño","Cirugia","Perro comio hueso de pollo. Radiografia confirma CE.",["Preparar cirugia?","Ayuno?","Material?","Recuperacion?"],["Quirofano","Anestesia","Radiografia","Fluidoterapia","Ayuno"]),
  cc(16,"Hemograma: anemia","Laboratorio","Hemograma de perro geriatrico. Hematocrito 18%, hemoglobina baja.",["Que indica hematocrito bajo?","Signos clinicos esperables?","Preparar transfusion?","Pruebas adicionales?"],["Hematocrito","Hemoglobina","Reticulocitos","Grupo sanguineo","Frotis"]),
  cc(17,"Hemograma: leucocitosis","Laboratorio","Hemograma de gato con fiebre. Leucocitos 35000.",["Que indica leucocitosis?","Tipos de leucocitos?","Diferencial?","Relacion con infeccion?"],["Leucocitos totales","Neutrofilos","Linfocitos","Monocitos","Bandas"]),
  cc(18,"Bioquimica: insuficiencia renal","Laboratorio","Bioquimica de gato de 15 años. Creatinina 5.2, BUN 120.",["Que indican estos valores?","Estadio IRIS?","Hidratacion?","Dieta renal?"],["Creatinina","BUN/Urea","Fosforo","Potasio","Densidad orina"]),
  cc(19,"Bioquimica: hepatopatia","Laboratorio","Bioquimica de perro. ALT 450, FA 800, bilirrubina elevada.",["Que organo afectado?","Signos clinicos?","Ecografia?","Pruebas complementarias?"],["ALT","FA","GGT","Bilirrubina","Albumina"]),
  cc(20,"Analisis orina: cristales","Laboratorio","Sedimento urinario de gato con cristales de estruvita.",["Que son cristales estruvita?","pH de la orina?","Relacion con dieta?","Prevencion?"],["pH","Densidad","Cristales","Bacterias","Sangre"]),
  cc(21,"Analisis orina: glucosuria","Laboratorio","Orina de perro con glucosa positiva y densidad alta.",["Que indica glucosa en orina?","Relacion con diabetes?","Glucemia?","Cetonuria?"],["Tira reactiva","Glucosa","Cetonas","Densidad","Proteinas"]),
  cc(22,"Perro con cojera","Consulta","Perro cojea de pata delantera derecha desde ayer.",["Observar en movimiento?","Palpacion con vet?","Material radiografia?","Vendaje?"],["Observacion","Radiografia","Vendaje","Antiinflamatorio","Reposo"]),
  cc(23,"Gato con alopecia","Dermatologia","Gato con zonas sin pelo en cabeza y orejas.",["Lampara de Wood?","Raspado cutaneo?","Cultivo?","Aislamiento?"],["Lampara Wood","Bisturi raspado","Medio cultivo","Guantes","DTM"]),
  cc(24,"Perro con tos","Consulta","Perro con tos seca desde hace 1 semana. Vacunas al dia.",["Tipo de tos?","Auscultacion?","Radiografia torax?","Ambiente?"],["Fonendo","Radiografia","Temperatura","Ambiente","Contacto otros perros"]),
  cc(25,"Tortuga con caparazon blando","Exoticos","Tortuga terrestre con caparazon blando y letargica.",["Alimentacion?","Iluminacion UVB?","Calcio?","Temperatura?"],["Dieta","Lampara UVB","Calcio","Temperatura","Peso"]),
  cc(26,"Conejo con diarrea","Exoticos","Conejo con heces liquidas y abdomen distendido.",["Dieta actual?","Heno disponible?","Estres reciente?","Temperatura?"],["Heno","Pellets","Hidratacion","Peso","Temperatura"]),
  cc(27,"Perro con garrapatas","Prevencion","Perro lleno de garrapatas. Tutor no usa antiparasitario.",["Extraccion correcta?","Desparasitacion?","Enfermedades transmitidas?","Educacion tutor?"],["Pinzas","Desparasitario","Analitica Ehrlichia","Ficha","Calendario"]),
  cc(28,"Gato con pelea","Cirugia","Gato con absceso por mordedura de pelea callejera.",["Preparar drenaje?","Material limpieza?","Antibiotico?","Test FIV/FeLV?"],["Sedacion","Bisturi","Drenaje","Antibiotico","Test rapido"]),
  cc(29,"Perro diabetico","Consulta","Perro diagnosticado diabetico. Control mensual.",["Curva glucemia?","Preparar material?","Registrar valores?","Educacion tutor?"],["Glucometro","Tiras","Jeringa insulina","Registro horario","Dieta"]),
  cc(30,"Hemograma: trombocitopenia","Laboratorio","Hemograma con plaquetas 25000. Perro con petequias.",["Que indica plaquetas bajas?","Riesgo hemorragia?","Causas posibles?","Manejo?"],["Plaquetas","Frotis","Petequias","Hematocrito","Test Ehrlichia"]),
  cc(31,"Gato con ictericia","Consulta","Gato con mucosas amarillas y letargia.",["Causas ictericia?","Pre o post hepatica?","Analitica urgente?","Ecografia?"],["Mucosas","Bilirrubina","ALT","Hematocrito","Ecografia"]),
  cc(32,"Perro con abdomen agudo","Urgencia","Perro con abdomen tenso, dolor y vomitos improductivos.",["Torsion gastrica?","Radiografia urgente?","Via venosa?","Preparar cirugia?"],["Radiografia","Via","Suero","Sonda","Quirofano"]),
  cc(33,"Bioquimica: pancreatitis","Laboratorio","Bioquimica de perro. Lipasa elevada, amilasa normal.",["Que indica lipasa alta?","SNAP cPL?","Ecografia?","Dieta?"],["Lipasa","Amilasa","cPL","Ecografia","Fluidoterapia"]),
  cc(34,"Gato con fiebre","Consulta","Gato con 40.5°C y decaimiento. Sin signos claros.",["Causas fiebre en gato?","Analitica?","Test rapidos?","Hidratacion?"],["Temperatura","Hemograma","Test FIV/FeLV","Bioquimica","Suero"]),
  cc(35,"Perro con epilepsia","Neurologia","Perro con crisis epilepticas recurrentes.",["Registro de crisis?","Medicacion?","Niveles plasmaticos?","Educacion tutor?"],["Diario crisis","Fenobarbital","Niveles","Peso","Higado"]),
  cc(36,"Analisis orina: proteinuria","Laboratorio","Orina de perro con proteinas +++. Densidad 1.020.",["Que indica proteinuria?","Ratio UPC?","Relacion con riñon?","Seguimiento?"],["Proteinas","Densidad","UPC","Creatinina","Presion arterial"]),
  cc(37,"Gato con masa abdominal","Consulta","Gato con palpacion abdominal anormal. Perdida peso.",["Ecografia?","Citologia?","Analitica completa?","Preparar biopsia?"],["Ecografia","Aguja fina","Portaobjetos","Analitica","Quirofano"]),
  cc(38,"Perro con piometra","Cirugia","Perra con flujo vulvar purulento y fiebre.",["Urgencia quirurgica?","Analitica prequirurgica?","Fluidoterapia?","Preparar OVH?"],["Hemograma","Bioquimica","Via","Suero","Quirofano"]),
  cc(39,"Hemograma: policitemia","Laboratorio","Hemograma con hematocrito 65%. Perro con mucosas rojas.",["Que indica hematocrito alto?","Deshidratacion vs policitemia?","Proteinas totales?","Gasometria?"],["Hematocrito","Proteinas","Mucosas","Gasometria","Hidratacion"]),
  cc(40,"Gato con FIV positivo","Consulta","Test rapido FIV positivo en gato de 3 años adoptado.",["Confirmar test?","Pronostico?","Manejo?","Educacion tutor?"],["Test SNAP","Confirmatorio","Hemograma","Bioquimica","Entorno indoor"]),
  cc(41,"Perro con leishmaniosis","Consulta","Perro con alopecia periocular y perdida peso en zona endemica.",["Test rapido?","Proteinograma?","Estadio clinico?","Tratamiento?"],["Test Leishmania","Proteinograma","Ratio A/G","Funcion renal","Tratamiento"]),
  cc(42,"Bioquimica: hipotiroidismo","Laboratorio","Bioquimica de perro obeso. T4 total baja, colesterol alto.",["Que indica T4 baja?","TSH?","Signos clinicos?","Tratamiento?"],["T4 total","TSH","Colesterol","Trigliceridos","Peso"]),
  cc(43,"Gato con diabetes","Consulta","Gato obeso con poliuria y polidipsia. Glucemia 380.",["Curva glucemia?","Insulina?","Dieta?","Cetoacidosis?"],["Glucometro","Insulina","Cetonuria","Peso","Fructosamina"]),
  cc(44,"Perro con dermatitis atopica","Dermatologia","Perro con prurito cronico, sin pulgas, sin sarcoptes.",["Diagnostico exclusion?","Dieta eliminacion?","Citologia?","Intradermica?"],["Citologia","Raspado","Dieta","Antihistaminico","Intradermica"]),
  cc(45,"Analisis orina: infeccion","Laboratorio","Orina de perra con bacterias +++, leucocitos y sangre.",["Que indica esta orina?","Urocultivo?","Antibiograma?","Cistitis vs pielonefritis?"],["Bacterias","Leucocitos","Eritrocitos","Urocultivo","Ecografia"]),
  cc(46,"Perro con tumor mamario","Cirugia","Perra no esterilizada con nodulo mamario de 3cm.",["Citologia?","Radiografia torax?","Estadificacion?","Cirugia?"],["Citologia","Rx torax","Eco abdomen","Prequirurgico","Quirofano"]),
  cc(47,"Gato con triaditis","Consulta","Gato con vomitos, ictericia leve y dolor abdominal.",["Que organos afecta?","Analitica completa?","Ecografia?","Manejo?"],["Higado","Pancreas","Intestino","Bioquimica","Ecografia"]),
  cc(48,"Hemograma: eosinofilia","Laboratorio","Hemograma de gato con eosinofilos 3500.",["Causas eosinofilia?","Parasitos?","Alergia?","Asma felina?"],["Eosinofilos","Coprologia","Raspado","Rx torax","IgE"]),
  cc(49,"Perro con insuficiencia cardiaca","Consulta","Perro con tos nocturna, intolerancia ejercicio y soplo.",["Auscultacion?","Rx torax?","Ecocardiografia?","Medicacion?"],["Fonendo","Rx torax","ECG","Ecocardiografia","Presion"]),
  cc(50,"Bioquimica: sindrome Cushing","Laboratorio","Bioquimica de perro con alopecia simetrica. FA 1200, colesterol alto, glucosa alta.",["Que indica este perfil?","Prueba supresion?","ACTH?","Ecografia adrenal?"],["FA","Cortisol","ACTH","Ecografia","Densidad orina"]),
];

export const practiceChecklist = [
  {
    area: "Recepcion",
    skills: ["Abrir ficha", "Registrar motivo de consulta", "Pesar animal", "Comunicar tiempos", "Cobro y agenda"],
  },
  {
    area: "Consulta",
    skills: ["Preparar material", "Sujecion segura", "Observar signos", "Asistir exploracion", "Limpiar mesa"],
  },
  {
    area: "Hospitalizacion",
    skills: ["Jaulas limpias", "Agua/comida", "Registro de medicacion supervisada", "Paseos", "Alerta de cambios"],
  },
  {
    area: "Quirofano",
    skills: ["Esterilizacion", "Mesa preparada", "Material ordenado", "Calor en recuperacion", "Limpieza final"],
  },
  {
    area: "Laboratorio",
    skills: ["Muestras identificadas", "Tiras basicas", "Centrifuga supervisada", "Microscopio basico", "Registro de resultados"],
  },
  {
    area: "Trabajo",
    skills: ["CV español", "Carta corta", "Lista de clinicas", "Visita presencial", "Seguimiento semanal"],
  },
];

export const ebookFunnel = {
  stages: [
    { name: "Atraer", metric: "Alcance y retencion", content: "Reels: Si tu vida fuera un RPG..." },
    { name: "Educar", metric: "Guardados", content: "Carruseles: sistema de quests, niveles y habitos" },
    { name: "Conectar", metric: "Comentarios y DMs", content: "Historia personal: Cuba, España, veterinaria y sistema" },
    { name: "Convertir", metric: "Clicks y ventas", content: "Demo del ebook, bonus, avatar interactivo, oferta" },
    { name: "Retener", metric: "Repeticion y comunidad", content: "Retos semanales, plantillas, progresos de usuarios" },
  ],
  contentPillars: [
    "Transformacion: de caos a sistema",
    "RPG life: convertir vida real en progreso visible",
    "Behind the scenes: como creaste el ebook y el avatar",
    "Educacion: habitos, misiones, XP, revision semanal",
    "Comunidad: preguntas, encuestas, retos, historias",
    "Venta: beneficios, testimonios, oferta y FAQ",
  ],
  experimentLoop: ["Hipotesis", "Publicacion", "Metrica", "Leccion", "Iteracion"],
};

export const programmingRoadmap = [
  { month: 1, concept: "HTML, CSS, Tailwind", feature: "Landing editable del ebook", proof: "Hero, CTA, seccion de beneficios y responsive" },
  { month: 2, concept: "JavaScript, DOM y logica", feature: "Calculadora de XP simple", proof: "Botones suman XP y guardan progreso" },
  { month: 3, concept: "React: componentes y estado", feature: "Quest Board modular", proof: "Tareas, filtros y estado por path" },
  { month: 4, concept: "TypeScript, formularios, localStorage", feature: "Bitacora y revision semanal", proof: "Entradas persistentes y validaciones basicas" },
  { month: 5, concept: "Backend simple y base de datos", feature: "Cuenta de usuario y progreso online", proof: "Login o mock conectado a Supabase/Firebase" },
  { month: 6, concept: "Deploy, feedback y version 1.0", feature: "App Solo System publica", proof: "URL compartible + 5 usuarios probandola" },
];

export const masteryMetrics = [
  {
    path: "vet" as PathId,
    effort: "Horas reales, flashcards creadas, videos IPS vistos",
    mastery: "Temas que puedes explicar sin mirar y casos resueltos",
    result: "Tests con 80%+, practicas iniciadas, entrevistas y contrato",
  },
  {
    path: "ebook" as PathId,
    effort: "Piezas creadas, DMs respondidos, horas de comunidad",
    mastery: "Hooks que ya entiendes, formatos que convierten, objeciones resueltas",
    result: "Seguidores, waitlist, ventas, testimonios, comunidad activa",
  },
  {
    path: "code" as PathId,
    effort: "Horas de codigo, commits, errores documentados",
    mastery: "Conceptos que puedes explicar y reutilizar sin copiar",
    result: "Features funcionando, app publicada, usuarios y feedback",
  },
];

export const weeklyReviewByMode: Record<string, { title: string; questions: string[] }[]> = {
  vet: [
    { title: "Estudio", questions: ["Que tema puedo explicar sin mirar?", "Que caso clinico resolvi?", "Que debo repasar en 1, 3 y 7 dias?"] },
    { title: "Clinica", questions: ["Que habilidad practique esta semana?", "Que feedback recibi?", "Que protocolo necesito repasar?"] },
    { title: "Energia", questions: ["Que horario funciono mejor?", "Donde hubo fatiga?", "Como ajusto la proxima semana?"] },
  ],
  influencer: [
    { title: "Contenido", questions: ["Que contenido genero mas respuesta?", "Que objecion aparecio en DMs?", "Que experimento repito la proxima semana?"] },
    { title: "Comunidad", questions: ["Cuantos DMs respondi?", "Que historia personal comparti?", "Que colaboracion inicio o avanzo?"] },
    { title: "Energia", questions: ["Que horario funciono mejor?", "Donde hubo fatiga?", "Como ajusto la proxima semana?"] },
  ],
  dev: [
    { title: "Codigo", questions: ["Que construi que antes no podia?", "Que error se repitio?", "Que concepto necesito practicar con una feature?"] },
    { title: "Arquitectura", questions: ["Que componente puedo reutilizar?", "Que patron aplique o descubri?", "Que deuda tecnica acumule?"] },
    { title: "Energia", questions: ["Que horario funciono mejor?", "Donde hubo fatiga?", "Como ajusto la proxima semana?"] },
  ],
};

export const masteryByMode: Record<string, { effort: string; mastery: string; result: string }> = {
  vet: { effort: "Horas de estudio, flashcards, videos IPS", mastery: "Temas explicables sin mirar, casos resueltos", result: "Tests 80%+, practicas, entrevistas" },
  influencer: { effort: "Piezas creadas, DMs respondidos", mastery: "Hooks efectivos, formatos que convierten", result: "Seguidores, ventas, testimonios" },
  dev: { effort: "Horas de codigo, commits, bugs documentados", mastery: "Conceptos reutilizables sin copiar", result: "Features funcionando, deploys, feedback" },
};

// Keep backwards compat
export const weeklyReviewSections = weeklyReviewByMode.dev;

const dayNames = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
const arcs = ["Despertar", "Lanzamiento", "Prácticas", "Monetización", "Integración", "Estabilidad"];

const vetMission = (day: number) => {
  if (day <= 7) return `Libro 5 IPS: capitulo ${Math.ceil(day / 2)} + 10 flashcards + resumen de 1 pagina`;
  if (day <= 14) return `Libro 6 IPS: capitulo ${Math.ceil((day - 7) / 2)} + test corto + active recall`;
  if (day <= 21) return "Consolidacion libros 5-6: mapa mental global + 2 casos clinicos simulados";
  if (day <= 30) return "Preparar practicas: CV, lista de clinicas en Jaen, guion de presentacion y repaso de protocolos";
  if (day <= 90) return "Modo clinica: observar, preguntar, registrar habilidades y pedir feedback diario";
  if (day <= 150) return "Practicas + empleo: enviar/visitar 3 clinicas por semana y pedir referencia";
  return "Trabajo fijo: consolidar rutinas de asistente, iniciar ingles formal y plan de carrera veterinaria";
};

const ebookMission = (day: number) => {
  if (day <= 3) return "Abrir perfil IG, bio clara, foto/logo, link en bio y 3 posts base";
  if (day <= 10) return "Prelanzamiento: 1 Reel o carrusel diario + stories con encuesta + waitlist";
  if (day <= 14) return "Publicar en Gumroad/LemonSqueezy/Payhip y probar compra con precio de lanzamiento";
  if (day <= 21) return "Lanzamiento: promo diaria, demo del avatar, FAQ y llamada a compra";
  if (day <= 45) return "Post-lanzamiento: testimonios, oferta flash, mejoras del PDF y bonus";
  if (day <= 90) return "Comunidad: reto semanal Solo System, directos cortos y contenido educativo";
  if (day <= 150) return "Escala: colaboraciones, afiliados y version 2 del ebook con bonus";
  return "Comunidad premium: Discord/Telegram, calendario de retos y oferta mensual";
};

const codeMission = (day: number) => {
  if (day <= 30) return "Fundamentos web: HTML/CSS/Tailwind + mejorar landing del ebook en movil";
  if (day <= 60) return "JavaScript: arrays, funciones, eventos y calculadora de XP";
  if (day <= 90) return "React: componentes, useState, props y Quest Board funcional";
  if (day <= 120) return "TypeScript + localStorage: bitacora, formularios y persistencia";
  if (day <= 150) return "Backend simple: investigar Supabase/Firebase y mock de login";
  return "Deploy app Solo System 1.0, feedback de 5 usuarios y plan de version 2";
};

const focusByWeekday = [
  "Planificacion y tema nuevo fuerte",
  "Produccion y practica guiada",
  "Active recall + experimento de contenido",
  "Aplicacion practica y debug",
  "Cierre de entregables",
  "Revision profunda y creatividad",
  "Descanso activo + evaluacion semanal",
];

export const getDayMission = (rawDay: number): DayMission => {
  const day = Math.min(180, Math.max(1, Math.round(rawDay)));
  const weekdayIndex = (day - 1) % 7;
  const week = Math.ceil(day / 7);
  const month = Math.ceil(day / 30);
  const rank = weekdayIndex === 6 ? "C" : weekdayIndex === 5 ? "A" : "S";
  const review = spacedRepetition
    .filter((item) => item.offset > 0 && day - item.offset > 0)
    .slice(0, 3)
    .map((item) => `${item.label}: repasa Dia ${day - item.offset} (${item.action})`);

  return {
    day,
    week,
    month,
    weekday: dayNames[weekdayIndex],
    rank,
    arc: arcs[month - 1],
    focus: focusByWeekday[weekdayIndex],
    vet: vetMission(day),
    ebook: ebookMission(day),
    code: codeMission(day),
    recall: weekdayIndex % 2 === 0 ? "Explica el tema de veterinaria sin mirar durante 2 minutos." : "Escribe que aprendiste hoy en 5 bullets y que haras distinto mañana.",
    review,
    deliverables: [
      "1 prueba de salida completada",
      "1 metrica o aprendizaje registrado",
      "XP y revision diaria marcados antes de dormir",
    ],
  };
};

export const getWeekMissions = (rawDay: number) => {
  const day = Math.min(180, Math.max(1, Math.round(rawDay)));
  const start = Math.floor((day - 1) / 7) * 7 + 1;
  return Array.from({ length: 7 }, (_, index) => getDayMission(Math.min(180, start + index)));
};

export const weeklyCurriculum = [
  {
    week: 1,
    arc: "Fundacion",
    principle: "Diseñar el sistema antes de exigir disciplina.",
    vet: "Libro 5: lectura activa del primer bloque, glosario de terminos clinicos y 60 flashcards base.",
    ebook: "Crear perfil IG, bio, link, 3 posts fijados y mensaje central: vivir como RPG sin perder humanidad.",
    code: "Ordenar Termux/Acode, estructura de carpetas, HTML/CSS responsive y version simple de landing.",
    dailyOutput: "1 resumen vet + 1 pieza corta de contenido + 1 commit/copia de seguridad.",
    boss: "Puedes explicar que es Solo System en 30 segundos y resumir el bloque vet sin mirar.",
  },
  {
    week: 2,
    arc: "Fundacion",
    principle: "Active recall primero, relectura despues.",
    vet: "Libro 5: segundo bloque, preguntas de tutor, signos observables y checklist de consulta.",
    ebook: "Prelanzamiento: 5 hooks, 3 Reels, encuesta de dolor y primera lista de interesados.",
    code: "Tailwind practico: secciones, botones, responsive, variables visuales y deploy de prueba.",
    dailyOutput: "10 flashcards + 1 hook probado + 1 mejora visual.",
    boss: "Test propio de 20 preguntas con 80% y minimo 10 personas alcanzadas por contenido.",
  },
  {
    week: 3,
    arc: "Cierre libro 5",
    principle: "Convertir teoria en caso.",
    vet: "Libro 5: cierre, mapa mental global y 2 casos clinicos simulados.",
    ebook: "Pagina de venta: promesa, beneficios, FAQ, bonus y precio de lanzamiento.",
    code: "JavaScript basico: variables, funciones, arrays y calculadora de XP simple.",
    dailyOutput: "1 caso vet + 1 bloque de landing + 1 funcion JS.",
    boss: "Libro 5 cerrado con mapa global y pagina de venta lista para publicar.",
  },
  {
    week: 4,
    arc: "Publicacion",
    principle: "Feedback real supera perfeccion privada.",
    vet: "Libro 6: primer bloque, flashcards y preguntas de control.",
    ebook: "Publicar ebook en plataforma, probar compra, crear secuencia de 7 dias de lanzamiento.",
    code: "JS eventos y localStorage: guardar XP, tareas y checks simples.",
    dailyOutput: "Repaso D+1/D+3 + 1 post de venta suave + 1 interaccion guardada.",
    boss: "Ebook comprable con link real y primer bloque del libro 6 dominado.",
  },
  {
    week: 5,
    arc: "Lanzamiento",
    principle: "Medir para aprender, no para castigarte.",
    vet: "Libro 6: segundo bloque, simulacion de recepcion y preparacion de material.",
    ebook: "Semana de lanzamiento: objeciones, testimonios tempranos, demo del avatar y stories diarias.",
    code: "React mental model: componentes, props y estado con mini Quest Board.",
    dailyOutput: "1 audio Feynman + 1 metrica IG + 1 componente React.",
    boss: "Primeras ventas o primeras conversaciones reales de compra, con lista de objeciones.",
  },
  {
    week: 6,
    arc: "Cierre curso",
    principle: "La memoria necesita recuperacion bajo dificultad moderada.",
    vet: "Libro 6: cierre completo, test acumulativo y plan de practicas.",
    ebook: "Post-lanzamiento: oferta flash, mejoras del PDF y primera recopilacion de feedback.",
    code: "React useState, listas y filtros: tareas por path, completadas y pendientes.",
    dailyOutput: "20 preguntas vet + 1 mejora del ebook + 1 feature visible.",
    boss: "Libros 5 y 6 terminados con 80% en autoevaluacion.",
  },
  {
    week: 7,
    arc: "Transicion clinica",
    principle: "Preparar el entorno reduce ansiedad de ejecucion.",
    vet: "CV, lista de clinicas en Jaen, guion de presentacion y protocolo de primer dia.",
    ebook: "Crear reto gratuito de 7 dias: una quest diaria para captar comunidad.",
    code: "TypeScript basico: tipos, objetos, arrays y props tipadas.",
    dailyOutput: "1 contacto clinico + 1 pieza de reto + 1 tipo TS aplicado.",
    boss: "10 clinicas listadas y reto gratuito estructurado.",
  },
  {
    week: 8,
    arc: "Practica guiada",
    principle: "Observar con checklist acelera aprendizaje profesional.",
    vet: "Si empiezas practicas: observar recepcion, consulta y limpieza; si no, simular casos.",
    ebook: "Ejecutar reto gratuito, recopilar respuestas y detectar dolores del publico.",
    code: "Formularios: crear nueva quest, editar texto y validar campos.",
    dailyOutput: "1 habilidad clinica puntuada + 1 respuesta comunidad + 1 formulario funcional.",
    boss: "Checklist de practicas con 10 habilidades puntuadas.",
  },
  {
    week: 9,
    arc: "Clinica real",
    principle: "Feedback inmediato corrige antes que la repeticion automatica.",
    vet: "Pedir feedback diario en practicas y anotar 3 aprendizajes clinicos por dia.",
    ebook: "Historias de usuario: antes/despues, dudas y microvictorias de comunidad.",
    code: "Persistencia: localStorage para bitacora, XP y revision semanal.",
    dailyOutput: "3 aprendizajes vet + 1 historia + 1 dato persistente.",
    boss: "Primer feedback concreto de un profesional convertido en plan de mejora.",
  },
  {
    week: 10,
    arc: "Sistema de dominio",
    principle: "Lo que enseñas, lo recuerdas.",
    vet: "Explicar 3 procedimientos de asistente a un principiante sin diagnosticar.",
    ebook: "Directo corto o video explicando el metodo Solo System con caso personal.",
    code: "Componentizacion: separar datos, UI y estado.",
    dailyOutput: "1 explicacion vet + 1 video educativo + 1 componente limpio.",
    boss: "Puedes enseñar una rutina clinica basica sin apuntes.",
  },
  {
    week: 11,
    arc: "MVP app",
    principle: "Aprender una tecnologia por necesidad concreta.",
    vet: "Simular urgencias basicas: prioridades, calma, material y comunicacion.",
    ebook: "Crear lead magnet: plantilla de quest semanal descargable.",
    code: "MVP Solo System: crear, completar y filtrar quests con XP.",
    dailyOutput: "1 caso de urgencia + 1 recurso gratuito + 1 feature MVP.",
    boss: "MVP usable por ti durante 3 dias seguidos.",
  },
  {
    week: 12,
    arc: "Beta",
    principle: "Usuarios reales revelan lo que el plan no ve.",
    vet: "Repaso clinico acumulativo: recepcion, consulta, hospitalizacion y quirofano.",
    ebook: "Pedir 5 testimonios o feedbacks honestos y convertirlos en mejoras.",
    code: "Beta privada: compartir app con 2 personas y registrar problemas.",
    dailyOutput: "1 repaso clinico + 1 feedback usuario + 1 bug documentado.",
    boss: "Beta de app y feedback real de ebook/comunidad.",
  },
  {
    week: 13,
    arc: "Monetizacion",
    principle: "La oferta mejora cuando entiendes objeciones.",
    vet: "Identificar habilidades que aun no haces supervisado y pedir practicarlas.",
    ebook: "Oferta 2.0: ebook + avatar + plantilla + reto de 7 dias.",
    code: "Refactor visual y experiencia movil de la app.",
    dailyOutput: "1 habilidad pedida + 1 objecion resuelta + 1 mejora UX.",
    boss: "Oferta clara con bonus y precio justificado.",
  },
  {
    week: 14,
    arc: "Profundizacion",
    principle: "La dificultad deseable fortalece retencion.",
    vet: "Casos con informacion incompleta: preguntar mejor antes de actuar.",
    ebook: "Contenido profundo: carruseles de 5 pasos y mini historias de transformacion.",
    code: "Estado complejo: filtros por semana, mes y path.",
    dailyOutput: "1 caso incompleto + 1 carrusel + 1 filtro nuevo.",
    boss: "Resolver casos sin saltar a conclusiones.",
  },
  {
    week: 15,
    arc: "Autoridad",
    principle: "La claridad publica ordena la claridad interna.",
    vet: "Crear guia personal: que hace y que no hace un asistente veterinario.",
    ebook: "Posicionamiento: por que Solo System no es motivacion vacia, sino metodo.",
    code: "Documentacion: README, instrucciones y notas de arquitectura.",
    dailyOutput: "1 regla profesional + 1 post de posicionamiento + 1 doc tecnica.",
    boss: "Tu metodo queda explicable para usuario, clinica y futuro empleador.",
  },
  {
    week: 16,
    arc: "Sistema laboral",
    principle: "Las oportunidades se crean con seguimiento, no con esperanza.",
    vet: "Enviar CV, visitar clinicas, pedir referencia y registrar seguimiento.",
    ebook: "Colaboraciones: contactar 5 cuentas compatibles con propuesta especifica.",
    code: "Portfolio minimo: landing, app, estudio fotografico y caso de aprendizaje.",
    dailyOutput: "1 contacto laboral + 1 contacto colaboracion + 1 pieza portfolio.",
    boss: "Pipeline con minimo 15 oportunidades registradas.",
  },
  {
    week: 17,
    arc: "Entrevistas",
    principle: "Ensayar reduce carga cognitiva en ejecucion real.",
    vet: "Simular entrevista: fortalezas, limites, aprendizaje en España y disponibilidad.",
    ebook: "Webinar/directo: como crear tu sistema de quests personal.",
    code: "Preparar demo de app de 3 minutos.",
    dailyOutput: "1 respuesta entrevista + 1 guion directo + 1 demo grabada.",
    boss: "Puedes presentarte profesionalmente en 90 segundos.",
  },
  {
    week: 18,
    arc: "Feedback profesional",
    principle: "La identidad se consolida con evidencia acumulada.",
    vet: "Pedir recomendacion o feedback escrito si terminan practicas.",
    ebook: "Caso de usuario: documentar transformacion de alguien de la comunidad.",
    code: "Mejoras por feedback: priorizar top 3 errores de usuarios.",
    dailyOutput: "1 evidencia profesional + 1 caso comunidad + 1 mejora beta.",
    boss: "Tienes pruebas externas de progreso, no solo sensacion interna.",
  },
  {
    week: 19,
    arc: "Escala",
    principle: "Automatizar lo repetible libera energia para aprender.",
    vet: "Rutina laboral: checklist de inicio y cierre de turno.",
    ebook: "Automatizar respuestas frecuentes y secuencia de bienvenida.",
    code: "Plantillas reutilizables: componentes y datos modulares.",
    dailyOutput: "1 checklist + 1 respuesta automatizable + 1 componente reusable.",
    boss: "Menos friccion diaria, mas consistencia.",
  },
  {
    week: 20,
    arc: "Version 2",
    principle: "Mejorar por datos, no por ansiedad.",
    vet: "Actualizar plan de carrera: homologacion/estudios, ingles y experiencia clinica.",
    ebook: "Version 2 del ebook basada en feedback real.",
    code: "Plan app 1.0: backlog, bugs, mejoras y prioridad.",
    dailyOutput: "1 decision carrera + 1 mejora ebook + 1 item backlog priorizado.",
    boss: "Roadmap de vida actualizado con datos de 5 meses.",
  },
  {
    week: 21,
    arc: "Comunidad",
    principle: "La pertenencia sostiene lo que la motivacion inicia.",
    vet: "Buscar red profesional: clinicas, compañeros, grupos y mentores.",
    ebook: "Diseñar comunidad premium: reglas, calendario, retos y beneficios.",
    code: "Funciones sociales simples: ranking local, progreso o perfil.",
    dailyOutput: "1 contacto profesional + 1 regla comunidad + 1 feature social.",
    boss: "Comunidad definida con propuesta clara.",
  },
  {
    week: 22,
    arc: "Estabilidad",
    principle: "La estabilidad se diseña antes de que llegue el cansancio.",
    vet: "Ajustar horarios si ya trabajas o preparar plan al obtener permiso laboral.",
    ebook: "Calendario mensual repetible: 12 posts, 8 stories, 2 directos, 1 oferta.",
    code: "Deploy estable y pagina de feedback.",
    dailyOutput: "1 ajuste horario + 1 contenido programado + 1 mejora deploy.",
    boss: "Sistema sostenible con menos horas libres.",
  },
  {
    week: 23,
    arc: "Consolidacion",
    principle: "Repasar tu propio camino convierte experiencia en metodo.",
    vet: "Crear resumen de aprendizajes clinicos y plan de mejora trimestral.",
    ebook: "Historia completa del lanzamiento: aprendizajes, errores y resultados.",
    code: "Caso de estudio: como pasaste de cero a crear webs/apps con IA.",
    dailyOutput: "1 leccion profunda por path.",
    boss: "Puedes contar tu transformacion con datos y pasos replicables.",
  },
  {
    week: 24,
    arc: "Dominio",
    principle: "El siguiente nivel nace de una auditoria honesta.",
    vet: "Evaluacion final: habilidades seguras, supervisadas y pendientes.",
    ebook: "Plan de 90 dias para escalar ventas y comunidad.",
    code: "App 1.0 publicada o plan tecnico de cierre con fechas.",
    dailyOutput: "Auditoria final + plan de 90 dias + ritual de cierre.",
    boss: "Tres pilares vivos: trabajo/veterinaria, ebook/comunidad y programacion/app.",
  },
];

export const recallQuestionBank: Record<PathId, string[]> = {
  vet: [
    "Explica este tema como si el tutor no supiera nada y estuviera nervioso.",
    "Que signos puedes observar sin diagnosticar y cuales debes comunicar al veterinario?",
    "Que material prepararias antes de que el veterinario entre a consulta?",
    "Que dato falta en la historia clinica y por que cambia la prioridad?",
    "Que errores de higiene o bioseguridad debes evitar en esta situacion?",
    "Como sujetarias al animal con seguridad y respeto?",
    "Que parte del protocolo requiere supervision obligatoria?",
    "Resume el tema en 5 pasos operativos de asistente veterinario.",
    "Crea 3 preguntas tipo test sobre este tema y responde sin mirar.",
    "Relaciona el tema con recepcion, consulta, hospitalizacion o quirofano.",
  ],
  ebook: [
    "Que transformacion concreta promete esta pieza de contenido?",
    "Que hook detiene el scroll en los primeros 2 segundos?",
    "Que objecion de compra responde este post?",
    "Que CTA unico quieres que haga la persona al final?",
    "Que metrica dira si funciono: retencion, guardados, DMs, clicks o ventas?",
    "Como mostrarias el avatar interactivo sin sobreexplicar?",
    "Que historia personal conecta Cuba, España, veterinaria y Solo System?",
    "Convierte este contenido en Reel, carrusel y story sin cambiar la idea central.",
    "Que parte del ebook puedes enseñar gratis sin regalar todo el producto?",
    "Que testimonio o prueba social necesitas conseguir esta semana?",
  ],
  code: [
    "Que problema real de la app resuelve este concepto?",
    "Explica este codigo como si se lo enseñaras a tu yo de hace 1 mes.",
    "Que estado cambia, quien lo cambia y donde se muestra?",
    "Que dato debe persistir en localStorage y por que?",
    "Que componente se puede separar para que el codigo sea mas claro?",
    "Que error aparecio, cual fue la causa y como lo comprobaste?",
    "Que feature minima demuestra que entendiste el concepto?",
    "Que parte puedes pedirle a Claude que revise sin que te lo haga todo?",
    "Como harias esta feature primero en pseudocodigo?",
    "Que cambiarias para que funcione mejor en movil?",
  ],
};

export const flashcardTemplates: Record<PathId, { name: string; front: string; back: string }[]> = {
  vet: [
    { name: "Definicion clinica", front: "Que significa [termino] y cuando aparece?", back: "Definicion simple + ejemplo de consulta + signo observable." },
    { name: "Protocolo", front: "Cuales son los pasos para [procedimiento]?", back: "Paso 1-5 + que requiere supervision + material necesario." },
    { name: "Tutor nervioso", front: "Como explicas [tema] a un tutor sin alarmar?", back: "Frase clara + limite: el diagnostico lo da el veterinario." },
    { name: "Signo de alerta", front: "Que harias si observas [signo]?", back: "Registrar, avisar, preparar material, no diagnosticar." },
  ],
  ebook: [
    { name: "Hook", front: "Hook para personas que sienten [dolor]", back: "Si tu vida fuera un RPG, esta seria la quest de hoy..." },
    { name: "Objecion", front: "Que respondo si dicen [objecion]?", back: "Empatia + beneficio concreto + prueba + CTA suave." },
    { name: "Pilar", front: "Idea de contenido para [pilar]", back: "Hook + 3 puntos + CTA + metrica esperada." },
    { name: "Oferta", front: "Por que comprar hoy?", back: "Resultado, bonus, urgencia honesta y garantia/claridad." },
  ],
  code: [
    { name: "Concepto", front: "Que es [concepto] y para que lo uso?", back: "Explicacion simple + ejemplo en Solo System." },
    { name: "Bug", front: "Por que ocurre [error]?", back: "Causa probable + prueba + solucion + prevencion." },
    { name: "Feature", front: "Como construir [feature] en 4 pasos?", back: "Datos, estado, UI, persistencia/prueba." },
    { name: "Refactor", front: "Cuando separo un componente?", back: "Si se repite, si mezcla responsabilidades o si dificulta lectura." },
  ],
};

export const aiPromptLibrary = [
  {
    path: "vet" as PathId,
    title: "Tutor socratico de veterinaria",
    prompt: "Actua como tutor de asistente veterinario en España. Hazme 10 preguntas de active recall sobre el tema: [TEMA]. No me des respuestas al principio. Corrige mis respuestas, señala lagunas y convierte mis errores en flashcards Anki.",
  },
  {
    path: "vet" as PathId,
    title: "Caso clinico simulado",
    prompt: "Crea un caso clinico simulado para un asistente veterinario principiante sobre [TEMA]. Incluye contexto, datos del tutor, signos observables, material a preparar, preguntas que debo hacer y checklist de actuacion sin diagnosticar.",
  },
  {
    path: "ebook" as PathId,
    title: "Reel con metodo AIDA",
    prompt: "Crea 5 guiones de Reels de 20 segundos para vender mi ebook Solo System, basado en RPG life y sistema tipo Solo Leveling. Usa AIDA, hooks fuertes, tono intenso pero humano y CTA a comentar 'SYSTEM'.",
  },
  {
    path: "ebook" as PathId,
    title: "Analisis de metricas IG",
    prompt: "Analiza estas metricas de Instagram: [METRICAS]. Dime que patron funciono, que hipotesis probar la proxima semana y que 3 contenidos debo repetir con variaciones.",
  },
  {
    path: "code" as PathId,
    title: "Mentor de codigo sin resolverlo todo",
    prompt: "Actua como mentor de React/TypeScript. No escribas todo el codigo por mi. Hazme preguntas, detecta el error, explica la causa simple y dame una pista progresiva para resolver: [ERROR O FEATURE].",
  },
  {
    path: "code" as PathId,
    title: "Feature por pasos",
    prompt: "Quiero construir esta feature para mi app Solo System: [FEATURE]. Dividela en pasos pequenos: datos necesarios, componentes, estado, eventos, persistencia y prueba final. Dame pseudocodigo antes del codigo.",
  },
];

export const vetSpecializations = [
  {
    area: "Auxiliar Clinico",
    priority: 9,
    skills: ["Sujecion animal", "Preparacion quirofano", "Toma de muestras", "Hospitalizacion", "Limpieza instrumental"],
    why: "Base de cualquier clinica. Sin esto no hay contratacion.",
  },
  {
    area: "Recepcion y trato",
    priority: 8,
    skills: ["Agenda", "Cobro", "Primera impresion", "Gestionar tutores nerviosos", "Comunicar instrucciones"],
    why: "Tu ventaja competitiva si vienes de Cuba: sabes conectar con personas.",
  },
  {
    area: "Laboratorio basico",
    priority: 7,
    skills: ["Tiras reactivas", "Muestras de sangre", "Frotis", "Centrifugado", "Registro de resultados"],
    why: "Diferencia a un asistente basico de uno que ahorra tiempo al veterinario.",
  },
  {
    area: "Anestesia y quirofano",
    priority: 6,
    skills: ["Preanestesia", "Monitorizacion basica", "Recuperacion", "Material esteril", "Protocolos"],
    why: "Alta demanda y mejor salario. Practica con simulacion primero.",
  },
];

export const englishLevel = {
  current: "Basico-A2+",
  goal: "B2 en 6 meses",
  plan: [
    { month: 1, focus: "Veterinary vocabulary", tools: "Anki flashcards + Duolingo" },
    { month: 2, focus: "Listening comprehension", tools: "YouTube veterinaria en ingles + Netflix subtitulado" },
    { month: 3, focus: "Speaking basico", tools: "Cambly trial o HelloTalk gratis" },
    { month: 4, focus: "Reading fichas clinicas", tools: "Manuals en ingles + glossario propio" },
    { month: 5, focus: "Writing reportes", tools: "Plantillas traducidas de casos reales" },
    { month: 6, focus: "Entrevista de trabajo en ingles", tools: "Script + grabacion + correccion IA" },
  ],
};

export const incomeGoals = [
  { month: 1, vet: "0€", ebook: "0€", goal: "Solo inversion de tiempo. Primer euro en mes 2-3." },
  { month: 2, vet: "0€", ebook: "50-100€", goal: "Primeros ingresos ebook. Sigue sin permiso de trabajo." },
  { month: 3, vet: "0€", ebook: "100-300€", goal: "Lanzamiento + testimonios. Crece comunidad." },
  { month: 4, vet: "0-400€", ebook: "200-500€", goal: "Si consigues permiso: practica o trabajo parcial." },
  { month: 5, vet: "600-900€", ebook: "200-500€", goal: "Asistente veterinario a tiempo parcial + ebook." },
  { month: 6, vet: "900-1200€", ebook: "300-700€", goal: "Tiempo completo o medio + comunidad crece." },
];

export const quickLinks = {
  vet: [
    { label: "IPS Jaen cursos", url: "https://www.ips-formacion.com", desc: "Tu plataforma de curso" },
    { label: "BOE requisitos animales", url: "https://www.boe.es", desc: "Regulacion espanyola" },
    { label: "Veterequipos", url: "https://veterquip.com", desc: "Material clinico referencia" },
    { label: "LinkedIn clinicas Jaen", url: "https://linkedin.com", desc: "Bolsa de trabajo local" },
  ],
  ebook: [
    { label: "Gumroad", url: "https://gumroad.com", desc: "Publicar y vender ebook" },
    { label: "Canva", url: "https://canva.com", desc: "Crear contenido visual" },
    { label: "CapCut", url: "https://capcut.com", desc: "Editar Reels rapido" },
    { label: "Metricool", url: "https://metricool.com", desc: "Programar y medir IG" },
  ],
  code: [
    { label: "react.dev", url: "https://react.dev", desc: "Docs oficiales React" },
    { label: "Tailwindcss", url: "https://tailwindcss.com", desc: "Estilos rapidos" },
    { label: "Vercel", url: "https://vercel.com", desc: "Deploy gratis" },
    { label: "GitHub", url: "https://github.com", desc: "Portafolio y commits" },
  ],
};
