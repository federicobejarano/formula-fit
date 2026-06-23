# Documento de Especificación: Lógica de Sugerencia Simulada (D2C Hyper-Personalized Stacks)

## 1. Objetivo del Módulo
Definir el flujo de interacción, los datos de entrada y la lógica determinista mediante la cual la aplicación web (frontend-only) simulará un motor de recomendación de suplementos deportivos personalizados (Stacks), sin depender de un backend ni de bases de datos externas.

## 2. Flujo de Experiencia de Usuario (UX/UI)
El recorrido del usuario a través de la aplicación seguirá una arquitectura de "Descubrimiento Guiado":

1.  **Autenticación Simulada:** Pantalla de login donde el usuario ingresa email y contraseña. Al enviar, la página actualiza el estado (guardando el email en `localStorage` o en memoria) y muestra un avatar/email en la barra de navegación con un *badge* que indique "Modo Simulación".
2.  **Onboarding (Quiz de Personalización):** Un formulario de pasos cortos y visuales (tarjetas seleccionables, no simples inputs de texto) donde el usuario declara su perfil atlético.
3.  **Estado de Procesamiento (Fricción Positiva):** Una vez enviado el formulario, la UI mostrará un *loader* durante 2 a 3 segundos con mensajes dinámicos (ej. "Analizando métricas...", "Formulando proporciones de macronutrientes...", "Ensamblando Stack..."). Esto genera la percepción de un análisis complejo (simulación de IA).
4.  **Presentación del Stack (Dashboard):** Se revela el combo sugerido, detallando qué suplementos lo componen, el porqué de la recomendación (texto hardcodeado asociado al perfil) y el precio total calculado.
5.  **Personalización Final y Checkout:** El usuario puede ajustar el Stack (ej. eliminar un suplemento que no desea o cambiar el sabor). Finalmente, un botón de "Añadir al Carrito" que actualiza un contador en la UI.

## 3. Modelo de Datos de Entrada (Quiz de Usuario)
Para mantener la simplicidad del prototipo pero garantizar el realismo del dominio del fitness, el formulario capturará únicamente 4 variables clave:

*   `objetivo_principal` (string): 'hipertrofia' | 'fuerza_potencia' | 'recuperacion' | 'longevidad' | 'bienestar'
*   `nivel_experiencia` (string): 'principiante' | 'intermedio' | 'avanzado'
*   `restriccion_dietetica` (string): 'ninguna' | 'vegano'
*   `horario_entrenamiento` (string): 'manana' | 'tarde' | 'noche'

## 4. Lógica de Sugerencia (Motor de Recomendación Frontend)
La "inteligencia" de la aplicación se resolverá mediante diccionarios estáticos en JavaScript o archivos JSON locales.

### 4.1. Catálogo Base (Hardcodeado)
Existirá un arreglo de objetos de suplementos individuales con propiedades estáticas (nombre, precio, imagen de Unsplash, tags). Ejemplos: Creatina Monohidratada, ZMA, Precursores de Óxido Nítrico, Proteína Whey, Proteína Vegetal.

### 4.2. Matriz de Decisión (El Algoritmo Simulado)
En lugar de calcular combinaciones matemáticas al vuelo, JavaScript evaluará las combinaciones de entrada y devolverá un *Stack* pre-ensamblado. 

**Reglas de Mapeo (Ejemplos para implementación en JS):**
*   **Regla 1 (Fuerza + Avanzado):**
    *   *Si* `objetivo` == 'fuerza_potencia' *Y* `nivel` == 'avanzado':
    *   *Sugerir:* "Stack Rendimiento Máximo" (Creatina + Óxido Nítrico).
    *   *Justificación en UI:* "Como atleta avanzado enfocado en fuerza, el óxido nítrico maximizará tu vasodilatación intra-entreno, mientras la creatina repondrá tus reservas de ATP."
*   **Regla 2 (Recuperación + Noche):**
    *   *Si* `objetivo` == 'recuperacion' *Y* `horario` == 'noche':
    *   *Sugerir:* "Stack Descanso Profundo" (ZMA + Proteína de asimilación lenta).
    *   *Justificación en UI:* "Al entrenar de noche, el ZMA optimizará tu perfil hormonal y relajación muscular durante el sueño."
*   **Regla 3 (Modificador Vegano):**
    *   Independientemente de la regla anterior, *Si* `restriccion` == 'vegano', cualquier iteración de "Proteína Whey" en el array resultante se reemplaza mediante un `map()` por "Proteína Vegetal (Guisante/Arroz)".

### 4.3. Implementación Técnica (Restricciones para el LLM)
*   Toda la lógica debe resolverse en funciones puras de JavaScript que reciban el objeto del formulario y retornen el objeto del Stack.
*   NO se debe implementar persistencia real (sin bases de datos).
*   NO se debe diseñar en esta fase el Registro de Datos principal ni su Clave identificadora (este requisito será abordado de forma aislada para cumplir con los lineamientos teóricos de la cátedra).