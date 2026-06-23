## Actividad asignada

{{ACTIVIDAD}}

---

## Contexto y autoridad técnica

Implementa **únicamente** la actividad indicada arriba, como parte del prototipo D2C de Formula Fit.

La **especificación técnica, alcance y restricciones del proyecto** están definidas en:

@docs/arquitectura_tecnica.md

Ese documento es la fuente autoritativa. Antes de codificar, léelo y respeta sin desviaciones:

- Principios arquitectónicos no negociables (SPA simulada, 5 vistas, `navigateTo()`, `appState`, Happy Path).
- Estructura de archivos y convenciones de carpetas.
- Flujo UX completo y máquina de estados.
- Modelo de datos (`CATALOGO`, `OPCIONES`, `REGLAS`, `appState`).
- Reglas del motor de recomendaciones (`generarStack`).
- Esquema de pedido simulado y overlay de confirmación.
- Tokens de diseño, componentes UI y assets.

Documentos complementarios (solo si la actividad lo exige):

- @docs/logica_de_sugerencias.md — lógica del motor.
- @docs/registro.md — esquema del registro de pedido.
- @docs/consigna.md — cumplimiento de la consigna académica.

---

## Stack y restricciones obligatorias

- **HTML5 + CSS3 + JavaScript Vanilla (ES6)**. Cero dependencias, sin backend, sin base de datos, sin build tools, sin frameworks.
- **Happy Path únicamente.** Validación nativa HTML5. Sin manejo de errores extremos.
- **Sin History API, sin hash routing, sin peticiones externas** salvo Google Fonts e imágenes locales.
- **Timebox del proyecto:** ~2 horas en total. No sobre-ingeniería.
- **Metodología:** Walking Skeleton / Top-Down — no adelantar fases posteriores ni reescribir lo ya establecido.

---

## Instrucciones de ejecución

1. **Alcance estricto:** Realiza solo lo descrito en `{{ACTIVIDAD}}`. No implementes funcionalidades de otras actividades ni fases.
2. **Consistencia:** Reutiliza convenciones, nombres, rutas y patrones ya definidos en el código existente y en @docs/arquitectura_tecnica.md.
3. **Verificación mínima:** Al terminar, confirma que la actividad cumple la spec y que el flujo existente no se rompe.
4. **Entregable:** Indica qué archivos creaste o modificaste y un breve resumen de lo implementado.

---

## Criterios de aceptación

La actividad se considera completa cuando:

- [ ] Cumple literalmente lo indicado en `{{ACTIVIDAD}}`.
- [ ] Respeta todas las restricciones de `docs/arquitectura_tecnica.md`.
- [ ] No introduce dependencias, build steps ni funcionalidad fuera de alcance.
- [ ] Se integra con el código y la estructura de archivos ya existentes (o los crea según la spec, si la actividad lo requiere).
- [ ] El Happy Path sigue siendo navegable tras el cambio (cuando aplique).
```

- Upon finalization, suggest a brief, one-line commit message in Spanish that describes de progress made.