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

// CATALOGO y REGLAS se agregan en fases posteriores.
