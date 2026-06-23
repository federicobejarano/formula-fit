# Documento de Definición Técnica y Arquitectura — Formula Fit

**Tipo:** E-commerce D2C Hiper-Personalizado (Performance Stacks)
**Pila:** HTML5 + CSS3 + JavaScript Vanilla (ES6) + JSON local. Cero dependencias, sin backend, sin DB.
**Timebox de codificación:** 2 horas (Happy Path únicamente).
**Patrón de arquitectura:** SPA simulada en un único `index.html` con conmutación de vistas vía clases CSS y un único objeto de estado en memoria.

---

## 0. Principios Arquitectónicos (No Negociables)

| Restricción | Implementación obligatoria |
|---|---|
| Vistas | 5 `<section class="view">` dentro de `index.html`. Solo una tiene `.active` a la vez; el resto `.hidden` (`display:none`). |
| Navegación | Función `navigateTo(viewId)` que remueve `.active` de todas y la asigna a la vista destino. Sin History API, sin hash routing. |
| Estado | Un único objeto global `let appState = {}` en memoria de sesión. `localStorage` solo opcional para el email del login. |
| "IA" | `setTimeout()` (2.5s) encadenado a cambios de `textContent` en el loader. Lógica determinista pura, sin aleatoriedad. |
| Estilos | CSS Grid/Flexbox + Custom Properties (`:root`). Grid de 8px. Sin preprocesadores ni frameworks. |
| Interacción | Solo Happy Path. Validación nativa HTML5 (`required`, `type="email"`). Sin manejo de errores extremos. |

Estructura de archivos final:

```
formula-fit/
├── index.html          # Las 5 vistas
├── css/styles.css      # Variables + layout + componentes
├── js/
│   ├── data.js         # CATALOGO[] + REGLAS{} (diccionarios estáticos)
│   ├── engine.js       # generarStack(perfil) -> funciones puras
│   └── app.js          # appState, navigateTo(), listeners, render
├── productos/          # 13 imágenes de producto (existentes)
└── assets/             # Imágenes de UI a producir (ver Sección 5)
```

---

## 1. Flujo UX Completo (State Machine)

Máquina de estados lineal de 5 vistas. Cada transición es disparada por un evento explícito del usuario o por un temporizador.

```
[ V1: LOGIN ]
     │  (submit form válido → guarda email en appState.usuario)
     ▼
[ V2: QUIZ / ONBOARDING ]  (wizard de 4 pasos)
     │  Paso 1: Objetivo  →  Paso 2: Nivel  →  Paso 3: Restricción  →  Paso 4: Horario
     │  (cada paso guarda en appState.perfil; barra de progreso 25→50→75→100%)
     │  (submit final del paso 4)
     ▼
[ V3: LOADER (Fricción Positiva) ]
     │  setTimeout encadenado ~2.5s, mensajes dinámicos:
     │  "Analizando métricas..." → "Formulando proporciones..." → "Ensamblando tu Stack..."
     │  (en paralelo: engine.js calcula appState.stack)
     ▼
[ V4: RESULTADOS / DASHBOARD ]
     │  Render del Stack sugerido (cards de productos) + justificación + precio total.
     │  Acciones: quitar item (steppers/remove) → recalcula precio en vivo.
     │  (click "Añadir al Carrito" → incrementa badge, abre V5)
     ▼
[ V5: CARRITO / CHECKOUT ]
     │  Resumen de línea por producto + total. Vista enfocada (nav secundaria oculta).
     │  (click "Confirmar Pedido" → setea appState.pedido.estado = "Pagado")
     ▼
[ CONFIRMACIÓN ]  (overlay/modal de éxito: "Pedido confirmado — Modo Simulación")
```

**Diagrama de transiciones (eventos → destino):**

| Estado actual | Evento | Acción JS | Estado destino |
|---|---|---|---|
| `login` | `submit` válido | `appState.usuario = {email}` | `quiz` |
| `quiz` (paso n) | click tarjeta | `appState.perfil[campo] = valor`; `n++` | `quiz` (paso n+1) |
| `quiz` (paso 4) | `submit` | dispara loader + `generarStack()` | `loader` |
| `loader` | `setTimeout` fin | `render(appState.stack)` | `resultados` |
| `resultados` | quitar item | `splice` + recalcular total | `resultados` |
| `resultados` | "Añadir al Carrito" | `appState.carrito = stack`; badge++ | `carrito` |
| `carrito` | "Confirmar Pedido" | `appState.pedido.estado="Pagado"` | `confirmación` |

---

## 2. Especificaciones de Interfaz (UI Design)

### 2.1. Esquema de Color (Custom Properties)

Estética "laboratorio de performance": fondo oscuro, acentos energéticos de alto contraste. Cumple WCAG (texto pequeño ≥ 4.5:1, UI ≥ 3:1).

```css
:root {
  /* Superficies */
  --bg-base:      #0B0F14;  /* fondo app (casi negro azulado) */
  --bg-surface:   #151B23;  /* cards, paneles */
  --bg-elevated:  #1E2730;  /* hover / elementos elevados */
  --border:       #2A3540;  /* bordes inputs/cards (>3:1) */

  /* Marca / Acentos */
  --accent:       #00E5A0;  /* verde-lima "bio": CTAs primarios */
  --accent-press: #00B37E;  /* estado :active */
  --accent-alt:   #4DA3FF;  /* azul dato/info, links */
  --warn:         #FF5C5C;  /* errores/validación */

  /* Texto */
  --text-hi:      #F2F5F7;  /* títulos (alto contraste) */
  --text-mid:     #AEB9C4;  /* cuerpo */
  --text-low:     #6B7886;  /* placeholders, captions */

  /* Escala de espaciado (grid 8px) */
  --s1:4px; --s2:8px; --s3:16px; --s4:24px; --s5:32px; --s6:48px; --s7:64px;
  --radius: 14px;
  --maxw: 1120px; /* contenedor 12 columnas */
}
```

### 2.2. Tipografía (Google Fonts)

Una sola familia sans-serif de alto x-height para legibilidad; opcional una display para títulos de marca. Escala Minor Third (1.200).

- **Cuerpo / UI:** `Inter` (400, 500, 600, 700).
- **Display / Marca (opcional):** `Space Grotesk` (600/700) solo para H1 y nombre de Stack.

```css
--font-ui: 'Inter', system-ui, sans-serif;
--font-display: 'Space Grotesk', var(--font-ui);

/* Type scale 1.200 */
--fs-caption: 12.8px;  /* 0.8rem  */
--fs-body:    16px;    /* base    */
--fs-h4:      19.2px;
--fs-h3:      23px;
--fs-h2:      27.6px;
--fs-h1:      33.2px;
--lh-body: 1.5;
```

Reglas: line-length 40–80 caracteres en bloques de texto, alineación a la izquierda, line-height ≥ 1.5 en cuerpo.

### 2.3. Disposición por Pantalla

**V1 — Login**
- Layout split 2 columnas (desktop) / stack (mobile): izquierda = card de login centrada (max 400px); derecha = imagen hero a sangre.
- Card: logo, H1 "Formula Fit", subtítulo, input email + password (label arriba del input), CTA primario full-width "Ingresar".
- Badge persistente "Modo Simulación" en esquina.

**V2 — Quiz (Wizard 4 pasos)**
- Barra de progreso superior (25/50/75/100%) + label "Paso N de 4".
- Una pregunta por paso. Opciones como **tarjetas seleccionables** (no dropdowns; <10 opciones → estilo radio-card), grid responsivo `repeat(auto-fit, minmax(160px,1fr))`.
- Tarjeta seleccionada: borde `--accent` + check. Navegación "Atrás"/"Siguiente"; el último paso muestra "Formular mi Stack".
- Single-column, momentum vertical descendente.

**V3 — Loader**
- Pantalla centrada full-height: spinner/animación CSS + texto dinámico que rota cada ~800ms. Refuerza percepción de procesamiento (>400ms → indicador de progreso obligatorio).

**V4 — Resultados / Dashboard**
- Header: nombre del Stack (display) + chip del objetivo del perfil.
- Panel "Justificación": texto hardcodeado asociado al perfil (callout con `--accent-alt`).
- Grid de **product cards** (`repeat(auto-fill, minmax(220px,1fr))`): imagen de `productos/`, título, tag/categoría, precio, botón terciario "Quitar".
- Sidebar/footer sticky: Precio Total calculado + CTA primario "Añadir al Carrito".

**V5 — Carrito / Checkout**
- Vista enfocada: nav y distracciones ocultas (checkout protegido).
- Lista de líneas: thumbnail + nombre + stepper de cantidad + subtotal.
- Resumen: subtotal, total. CTA primario único "Confirmar Pedido".
- Confirmación: modal/overlay de éxito con resumen del `Pedido_Stack_Personalizado`.

**Componentes globales:** botones con jerarquía (primario sólido `--accent` / secundario ghost / terciario texto subrayado), target ≥ 48px, separación ≥ 8px. Cards con padding interno 16–24px.

---

## 3. Estructuras de Datos (Schemas JSON / Diccionarios JS)

Toda la "inteligencia" vive en `js/data.js` como diccionarios estáticos. El motor (`js/engine.js`) son funciones puras: reciben el perfil y devuelven el Stack.

### 3.1. Catálogo Base (`CATALOGO`)

Array de objetos suplemento. `tags` mapea 1:1 con `@productos/descripcion.md`. `id` = nombre del archivo de imagen sin extensión (clave del catálogo).

```js
const CATALOGO = [
  {
    id: "wpc",
    nombre: "Whey Protein (Concentrate/Isolate)",
    categoria: "Proteínas y Aminoácidos",
    precio: 39.99,
    img: "productos/wpc.png",
    tags: {
      objetivo:    ["hipertrofia", "recuperacion"],
      nivel:       ["principiante", "intermedio", "avanzado"],
      restriccion: ["ninguna"],            // excluir si vegano
      horario:     ["manana", "noche"]
    }
  },
  { id:"pbp", nombre:"Plant-Based Protein (Pea/Rice/Soy)", categoria:"Proteínas y Aminoácidos", precio:42.99, img:"productos/pbp.png",
    tags:{ objetivo:["hipertrofia","recuperacion"], nivel:["principiante","intermedio","avanzado"], restriccion:["vegano","ninguna"], horario:["manana","noche"] } },

  { id:"eaa", nombre:"EAAs / BCAAs", categoria:"Proteínas y Aminoácidos", precio:29.99, img:"productos/eaa.png",
    tags:{ objetivo:["recuperacion","hipertrofia"], nivel:["intermedio","avanzado"], restriccion:["vegano","ninguna"], horario:["manana","noche"] } },

  { id:"cmh", nombre:"Creatine Monohydrate", categoria:"Rendimiento y Fuerza", precio:24.99, img:"productos/cmh.png",
    tags:{ objetivo:["fuerza_potencia","hipertrofia"], nivel:["principiante","intermedio","avanzado"], restriccion:["vegano","ninguna"], horario:["manana","noche"] } },

  { id:"cpw", nombre:"Caffeine Pre-Workout", categoria:"Rendimiento y Fuerza", precio:34.99, img:"productos/cpw.png",
    tags:{ objetivo:["fuerza_potencia","hipertrofia"], nivel:["intermedio","avanzado"], restriccion:["vegano","ninguna"], horario:["manana"] } }, // excluir si noche

  { id:"nob", nombre:"Nitric Oxide Booster (Stim-Free)", categoria:"Rendimiento y Fuerza", precio:32.99, img:"productos/nob.png",
    tags:{ objetivo:["fuerza_potencia","hipertrofia"], nivel:["intermedio","avanzado"], restriccion:["vegano","ninguna"], horario:["noche","manana"] } },

  { id:"zma", nombre:"ZMA (Zinc, Magnesio, B6)", categoria:"Recuperación y Sueño", precio:21.99, img:"productos/zma.png",
    tags:{ objetivo:["recuperacion","bienestar"], nivel:["intermedio","avanzado"], restriccion:["vegano","ninguna"], horario:["noche","manana"] } },

  { id:"lgm", nombre:"L-Glutamine", categoria:"Recuperación y Sueño", precio:19.99, img:"productos/lgm.png",
    tags:{ objetivo:["recuperacion"], nivel:["intermedio","avanzado"], restriccion:["vegano","ninguna"], horario:["manana","noche"] } },

  { id:"ash", nombre:"Ashwagandha (Root Extract)", categoria:"Recuperación y Sueño", precio:23.99, img:"productos/ash.png",
    tags:{ objetivo:["bienestar","recuperacion"], nivel:["intermedio","avanzado"], restriccion:["vegano","ninguna"], horario:["manana","noche"] } },

  { id:"om3", nombre:"Omega-3 Fish Oil", categoria:"Salud y Longevidad", precio:27.99, img:"productos/om3.png",
    tags:{ objetivo:["longevidad","bienestar","recuperacion"], nivel:["principiante","intermedio","avanzado"], restriccion:["ninguna"], horario:["manana","noche"] } }, // excluir si vegano

  { id:"ao3", nombre:"Algal Oil Omega-3", categoria:"Salud y Longevidad", precio:31.99, img:"productos/ao3.png",
    tags:{ objetivo:["longevidad","bienestar","recuperacion"], nivel:["principiante","intermedio","avanzado"], restriccion:["vegano","ninguna"], horario:["manana","noche"] } },

  { id:"mvc", nombre:"Multivitamin Complex", categoria:"Salud y Longevidad", precio:25.99, img:"productos/mvc.png",
    tags:{ objetivo:["bienestar","longevidad"], nivel:["principiante","intermedio","avanzado"], restriccion:["vegano","ninguna"], horario:["manana","noche"] } },

  { id:"v3k2", nombre:"Vitamin D3 + K2", categoria:"Salud y Longevidad", precio:18.99, img:"productos/v3k2.png",
    tags:{ objetivo:["longevidad","bienestar"], nivel:["principiante","intermedio","avanzado"], restriccion:["vegano","ninguna"], horario:["manana","noche"] } }
];
```

### 3.2. Diccionarios de Opciones del Quiz (`OPCIONES`)

Alimenta el render de las tarjetas seleccionables. Garantiza coherencia con los enums del registro.

```js
const OPCIONES = {
  objetivo: [
    { val:"hipertrofia",     label:"Hipertrofia",        icon:"💪" },
    { val:"fuerza_potencia", label:"Fuerza y Potencia",  icon:"🏋️" },
    { val:"recuperacion",    label:"Recuperación",       icon:"🌙" },
    { val:"longevidad",      label:"Longevidad",         icon:"🧬" },
    { val:"bienestar",       label:"Bienestar General",  icon:"✨" }
  ],
  nivel: [
    { val:"principiante", label:"Principiante" },
    { val:"intermedio",   label:"Intermedio" },
    { val:"avanzado",     label:"Avanzado" }
  ],
  restriccion: [
    { val:"ninguna", label:"Sin restricción" },
    { val:"vegano",  label:"Vegano" }
  ],
  horario: [
    { val:"manana", label:"Mañana" },
    { val:"tarde",  label:"Tarde" },
    { val:"noche",  label:"Noche" }
  ]
};
```

### 3.3. Reglas de Sugerencia (`REGLAS` + Scoring)

Se replica fielmente `@docs/logica_de_sugerencias.md`: **(A)** filtros duros, **(B)** filtros de seguridad por horario, **(C)** scoring por objetivo, **(D)** modificador vegano. Adicionalmente, un diccionario de Stacks con nombre + justificación hardcodeada por combinación clave.

```js
// Justificaciones / branding de Stack por combinación (objetivo + modificador)
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

// MOTOR: función pura (engine.js)
function generarStack(perfil) {
  // (A) Filtro duro: restricción dietética
  let pool = CATALOGO.filter(s =>
    perfil.restriccion === "vegano" ? s.tags.restriccion.includes("vegano")
                                    : true
  );
  // (B) Filtro de seguridad: noche → fuera estimulantes
  if (perfil.horario === "noche") {
    pool = pool.filter(s => s.id !== "cpw");
  }
  // (C) Scoring por objetivo (+2), nivel (+1), horario (+1); boost relajantes de noche
  const scored = pool.map(s => {
    let pts = 0;
    if (s.tags.objetivo.includes(perfil.objetivo)) pts += 2;
    if (s.tags.nivel.includes(perfil.nivel))       pts += 1;
    if (s.tags.horario.includes(perfil.horario))   pts += 1;
    if (perfil.horario === "noche" && (s.id === "zma" || s.id === "nob")) pts += 2;
    return { ...s, pts };
  });
  // Top-N (ej. 4) con pts > 0
  const stack = scored.filter(s => s.pts > 0)
                      .sort((a,b) => b.pts - a.pts)
                      .slice(0, 4);
  // (D) Branding + total
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
```

> Nota: el modificador vegano se resuelve aquí en el filtro duro (excluye `wpc` y `om3`, ya que el catálogo provee sustitutos `pbp` y `ao3`), cumpliendo la Regla 3 / Nota 1 del documento de lógica.

---

## 4. Mapeo del Registro Conceptual a la UI

El registro principal `PEDIDO_STACK` (`@docs/registro.md`) es la entidad de datos que la UI debe poblar. El objeto runtime `appState.pedido` es su materialización en JS. Correspondencia campo por campo:

| Campo del Registro (`registro.md`) | Tipo conceptual | Origen en la UI | Momento de captura |
|---|---|---|---|
| `ID_Transaccion` (clave compleja) | Continente | Generado al confirmar | V5 → "Confirmar Pedido" |
| ↳ `Fecha {aa,mm,dd}` | Continente N(4)/N(2)/N(2) | `new Date()` desglosada | Checkout |
| ↳ `Email_Usuario` AN(50) | Contenido | Input del Login (V1) | V1 submit |
| ↳ `Hash` AN(30) | Contenido | Hash simulado (timestamp/random) | Checkout |
| `Perfil_Atleta` | Continente | Quiz (V2) | V2, 4 pasos |
| ↳ `Objetivo` (enum) | Contenido | Tarjeta paso 1 | V2 |
| ↳ `Nivel` (enum) | Contenido | Tarjeta paso 2 | V2 |
| ↳ `Restriccion` (enum) | Contenido | Tarjeta paso 3 | V2 |
| ↳ `Hora_Entrenamiento` (enum) | Contenido | Tarjeta paso 4 | V2 |
| `Precio_Final` Real | Contenido | `stack.total` (V4, recalculado) | V4 |
| `Estado_Checkout` (enum) | Contenido | "Pendiente" → "Pagado" | V5 |

**Justificación de la clave (alineada a `tema_registros.md`):** `ID_Transaccion` es una **clave compleja** (campo continente) y **primaria**. Ningún subcampo aislado garantiza unicidad: el `Email_Usuario` se repite entre pedidos del mismo usuario; la `Fecha` se repite entre usuarios. La combinación `Fecha + Email_Usuario + Hash` asegura unicidad absoluta del registro, requisito de oro de un campo clave.

**Construcción del objeto en JS (al confirmar checkout):**

```js
function construirPedido(appState) {
  const hoy = new Date();
  return {
    ID_Transaccion: {
      Fecha: { aa: hoy.getFullYear(), mm: hoy.getMonth()+1, dd: hoy.getDate() },
      Email_Usuario: appState.usuario.email,
      Hash: "FF-" + Date.now().toString(36).toUpperCase()  // hash simulado
    },
    Perfil_Atleta: {
      Objetivo:          appState.perfil.objetivo,
      Nivel:             appState.perfil.nivel,
      Restriccion:       appState.perfil.restriccion,
      Hora_Entrenamiento: appState.perfil.horario
    },
    Precio_Final:   appState.stack.total,
    Estado_Checkout: "Pagado"
  };
}
```

> El campo `Perfil_Atleta` se renderiza visualmente como chips en V4 ("Hipertrofia · Avanzado · Vegano · Noche"), evidenciando ante el usuario los datos que componen el registro. La pantalla de confirmación imprime el `ID_Transaccion` formateado para hacer tangible la clave compleja.

---

## 5. Inventario de Imágenes

Imágenes de UI **adicionales** a producir en `assets/` (las 13 de producto ya existen en `productos/`). Estas se encuentran en la carpeta `@./img`.

| # | Archivo sugerido | Ubicación en la UI | Relación de Aspecto | Descripción del contenido |
|---|---|---|---|---|
| 1 | `hero-login.png` | Panel derecho de la pantalla de Login (V1) | Vertical (3:4 / 4:5) | Atleta de élite entrenando en gimnasio oscuro con iluminación de neón verde-azulada; estética cinematográfica de alto contraste. |
| 2 | `logo.html` | Navbar + card de Login | Cuadrada (1:1) | Isotipo de marca "Formula Fit": molécula/hexágono estilizado fusionado con una gota o pesa. Monocromo sobre `--accent`. |
| 3 | `bg-quiz-texture.png` | Fondo sutil del wizard (V2) | Horizontal (16:9, full-bleed) | Textura abstracta de laboratorio: partículas/macronutrientes flotando, gradiente oscuro de baja opacidad (no debe competir con las tarjetas). |
| 4 | `loader-anim.svg` | Pantalla de Fricción Positiva (V3) | Cuadrada (1:1) | Animación de "ensamblaje molecular" o anillo de progreso bio-tech; loop infinito en `--accent`. (SVG/CSS preferible a raster). |
| 5 | `icon-objetivo-*.svg` (x5) | Tarjetas del Paso 1 del Quiz | Cuadrada (1:1) | Set de 5 íconos lineales: hipertrofia (bíceps), fuerza (pesa), recuperación (luna), longevidad (ADN), bienestar (destello). Estilo outline consistente, 2px stroke. |
| 6 | `stack-hero-bg.png` | Banner superior del Dashboard de Resultados (V4) | Horizontal (21:9, panorámico) | Composición abstracta de polvos/cápsulas/líquidos de suplementos sobre superficie oscura tipo laboratorio; transmite "fórmula a medida". |
| 7 | `empty-cart.png` | Estado inicial/vacío del Carrito (V5) | Cuadrada (1:1) | Ilustración minimalista de shaker o frasco vacío; línea, paleta de marca. |
| 8 | `success-check.svg` | Modal de confirmación de pedido | Cuadrada (1:1) | Check animado dentro de círculo con glow `--accent`; refuerza el cierre exitoso de la transacción. |
| 9 | `favicon.ico` / `og-cover.jpg` | Pestaña del navegador / meta social | 1:1 y 1.91:1 | Favicon = isotipo; OG cover = logo + tagline "Tu Stack, formulado." sobre fondo `--bg-base`. |
| 10 | `usuario.png` | Badge de usuario en navbar (post-login) | Cuadrada (1:1) | Avatar genérico neutro con anillo de acento; acompaña el badge "Modo Simulación". |

> **Nota**
>
>*"Para el loader-anim.svg, no utilices un archivo externo. Genera un spinner CSS puro o un SVG inline dentro del HTML que utilice la variable var(--accent) y una animación @keyframes sencilla para simular el procesamiento bio-tech."*
>
>Al incrustarlo directamente en el DOM, eliminas una petición HTTP al servidor, evitas rutas de archivo rotas y te aseguras de que el diseño se mantenga autocontenido en los lenguajes fundamentales (HTML y CSS), cumpliendo a la perfección con los requisitos de un prototipo sólido y eficiente.
>
>Para el recurso `success-check.svg` del modal de confirmación, NO utilices un archivo de imagen externo. 
>
>Debes implementar un SVG en línea (inline SVG) directamente dentro del archivo HTML. Aplica las siguientes reglas CSS para este elemento:
>1. Utiliza las propiedades `stroke-dasharray` y `stroke-dashoffset` junto con una regla `@keyframes` para animar el trazo, simulando que el "check" se dibuja fluidamente en tiempo real al aparecer el modal.
>2. Aplica un efecto de resplandor (glow) al contenedor o al trazo utilizando la variable CSS global `var(--accent)`.

---

### Resumen de Accionables para la Fase de Código

1. Maquetar `index.html` con las 5 `<section class="view">` + overlay de confirmación.
2. Definir `:root` (Sección 2.1/2.2) e importar `Inter`/`Space Grotesk`.
3. Volcar `CATALOGO`, `OPCIONES`, `REGLAS` en `data.js` (Sección 3).
4. Implementar `generarStack()` puro en `engine.js` (filtros A→B→C→D).
5. Implementar `appState`, `navigateTo()`, listeners del wizard, loader con `setTimeout` y render en `app.js`.
6. Implementar `construirPedido()` en el checkout (Sección 4).
7. Producir los 10 grupos de assets de UI (Sección 5); usar las 13 imágenes de `productos/` en las cards.
