// Formula Fit data scaffold.
// OPCIONES: Diccionario que alimenta las tarjetas seleccionables del quiz.

const OPCIONES = {
  objetivo: [
    { val: "hipertrofia", label: "Hipertrofia", icon: "💪" },
    { val: "fuerza_potencia", label: "Fuerza y Potencia", icon: "🏋️" },
    { val: "recuperacion", label: "Recuperación", icon: "🌙" },
    { val: "longevidad", label: "Longevidad", icon: "🧬" },
    { val: "bienestar", label: "Bienestar General", icon: "✨" }
  ],
  nivel: [
    { val: "principiante", label: "Principiante", icon: "🌱" },
    { val: "intermedio", label: "Intermedio", icon: "📈" },
    { val: "avanzado", label: "Avanzado", icon: "🔥" }
  ],
  restriccion: [
    { val: "ninguna", label: "Sin restricción", icon: "✓" },
    { val: "vegano", label: "Vegano", icon: "🌿" }
  ],
  horario: [
    { val: "manana", label: "Mañana", icon: "☀️" },
    { val: "tarde", label: "Tarde", icon: "🌤️" },
    { val: "noche", label: "Noche", icon: "🌙" }
  ]
};

// Configuración de los pasos del wizard
const QUIZ_STEPS = [
  { key: "objetivo", title: "¿Cuál es tu objetivo principal?", subtitle: "Elegí el que mejor represente tu meta actual." },
  { key: "nivel", title: "¿Cuál es tu nivel de entrenamiento?", subtitle: "Esto nos ayuda a calibrar las dosis." },
  { key: "restriccion", title: "¿Tenés alguna restricción alimentaria?", subtitle: "Adaptamos los productos a tu dieta." },
  { key: "horario", title: "¿En qué horario entrenás?", subtitle: "Optimizamos el timing de cada suplemento." }
];

// CATALOGO: catálogo base de suplementos. `tags` mapea 1:1 con productos/descripcion.md.
// `id` = nombre del archivo de imagen sin extensión (clave del catálogo).
const CATALOGO = [
  {
    id: "wpc",
    nombre: "Whey Protein (Concentrate/Isolate)",
    categoria: "Proteínas y Aminoácidos",
    precio: 39.99,
    img: "productos/wpc.png",
    tags: {
      objetivo: ["hipertrofia", "recuperacion"],
      nivel: ["principiante", "intermedio", "avanzado"],
      restriccion: ["ninguna"],
      horario: ["manana", "noche"]
    }
  },
  {
    id: "pbp",
    nombre: "Plant-Based Protein (Pea/Rice/Soy)",
    categoria: "Proteínas y Aminoácidos",
    precio: 42.99,
    img: "productos/pbp.png",
    tags: {
      objetivo: ["hipertrofia", "recuperacion"],
      nivel: ["principiante", "intermedio", "avanzado"],
      restriccion: ["vegano", "ninguna"],
      horario: ["manana", "noche"]
    }
  },
  {
    id: "eaa",
    nombre: "EAAs / BCAAs",
    categoria: "Proteínas y Aminoácidos",
    precio: 29.99,
    img: "productos/eaa.png",
    tags: {
      objetivo: ["recuperacion", "hipertrofia"],
      nivel: ["intermedio", "avanzado"],
      restriccion: ["vegano", "ninguna"],
      horario: ["manana", "noche"]
    }
  },
  {
    id: "cmh",
    nombre: "Creatine Monohydrate",
    categoria: "Rendimiento y Fuerza",
    precio: 24.99,
    img: "productos/cmh.png",
    tags: {
      objetivo: ["fuerza_potencia", "hipertrofia"],
      nivel: ["principiante", "intermedio", "avanzado"],
      restriccion: ["vegano", "ninguna"],
      horario: ["manana", "noche"]
    }
  },
  {
    id: "cpw",
    nombre: "Caffeine Pre-Workout",
    categoria: "Rendimiento y Fuerza",
    precio: 34.99,
    img: "productos/cpw.png",
    tags: {
      objetivo: ["fuerza_potencia", "hipertrofia"],
      nivel: ["intermedio", "avanzado"],
      restriccion: ["vegano", "ninguna"],
      horario: ["manana"]
    }
  },
  {
    id: "nob",
    nombre: "Nitric Oxide Booster (Stim-Free)",
    categoria: "Rendimiento y Fuerza",
    precio: 32.99,
    img: "productos/nob.png",
    tags: {
      objetivo: ["fuerza_potencia", "hipertrofia"],
      nivel: ["intermedio", "avanzado"],
      restriccion: ["vegano", "ninguna"],
      horario: ["noche", "manana"]
    }
  },
  {
    id: "zma",
    nombre: "ZMA (Zinc, Magnesio, B6)",
    categoria: "Recuperación y Sueño",
    precio: 21.99,
    img: "productos/zma.png",
    tags: {
      objetivo: ["recuperacion", "bienestar"],
      nivel: ["intermedio", "avanzado"],
      restriccion: ["vegano", "ninguna"],
      horario: ["noche", "manana"]
    }
  },
  {
    id: "lgm",
    nombre: "L-Glutamine",
    categoria: "Recuperación y Sueño",
    precio: 19.99,
    img: "productos/lgm.png",
    tags: {
      objetivo: ["recuperacion"],
      nivel: ["intermedio", "avanzado"],
      restriccion: ["vegano", "ninguna"],
      horario: ["manana", "noche"]
    }
  },
  {
    id: "ash",
    nombre: "Ashwagandha (Root Extract)",
    categoria: "Recuperación y Sueño",
    precio: 23.99,
    img: "productos/ash.png",
    tags: {
      objetivo: ["bienestar", "recuperacion"],
      nivel: ["intermedio", "avanzado"],
      restriccion: ["vegano", "ninguna"],
      horario: ["manana", "noche"]
    }
  },
  {
    id: "om3",
    nombre: "Omega-3 Fish Oil",
    categoria: "Salud y Longevidad",
    precio: 27.99,
    img: "productos/om3.png",
    tags: {
      objetivo: ["longevidad", "bienestar", "recuperacion"],
      nivel: ["principiante", "intermedio", "avanzado"],
      restriccion: ["ninguna"],
      horario: ["manana", "noche"]
    }
  },
  {
    id: "ao3",
    nombre: "Algal Oil Omega-3",
    categoria: "Salud y Longevidad",
    precio: 31.99,
    img: "productos/ao3.png",
    tags: {
      objetivo: ["longevidad", "bienestar", "recuperacion"],
      nivel: ["principiante", "intermedio", "avanzado"],
      restriccion: ["vegano", "ninguna"],
      horario: ["manana", "noche"]
    }
  },
  {
    id: "mvc",
    nombre: "Multivitamin Complex",
    categoria: "Salud y Longevidad",
    precio: 25.99,
    img: "productos/mvc.png",
    tags: {
      objetivo: ["bienestar", "longevidad"],
      nivel: ["principiante", "intermedio", "avanzado"],
      restriccion: ["vegano", "ninguna"],
      horario: ["manana", "noche"]
    }
  },
  {
    id: "v3k2",
    nombre: "Vitamin D3 + K2",
    categoria: "Salud y Longevidad",
    precio: 18.99,
    img: "productos/v3k2.png",
    tags: {
      objetivo: ["longevidad", "bienestar"],
      nivel: ["principiante", "intermedio", "avanzado"],
      restriccion: ["vegano", "ninguna"],
      horario: ["manana", "noche"]
    }
  }
];

// REGLAS: branding + justificación hardcodeada de Stack por combinación (objetivo + modificador).
// Lookup en engine.js: objetivo|nivel → objetivo|horario → objetivo|_ → _default.
const REGLAS = {
  "fuerza_potencia|avanzado": {
    nombre: "Stack Rendimiento Máximo",
    justificacion: "Como atleta avanzado enfocado en fuerza, la creatina repondrá tus reservas de ATP entre series pesadas, mientras el óxido nítrico mejora la vasodilatación y el transporte de nutrientes al músculo durante el entreno. Una combinación probada para romper mesetas de rendimiento."
  },
  "fuerza_potencia|_": {
    nombre: "Stack Fuerza Progresiva",
    justificacion: "La creatina es el suplemento con mayor evidencia científica para mejorar la fuerza máxima y la potencia explosiva. La complementamos con soporte proteico adecuado para que la recuperación acompañe la intensidad de tus entrenamientos."
  },
  "recuperacion|noche": {
    nombre: "Stack Descanso Profundo",
    justificacion: "Al entrenar de noche tu cuerpo entra en fase de reparación justo al dormir. El ZMA optimiza el perfil hormonal nocturno y la relajación muscular, mientras los aminoácidos aceleran la síntesis proteica durante las horas de sueño profundo."
  },
  "recuperacion|_": {
    nombre: "Stack Recuperación Activa",
    justificacion: "Después de entrenar, tu cuerpo necesita aminoácidos para reparar el tejido muscular y micronutrientes para combatir el estrés oxidativo del ejercicio. Esta selección apunta a reducir los tiempos de recuperación entre sesiones."
  },
  "hipertrofia|_": {
    nombre: "Stack Volumen Limpio",
    justificacion: "Para ganar masa magra necesitás un aporte proteico elevado y consistente. Combinamos proteína de alta biodisponibilidad con creatina, que aumenta la retención de agua intramuscular y potencia la fuerza en rangos de hipertrofia (8-12 reps)."
  },
  "longevidad|_": {
    nombre: "Stack Salud Base",
    justificacion: "Los omega-3 reducen marcadores inflamatorios sistémicos y protegen la salud cardiovascular, mientras que los micronutrientes esenciales cubren déficits comunes en dietas modernas. Una base sólida para optimizar tu salud a largo plazo."
  },
  "bienestar|_": {
    nombre: "Stack Vitalidad Diaria",
    justificacion: "Cubrimos micronutrientes clave que suelen faltar en la dieta, sumamos soporte antiinflamatorio con omega-3 y adaptógenos que ayudan a regular el estrés y mejorar la energía sostenida a lo largo del día."
  },
  "_default": {
    nombre: "Stack Equilibrio",
    justificacion: "Seleccionamos suplementos complementarios que cubren tus necesidades de recuperación, micronutrientes y soporte general, adaptados a tu rutina y horario de entrenamiento."
  }
};
