# Formula Fit — Presentación del Trabajo Práctico

**Cátedra:** Algoritmos y Estructuras de Datos
**Profesora:** Noelia Pintos
**Carrera:** Ingeniería en Sistemas de Información
**Aplicación desplegada:** https://federicobejarano.github.io/formula-fit/

---

## 1. ¿Qué es Formula Fit?

**Formula Fit** es el prototipo de un e-commerce que vende suplementación deportiva, pero
con un giro: en lugar de obligar al usuario a navegar entre decenas de botes y elegir "a
ciegas", la tienda le **formula un Stack (combo) personalizado** de suplementos según su
objetivo, su nivel de entrenamiento, sus restricciones dietarias y su horario de
entrenamiento.

La idea central es simple: el usuario no busca productos, **describe lo que quiere lograr** y
el sistema arma la mezcla por él. Funciona como un pequeño "laboratorio" digital que
transforma las respuestas de un cuestionario en una recomendación concreta lista para
comprar.

El prototipo está construido únicamente con **HTML5, CSS3 y JavaScript (ES6)** y datos
estáticos en JSON/diccionarios. No tiene backend ni base de datos reales: toda la lógica está
simulada en el navegador, tal como pide la consigna.

---

## 2. Por qué un e-commerce D2C: la innovación elegida

La consigna pedía salir del e-commerce tradicional (supermercados, ropa genérica,
electrónica). Por eso elegí el modelo **D2C (Direct-to-Consumer) hiper-personalizado**, que
es una de las formas más actuales de innovación en comercio digital. Apoyándome en las ideas
del documento `d2c_paradigm.md`, la elección se fundamenta en tres puntos:

- **Control total de la experiencia y relación directa con el cliente.** El modelo D2C elimina
  intermediarios y maneja todos los puntos de contacto digitales, desde que el usuario entra
  hasta el checkout. En Formula Fit eso se ve en un recorrido único y guiado, donde la "marca"
  acompaña al usuario en cada paso.

- **Personalización guiada por datos (input → output).** El paradigma D2C describe sistemas
  que toman datos explícitos del usuario y devuelven una salida curada. Formula Fit es
  exactamente eso: el cuestionario captura los datos del atleta (input) y el motor devuelve un
  Stack a medida (output). En lugar de un catálogo plano, hay un **descubrimiento guiado**.

- **Carrito autónomo (autonomous cart).** El documento describe cómo un sistema puede
  ensamblar automáticamente un carrito pre-armado a partir de los objetivos y preferencias del
  usuario. Esa es la función estrella del prototipo: el usuario recibe un carrito ya formulado
  que solo revisa y ajusta.

En resumen, el D2C hiper-personalizado encaja perfecto porque su lógica natural es
**"contame qué necesitás y yo te lo armo"**, que es justo lo que diferencia a Formula Fit de
una tienda de suplementos común.

---

## 3. El registro principal y su clave

El corazón técnico del trabajo —y el foco que pide la cátedra— es el **registro principal**.
La estructura final, en pseudocódigo de cátedra, está en `registro.md`:

```plaintext
PEDIDO_STACK = Registro
    ID_Transaccion = Registro          // Clave compleja (campo continente)
        Fecha = Registro
            aa : N(4)
            mm : N(2)
            dd : N(2)
        FinReg
        Email_Usuario : AN(50)
        Hash : AN(30)
    FinReg

    Perfil_Atleta = Registro           // El input del usuario
        Objetivo : ("hipertrofia", "fuerza_potencia", "recuperacion", "longevidad", "bienestar")
        Nivel : ("principiante", "intermedio", "avanzado")
        Restriccion : ("ninguna", "vegano")
        Hora_Entrenamiento : ("mañana", "tarde", "noche")
    Fin Registro;

    Precio_Final : Real;
    Estado_Checkout : ("Pendiente", "Pagado");
Fin Registro;
```

### Fundamentación con la teoría de cátedra

Apoyándome en `tema_registros.md`, el diseño cumple con los conceptos centrales de la
Unidad 2:

- **Es un registro heterogéneo.** `PEDIDO_STACK` agrupa campos de distinto tipo (numéricos,
  alfanuméricos, reales y enumerados) bajo una sola entidad, tratada como una unidad. Esa
  heterogeneidad es justamente la característica que define a un registro.

- **Combina campos contenidos y continentes.** Hay campos simples (contenidos), como
  `Precio_Final` o `Estado_Checkout`, y campos continentes formados por otros campos, como
  `Fecha` (que contiene `aa`, `mm`, `dd`) o `Perfil_Atleta`. Esto coincide con el ejemplo
  clásico de la "Fecha de fabricación" de la teoría.

- **Cada campo tiene nombre, tipo y tamaño.** Por ejemplo `Email_Usuario : AN(50)` declara el
  nombre, el tipo alfanumérico y el tamaño, tal como exige la cátedra.

**La clave: `ID_Transaccion`.** Es una **clave compleja** (porque es un campo continente,
formado por `Fecha + Email_Usuario + Hash`) y a la vez **primaria** (identifica de forma única
al registro). La justificación es directa y se apoya en la "regla de oro" del campo clave —debe
ser único—:

- El `Email_Usuario` **solo** no sirve: un mismo usuario puede hacer varios pedidos.
- La `Fecha` **sola** tampoco: muchos usuarios compran el mismo día.
- La **combinación** de fecha + email + un hash único garantiza que no haya dos pedidos
  iguales. Por eso la unicidad necesita una clave compuesta y no un solo campo.

Además, dentro del perfil aparece la noción de **clave foránea** de la teoría: en la versión
original `Email_Usuario` actuaba como clave secundaria/foránea que relacionaría este registro
con un hipotético archivo de usuarios.

### Reflexión: ¿qué tan bien modeló Gemini Pro la estructura?

La primera versión del registro (incluida en `registro.md`) fue propuesta por **Gemini Pro**, y
la verdad es que el modelado fue muy acertado para el negocio. Gemini entendió la lógica del
e-commerce D2C y la reflejó en la estructura: separó claramente el **input del usuario**
(`Perfil_Atleta`) del **output del sistema** (`Formula_Generada`), que es exactamente el flujo
"input → output" del paradigma. También eligió por su cuenta una **clave compuesta** correcta
(`Fecha + Email + Hash`), entendiendo que ningún campo aislado garantizaba unicidad, e incluso
identificó claves foráneas hacia un inventario.

Lo que hubo que corregir no fue el modelo conceptual sino la **sintaxis**: Gemini mezcló
convenciones que no coinciden con el pseudocódigo de la cátedra (por ejemplo, declarar la clave
compuesta como un campo simple `AN(50)` en lugar de un campo continente real). En la versión
corregida se ajustó la sintaxis y se desarrolló `ID_Transaccion` como registro anidado. La
conclusión es que Gemini Pro es muy fuerte **modelando la idea de negocio en datos**, pero
todavía necesita la supervisión del estudiante para respetar la notación exacta que pide la
materia.

---

## 4. Los prompts utilizados con la IA

El trabajo con la IA se organizó con tres prompts reutilizables, cada uno con un rol distinto
dentro del proceso:

1. **`prompts/01-solicitar-documento-técnico.md` — Diseño técnico.** Este prompt le dio a la
   IA todo el contexto del proyecto (consigna, paradigma D2C, registro, buenas prácticas) y le
   pidió producir un documento completo de arquitectura. Su resultado es
   `arquitectura_tecnica.md`, que se convirtió en la fuente autoritativa de todo el desarrollo.

2. **`prompts/planificacion.md` — Plan de codificación.** Tomando como base la arquitectura y
   el límite de tiempo de 2 horas, este prompt le pidió a la IA generar una **secuencia de
   actividades** de codificación por fases, con tareas concretas y etiquetadas por complejidad.

3. **`prompts/ejecucion_actividad.md` — Ejecución de cada actividad.** Es un prompt **genérico
   y reutilizable**: para cada actividad del plan se completa el bloque `{{ACTIVIDAD}}` y la IA
   implementa solo esa parte, respetando el alcance, las restricciones y los patrones ya
   definidos en `arquitectura_tecnica.md`.

Esta cadena (diseñar → planificar → ejecutar paso a paso) permitió mantener el control sobre el
proyecto y evitar que la IA "se adelantara" o reescribiera lo ya hecho.

---

## 5. El flujo UX/UI y las buenas prácticas de e-commerce

Según `arquitectura_tecnica.md`, la aplicación es una **SPA simulada**: un único `index.html`
con 5 vistas, donde solo una está activa a la vez. El recorrido es una máquina de estados
lineal:

1. **Login (V1):** ingreso simulado (cualquier email y contraseña).
2. **Quiz / Onboarding (V2):** asistente de 4 pasos (objetivo → nivel → restricción → horario).
3. **Loader (V3):** pantalla de procesamiento simulado de ~2.5 s ("Analizando métricas...").
4. **Resultados / Dashboard (V4):** se muestra el Stack formulado, su justificación y el precio.
5. **Carrito / Checkout (V5):** resumen del pedido y confirmación final.

Este flujo se ajusta de forma directa a las buenas prácticas descritas en
`uxui_best_practices.md`:

- **Formularios divididos en pasos (Ley de Hick).** El quiz no pide todo de golpe: lo parte en
  4 pasos con **barra de progreso** (25% → 50% → 75% → 100%), reduciendo la carga cognitiva tal
  como recomienda la teoría de formularios.

- **Selección con tarjetas en vez de dropdowns.** Como cada pregunta tiene menos de 10 opciones,
  se usan tarjetas seleccionables (estilo radio-card) apiladas, evitando los menús desplegables
  que esconden opciones.

- **Fricción positiva en la carga.** El loader respeta la idea del **umbral de Doherty**: cuando
  un proceso supera los 400 ms hay que mostrar un indicador de progreso. La pantalla de
  "Analizando métricas..." hace que la espera se sienta como un trabajo real del sistema y suba
  la percepción de valor.

- **Jerarquía de botones y tarjetas de producto.** Los resultados se muestran como **product
  cards** (imagen prominente, título, categoría, precio) y los botones siguen la jerarquía
  primario / secundario / terciario, con un único CTA primario sólido para la acción principal
  ("Añadir al Carrito").

- **Checkout protegido y enfocado.** En la vista de carrito se ocultan distracciones y
  navegación secundaria para que el usuario se concentre en confirmar la compra, siguiendo la
  recomendación de mantener el checkout como el área más protegida del sitio.

- **Accesibilidad y grilla de 8px.** La paleta cumple contraste WCAG y todo el layout se apoya
  en una grilla de 8px con una escala tipográfica definida, como indican las buenas prácticas de
  jerarquía visual.

Un detalle importante: la UI **refleja fielmente el registro**. Los campos del `Perfil_Atleta`
se muestran como chips ("Hipertrofia · Avanzado · Vegano · Noche") y la pantalla de confirmación
imprime el `ID_Transaccion`, haciendo tangible la estructura de datos diseñada.

---

## 6. Aplicación desplegada

El prototipo funcional está publicado y se puede probar en:

**https://federicobejarano.github.io/formula-fit/**

(Es una simulación: se ingresa con cualquier email y contraseña.)

---

## 7. Reflexión sobre la experiencia de usar IA

Trabajar con IA en este proyecto me mostró que su valor va mucho más allá de "escribir código".
La usé primero como herramienta para **procesar y ordenar información**: sobre buenas prácticas
de UX/UI, sobre modelos de negocio innovadores como el D2C y sobre la propia teoría de
registros. Eso me ayudó a tomar decisiones con fundamento y no por intuición. Recién después la
usé para codificar, y ahí también fue clave organizarla en etapas (diseñar, planificar,
ejecutar) en lugar de pedirle todo de una vez. Lo más interesante fue ver que la IA modela muy
bien las ideas conceptuales —como la estructura de datos del negocio— pero todavía necesita que
el estudiante revise los detalles técnicos y la notación exacta de la materia. En definitiva,
la IA potencia el aprendizaje, pero no reemplaza el criterio: uno sigue siendo responsable de
entender, corregir y justificar cada decisión.
