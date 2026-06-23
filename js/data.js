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
const REGLAS = {
  "fuerza_potencia|avanzado": {
    nombre: "Stack Rendimiento Máximo",
    justificacion: "Como atleta avanzado enfocado en fuerza, el óxido nítrico maximizará tu vasodilatación intra-entreno, mientras la creatina repondrá tus reservas de ATP."
  },
  "recuperacion|noche": {
    nombre: "Stack Descanso Profundo",
    justificacion: "Al entrenar de noche, el ZMA optimizará tu perfil hormonal y la relajación muscular durante el sueño."
  },
  "hipertrofia|_": {
    nombre: "Stack Volumen Limpio",
    justificacion: "Combinamos síntesis proteica sostenida con creatina para maximizar la ganancia de masa magra."
  },
  "longevidad|_": {
    nombre: "Stack Salud Base",
    justificacion: "Una base de micronutrientes y omega-3 para soporte celular y antiinflamatorio a largo plazo."
  },
  "_default": {
    nombre: "Stack Equilibrio",
    justificacion: "Una selección balanceada alineada a tus objetivos y rutina."
  }
};
