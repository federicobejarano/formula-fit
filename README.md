# Formula Fit

**Cátedra:** Algoritmos y Estructuras de Datos · **Profesora:** Noelia Pintos
**Carrera:** Ingeniería en Sistemas de Información
**App desplegada:** https://federicobejarano.github.io/formula-fit/

## ¿Qué es Formula Fit?

**Formula Fit** es el prototipo de un e-commerce de suplementación deportiva con un giro: en lugar de obligar al usuario a elegir entre decenas de productos "a ciegas", la tienda le **formula un Stack (combo) personalizado** según su objetivo, su nivel de entrenamiento, sus restricciones dietarias y su horario. El usuario no busca productos: **describe lo que quiere lograr** y el sistema arma la mezcla por él.

Es un modelo **D2C (Direct-to-Consumer) hiper-personalizado**, una de las formas más actuales de innovación en comercio digital. Su lógica natural —"contame qué necesitás y yo te lo armo"— es lo que lo diferencia de una tienda de suplementos común.

El prototipo está construido únicamente con **HTML5, CSS3 y JavaScript Vanilla (ES6)** y datos estáticos en JSON/diccionarios. No tiene backend ni base de datos reales: toda la lógica está simulada en el navegador, tal como pide la consigna.

## Cómo ejecutar

Abrir `index.html` en cualquier navegador moderno. No requiere servidor, build tools ni instalación de paquetes.

```bash
xdg-open index.html    # Linux
open index.html        # macOS
```

## Modo Simulación

Toda la aplicación opera en **Modo Simulación**: no se realizan transacciones reales, no se envían datos a ningún servidor y no se persiste información más allá de la sesión del navegador. Se ingresa con cualquier email y contraseña.

## El registro principal y su clave

El corazón técnico del trabajo es el **registro principal** `PEDIDO_STACK`. Su clave, `ID_Transaccion`, es **compleja** (un campo continente formado por `Fecha + Email_Usuario + Hash`) y a la vez **primaria** (identifica de forma única al pedido): ningún campo aislado garantiza unicidad, por lo que la clave debe ser compuesta. El diseño y su justificación completa están en [`docs/registro.md`](docs/registro.md), fundamentados en la teoría de [`docs/tema_registros.md`](docs/tema_registros.md).

## Documentación

Toda la documentación que guió el diseño, la planificación y el desarrollo vive en la carpeta [`docs/`](docs/). Está ordenada según el rol que cumplió en el proceso.

### Punto de partida y marco conceptual

| Documento | Descripción y aporte al proceso |
|---|---|
| [`docs/consigna.md`](docs/consigna.md) | **Consigna del trabajo práctico.** Define el objetivo académico (aplicar registros y claves de la Unidad 2) y los requisitos de entrega. Fue el punto de partida que delimitó el alcance del proyecto. |
| [`docs/d2c_paradigm.md`](docs/d2c_paradigm.md) | **El paradigma D2C e hiper-personalización.** Base conceptual del modelo de negocio elegido (relación directa, lógica input→output, carrito autónomo). Fundamentó *por qué* Formula Fit funciona como un "laboratorio" que formula stacks. |
| [`docs/tema_registros.md`](docs/tema_registros.md) | **Marco teórico de registros y claves.** Síntesis de la teoría de cátedra (heterogeneidad, campos contenidos/continentes, tipos de clave). Sirvió para diseñar y justificar el registro principal con rigor. |

### Diseño del producto y los datos

| Documento | Descripción y aporte al proceso |
|---|---|
| [`docs/registro.md`](docs/registro.md) | **Diseño del registro principal `PEDIDO_STACK`.** Contiene la versión propuesta por la IA y la versión corregida a la sintaxis de cátedra, con la justificación de la clave compleja. Es el entregable técnico central de la consigna. |
| [`docs/logica_de_sugerencias.md`](docs/logica_de_sugerencias.md) | **Especificación del motor de recomendación simulado.** Define el flujo de descubrimiento guiado, las 4 variables del quiz y la matriz de decisión determinista. Guió la lógica de negocio del frontend. |
| [`docs/descripcion_productos.md`](docs/descripcion_productos.md) | **Catálogo de suplementos y reglas.** Lista los productos con sus tags (objetivo, nivel, restricción, horario) e imágenes, y las reglas de exclusión/scoring. Funcionó como fuente de datos para el catálogo hardcodeado. |
| [`docs/uxui_best_practices.md`](docs/uxui_best_practices.md) | **Buenas prácticas de UX/UI para e-commerce.** Base de conocimiento sobre grilla de 8px, jerarquía de botones, formularios por pasos y checkout protegido. Sirvió como lineamiento para el diseño de la interfaz. |
| [`docs/arquitectura_tecnica.md`](docs/arquitectura_tecnica.md) | **Documento de definición técnica y arquitectura.** Fuente autoritativa del desarrollo: SPA simulada de 5 vistas, máquina de estados, modelo de datos, tokens de diseño y restricciones. Todo el código se construyó respetando esta spec. |

### Trabajo con la IA (prompts)

La interacción con la IA se organizó en una cadena de tres prompts reutilizables: **diseñar → planificar → ejecutar paso a paso**. Esto permitió mantener el control del proyecto y evitar que la IA se adelantara o reescribiera lo ya hecho.

| Documento | Descripción y aporte al proceso |
|---|---|
| [`docs/prompts/01-solicitar-documento-técnico.md`](docs/prompts/01-solicitar-documento-técnico.md) | **Prompt de diseño técnico.** Le dio a la IA todo el contexto del proyecto y le pidió producir la arquitectura completa. Su resultado fue `arquitectura_tecnica.md`. |
| [`docs/prompts/planificacion.md`](docs/prompts/planificacion.md) | **Prompt de planificación.** Sobre la base de la arquitectura y el timebox de 2 horas, pidió una secuencia de actividades de codificación por fases, etiquetadas por complejidad. |
| [`docs/prompts/ejecucion_actividad.md`](docs/prompts/ejecucion_actividad.md) | **Prompt genérico de ejecución.** Reutilizable para cada actividad del plan: implementa solo esa parte respetando el alcance y los patrones ya definidos. |

## Reflexión sobre el uso de IA

La IA fue valiosa mucho más allá de "escribir código". Se usó primero para **procesar y ordenar información** (buenas prácticas de UX/UI, el modelo D2C, la teoría de registros), lo que permitió decidir con fundamento. Recién después se usó para codificar, organizándola en etapas en lugar de pedirle todo de una vez. Lo más interesante fue ver que la IA modela muy bien las ideas conceptuales —como la estructura de datos del negocio— pero todavía necesita que el estudiante revise los detalles técnicos y la notación exacta de la materia. En definitiva, la IA potencia el aprendizaje, pero no reemplaza el criterio.
