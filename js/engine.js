// Formula Fit recommendation engine. Funciones puras: reciben el perfil del
// atleta y devuelven el Stack sugerido. Toda la "inteligencia" vive en data.js
// (CATALOGO + REGLAS); aquí solo se aplican filtros y scoring deterministas.

/**
 * Genera el Stack sugerido a partir del perfil del atleta.
 * Pipeline: (A) filtro duro dietético -> (B) filtro de seguridad nocturno ->
 * (C) scoring por objetivo/nivel/horario con boost relajante de noche ->
 * (D) top-4 + branding/justificación + total.
 * @param {{objetivo:string, nivel:string, restriccion:string, horario:string}} perfil
 * @returns {{nombre:string, justificacion:string, items:Array, total:number}}
 */
function generarStack(perfil) {
  // (A) Filtro duro: restricción dietética.
  let pool = CATALOGO.filter(s =>
    perfil.restriccion === "vegano"
      ? s.tags.restriccion.includes("vegano")
      : true
  );

  // (B) Filtro de seguridad: noche -> fuera estimulantes.
  if (perfil.horario === "noche") {
    pool = pool.filter(s => s.id !== "cpw");
  }

  // (C) Scoring por objetivo (+2), nivel (+1), horario (+1); boost relajantes de noche.
  const scored = pool.map(s => {
    let pts = 0;
    if (s.tags.objetivo.includes(perfil.objetivo)) pts += 2;
    if (s.tags.nivel.includes(perfil.nivel)) pts += 1;
    if (s.tags.horario.includes(perfil.horario)) pts += 1;
    if (perfil.horario === "noche" && (s.id === "zma" || s.id === "nob")) pts += 2;
    return { ...s, pts };
  });

  // Top-4 con pts > 0.
  const stack = scored
    .filter(s => s.pts > 0)
    .sort((a, b) => b.pts - a.pts)
    .slice(0, 4);

  // (D) Branding + total.
  const clave = `${perfil.objetivo}|${perfil.nivel}`;
  const meta = REGLAS[clave]
    || REGLAS[`${perfil.objetivo}|_`]
    || REGLAS["_default"];

  return {
    nombre: meta.nombre,
    justificacion: meta.justificacion,
    items: stack,
    total: +stack.reduce((acc, s) => acc + s.precio, 0).toFixed(2)
  };
}
